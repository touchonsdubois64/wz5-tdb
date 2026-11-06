// ==================================================
// OUTILS FEN / GRILLE — fonctions pures (testables sous Node)
// ==================================================
//
// Une « grille » est un tableau de 8 rangées (la rangée 8 en premier),
// chacune étant un tableau de 8 cases contenant soit '' soit une lettre
// FEN (PNBRQK pour les Blancs, pnbrqk pour les Noirs).
// ==================================================

export const START_PLACEMENT = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
export const EMPTY_PLACEMENT = '8/8/8/8/8/8/8/8';

/** Vérifie la partie « placement » d'un FEN et renvoie la grille (ou null). */
export function placementToGrid(placement) {
  if (typeof placement !== 'string') return null;
  const rows = placement.split('/');
  if (rows.length !== 8) return null;

  const grid = [];
  for (const row of rows) {
    const cells = [];
    for (const ch of row) {
      if (/[1-8]/.test(ch)) {
        for (let i = 0; i < Number(ch); i++) cells.push('');
      } else if (/[pnbrqkPNBRQK]/.test(ch)) {
        cells.push(ch);
      } else {
        return null;
      }
    }
    if (cells.length !== 8) return null;
    grid.push(cells);
  }
  return grid;
}

export function gridToPlacement(grid) {
  return grid
    .map((row) => {
      let out = '';
      let empty = 0;
      for (const cell of row) {
        if (cell === '') {
          empty++;
        } else {
          if (empty) out += empty;
          empty = 0;
          out += cell;
        }
      }
      if (empty) out += empty;
      return out;
    })
    .join('/');
}

/**
 * Analyse une chaîne FEN complète ou réduite au seul placement.
 * Renvoie { placement, turn, hasTurn, castling, half, full } ou null.
 * (Les champs absents reçoivent des valeurs par défaut.)
 */
export function parseFen(text) {
  const parts = String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return null;
  if (!placementToGrid(parts[0])) return null;

  const hasTurn = parts[1] === 'w' || parts[1] === 'b'; // le texte précise-t-il le trait ?
  const turn = parts[1] === 'b' ? 'b' : 'w';
  const castling = /^(-|[KQkq]{1,4})$/.test(parts[2] || '') ? parts[2] : '-';
  const half = /^\d+$/.test(parts[4] || '') ? parseInt(parts[4], 10) : 0;
  const full = /^\d+$/.test(parts[5] || '') && parseInt(parts[5], 10) > 0 ? parseInt(parts[5], 10) : 1;

  return { placement: parts[0], turn, hasTurn, castling, half, full };
}

/** Ne conserve que les droits de roque réellement possibles sur la grille. */
export function sanitizeCastling(grid, castling) {
  if (!castling || castling === '-') return '-';
  const at = (rank, file) => grid[8 - rank][file];
  const ok = {
    K: at(1, 4) === 'K' && at(1, 7) === 'R',
    Q: at(1, 4) === 'K' && at(1, 0) === 'R',
    k: at(8, 4) === 'k' && at(8, 7) === 'r',
    q: at(8, 4) === 'k' && at(8, 0) === 'r',
  };
  const kept = ['K', 'Q', 'k', 'q'].filter((c) => castling.includes(c) && ok[c]).join('');
  return kept || '-';
}

/**
 * Translation de toute la position.
 * dx > 0 : vers la colonne h ; dy > 0 : vers la rangée 8.
 * Renvoie la nouvelle grille, ou null si une pièce sortirait de l'échiquier.
 */
export function shiftGrid(grid, dx, dy) {
  const out = Array.from({ length: 8 }, () => Array(8).fill(''));
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const cell = grid[r][f];
      if (cell === '') continue;
      const nr = r - dy;
      const nf = f + dx;
      if (nr < 0 || nr > 7 || nf < 0 || nf > 7) return null;
      out[nr][nf] = cell;
    }
  }
  return out;
}

export function canShift(grid, dx, dy) {
  return shiftGrid(grid, dx, dy) !== null;
}

export function countPieces(placementOrFen) {
  const placement = String(placementOrFen).split(' ')[0];
  return (placement.match(/[pnbrqkPNBRQK]/g) || []).length;
}

/**
 * Contrôles structurels d'une position (sans test d'échec, qui demande
 * un moteur de règles). Renvoie un message d'erreur ou null.
 */
export function validateStructure(grid) {
  const count = { K: 0, k: 0, P: 0, p: 0, white: 0, black: 0 };
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const cell = grid[r][f];
      if (!cell) continue;
      if (cell === 'K' || cell === 'k' || cell === 'P' || cell === 'p') count[cell]++;
      if (cell === cell.toUpperCase()) count.white++;
      else count.black++;
      if ((cell === 'P' || cell === 'p') && (r === 0 || r === 7)) {
        return 'Un Pion ne peut pas se trouver sur la première ou la huitième rangée.';
      }
    }
  }
  if (count.K !== 1) return 'Il faut exactement un Roi blanc.';
  if (count.k !== 1) return 'Il faut exactement un Roi noir.';
  if (count.P > 8 || count.p > 8) return 'Il y a plus de huit Pions pour un camp.';
  if (count.white > 16 || count.black > 16) return 'Il y a plus de seize pièces pour un camp.';
  return null;
}

/** Position complète au format FEN. */
export function buildFen(placement, turn, castling = '-', half = 0, full = 1) {
  return [placement, turn, castling || '-', '-', half, full].join(' ');
}
