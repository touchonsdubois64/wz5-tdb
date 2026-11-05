// ==================================================
// WINNING ZONE — application
// ==================================================
//
// Reprend de cc2 : Chessground + chess.js, arbre de coups avec variantes,
// Stockfish (force maximale), tables de finales Lichess, notation
// (français / figurines / international), export PGN.
//
// Nouveautés : édition de la position (FEN ou glisser-déposer), translation,
// boutons Play / Start, panneau d'évaluation avec coups des tables et
// « Winning Zone » (cases vertes / jaunes / roses).
// ==================================================

import { Chessground } from '@lichess-org/chessground';
import '@lichess-org/chessground/assets/chessground.base.css';
import '@lichess-org/chessground/assets/chessground.brown.css';
import { Chess } from 'chess.js';
import { fillLabel, plainLabel, setupLibrary } from './library.js';
import { NAG_SUFFIXES, NAG_SYMBOLS, isMoveNag, parsePgn } from './pgn.js';
import { setupMarks } from './marks-ui.js';
import { setupSettings } from './settings.js';

import './style.css';
import {
  EMPTY_PLACEMENT,
  buildFen,
  gridToPlacement,
  parseFen,
  placementToGrid,
  sanitizeCastling,
  validateStructure,
} from './fen.js';
import { Engine, depthFromInfo, evaluationFromInfo, formatScore, parseInfo, scoreValue } from './engine.js';
import { annotateMoves, getMainlineMate, getTablebase, isCovered, mateText, uciOf } from './tablebase.js';

// ==================================================
// OUTILS
// ==================================================

const $ = (selector) => document.querySelector(selector);
const asset = (path) => new URL(path, document.baseURI).href;
const escapeHtml = (text) =>
  String(text).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const boardElement = $('#board');
const fenInput = $('#fen');
const messageElement = $('#message');
const pgnInput = $('#pgn');
const pgnMessage = $('#pgn-message');
const statusElement = $('#status');
const movesElement = $('#moves');

// suivi du défilement automatique de la liste des coups (voir centerCurrentMove)
let lastCenteredNode = null;
let clickedInMoves = false;
movesElement.addEventListener(
  'pointerdown',
  () => {
    clickedInMoves = true;
    setTimeout(() => (clickedInMoves = false), 400);
  },
  true,
);
const evalHead = $('#eval-head');
const evalMoves = $('#eval-moves');
const evalPill = $('#eval-pill');
const zoneButton = $('#zone');
const zoneLayer = $('#zone-layer');
const startButtons = { w: $('#start-white'), b: $('#start-black') };

const ROLE_LETTER = { pawn: 'P', knight: 'N', bishop: 'B', rook: 'R', queen: 'Q', king: 'K' };

// Les images des pièces sont injectées ici afin que leurs chemins restent
// valides quel que soit l'endroit où le site est hébergé.
(function injectPieceImages() {
  const rules = [];
  for (const color of ['white', 'black']) {
    for (const [role, letter] of Object.entries(ROLE_LETTER)) {
      const url = asset('pieces/alpha/' + color[0] + letter + '.svg');
      rules.push(`#board piece.${color}.${role} { background-image: url('${url}') !important; }`);
    }
  }
  rules.push('#board piece { background-size: contain !important; background-repeat: no-repeat !important; background-position: center !important; }');
  const style = document.createElement('style');
  style.textContent = rules.join('\n');
  document.head.appendChild(style);
})();

// ==================================================
// ÉTAT
// ==================================================

const game = new Chess();

let locked = false; // false : position éditable — true : partie en cours
let playerSide = 'analysis'; // 'white' | 'black' | 'analysis' : le Roi bicolore est choisi tant que l'utilisateur n'a pas indiqué son camp
let suspended = null; // édition reprise en cours de partie : { placement } (les coups restent affichés)
let positionTitle = null; // titre de la position choisie dans la bibliothèque

let editMeta = { turn: 'w', castling: '-', half: 0, full: 1 };

let currentStartFen = '';
let rootNode = null;
let currentNode = null;

let thinking = false;
let pendingPromotion = null;
let moveToken = 0; // invalide les calculs de Stockfish devenus obsolètes
let evalId = 0; // invalide les évaluations devenues obsolètes

let evalOn = false;
let zoneOn = false;
let zoneSig = '';
let tbList = null; // dernière liste de coups des tables, pour réaffichage

const engine = new Engine(asset('stockfish/stockfish-18-lite-single.js'));

// ==================================================
// ÉCHIQUIER
// ==================================================

const ground = Chessground(boardElement, {
  fen: EMPTY_PLACEMENT,
  orientation: 'white',
  coordinates: false,
  animation: { duration: 150 },
  highlight: { lastMove: false, check: false },
  premovable: { enabled: false },
  // Mode édition : pièces librement déplaçables, suppression hors de l'échiquier
  movable: { free: true, color: 'both', showDests: false, events: { after: onAfterMove } },
  draggable: { enabled: true, deleteOnDropOff: true },
  selectable: { enabled: false },
  events: { change: onBoardChange },
});


/** Rectangle réel de l'échiquier : Chessground arrondit sa taille à un multiple de 8 pixels. */
function boardRect() {
  const board = boardElement.querySelector('cg-board');
  return (board || boardElement).getBoundingClientRect();
}

/** Les calques (zones, annotations) prennent exactement la taille de l'échiquier dessiné. */
function syncLayers() {
  const rect = boardRect();
  for (const layer of [zoneLayer, $('#marks-layer')]) {
    layer.style.width = rect.width + 'px';
    layer.style.height = rect.height + 'px';
  }
}

/** Disposition paysage (ordinateur, ou téléphone tenu en paysage) ou portrait (une colonne), choisie automatiquement. */
// Mêmes conditions que dans style.css.
const landscapeQuery = window.matchMedia(
  '(orientation: landscape) and (min-width: 1260px) and (min-height: 520px), ' +
    '(orientation: landscape) and (pointer: coarse) and (min-width: 600px) and (max-height: 520px)',
);

/** Liste des coups : dans le cadre de droite en paysage, sous l'échiquier (toute la largeur) en portrait. */
function placeBlocks() {
  if (landscapeQuery.matches) $('#frame-right').append(movesElement);
  else $('.workspace').after(movesElement); // portrait : sur toute la largeur, sous l'échiquier et l'évaluation
}
placeBlocks();

const refreshGeometry = () => {
  ground.redrawAll();
  syncLayers();
};
new ResizeObserver(refreshGeometry).observe(boardElement);
window.addEventListener('resize', refreshGeometry);
/**
 * Garde-fou d'affichage sur téléphone : si le navigateur affiche la page « dézoomée » (largeur de mise en page bien supérieure à celle de
 * l'écran, par exemple en mode « Version pour ordinateur »), tout paraît minuscule. On impose alors la largeur réelle de l'appareil.
 */
function guardViewport() {
  const meta = document.querySelector('meta[name="viewport"]');
  if (!meta || !window.matchMedia('(pointer: coarse)').matches) return;
  const landscape = window.matchMedia('(orientation: landscape)').matches;
  const device = landscape ? Math.max(screen.width, screen.height) : Math.min(screen.width, screen.height);
  if (!device || window.innerWidth <= device * 1.12) return;
  meta.setAttribute('content', 'width=' + device + ', initial-scale=1, minimum-scale=1, viewport-fit=cover');
}
guardViewport();
window.addEventListener('orientationchange', () => setTimeout(guardViewport, 300));
window.addEventListener('load', guardViewport);

// au changement d'orientation, on remet la page tout en haut (sinon le haut du cadre de gauche peut rester masqué)
function resetScroll() {
  window.scrollTo(0, 0);
  const frame = document.getElementById('frame-left');
  if (frame) frame.scrollTop = 0;
}
window.addEventListener('orientationchange', resetScroll);
window.addEventListener('resize', () => {
  if (landscapeQuery.matches) resetScroll();
  updateMovesSpacer();
});
landscapeQuery.addEventListener('change', () => {
  resetScroll();
  placeBlocks();
  refreshGeometry();
  lastCenteredNode = null;
  centerCurrentMove();
});
window.addEventListener('load', refreshGeometry);

function onAfterMove(orig, dest) {
  if (!locked) {
    onBoardChange();
    return;
  }
  playerMove(orig, dest);
}

function onBoardChange() {
  if (locked) return;
  setPositionTitle(null);
  discardSuspendedIfModified();
  syncEditorFen();
}

function setPositionTitle(title) {
  positionTitle = title ? plainLabel(title) : null; // texte brut, utilisé dans le PGN
  const label = $('#library-title');
  fillLabel(label, title || '');
  label.title = positionTitle || '';
}

/** Les coups affichés ne sont effacés qu'une fois la position réellement modifiée. */
function discardSuspendedIfModified() {
  if (!suspended || ground.getFen() === suspended.placement) return;
  suspended = null;
  rootNode = null;
  currentNode = null;
  currentStartFen = '';
  updateMoves();
  updateNavigation();
}

// ==================================================
// ANNOTATIONS (crayon)
// ==================================================

// Position choisie dans la bibliothèque : donne accès à ses champs facultatifs « url » (solution) et « marks » (indice)
let currentLibraryPosition = null;

const marks = setupMarks({
  layer: $('#marks-layer'),
  panel: $('#marks-panel'),
  buttons: [], // l'outil d'annotation est supprimé : seul l'indice (bouton « i ») affiche des annotations
  isWhite: () => ground.state.orientation === 'white',
  // position à laquelle se rapportent les annotations téléchargées (bouton « Enregistrer »)
  getExportInfo: () =>
    currentLibraryPosition
      ? { title: currentLibraryPosition.title, fen: currentLibraryPosition.fen }
      : { title: positionTitle || '', fen: (locked && currentStartFen) || fenInput.value.trim() },
  onActiveChange: (active) => {
    // pendant l'annotation, un clic ne sélectionne plus de pièce (le glisser-déposer reste possible)
    if (locked) ground.set({ selectable: { enabled: !active } });
  },
});

// ==================================================
// INDICE : annotations enregistrées avec la position (champ « marks » de positions.js)
// ==================================================
//
// Le bouton « i » affiche, puis masque, les annotations de la position choisie dans la bibliothèque.
// Le code s'obtient avec le bouton « Enregistrer » de la barre Annotations (voir marks.js pour le format).
// L'indice disparaît dès qu'on charge une autre position.
// ==================================================

const hintButton = $('#hint-btn');

function refreshHintButton() {
  const shown = marks.isHintShown();
  hintButton.classList.toggle('active', shown);
  hintButton.setAttribute('aria-pressed', shown ? 'true' : 'false');
}

/** Nouvelle position : on efface les annotations tracées et on masque l'indice. */
function resetMarks() {
  marks.clear();
  marks.hideHint();
  refreshHintButton();
}

function toggleHint() {
  if (marks.isHintShown()) {
    marks.hideHint();
    refreshHintButton();
    return;
  }
  const position = currentLibraryPosition;
  if (!position) {
    showMessage('Choisissez d’abord une position dans la bibliothèque.', 'info');
    return;
  }
  if (!position.marks) {
    showMessage('Aucun indice enregistré pour cette position.', 'info');
    return;
  }
  const result = marks.showHint(position.marks);
  refreshHintButton();
  if (result.count === 0) {
    showMessage('Le code d’annotations de cette position est illisible : ' + (result.errors[0] || 'vide') + '.', 'error');
  } else if (result.errors.length > 0) {
    showMessage(result.errors.length + ' élément(s) du code d’annotations ignoré(s) : ' + result.errors[0] + '.', 'error');
  } else {
    hideMessage();
  }
}

hintButton.addEventListener('click', toggleHint);

// ==================================================
// SOLUTION : chapitre d'étude Lichess (champ « url » de positions.js)
// ==================================================
//
// L'url d'un chapitre (https://lichess.org/study/XXXXXXXX/YYYYYYYY) sert à télécharger
// son PGN via l'API de Lichess, puis à l'afficher comme n'importe quel PGN (loadPgn).
// L'étude doit être publique (ou non répertoriée) ; le PGN téléchargé est gardé en mémoire.
// ==================================================

const solutionCache = new Map();
let solutionBusy = false;

function parseStudyUrl(url) {
  const match = /lichess\.org\/study\/([A-Za-z0-9]{8})\/([A-Za-z0-9]{8})/.exec(String(url || ''));
  return match ? { studyId: match[1], chapterId: match[2] } : null;
}

async function showSolution() {
  const position = currentLibraryPosition;
  if (!position) {
    showMessage('Choisissez d’abord une position dans la bibliothèque.', 'info');
    return;
  }
  if (!position.url) {
    showMessage('Aucune solution enregistrée pour cette position.', 'info');
    return;
  }
  const ids = parseStudyUrl(position.url);
  if (!ids) {
    showMessage('L’adresse du chapitre Lichess n’est pas reconnue : ' + position.url, 'error');
    return;
  }
  if (solutionBusy) return;

  let pgn = solutionCache.get(position.url);
  if (!pgn) {
    solutionBusy = true;
    showMessage('Chargement de la solution…', 'info');
    try {
      const response = await fetch(
        'https://lichess.org/api/study/' + ids.studyId + '/' + ids.chapterId + '.pgn?comments=true&variations=true&clocks=false',
      );
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'chapitre introuvable ou étude privée' : 'erreur ' + response.status);
      }
      pgn = await response.text();
      solutionCache.set(position.url, pgn);
    } catch (error) {
      showMessage('Solution inaccessible (' + (error.message || 'connexion impossible') + ').', 'error');
      return;
    } finally {
      solutionBusy = false;
    }
  }

  pgnInput.value = pgn.replace(/\s+/g, ' ').trim();
  lastPgn = pgnInput.value;
  if (loadPgn(pgn, { fromSolution: true })) setPositionTitle(position.title); // on garde le titre de la bibliothèque
}

$('#solution-btn').addEventListener('click', showSolution);

// ==================================================
// MESSAGES
// ==================================================

let messageTimer = null;

function showMessage(text, kind = 'error', target = messageElement) {
  hideMessage();
  target.textContent = text;
  target.className = 'message' + (kind === 'info' ? ' info' : '');
  clearTimeout(messageTimer);
  messageTimer = setTimeout(hideMessage, 7000);
}

function hideMessage() {
  messageElement.textContent = '';
  pgnMessage.textContent = '';
}

function setStatus(text) {
  statusElement.textContent = text;
}

// ==================================================
// COORDONNÉES ET INDICATEURS DU TRAIT
// ==================================================

function updateCoordinates() {
  const white = ground.state.orientation === 'white';
  const ranks = white ? '87654321' : '12345678';
  const files = white ? 'abcdefgh' : 'hgfedcba';
  $('.rank-labels').innerHTML = [...ranks].map((c) => `<span>${c}</span>`).join('');
  $('.file-labels').innerHTML = [...files].map((c) => `<span>${c}</span>`).join('');
}

// ==================================================
// ÉDITION : CHAMP FEN
// ==================================================

function syncEditorFen() {
  const placement = ground.getFen();
  const grid = placementToGrid(placement);
  const castling = grid ? sanitizeCastling(grid, editMeta.castling) : '-';
  fenInput.value = buildFen(placement, editMeta.turn, castling, editMeta.half, editMeta.full);
  lastFenText = fenInput.value; // texte écrit par l'application : ne doit pas être relu comme une saisie
  fenInput.classList.remove('invalid');
}

let lastFenText = '';

function applyFenField(options = {}) {
  const text = fenInput.value.trim();
  if (!options.force && text === lastFenText) return false; // simple écho de ce que l'application a écrit
  if (!text) {
    fenInput.classList.remove('invalid');
    return false;
  }
  if (locked && text === game.fen()) return false; // rien n'a changé : on reste en partie

  const parsed = parseFen(text);
  if (!parsed) {
    fenInput.classList.add('invalid');
    showMessage('Ce code FEN n’est pas reconnu.');
    return false;
  }

  hideMessage();
  if (locked) leaveGame();
  currentLibraryPosition = options.libraryPosition || null; // un FEN saisi à la main n'a ni solution ni indice

  const grid = placementToGrid(parsed.placement);
  editMeta = {
    turn: parsed.turn,
    castling: sanitizeCastling(grid, parsed.castling),
    half: parsed.half,
    full: parsed.full,
  };

  ground.set({ fen: parsed.placement });
  resetMarks();
  discardSuspendedIfModified();
  syncEditorFen();
  setPositionTitle(options.title);

  // le FEN indique le trait : la partie démarre aussitôt (cliquer sur le bouton Trait
  // sélectionné ramène à l'édition, l'autre bouton change le trait)
  if (parsed.hasTurn) {
    if (!playerSide) setPlayerSide('analysis');
    startPosition(parsed.turn);
  }
  return true;
}

fenInput.addEventListener('change', () => applyFenField());
fenInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') applyFenField();
});
fenInput.addEventListener('paste', () => setTimeout(() => applyFenField(), 0));

setupSettings({
  button: $('#settings-btn'),
  menu: $('#settings-menu'),
  notation: $('#notation'),
  pieceUrl: (code) => asset('pieces/alpha/' + code + '.svg'),
});

setupLibrary({
  button: $('#library-btn'),
  menu: $('#library-menu'),
  onSelect: (position) => {
    // chaque position chargée repart en mode « analyse » (Roi bicolore), même si l'on jouait un camp contre Stockfish
    setPlayerSide('analysis');
    fenInput.value = position.fen;
    applyFenField({ title: position.title, force: true, libraryPosition: position });
  },
});

// ==================================================
// CHAMP PGN : afficher une partie ou une position
// ==================================================
//
// Le texte est lu avec ses variantes ; il s'ouvre en mode analyse.
// Avec un en-tête [FEN] on affiche la position de départ, sinon la fin de la partie.
// ==================================================

let lastPgn = '';

function loadPgn(raw, options = {}) {
  const text = String(raw || '').trim();
  if (!text) {
    pgnInput.classList.remove('invalid');
    return false;
  }

  const result = parsePgn(text, Chess);
  if (!result.root) {
    pgnInput.classList.add('invalid');
    showMessage(result.error || 'PGN illisible.', 'error', pgnMessage);
    return false;
  }
  pgnInput.classList.remove('invalid');
  if (!options.fromSolution) currentLibraryPosition = null; // un PGN collé n'est plus la position de la bibliothèque

  cancelPromotion();
  invalidate();
  setPlayerSide('analysis'); // consulter une partie : les deux camps, sans Stockfish

  resetMarks();
  currentStartFen = result.startFen;
  rootNode = result.root;
  collapseSecondaryVariations(rootNode);
  suspended = null;
  const target = result.hasFen ? result.root : result.endNode;
  if (!rebuildGameToNode(target)) {
    showMessage('Impossible d’afficher cette position.', 'error', pgnMessage);
    return false;
  }
  currentNode = target;

  locked = true;
  document.body.classList.add('locked');
  applyLockedBoardConfig();
  fenInput.classList.remove('invalid');
  setPositionTitle(result.title);
  afterPosition();

  if (result.error) showMessage(result.error + ' Les coups précédents sont affichés.', 'error', pgnMessage);
  else showMessage(result.moveCount + (result.moveCount > 1 ? ' coups lus' : ' coup lu') + (result.hasFen ? ' (position de départ affichée)' : ' (fin de partie affichée)'), 'info', pgnMessage);
  return true;
}

pgnInput.addEventListener('paste', (event) => {
  const raw = event.clipboardData ? event.clipboardData.getData('text') : '';
  if (!raw) return;
  event.preventDefault(); // un champ d'une ligne perdrait les retours à la ligne du PGN
  pgnInput.value = raw.replace(/\s+/g, ' ').trim();
  lastPgn = pgnInput.value;
  loadPgn(raw);
});
pgnInput.addEventListener('change', () => {
  if (pgnInput.value.trim() === lastPgn) return;
  lastPgn = pgnInput.value.trim();
  loadPgn(pgnInput.value);
});
pgnInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  lastPgn = pgnInput.value.trim();
  loadPgn(pgnInput.value);
});

// ==================================================
// START : FIGER LA POSITION / REVENIR À L'ÉDITION
// ==================================================

/** Contrôle de légalité : le camp qui n'a pas le trait ne doit pas être en échec. */
function legalityError(placement, turn) {
  const other = turn === 'w' ? 'b' : 'w';
  const probe = new Chess();
  if (!probe.load(buildFen(placement, other))) return 'Cette position n’est pas valide.';
  if (probe.in_check()) {
    return 'Position illégale : le camp qui n’a pas le trait est en échec.';
  }
  return null;
}

/**
 * Indicateur de trait (disposition paysage) : disque blanc dans le prolongement de la rangée 1,
 * ou disque noir dans celui de la rangée 8.
 */
function updateTurnDisc() {
  const disc = $('#turn-disc');
  const other = $('#turn-disc-b');
  if (!disc || !other) return;
  if (!locked) {
    // aucune position : les deux disques, blanc en haut et noir en bas
    disc.className = 'turn-disc white at-top';
    other.className = 'turn-disc black at-bottom';
    return;
  }
  other.className = 'turn-disc';
  const white = game.turn() === 'w';
  const flipped = ground.state.orientation === 'black';
  const atTop = white ? flipped : !flipped;
  disc.className = 'turn-disc ' + (white ? 'white' : 'black') + (atTop ? ' at-top' : ' at-bottom');
}

function updateStartButtons() {
  updateTurnDisc();
  $('.clock').dataset.turn = locked ? game.turn() : editMeta.turn; // le bouton du camp au trait est relevé
  for (const turn of ['w', 'b']) {
    const active = locked && game.turn() === turn;
    const name = turn === 'w' ? 'Les Blancs' : 'Les Noirs';
    startButtons[turn].classList.toggle('active', active);
    startButtons[turn].setAttribute('aria-pressed', active ? 'true' : 'false');
    startButtons[turn].title = active ? name + ' ont le trait' : 'Donner le trait aux ' + name.slice(4);
  }
}

/**
 * Change le trait depuis la position affichée : le camp qui devait jouer « passe »
 * (coup nul « -- ») et l'historique est conservé dans une sous-variante entre crochets.
 */
function changeTrait(turn) {
  if (turn === game.turn()) return;
  cancelPromotion();

  const parts = game.fen().split(' ');
  const passing = game.turn();
  const error = legalityError(parts[0], turn);
  if (error) {
    showMessage(error);
    return;
  }

  const half = (parseInt(parts[4] || '0', 10) || 0) + 1;
  const full = (parseInt(parts[5] || '1', 10) || 1) + (passing === 'b' ? 1 : 0);
  const nullFen = buildFen(parts[0], turn, parts[2], half, full);
  if (!game.load(nullFen)) {
    showMessage('Cette position n’est pas valide.');
    syncBoard();
    return;
  }
  hideMessage();

  const nullMove = { color: passing, from: null, to: null, san: '--', promotion: null, nullMove: true };
  let child = findChild(currentNode, nullMove);
  if (!child) {
    child = { parent: currentNode, move: nullMove, source: 'trait', children: [], fen: game.fen(), selectedChild: null, comment: null };
    currentNode.children.push(child);
  }
  currentNode.selectedChild = child;
  currentNode = child;
  child.fen = game.fen();
  afterPosition();
}

/** Clic sur un disque de la pendule : seul le disque du camp qui n'a pas le trait agit (le même camp rejoue). */
function onStartClick(turn) {
  if (!locked) {
    showMessage('Choisissez d’abord une position avec le dossier.', 'info');
    return;
  }
  if (game.turn() !== turn) changeTrait(turn);
}

/** Démarre la partie sur la position affichée (chargée depuis la bibliothèque), avec le trait indiqué. */
function startPosition(turn) {
  const placement = ground.getFen();
  const grid = placementToGrid(placement);
  const error = (grid && validateStructure(grid)) || legalityError(placement, turn);
  if (error) {
    showMessage(error);
    return;
  }

  hideMessage();
  const castling = sanitizeCastling(grid, editMeta.castling);
  const fen = buildFen(placement, turn, castling, editMeta.half, editMeta.full);
  if (!game.load(fen)) {
    showMessage('Cette position n’est pas valide.');
    return;
  }

  enterGame(game.fen());
}

/** Réglages de l'échiquier en mode partie. */
function applyLockedBoardConfig() {
  ground.set({
    highlight: { lastMove: true, check: true },
    draggable: { enabled: true, deleteOnDropOff: false },
    selectable: { enabled: !marks.isActive() },
    movable: { free: false, showDests: true },
  });
}

/** Passe en mode partie à partir d'un FEN (nouvelle racine, variantes effacées). */
function enterGame(fen) {
  game.load(fen);
  currentStartFen = game.fen();
  rootNode = createRoot();
  currentNode = rootNode;
  suspended = null;
  locked = true;
  document.body.classList.add('locked');

  applyLockedBoardConfig();
  fenInput.classList.remove('invalid');
  afterPosition();
}

/** Retour au mode édition, sur la position EN COURS (les coups restent affichés). */
function leaveGame() {
  invalidate();
  const parts = game.fen().split(' ');
  const grid = placementToGrid(parts[0]);
  editMeta = {
    turn: parts[1],
    castling: sanitizeCastling(grid, parts[2]),
    half: parseInt(parts[4] || '0', 10) || 0,
    full: parseInt(parts[5] || '1', 10) || 1,
  };
  suspended = { placement: parts[0] };

  locked = false;
  document.body.classList.remove('locked');
  pendingPromotion = null;
  hidePromotion();

  ground.set({
    fen: parts[0],
    lastMove: null,
    check: false,
    turnColor: 'white',
    highlight: { lastMove: false, check: false },
    draggable: { enabled: true, deleteOnDropOff: true },
    selectable: { enabled: false },
    movable: { free: true, color: 'both', showDests: false, dests: new Map() },
  });
  ground.cancelMove();
  ground.setAutoShapes([]);

  updateStartButtons();
  updateMoves();
  updateNavigation();
  updateZoneAvailability();
  clearZone();
  clearEvaluation();
  syncEditorFen();
  setStatus('Position éditable');
}

// ==================================================
// ARBRE DES COUPS (repris de cc2)
// ==================================================

function createRoot() {
  return { parent: null, move: null, source: 'root', children: [], fen: game.fen(), selectedChild: null, comment: null };
}

function createNode(parent, move, source) {
  return {
    parent,
    move: { color: move.color, from: move.from, to: move.to, san: move.san, promotion: move.promotion || null, nullMove: false },
    source,
    children: [],
    fen: game.fen(),
    selectedChild: null,
    comment: null,
  };
}

function findChild(node, move) {
  return node.children.find(
    (child) =>
      child.move.from === move.from && child.move.to === move.to && (child.move.promotion || null) === (move.promotion || null),
  );
}

function getPath(node) {
  const path = [];
  for (let current = node; current && current.parent; current = current.parent) path.unshift(current);
  return path;
}

function getMainChild(node) {
  return node && node.children.length > 0 ? node.children[0] : null;
}

function rebuildGameToNode(node) {
  if (!game.load(currentStartFen)) return false;
  for (const child of getPath(node)) {
    if (child.move.nullMove) {
      if (!game.load(child.fen)) return false;
      continue;
    }
    const move = game.move({ from: child.move.from, to: child.move.to, promotion: child.move.promotion || 'q' });
    if (!move) return false;
  }
  return true;
}

function getLastMoveSquares() {
  return currentNode && currentNode.move && !currentNode.move.nullMove ? [currentNode.move.from, currentNode.move.to] : [];
}

function terminationComment() {
  if (game.in_checkmate()) return 'Mat';
  if (game.in_stalemate()) return 'Pat';
  if (game.insufficient_material()) return 'Nulle - Matériel';
  if (game.in_threefold_repetition()) return 'Nulle - Répétition';
  if (parseInt(game.fen().split(' ')[4] || '0', 10) >= 100) return 'Nulle - 50 coups';
  return 'Partie terminée';
}

function commitMove(move, source) {
  let child = findChild(currentNode, move);
  if (!child) {
    child = createNode(currentNode, move, source);
    currentNode.children.push(child);
  }
  currentNode.selectedChild = child;
  currentNode = child;
  child.fen = game.fen();
  if (game.game_over()) child.comment = terminationComment();
  afterPosition();
}

function showNode(node) {
  if (!locked) return;
  cancelPromotion();
  if (!rebuildGameToNode(node)) return;
  currentNode = node;
  afterPosition();
}

// ==================================================
// RÈGLES DE JEU
// ==================================================

const isAnalysisMode = () => playerSide === 'analysis';
const playerColor = () => (isAnalysisMode() ? 'both' : playerSide);

function isPlayerTurn() {
  if (isAnalysisMode()) return true;
  return playerSide === 'white' ? game.turn() === 'w' : game.turn() === 'b';
}

function canUserMove() {
  return locked && !thinking && !pendingPromotion && !game.game_over() && isPlayerTurn();
}

function getDests() {
  const dests = new Map();
  for (const move of game.moves({ verbose: true })) {
    if (!dests.has(move.from)) dests.set(move.from, []);
    dests.get(move.from).push(move.to);
  }
  return dests;
}

/** Annule tout calcul en cours : à appeler à chaque changement de position. */
function invalidate() {
  moveToken++;
  evalId++;
  thinking = false;
  engine.cancel();
  resetAnalysis();
}

/** Cercles et flèches fournis par le PGN pour la position affichée. */
function syncShapes() {
  const shapes = locked && currentNode && currentNode.shapes ? currentNode.shapes : [];
  ground.setAutoShapes(shapes.map((shape) => ({ orig: shape.orig, dest: shape.dest, brush: shape.brush })));
}

/** Aligne l'échiquier sur la position de chess.js. */
function syncBoard() {
  const turn = game.turn() === 'w' ? 'white' : 'black';
  ground.set({
    fen: game.fen(),
    turnColor: turn,
    lastMove: getLastMoveSquares(),
    check: game.in_check() ? turn : false,
    movable: { free: false, color: playerColor(), showDests: true, dests: canUserMove() ? getDests() : new Map() },
  });
}

/** Tout ce qui doit être rafraîchi après un changement de position. */
function afterPosition() {
  invalidate();
  for (let node = currentNode; node; node = node.parent) node.collapsed = false; // la position affichée reste visible
  syncBoard();
  syncShapes();
  updateMoves();
  updateNavigation();
  updateStartButtons();
  updateZoneAvailability();
  clearZone();
  fenInput.value = game.fen();
  lastFenText = fenInput.value;
  fenInput.classList.remove('invalid');

  const engineToMove = !game.game_over() && !isAnalysisMode() && !isPlayerTurn();

  if (game.game_over()) {
    setStatus((currentNode && currentNode.comment) || terminationComment());
  } else if (isAnalysisMode()) {
    setStatus('Mode analyse');
  } else {
    setStatus(engineToMove ? 'Stockfish va jouer' : 'À vous de jouer');
  }

  requestEvaluation({ tablebaseOnly: engineToMove });
  if (engineToMove) askStockfish();
}

// ==================================================
// COUP DU JOUEUR ET PROMOTION
// ==================================================

function isPromotionMove(from, to) {
  const piece = game.get(from);
  return Boolean(piece && piece.type === 'p' && (to[1] === '8' || to[1] === '1'));
}

function playerMove(orig, dest) {
  if (thinking || pendingPromotion || !isPlayerTurn()) {
    syncBoard();
    return;
  }
  if (isPromotionMove(orig, dest)) {
    showPromotionChoice(orig, dest);
    return;
  }
  const move = game.move({ from: orig, to: dest });
  if (!move) {
    syncBoard();
    return;
  }
  commitMove(move, isAnalysisMode() ? 'analysis' : 'player');
}

function showPromotionChoice(from, to) {
  pendingPromotion = { from, to, color: game.turn() };
  ground.set({ movable: { dests: new Map() } });

  const choices = $('#promotion-choices');
  choices.innerHTML = '';
  for (const [type, title] of [['q', 'Dame'], ['r', 'Tour'], ['b', 'Fou'], ['n', 'Cavalier']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'promotion-piece';
    button.title = title;
    button.setAttribute('aria-label', title);
    const image = document.createElement('img');
    image.src = asset('pieces/alpha/' + pendingPromotion.color + type.toUpperCase() + '.svg');
    image.alt = title;
    button.appendChild(image);
    button.addEventListener('click', () => completePromotion(type));
    choices.appendChild(button);
  }
  const modal = $('#promotion-modal');
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
}

function hidePromotion() {
  const modal = $('#promotion-modal');
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  $('#promotion-choices').innerHTML = '';
}

function cancelPromotion() {
  pendingPromotion = null;
  hidePromotion();
}

function completePromotion(promotion) {
  if (!pendingPromotion) return;
  const { from, to } = pendingPromotion;
  cancelPromotion();
  const move = game.move({ from, to, promotion });
  if (!move) {
    syncBoard();
    return;
  }
  commitMove(move, isAnalysisMode() ? 'analysis' : 'player');
}

$('#promotion-cancel').addEventListener('click', () => {
  cancelPromotion();
  if (locked) syncBoard();
});

// ==================================================
// STOCKFISH JOUE (tables de finales en premier, comme dans cc2)
// ==================================================

function findImmediateCheckmate() {
  for (const candidate of game.moves({ verbose: true })) {
    const replay = new Chess();
    replay.load(game.fen());
    const move = replay.move({ from: candidate.from, to: candidate.to, promotion: candidate.promotion });
    if (move && replay.in_checkmate()) return candidate.from + candidate.to + (candidate.promotion || '');
  }
  return null;
}

async function bestTablebaseMove(fen) {
  if (!isCovered(fen)) return null;
  try {
    const data = await getTablebase(fen);
    const first = data.moves.find((move) => move && move.uci);
    return first ? first.uci : null;
  } catch (error) {
    return null; // hors ligne ou position non couverte : Stockfish prend le relais
  }
}

async function askStockfish() {
  if (isAnalysisMode() || game.game_over()) return;

  thinking = true;
  const token = ++moveToken;
  const fen = game.fen();
  const sideToMove = game.turn();
  updateMoves();
  syncBoard();
  setStatus('Stockfish réfléchit…');

  const mate = findImmediateCheckmate();
  if (mate) {
    playEngineMove(mate, token);
    return;
  }

  const tablebaseMove = await bestTablebaseMove(fen);
  if (token !== moveToken) return;
  if (tablebaseMove) {
    playEngineMove(tablebaseMove, token);
    return;
  }

  engine.search({
    fen,
    depth: 20,
    movetime: 20000,
    onInfo: (line) => showEngineEvaluation(line, sideToMove, token),
    onBest: (uci) => playEngineMove(uci, token),
  });
}

function playEngineMove(uci, token) {
  if (token !== moveToken || !thinking || isAnalysisMode()) return;
  const move = game.move({
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    promotion: uci.length > 4 ? uci.slice(4, 5) : undefined,
  });
  thinking = false;
  if (!move) {
    syncBoard();
    updateMoves();
    return;
  }
  commitMove(move, 'stockfish');
}

// ==================================================
// ÉVALUATION (gélule) : Stockfish + tables de finales
// ==================================================

function setHead(text, sub) {
  evalHead.innerHTML = text ? escapeHtml(text) + (sub ? `<span class="sub">${escapeHtml(sub)}</span>` : '') : '';
}

function clearEvaluation() {
  evalId++;
  tbList = null;
  panelWanted = null;
  updateAnalysis();
  evalHead.innerHTML = '';
  evalMoves.innerHTML = '';
}

function showEngineEvaluation(line, sideToMove, token) {
  if (!evalOn || token !== moveToken) return;
  const text = evaluationFromInfo(line, sideToMove);
  if (!text) return;
  const depth = depthFromInfo(line);
  setHead(text, 'Stockfish' + (depth ? ' · profondeur ' + depth : ''));
}

function describeTablebase(tb, fen) {
  const side = fen.split(' ')[1] === 'w' ? 'white' : 'black';
  const other = side === 'white' ? 'black' : 'white';

  if (tb.checkmate) return { text: side === 'white' ? '0-1' : '1-0', sub: 'Mat' };
  if (tb.stalemate) return { text: '0.00', sub: 'Pat · Nulle' };

  switch (tb.category) {
    case 'draw':
      return { text: '0.00', sub: 'Nulle · tablebases' };
    case 'cursed-win':
    case 'blessed-loss':
      return { text: '0.00', sub: 'Nulle · règle des 50 coups' };
    case 'win':
    case 'loss': {
      const winner = tb.category === 'win' ? side : other;
      const label = winner === 'white' ? 'Blancs gagnent' : 'Noirs gagnent';
      if (Number.isFinite(tb.dtm) && tb.dtm !== 0) {
        return { text: mateText(winner, tb.dtm), sub: label + ' · tablebases' };
      }
      return { text: label, sub: 'Tablebases', winner, label };
    }
    default:
      return null; // résultat inconnu : Stockfish reste l'évaluation de secours
  }
}

async function requestEvaluation({ tablebaseOnly = false } = {}) {
  const id = ++evalId;
  tbList = null;
  panelWanted = null;
  evalHead.innerHTML = '';
  evalMoves.innerHTML = '';

  if (!evalOn || !locked) {
    updateAnalysis();
    return;
  }

  const fen = game.fen();
  const sideToMove = game.turn();

  if (game.game_over()) {
    if (game.in_checkmate()) setHead(sideToMove === 'w' ? '0-1' : '1-0', 'Mat');
    else setHead('0.00', 'Nulle');
    return;
  }

  let tb = null;
  if (isCovered(fen)) {
    try {
      tb = await getTablebase(fen);
    } catch (error) {
      tb = null;
    }
    if (id !== evalId) return;
  }

  const described = tb && describeTablebase(tb, fen);

  if (described) {
    setHead(described.text, described.sub);
    tbList = annotateMoves(game, tb);
    renderTablebaseMoves();

    if (described.winner) {
      // pas de DTM dans les tables : on suit la ligne principale jusqu'au mat
      const mate = await getMainlineMate(fen, described.winner);
      if (id === evalId && mate) setHead(mate, described.label + ' · tablebases');
    }
    return;
  }

  if (tb) {
    tbList = annotateMoves(game, tb);
    renderTablebaseMoves();
  }

  if (!tablebaseOnly) {
    // Stockfish évalue chaque coup légal (MultiPV) : en-tête et liste viennent de la même recherche
    panelWanted = { key: 'panel|' + fen, fen, ucis: legalUcis(), restrict: false, depth: PANEL_DEPTH, movetime: PANEL_MOVETIME };
    renderAnalysis();
    updateAnalysis();
  }
}

function verdictText(move) {
  if (move.outcome === null) return '<small>inconnu</small>';
  if (move.outcome === 'draw') return move.fifty ? 'Nulle <small>(50 coups)</small>' : 'Nulle';

  // « Blancs gagnent » / « Blancs perdent » : le sujet est le camp qui joue le coup
  const side = move.color === 'w' ? 'Blancs' : 'Noirs';
  let text = side + (move.outcome === 'win' ? ' gagnent' : ' perdent');
  if (move.dtm !== null && move.dtm !== 0) {
    // dtm : demi-coups mesurés après le coup, du point de vue de l'adversaire
    text += ` <small>#${Math.ceil((Math.abs(move.dtm) + 1) / 2)}</small>`;
  }
  return text;
}

function renderTablebaseMoves() {
  if (!tbList || tbList.length === 0) {
    evalMoves.innerHTML = '';
    return;
  }

  const playable = canUserMove();
  const table = document.createElement('table');
  table.className = 'tb-list';

  for (const move of tbList) {
    const row = document.createElement('tr');
    row.className = 'tb-row ' + (move.outcome || 'unknown') + (playable ? ' playable' : '');
    row.title = 'Résultat théorique après ce coup (tablebases)';

    const sanCell = document.createElement('td');
    const converted = convertSan(move.san, move.color === 'w' ? 'white' : 'black');
    if (notationMode() === 'figurines') sanCell.innerHTML = converted;
    else sanCell.textContent = converted;

    const verdictCell = document.createElement('td');
    verdictCell.className = 'verdict';
    verdictCell.innerHTML = verdictText(move);

    row.append(sanCell, verdictCell);
    if (playable) {
      row.addEventListener('click', () => {
        if (!canUserMove()) return;
        const played = game.move({ from: move.from, to: move.to, promotion: move.promotion || undefined });
        if (played) commitMove(played, isAnalysisMode() ? 'analysis' : 'player');
      });
    }
    table.appendChild(row);
  }

  evalMoves.innerHTML = '';
  evalMoves.appendChild(table);
}

evalPill.addEventListener('click', () => {
  evalOn = !evalOn;
  evalPill.classList.toggle('active', evalOn);
  evalPill.setAttribute('aria-expanded', evalOn ? 'true' : 'false');
  evalPill.title = evalOn ? 'Masquer l’évaluation' : 'Afficher l’évaluation';

  if (!evalOn) {
    if (!thinking) engine.cancel();
    clearEvaluation();
    return;
  }
  if (!locked) {
    showMessage('Choisissez le camp au trait (boutons Trait) pour évaluer la position.', 'info');
    return;
  }
  // pendant que Stockfish joue, son calcul alimente déjà l'évaluation
  requestEvaluation({ tablebaseOnly: thinking });
});

// ==================================================
// WINNING ZONE
// ==================================================

function zoneAvailable() {
  // en analyse : toujours ; en partie contre Stockfish : quand c'est à vous de jouer
  return locked && !game.game_over() && (isAnalysisMode() || isPlayerTurn());
}

function updateZoneAvailability() {
  zoneButton.classList.toggle('active', zoneOn);
  zoneButton.setAttribute('aria-pressed', zoneOn ? 'true' : 'false');
  zoneButton.classList.toggle('unavailable', !zoneAvailable());
}

function clearZone() {
  zoneSig = '';
  zoneCells.clear();
  zoneLayer.innerHTML = '';
  if (zoneWanted) {
    zoneWanted = null;
    updateAnalysis();
  }
}

/**
 * Cases que la pièce choisie pourrait occuper « si on pouvait la poser » :
 * toutes les cases de l'échiquier, sauf pour le Fou (cases de sa couleur)
 * et le Pion (sa colonne, rangées 2 à 7).
 */
function candidateSquares(selected, piece) {
  const squares = [];
  const selFile = selected.charCodeAt(0) - 97;
  const selRank = parseInt(selected[1], 10) - 1;
  for (let file = 0; file < 8; file++) {
    for (let rank = 0; rank < 8; rank++) {
      if (file === selFile && rank === selRank) continue;
      if (piece.type === 'b' && (file + rank) % 2 !== (selFile + selRank) % 2) continue;
      if (piece.type === 'p' && (file !== selFile || rank === 0 || rank === 7)) continue;
      squares.push('abcdefgh'[file] + (rank + 1));
    }
  }
  return squares;
}

/**
 * Position obtenue en posant la pièce sur `target`, trait à l'adversaire.
 * Renvoie null si cette position est impossible (case occupée par une pièce
 * du même camp ou par le Roi adverse, Roi du joueur en échec, etc.).
 */
function hypotheticalFen(selected, target) {
  const mover = game.turn();
  const opponent = mover === 'w' ? 'b' : 'w';
  const grid = placementToGrid(game.fen().split(' ')[0]);
  const at = (square) => [8 - parseInt(square[1], 10), square.charCodeAt(0) - 97];

  const [sr, sf] = at(selected);
  const letter = grid[sr][sf];
  grid[sr][sf] = '';

  const [tr, tf] = at(target);
  const occupant = grid[tr][tf];
  if (occupant) {
    const occupantIsWhite = occupant === occupant.toUpperCase();
    if (occupantIsWhite === (mover === 'w')) return null; // pièce du même camp
    if (occupant.toLowerCase() === 'k') return null; // Roi adverse
  }
  grid[tr][tf] = letter;

  const placement = gridToPlacement(grid);
  // le joueur ne doit pas être en échec une fois la pièce posée
  const probe = new Chess();
  if (!probe.load(buildFen(placement, mover)) || probe.in_check()) return null;

  return buildFen(placement, opponent);
}

/** Résultat pour le joueur : 'win' | 'draw' | 'loss' | null. */
async function hypotheticalOutcome(fen) {
  const probe = new Chess();
  if (!probe.load(fen)) return null;
  if (probe.in_checkmate()) return 'win';
  if (probe.in_stalemate() || probe.insufficient_material()) return 'draw';

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const data = await getTablebase(fen);
      return moveOutcomeOf(data); // la catégorie de la position vaut pour l'adversaire
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
    }
  }
  return null;
}

const zoneCells = new Map(); // case → élément coloré

function setZoneCell(square, outcome) {
  const known = zoneCells.get(square);
  if (known) {
    known.className = 'zone-cell ' + outcome;
    return;
  }
  addZoneCell(square, outcome);
}

function addZoneCell(square, outcome) {
  const white = ground.state.orientation === 'white';
  const file = square.charCodeAt(0) - 97;
  const rank = parseInt(square[1], 10) - 1;
  const cell = document.createElement('div');
  cell.className = 'zone-cell ' + outcome;
  cell.dataset.square = square;
  cell.style.left = (white ? file : 7 - file) * 12.5 + '%';
  cell.style.top = (white ? 7 - rank : rank) * 12.5 + '%';
  zoneLayer.appendChild(cell);
  zoneCells.set(square, cell);
}

const ZONE_CONCURRENCY = 4;
// ==================================================
// ANALYSE STOCKFISH PAR COUP (MultiPV) : panneau et zones
// ==================================================
//
// Une seule recherche donne l'évaluation de chaque coup légal (ou de ceux de
// la pièce choisie, avec « searchmoves »). Le panneau d'évaluation et les
// couleurs de la zone lisent les mêmes valeurs : ils sont donc cohérents.
// ==================================================

const PANEL_DEPTH = 18; // tous les coups légaux
const PANEL_MOVETIME = 15000;
const ZONE_DEPTH = 22; // coups de la pièce choisie : moins de lignes, donc plus profond
const ZONE_MOVETIME = 15000;
const MAX_LINES = 40;

let analysisEngine = null; // second Stockfish, réservé à l'analyse (créé à la demande)
const analysisCache = new Map(); // fen → Map(coup UCI → { score, depth }), score du point de vue du joueur
let analysisRunning = null; // clé de la recherche en cours
const analysisFinished = new Set();
let panelWanted = null;
let zoneWanted = null;
let renderTimer = null;

function getAnalysisEngine() {
  if (!analysisEngine) analysisEngine = new Engine(asset('stockfish/stockfish-18-lite-single.js'));
  return analysisEngine;
}

const legalUcis = () => game.moves({ verbose: true }).map(uciOf);

function resetAnalysis() {
  if (analysisEngine) analysisEngine.cancel();
  analysisRunning = null;
  analysisFinished.clear();
  panelWanted = null;
  zoneWanted = null;
}

/** Classe un score (point de vue du joueur) selon le code couleur de la zone. */
function classifyScore(score) {
  if (score.mate !== undefined) return score.mate > 0 ? 'win' : 'loss';
  const cp = score.cp;
  if (cp === 0) return 'draw'; // jaune : 0.00
  if (cp >= 100) return 'win'; // vert : +1.00 ou plus
  if (cp > 0) return 'plus'; // bleu : entre 0.00 et +1.00
  if (cp <= -100) return 'loss'; // rose : -1.00 ou moins
  return 'minus'; // orange : entre -1.00 et 0.00
}

function recordInfo(fen, info) {
  if (!analysisCache.has(fen)) analysisCache.set(fen, new Map());
  const entries = analysisCache.get(fen);
  const known = entries.get(info.move);
  if (known && known.depth > info.depth) return false;
  entries.set(info.move, { score: info.score, depth: info.depth });
  return true;
}

/** Choisit la recherche à mener : la zone d'abord, sinon le panneau. */
function updateAnalysis() {
  const job = [zoneWanted, panelWanted].find((candidate) => candidate && !analysisFinished.has(candidate.key));

  if (!job) {
    if (analysisRunning && analysisEngine) analysisEngine.cancel();
    analysisRunning = null;
    return;
  }
  if (job.key === analysisRunning) return;

  analysisRunning = job.key;
  getAnalysisEngine().search({
    fen: job.fen,
    multipv: Math.min(job.ucis.length, MAX_LINES),
    searchmoves: job.restrict ? job.ucis : undefined,
    depth: job.depth,
    movetime: job.movetime,
    onInfo: (line) => {
      const info = parseInfo(line);
      if (info && recordInfo(job.fen, info)) scheduleRender();
    },
    onBest: () => {
      if (analysisRunning !== job.key) return;
      analysisRunning = null;
      analysisFinished.add(job.key);
      renderAnalysis();
      updateAnalysis(); // reprend la recherche du panneau si la zone l'avait interrompue
    },
  });
}

function scheduleRender() {
  if (renderTimer) return;
  renderTimer = setTimeout(() => {
    renderTimer = null;
    renderAnalysis();
  }, 120);
}

/** Met à jour le panneau et la zone à partir des valeurs mémorisées. */
function renderAnalysis() {
  const fen = game.fen();
  const entries = analysisCache.get(fen);
  if (!entries) return;
  if (zoneWanted && zoneWanted.fen === fen) paintEngineZone(entries);
  if (panelWanted && panelWanted.fen === fen && evalOn) renderEngineMoves(entries);
}

function renderEngineMoves(entries) {
  const turn = game.turn();
  const legal = new Map(game.moves({ verbose: true }).map((move) => [uciOf(move), move]));
  const rows = [...entries]
    .filter(([uci]) => legal.has(uci))
    .map(([uci, entry]) => ({ move: legal.get(uci), score: entry.score, depth: entry.depth }))
    .sort((a, b) => scoreValue(b.score) - scoreValue(a.score));
  if (rows.length === 0) return;

  // en-tête : meilleur coup (même recherche que la liste)
  const depth = Math.max(...rows.map((row) => row.depth));
  setHead(formatScore(rows[0].score, turn), 'Stockfish · profondeur ' + depth);

  const playable = canUserMove();
  const table = document.createElement('table');
  table.className = 'tb-list';
  for (const { move, score, depth: rowDepth } of rows) {
    const row = document.createElement('tr');
    row.className = 'tb-row ' + classifyScore(score) + (playable ? ' playable' : '');
    row.title = 'Évaluation de Stockfish après ce coup (point de vue des Blancs), profondeur ' + rowDepth;

    const sanCell = document.createElement('td');
    const converted = convertSan(move.san, move.color === 'w' ? 'white' : 'black');
    if (notationMode() === 'figurines') sanCell.innerHTML = converted;
    else sanCell.textContent = converted;

    const valueCell = document.createElement('td');
    valueCell.className = 'verdict';
    valueCell.textContent = formatScore(score, turn);

    row.append(sanCell, valueCell);
    if (playable) {
      row.addEventListener('click', () => {
        if (!canUserMove()) return;
        const played = game.move({ from: move.from, to: move.to, promotion: move.promotion || undefined });
        if (played) commitMove(played, isAnalysisMode() ? 'analysis' : 'player');
      });
    }
    table.appendChild(row);
  }
  evalMoves.innerHTML = '';
  evalMoves.appendChild(table);
}

/** Zone Stockfish : meilleure évaluation parmi les coups menant à chaque case. */
function paintEngineZone(entries) {
  const best = new Map();
  for (const [uci, entry] of entries) {
    if (!zoneWanted.ucis.includes(uci)) continue;
    const square = uci.slice(2, 4);
    const known = best.get(square);
    if (!known || scoreValue(entry.score) > scoreValue(known)) best.set(square, entry.score);
  }
  for (const [square, score] of best) setZoneCell(square, classifyScore(score));
}

/** Avec tablebases : cases accessibles d'abord (une seule requête), puis toutes les autres. */
async function tablebaseZone(selected, piece, signature, tb) {
  const painted = new Set();

  // 1. Cases directement accessibles : résultats déjà fournis par la position courante.
  const direct = new Map();
  for (const move of tb.moves) {
    if (move.uci.slice(0, 2) !== selected) continue;
    const outcome = moveOutcomeOf(move);
    if (!outcome) continue;
    const square = move.uci.slice(2, 4);
    const known = direct.get(square);
    if (!known || OUTCOME_PRIORITY[outcome] > OUTCOME_PRIORITY[known]) direct.set(square, outcome);
  }
  for (const [square, outcome] of direct) {
    addZoneCell(square, outcome);
    painted.add(square);
  }

  // 2. Cases que la pièce ne peut pas atteindre : une requête par position hypothétique.
  const jobs = candidateSquares(selected, piece)
    .filter((square) => !painted.has(square))
    .map((square) => ({ square, fen: hypotheticalFen(selected, square) }))
    .filter((job) => job.fen);

  let failures = 0;
  let next = 0;
  async function worker() {
    while (zoneSig === signature && next < jobs.length) {
      const job = jobs[next++];
      const outcome = await hypotheticalOutcome(job.fen);
      if (zoneSig !== signature) return;
      if (outcome) addZoneCell(job.square, outcome);
      else failures++;
    }
  }
  await Promise.all(Array.from({ length: ZONE_CONCURRENCY }, worker));

  if (zoneSig === signature && failures > 0) {
    showMessage('Tablebases : ' + failures + ' case(s) non évaluée(s) (service indisponible ou saturé).');
  }
}

const OUTCOME_PRIORITY = { win: 3, draw: 2, loss: 1 };

async function refreshZone() {
  const selected = ground.state.selected;
  if (!zoneOn || !zoneAvailable() || !selected) {
    clearZone();
    return;
  }
  const piece = game.get(selected);
  if (!piece || piece.color !== game.turn()) {
    clearZone();
    return;
  }

  const fen = game.fen();
  const signature = selected + '|' + fen + '|' + ground.state.orientation;
  if (signature === zoneSig) return;
  clearZone();
  zoneSig = signature;

  if (isCovered(fen)) {
    let tb = null;
    try {
      tb = await getTablebase(fen);
    } catch (error) {
      tb = null; // service indisponible : on se rabat sur Stockfish
    }
    if (zoneSig !== signature) return;
    if (tb) {
      await tablebaseZone(selected, piece, signature, tb);
      return;
    }
  }

  // Hors tablebases : Stockfish évalue les coups de la pièce choisie
  // (les valeurs déjà connues s'affichent immédiatement)
  const ucis = game.moves({ square: selected, verbose: true }).map(uciOf);
  if (ucis.length === 0) return; // pièce bloquée : rien à évaluer
  zoneWanted = { key: 'zone|' + fen + '|' + selected, fen, ucis, restrict: true, depth: ZONE_DEPTH, movetime: ZONE_MOVETIME };
  renderAnalysis();
  updateAnalysis();
}

function moveOutcomeOf(entry) {
  // la catégorie est donnée du point de vue du camp qui a le trait après le coup
  switch (entry.category) {
    case 'loss':
      return 'win'; // l'adversaire est perdant : zone de gain (vert)
    case 'draw':
    case 'cursed-win':
    case 'blessed-loss':
      return 'draw'; // nulle (jaune)
    case 'win':
      return 'loss'; // l'adversaire gagne : zone de défaite (rose)
    default:
      return null;
  }
}

zoneButton.addEventListener('click', () => {
  zoneOn = !zoneOn;
  updateZoneAvailability();
  clearZone();
  if (zoneOn && !zoneAvailable()) {
    showMessage('Winning Zone : figez la position avec un bouton Trait (mode analyse, ou à vous de jouer en mode Jeu).', 'info');
  }
  refreshZone();
});

// La sélection d'une pièce se fait au clavier/souris/doigt : on la relit après chaque geste.
boardElement.addEventListener('pointerdown', () => setTimeout(refreshZone, 0));
document.addEventListener('pointerup', () => setTimeout(refreshZone, 0));

// ==================================================
// NOTATION (français / figurines / international)
// ==================================================

const notationMode = () => $('#notation').value;

function convertSan(san, color) {
  const mode = notationMode();
  if (mode === 'international') return san;

  if (mode === 'french') {
    const conversion = { K: 'R', Q: 'D', R: 'T', B: 'F', N: 'C' };
    let result = san;
    if (conversion[result.charAt(0)]) result = conversion[result.charAt(0)] + result.substring(1);
    return result.replace(/=([QRBN])/g, (match, piece) => '=' + conversion[piece]);
  }

  // figurines : mêmes SVG « alpha » que l'échiquier
  const prefix = color === 'white' ? 'w' : 'b';
  const makePiece = (piece) =>
    `<img class="notation-piece" src="${asset('pieces/alpha/' + prefix + piece + '.svg')}" alt="${piece}">`;
  let result = String(san);
  if (/^[KQRBN]/.test(result)) result = makePiece(result.charAt(0)) + result.substring(1);
  return result.replace(/=([QRBN])/g, (match, piece) => '=' + makePiece(piece));
}

// ==================================================
// LISTE DES COUPS (repris de cc2)
// ==================================================

function getStartMoveInfo() {
  const parts = currentStartFen.trim().split(/\s+/);
  return { turn: parts[1] || 'w', fullmove: parseInt(parts[5] || '1', 10) || 1 };
}

function getMoveNumber(node) {
  const index = getPath(node).length - 1;
  const start = getStartMoveInfo();
  return start.turn === 'w' ? start.fullmove + Math.floor(index / 2) : start.fullmove + Math.floor((index + 1) / 2);
}

function createMoveButton(node, mainLine) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'move-text ' + (mainLine ? 'main-move' : 'variation-move');
  if (node === currentNode) button.classList.add('current-move');

  const converted = convertSan(node.move.san, node.move.color === 'w' ? 'white' : 'black');
  if (notationMode() === 'figurines') {
    button.classList.add('figurine-notation');
    button.innerHTML = converted;
  } else {
    button.textContent = converted;
  }
  appendNags(button, node);
  button.addEventListener('click', () => showNode(node));
  return button;
}

/**
 * Annotations standard du coup (! ? !? +− = ±…), lues dans le PGN : celles qui jugent le coup sont collées à lui,
 * celles qui évaluent la position viennent après un petit espace. Un même signe n'est affiché qu'une fois.
 */
function appendNags(button, node) {
  const shown = new Set();
  const nags = [...(node.nags || [])].sort((a, b) => Number(isMoveNag(b)) - Number(isMoveNag(a)) || a - b);
  for (const nag of nags) {
    const symbol = NAG_SYMBOLS[nag];
    if (!symbol || shown.has(symbol)) continue;
    shown.add(symbol);
    const span = document.createElement('span');
    span.className = 'nag ' + (isMoveNag(nag) ? 'nag-move' : 'nag-pos') + ' nag-' + nag;
    span.textContent = symbol;
    button.appendChild(span);
  }
}

function addSpace(container) {
  container.appendChild(document.createTextNode(' '));
}

function appendMoveNumber(container, node, forceBlackNumber) {
  const number = getMoveNumber(node);
  if (node.move.color === 'w' || forceBlackNumber) {
    const span = document.createElement('span');
    span.className = 'move-number';
    span.textContent = number + (node.move.color === 'w' ? '. ' : '... ');
    container.appendChild(span);
  }
}

const variationDepthClass = (depth) => 'variation-depth-' + (((depth - 1) % 5) + 1);

/**
 * Au chargement d'un PGN, toutes les variantes secondaires (à tous les niveaux) sont repliées : on ne voit que leur
 * premier coup, avec les boutons ∧ (déployer), flèche verte (remonter) et × (supprimer). Un clic sur le chevron
 * déploie une variante ; ses propres sous-variantes restent repliées.
 */
function collapseSecondaryVariations(node) {
  node.children.forEach((child, index) => {
    if (index > 0) child.collapsed = true;
    collapseSecondaryVariations(child);
  });
}

function promoteVariation(node) {
  if (!node || !node.parent) return;
  const siblings = node.parent.children;
  const index = siblings.indexOf(node);
  if (index <= 0) return;
  [siblings[index - 1], siblings[index]] = [siblings[index], siblings[index - 1]];
  updateMoves();
}

/** Supprime une variante (et ses sous-variantes), après confirmation. */
function deleteVariation(node) {
  if (!node || !node.parent) return;
  if (!window.confirm('Supprimer cette variante et ses sous-variantes ?')) return;

  const parent = node.parent;
  const index = parent.children.indexOf(node);
  if (index < 0) return;

  let inside = false; // la position affichée se trouve-t-elle dans la variante supprimée ?
  for (let n = currentNode; n; n = n.parent) if (n === node) inside = true;

  parent.children.splice(index, 1);
  if (parent.selectedChild === node) parent.selectedChild = parent.children[0] || null;
  if (inside) showNode(parent);
  else updateMoves();
}

function toggleVariation(node) {
  node.collapsed = !node.collapsed;
  updateMoves();
}

const UP_ARROW_ICON =
  '<svg viewBox="0 0 12 12" width="13" height="13" aria-hidden="true"><path d="M6 10.6V2M2.3 5.6 6 1.9l3.7 3.7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function varButton(className, text, title, onClick, html = null) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'var-btn ' + className;
  button.title = title;
  button.setAttribute('aria-label', title);
  if (html) button.innerHTML = html;
  else if (text) button.textContent = text;
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    onClick();
  });
  return button;
}

/**
 * Début d'une sous-variante : chevron bleu (vers le haut = réduire à son premier coup, vers le bas = déployer),
 * flèche verte montante (remonter la variante d'un rang) et « × » rouge (la supprimer). Les trois boutons restent
 * disponibles quand la variante est repliée.
 */
function appendVariationControls(container, node, { canPromote = true } = {}) {
  const collapsed = Boolean(node.collapsed);
  const toggle = varButton(
    'var-toggle ' + (collapsed ? 'collapsed' : 'expanded'),
    '',
    collapsed ? 'Déployer la variante' : 'Réduire la variante à son premier coup',
    () => toggleVariation(node),
  );
  toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  container.appendChild(toggle);

  if (canPromote) {
    container.appendChild(varButton('var-plus', '', 'Remonter cette variante d’un rang', () => promoteVariation(node), UP_ARROW_ICON));
  }
  container.appendChild(varButton('var-delete', '×', 'Supprimer cette variante', () => deleteVariation(node)));
}

/** Variante réduite : seulement son premier coup, suivi de « … » s'il y a une suite. */
function renderCollapsedVariation(node, container) {
  appendMoveNumber(container, node, node.move.color === 'b');
  container.appendChild(createMoveButton(node, false));
  if (node.children.length > 0) {
    const more = document.createElement('span');
    more.className = 'var-more';
    more.textContent = ' …';
    container.appendChild(more);
  }
}

function renderAlternativeGroup(mainNode, container, depth) {
  if (!mainNode || !mainNode.parent) return false;
  const alternatives = mainNode.parent.children.filter((child) => child !== mainNode);
  if (alternatives.length === 0) return false;

  if (depth === 1) container.appendChild(document.createElement('br'));

  const variation = document.createElement('span');
  variation.classList.add('variation', variationDepthClass(depth));
  alternatives.forEach((alternative, index) => {
    if (index > 0) variation.appendChild(document.createTextNode('; '));
    const square = alternative.move.nullMove; // changement de trait : crochets
    variation.appendChild(document.createTextNode(square ? '[ ' : '( '));
    appendVariationControls(variation, alternative);
    if (alternative.collapsed) renderCollapsedVariation(alternative, variation);
    else renderSequence(alternative, variation, { mainLine: false, variationDepth: depth, suppressAlternativesOnFirst: true });
    variation.appendChild(document.createTextNode(square ? ']' : ')'));
  });
  container.appendChild(variation);

  if (depth === 1) container.appendChild(document.createElement('br'));
  else addSpace(container);
  return true;
}

function renderSequence(startNode, container, options = {}) {
  const mainLine = options.mainLine === true;
  const variationDepth = options.variationDepth || 0;
  const suppressFirst = options.suppressAlternativesOnFirst === true;

  let node = startNode;
  let firstNode = true;
  let forceBlackNumber = false;

  while (node) {
    appendMoveNumber(container, node, node.move.color === 'b' && (firstNode || forceBlackNumber));
    container.appendChild(createMoveButton(node, mainLine));

    if (node.note) {
      const note = document.createElement('span');
      note.className = 'pgn-note';
      note.textContent = ' ' + node.note;
      container.appendChild(note);
    }

    if (node.comment) {
      const comment = document.createElement('span');
      comment.className = 'game-comment';
      comment.textContent = ' (' + node.comment + ')';
      container.appendChild(comment);
    }
    addSpace(container);

    let alternativesDisplayed = false;
    if (!(firstNode && suppressFirst)) {
      alternativesDisplayed = renderAlternativeGroup(node, container, variationDepth + 1);
    }

    const next = getMainChild(node);
    if (!next) break;

    if (next.move.nullMove) {
      // changement de trait : la suite s'ouvre dans une sous-variante entre crochets
      const bracket = document.createElement('span');
      bracket.classList.add('variation', variationDepthClass(variationDepth + 1));
      bracket.appendChild(document.createTextNode('[ '));
      appendVariationControls(bracket, next, { canPromote: false });
      if (next.collapsed) renderCollapsedVariation(next, bracket);
      else renderSequence(next, bracket, { mainLine: false, variationDepth: variationDepth + 1, suppressAlternativesOnFirst: true });
      bracket.appendChild(document.createTextNode(']'));
      container.appendChild(bracket);
      addSpace(container);
      renderAlternativeGroup(next, container, variationDepth + 1); // autres suites éventuelles
      break;
    }

    forceBlackNumber = alternativesDisplayed && next.move.color === 'b';
    node = next;
    firstNode = false;
  }
}

// ==================================================
// DÉFILEMENT AUTOMATIQUE DE LA LISTE DES COUPS (paysage)
// ==================================================
//
// Quand on parcourt la partie avec les boutons de navigation (ou le clavier), le cadre de droite défile
// pour amener le coup affiché au milieu. Le défilement n'a lieu qu'au changement de position : il ne
// reprend donc pas la main si l'on fait défiler le cadre à la main, et il est ignoré quand on clique
// soi-même sur un coup de la liste (la liste ne doit pas bouger sous le doigt).
// ==================================================

/** Portrait : réserve sous la liste des coups, pour que le coup actif puisse toujours monter tout en haut du champ. */
function updateMovesSpacer() {
  if (landscapeQuery.matches) return;
  movesElement.style.setProperty('--spacer', Math.max(0, movesElement.clientHeight - 56) + 'px');
}

function centerCurrentMove() {
  if (currentNode === lastCenteredNode) return; // pas de changement de position : on ne touche à rien
  lastCenteredNode = currentNode;
  if (clickedInMoves) return;
  const landscape = landscapeQuery.matches;
  // paysage : cadre de droite, le coup actif est gardé au centre (face à l'échiquier) ;
  // portrait : champ des coups sous l'échiquier, le coup actif est affiché en haut du champ
  const frame = landscape ? $('#frame-right') : movesElement;
  updateMovesSpacer();
  const current = movesElement.querySelector('.current-move');
  if (!frame) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reduced ? 'auto' : 'smooth';
  if (!current) {
    if (!landscape) frame.scrollTo({ top: 0, behavior });
    return;
  }
  if (frame.scrollHeight <= frame.clientHeight) return;
  const frameRect = frame.getBoundingClientRect();
  const rect = current.getBoundingClientRect();
  const delta = landscape
    ? rect.top + rect.height / 2 - (frameRect.top + frame.clientHeight / 2)
    : rect.top - frameRect.top - parseFloat(getComputedStyle(frame).paddingTop || '0');
  frame.scrollTo({ top: Math.max(0, frame.scrollTop + delta), behavior });
}

function updateMoves() {
  movesElement.innerHTML = '';
  movesElement.classList.toggle('suspended', !locked && Boolean(rootNode));
  if (rootNode && rootNode.note) {
    const intro = document.createElement('span');
    intro.className = 'pgn-note';
    intro.textContent = rootNode.note + ' ';
    movesElement.appendChild(intro);
  }
  if (rootNode && rootNode.children.length > 0) {
    renderSequence(getMainChild(rootNode), movesElement, { mainLine: true, variationDepth: 0 });
  }
  if (thinking) {
    const note = document.createElement('span');
    note.className = 'thinking';
    note.textContent = ' Stockfish réfléchit…';
    movesElement.appendChild(note);
  }
  centerCurrentMove();
}

function updateNavigation() {
  const atRoot = !currentNode || currentNode === rootNode;
  const atEnd = !currentNode || currentNode.children.length === 0;
  $('#first').disabled = !locked || atRoot;
  $('#previous').disabled = !locked || atRoot;
  $('#next').disabled = !locked || atEnd;
  $('#last').disabled = !locked || atEnd;
  $('#restart').disabled = !locked;
}

$('#first').addEventListener('click', () => rootNode && showNode(rootNode));
$('#previous').addEventListener('click', () => currentNode && currentNode.parent && showNode(currentNode.parent));
$('#next').addEventListener('click', () => {
  const child = getMainChild(currentNode);
  if (child) showNode(child);
});
$('#last').addEventListener('click', () => {
  let node = currentNode;
  while (node && getMainChild(node)) node = getMainChild(node);
  if (node) showNode(node);
});
$('#restart').addEventListener('click', () => {
  if (locked) enterGame(currentStartFen);
});
$('#flip').addEventListener('click', () => {
  ground.toggleOrientation();
  marks.render();
  updateTurnDisc();
  updateCoordinates();
  clearZone();
  refreshZone();
});

// ==================================================
// BOUTONS PLAY (camp du joueur) ET START
// ==================================================

function setPlayerSide(mode) {
  playerSide = mode;
  document.querySelectorAll('.mode-btn').forEach((button) => {
    const selected = playerSide === button.dataset.mode;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
  updateZoneAvailability();
  clearZone();
}

document.querySelectorAll('.mode-btn').forEach((button) => {
  button.addEventListener('click', () => {
    if (playerSide === button.dataset.mode) return; // un mode reste toujours choisi
    setPlayerSide(button.dataset.mode);
    // en partie : Stockfish reprend la main si c'est à lui de jouer
    if (locked) afterPosition();
  });
});

startButtons.w.addEventListener('click', () => onStartClick('w'));
startButtons.b.addEventListener('click', () => onStartClick('b'));

// ==================================================
// INITIALISATION
// ==================================================

updateCoordinates();
updateNavigation();
updateStartButtons();
updateZoneAvailability();
setStatus('Position éditable');
