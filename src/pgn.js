// ==================================================
// LECTURE D'UN PGN (sans dépendance au navigateur : testable sous Node)
// ==================================================
//
// Gère : en-têtes [Tag "valeur"], [FEN], commentaires { } et ; , annotations
// $n et !?, variantes ( ), coups nuls (-- ou Z0), roques écrits avec des zéros.
// Les ; et % ne sont des commentaires de ligne qu'en dehors des { }.
// Seule la première partie du texte est lue.
// ==================================================

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const RESULTS = new Set(['1-0', '0-1', '1/2-1/2', '*']);

// --------------------------------------------------
// ANNOTATIONS STANDARD DES COUPS (NAG)
// --------------------------------------------------
//
// Dans un PGN, une annotation s'écrit soit en suffixe du coup (Kg1!  Nf5!?  h2??), soit sous la forme $n
// (Kg1 $1 $18). Chaque coup garde la liste de ses codes dans node.nags (nombres, sans doublon).
// NAG_SYMBOLS donne le signe à afficher : 1 à 8 = qualité du coup, 10 à 21 = évaluation de la position,
// puis quelques observations. Les autres codes sont conservés (et réécrits à l'export) mais pas affichés.
// --------------------------------------------------

export const NAG_SYMBOLS = {
  1: '!', 2: '?', 3: '!!', 4: '??', 5: '!?', 6: '?!', 7: '□', 8: '□',
  10: '=', 11: '=', 12: '=', 13: '∞', 14: '+=', 15: '=+', 16: '±', 17: '∓', 18: '+−', 19: '−+', 20: '+−−', 21: '−−+',
  22: '⊙', 23: '⊙', 36: '↑', 37: '↑', 40: '→', 41: '→', 44: '=∞', 45: '=∞',
  132: '⇆', 133: '⇆', 138: '⊕', 139: '⊕', 140: '∆', 141: '∇', 146: 'N',
};

/** Les codes 1 à 9 jugent le coup lui-même ; les suivants décrivent la position ou le jeu qui en découle. */
export const isMoveNag = (nag) => nag >= 1 && nag <= 9;

const SUFFIX_NAGS = { '!': 1, '?': 2, '!!': 3, '??': 4, '!?': 5, '?!': 6 };
export const NAG_SUFFIXES = { 1: '!', 2: '?', 3: '!!', 4: '??', 5: '!?', 6: '?!' };

function addNag(node, nag) {
  if (!node || !Number.isInteger(nag) || nag < 1 || nag > 255) return;
  node.nags = node.nags || [];
  if (!node.nags.includes(nag)) node.nags.push(nag);
}

const HEADER = /\[\s*(\w+)\s+"((?:[^"\\]|\\.)*)"\s*\]/g;

/**
 * Sépare les en-têtes et le texte des coups de la première partie.
 * Fonctionne aussi quand tout le PGN tient sur une seule ligne (texte collé dans un champ).
 */
function splitGame(text) {
  let source = String(text).replace(/\r/g, '\n');

  // seconde partie : un deuxième en-tête [Event "..."] coupe le texte
  const events = [...source.matchAll(/\[\s*Event\s+"/g)];
  if (events.length > 1) source = source.slice(0, events[1].index);

  const headers = {};
  const body = source.replace(HEADER, (all, tag, value) => {
    if (!(tag in headers)) headers[tag] = value.replace(/\\(.)/g, '$1');
    return ' ';
  });

  return { headers, movetext: stripLineComments(body).replace(/\n/g, ' ') };
}

/**
 * Retire les commentaires « jusqu'à la fin de la ligne » (; ...) et les lignes d'échappement (% ...), mais seulement
 * en dehors des commentaires { }. Un point-virgule ou un % à l'intérieur d'un commentaire { } appartient au texte
 * du commentaire (très fréquent dans les chapitres d'étude Lichess) : le traiter comme un début de commentaire de
 * ligne faisait disparaître l'accolade fermante et avalait les coups suivants.
 */
function stripLineComments(text) {
  let out = '';
  let inBrace = false;
  let lineStart = true;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inBrace) {
      out += c;
      if (c === '}') inBrace = false;
      lineStart = c === '\n';
      continue;
    }
    if (c === '{') {
      inBrace = true;
      out += c;
      lineStart = false;
    } else if (c === ';' || (c === '%' && lineStart)) {
      while (i + 1 < text.length && text[i + 1] !== '\n') i++; // jusqu'à la fin de la ligne
      lineStart = false;
    } else {
      out += c;
      lineStart = c === '\n';
    }
  }
  return out;
}

const BRUSH = { R: 'red', G: 'green', B: 'blue', Y: 'yellow' };

/**
 * Contenu d'un commentaire { … } : texte à afficher + symboles dessinés.
 * Reconnaît [%cal Ga1h3,Rb2b5] (flèches) et [%csl Yd5,Re4] (cercles) ;
 * les autres commandes ([%eval], [%clk]…) sont ignorées.
 */
function parseComment(inner) {
  const shapes = [];
  const note = inner
    .replace(/\[%(cal|csl)\s+([^\]]*)\]/g, (all, kind, list) => {
      for (const item of list.split(/[\s,]+/).filter(Boolean)) {
        const match = kind === 'cal' ? /^([RGBY])([a-h][1-8])([a-h][1-8])$/.exec(item) : /^([RGBY])([a-h][1-8])$/.exec(item);
        if (!match) continue;
        const brush = BRUSH[match[1]];
        if (kind === 'cal' && match[2] !== match[3]) shapes.push({ orig: match[2], dest: match[3], brush });
        else shapes.push({ orig: match[2], brush }); // cercle
      }
      return ' ';
    })
    .replace(/\[%[^\]]*\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return { note, shapes };
}

function tokenize(movetext) {
  return (
    movetext.match(/\{[^}]*\}|\(|\)|\$\d+|\d+\s*\.(?:\s*\.\.)?|1-0|0-1|1\/2-1\/2|\*|[^\s(){}$]+/g) || []
  );
}

function normalizeSan(token) {
  if (/^0-0-0[+#]?[?!]*$/.test(token)) return token.replace(/^0-0-0/, 'O-O-O');
  if (/^0-0[+#]?[?!]*$/.test(token)) return token.replace(/^0-0/, 'O-O');
  return token;
}

const isNullMove = (token) => /^(--|Z0|0000|@@@@)$/.test(token);

/**
 * Lit un PGN. Renvoie :
 *   { root, startFen, hasFen, endNode, moveCount, headers, title, error }
 * root est null si le texte est inutilisable ; error peut accompagner un
 * résultat partiel (les coups lus avant l'erreur sont conservés).
 */
export function parsePgn(text, Chess) {
  const { headers, movetext } = splitGame(text);

  const hasFen = typeof headers.FEN === 'string' && headers.FEN.trim() !== '';
  const startFen = hasFen ? headers.FEN.trim() : START_FEN;

  const game = new Chess();
  if (!game.load(startFen)) {
    return { root: null, error: 'FEN de l’en-tête invalide : ' + startFen, headers };
  }

  const makeNode = (parent, move) => ({
    parent,
    move,
    source: 'pgn',
    children: [],
    fen: game.fen(),
    selectedChild: null,
    comment: null,
  });

  const root = makeNode(null, null);
  let current = root; // dernière position atteinte
  let previous = null; // position précédant `current` (pour ouvrir une variante)
  const stack = [];
  let justPlayed = null; // coup que les annotations $n suivantes viennent qualifier
  let moveCount = 0;
  let error = null;

  let errorFen = null;
  const tokens = tokenize(movetext);

  for (const raw of tokens) {
    if (raw.startsWith('{')) {
      // commentaire : il se rattache au dernier coup joué (ou à la position de départ)
      const { note, shapes } = parseComment(raw.slice(1, -1));
      if (note) current.note = current.note ? current.note + ' ' + note : note;
      if (shapes.length > 0) current.shapes = (current.shapes || []).concat(shapes);
      continue;
    }
    if (/^\$\d+$/.test(raw)) {
      addNag(justPlayed, parseInt(raw.slice(1), 10));
      continue;
    }
    if (/^\d+\s*\./.test(raw) || RESULTS.has(raw)) continue;

    if (raw === '(') {
      if (!previous) {
        error = 'Variante placée avant le premier coup : ignorée.';
        continue;
      }
      stack.push({ current, previous, justPlayed });
      current = previous;
      previous = current.parent;
      justPlayed = null;
      continue;
    }
    if (raw === ')') {
      const saved = stack.pop();
      if (saved) {
        current = saved.current;
        previous = saved.previous;
        justPlayed = saved.justPlayed;
      }
      continue;
    }

    game.load(current.fen);
    let node = null;

    if (isNullMove(raw)) {
      const parts = current.fen.split(' ');
      const passing = parts[1];
      const turn = passing === 'w' ? 'b' : 'w';
      const fen = [parts[0], turn, parts[2], '-', (parseInt(parts[4], 10) || 0) + 1, (parseInt(parts[5], 10) || 1) + (passing === 'b' ? 1 : 0)].join(' ');
      if (!game.load(fen)) {
        error = 'Coup nul impossible à la position ' + current.fen;
        break;
      }
      const move = { color: passing, from: null, to: null, san: '--', promotion: null, nullMove: true };
      node = current.children.find((child) => child.move.nullMove);
      if (!node) {
        node = makeNode(current, move);
        current.children.push(node);
      }
    } else {
      const played = game.move(normalizeSan(raw), { sloppy: true });
      if (!played) {
        error = 'Coup illisible ou illégal : « ' + raw + ' » (' + (moveCount + 1) + 'ᵉ coup lu), ' + describeContext(current, root) + '.';
        errorFen = current.fen;
        break;
      }
      const wanted = { from: played.from, to: played.to, promotion: played.promotion || null };
      node = current.children.find(
        (child) =>
          !child.move.nullMove &&
          child.move.from === wanted.from &&
          child.move.to === wanted.to &&
          (child.move.promotion || null) === wanted.promotion,
      );
      if (!node) {
        node = makeNode(current, {
          color: played.color,
          from: played.from,
          to: played.to,
          san: played.san,
          promotion: played.promotion || null,
          nullMove: false,
        });
        current.children.push(node);
        if (game.game_over()) {
          node.comment = game.in_checkmate()
            ? 'Mat'
            : game.in_stalemate()
              ? 'Pat'
              : game.insufficient_material()
                ? 'Nulle - Matériel'
                : game.in_threefold_repetition()
                  ? 'Nulle - Répétition'
                  : 'Nulle - 50 coups';
        }
      }
    }

    const suffix = /[!?]{1,2}$/.exec(raw);
    if (suffix) addNag(node, SUFFIX_NAGS[suffix[0]]); // Kg1!  h2??  Nf5!?
    justPlayed = node;
    moveCount++;
    previous = current;
    current = node;
  }

  if (moveCount === 0 && !hasFen) {
    return { root: null, error: error || 'Aucun coup reconnu dans ce PGN.', headers };
  }

  // fin de la ligne principale
  let endNode = root;
  while (endNode.children.length > 0) endNode = endNode.children[0];

  const meaningful = (value) => value && value !== '?' && value !== 'Winning Zone';
  let title = meaningful(headers.Event) ? headers.Event : null;
  if (!title && meaningful(headers.White) && meaningful(headers.Black)) title = headers.White + ' – ' + headers.Black;

  return { root, startFen: root.fen, hasFen, endNode, moveCount, headers, title, error, errorFen };
}

/** « après 1. Kg7 Kg3 2. Kf6 » : les derniers coups de la ligne (ou de la variante) où le coup fautif est tombé. */
function describeContext(node, root) {
  const path = [];
  for (let n = node; n && n.move; n = n.parent) path.unshift(n.move);
  if (path.length === 0) return 'dès la position de départ';
  const [, turn, , , , fullmove] = root.fen.split(' ');
  let number = parseInt(fullmove, 10) || 1;
  let white = turn !== 'b';
  const parts = path.map((move, index) => {
    const label = white ? number + '. ' : index === 0 ? number + '... ' : '';
    if (!white) number++;
    white = !white;
    return label + move.san;
  });
  const shown = parts.slice(-6);
  return 'après « ' + (parts.length > shown.length ? '… ' : '') + shown.join(' ') + ' »';
}
