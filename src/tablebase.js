// ==================================================
// TABLES DE FINALES LICHESS (Syzygy, 7 pièces au plus)
// ==================================================
//
// Reprend l'endpoint déjà utilisé par cc2. Une seule requête par position
// renvoie la catégorie de la position ET celle de chaque coup légal :
// elle sert à l'évaluation, à la liste des coups et à la Winning Zone.
// ==================================================

import { Chess } from 'chess.js';
import { countPieces } from './fen.js';

export const TB_ENDPOINT = 'https://tablebase.lichess.org/standard';
export const TB_MAX_PIECES = 7;

const cache = new Map();

/** Les tables ne connaissent pas les droits de roque : on les retire. */
function tablebaseFen(fen) {
  const parts = fen.split(' ');
  parts[2] = '-';
  return parts.join(' ');
}

export function isCovered(fen) {
  return countPieces(fen) <= TB_MAX_PIECES;
}

/**
 * Interroge les tables (avec mémorisation). Rejette si la position n'est
 * pas couverte ou si le service est indisponible.
 */
export function getTablebase(fen) {
  if (!isCovered(fen)) return Promise.reject(new Error('Trop de pièces'));

  if (!cache.has(fen)) {
    const request = fetch(TB_ENDPOINT + '?fen=' + encodeURIComponent(tablebaseFen(fen)))
      .then((response) => {
        if (!response.ok) throw new Error('Tables indisponibles : ' + response.status);
        return response.json();
      })
      .then((data) => {
        data.moves = sortMoves(Array.isArray(data.moves) ? data.moves : []);
        return data;
      })
      .catch((error) => {
        cache.delete(fen);
        throw error;
      });
    cache.set(fen, request);
  }
  return cache.get(fen);
}

// --------------------------------------------------
// CATÉGORIES
// --------------------------------------------------
//
// Dans l'API, la catégorie d'un COUP est donnée du point de vue du camp
// qui a le trait APRÈS ce coup, c'est-à-dire de l'adversaire de celui qui
// joue. « loss » signifie donc : position perdue pour l'adversaire, soit un
// coup gagnant pour le joueur.
// --------------------------------------------------

const MOVE_RANK = {
  loss: 0,
  'blessed-loss': 1,
  draw: 2,
  'cursed-win': 3,
  win: 4,
};

function sortMoves(moves) {
  // tri stable : l'ordre de l'API est conservé à catégorie égale
  return moves
    .map((move, index) => ({ move, index }))
    .sort((a, b) => {
      const ra = MOVE_RANK[a.move.category] ?? 9;
      const rb = MOVE_RANK[b.move.category] ?? 9;
      return ra - rb || a.index - b.index;
    })
    .map((entry) => entry.move);
}

/**
 * Résultat d'un coup pour celui qui le joue :
 * 'win' (gain), 'draw' (nulle) ou 'loss' (perte). null si inconnu.
 */
export function moveOutcome(category) {
  switch (category) {
    case 'loss':
      return 'win';
    case 'win':
      return 'loss';
    case 'draw':
    case 'cursed-win':
    case 'blessed-loss':
      return 'draw';
    default:
      return null;
  }
}

/** Vrai quand la nulle ne vient que de la règle des 50 coups. */
export function isFiftyMoveDraw(category) {
  return category === 'cursed-win' || category === 'blessed-loss';
}

export function uciOf(move) {
  return move.from + move.to + (move.promotion || '');
}

/**
 * Associe les coups des tables aux coups légaux de chess.js
 * (pour disposer de la notation SAN et de la couleur).
 * Renvoie [{ san, color, from, to, promotion, outcome, fifty, dtm, uci }]
 */
export function annotateMoves(game, tb) {
  const legal = new Map();
  for (const move of game.moves({ verbose: true })) legal.set(uciOf(move), move);

  const result = [];
  for (const entry of tb.moves) {
    const move = legal.get(entry.uci);
    if (!move) continue;
    result.push({
      san: move.san,
      color: move.color,
      from: move.from,
      to: move.to,
      promotion: move.promotion || null,
      uci: entry.uci,
      outcome: moveOutcome(entry.category),
      fifty: isFiftyMoveDraw(entry.category),
      dtm: Number.isFinite(entry.dtm) ? entry.dtm : null,
      category: entry.category,
    });
  }
  return result;
}

// --------------------------------------------------
// MAT : DISTANCE
// --------------------------------------------------

export function mateText(winner, plies) {
  const distance = Math.max(1, Math.ceil(Math.abs(plies) / 2));
  return winner === 'black' ? '#-' + distance : '#' + distance;
}

/**
 * Quand les tables ne donnent pas le DTM, on suit la ligne principale
 * jusqu'au mat (comme dans cc2). Renvoie null si elle n'aboutit pas à un mat.
 */
export async function getMainlineMate(fen, winner) {
  try {
    const response = await fetch(TB_ENDPOINT + '/mainline?fen=' + encodeURIComponent(tablebaseFen(fen)));
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || !Array.isArray(data.mainline) || data.mainline.length === 0) return null;

    const replay = new Chess();
    if (!replay.load(fen)) return null;
    for (const entry of data.mainline) {
      if (!entry.uci || entry.uci.length < 4) return null;
      const move = replay.move({
        from: entry.uci.slice(0, 2),
        to: entry.uci.slice(2, 4),
        promotion: entry.uci.length > 4 ? entry.uci.slice(4, 5) : undefined,
      });
      if (!move) return null;
    }
    // une ligne interrompue (règle des 50 coups…) ne doit jamais devenir « #n »
    if (!replay.in_checkmate()) return null;
    return mateText(winner, data.mainline.length);
  } catch (error) {
    return null;
  }
}
