// ==================================================
// ANNOTATIONS : modèle de données et dessin SVG (sans dépendance au navigateur)
// ==================================================
//
// Types d'annotation :
//   shape   forme dans une case (circle, square, box, diamond, triangle, star, disc)
//   text    lettre, nombre (0 à 20) ou symbole (sym:+ sym:x sym:-) ajusté à la case
//   label   texte libre centré sur la case, qui peut déborder sur les cases voisines
//   piece   figurine (« K:b » = Roi style plein, « K:w » = Roi style creux)
//   border  case appartenant à une zone dont on trace le contour extérieur (trait liseré)
//   zone    case appartenant à une zone colorée à moitié transparente, bordée sans liseré
//   arrow   flèche ; arrow2 flèche double ; line trait simple
// Chaque case porte au plus un élément de chaque type (sauf border : un par couleur).
// ==================================================

import { PIECE_PATHS } from './piece-paths.js';

export const COLORS = [
  { id: 'noir', label: 'Noir', hex: '#141414', outline: '#ffffff' },
  { id: 'gris', label: 'Gris', hex: '#8b8b8b', outline: '#ffffff' },
  { id: 'blanc', label: 'Blanc', hex: '#ffffff', outline: '#141414' },
  { id: 'marron', label: 'Marron', hex: '#8a5a2b', outline: '#ffffff' },
  { id: 'rouge', label: 'Rouge', hex: '#e02424', outline: '#ffffff' },
  { id: 'orange', label: 'Orange', hex: '#f77f00', outline: '#ffffff' },
  { id: 'jaune', label: 'Jaune', hex: '#ffd60a', outline: '#ffffff' },
  { id: 'vert', label: 'Vert', hex: '#1f9d3a', outline: '#ffffff' },
  { id: 'vertclair', label: 'Vert clair', hex: '#44d65a', outline: '#ffffff' },
  { id: 'cyan', label: 'Cyan', hex: '#00b4d8', outline: '#ffffff' },
  { id: 'bleu', label: 'Bleu', hex: '#1d4ed8', outline: '#ffffff' },
  { id: 'violet', label: 'Violet', hex: '#8e24aa', outline: '#ffffff' },
  { id: 'rose', label: 'Rose', hex: '#f06292', outline: '#ffffff' },
];

const COLOR_BY_ID = Object.fromEntries(COLORS.map((color) => [color.id, color]));

// Ordre demandé : cercle, carré arrondi, carré à angles droits, losange, triangle, étoile, petit disque, trait, flèche, flèche double, + x -
export const SHAPES = [
  { type: 'shape', value: 'circle', label: 'Cercle' },
  { type: 'shape', value: 'square', label: 'Carré arrondi' },
  { type: 'shape', value: 'box', label: 'Carré à angles droits' },
  { type: 'shape', value: 'diamond', label: 'Losange' },
  { type: 'shape', value: 'triangle', label: 'Triangle' },
  { type: 'shape', value: 'star', label: 'Étoile à 5 branches' },
  { type: 'shape', value: 'disc', label: 'Petit disque' },
  { type: 'line', value: '', label: 'Trait : cliquer les deux cases extrêmes' },
  { type: 'dline', value: '', label: 'Trait pointillé : cliquer les deux cases extrêmes' },
  { type: 'arrow', value: '', label: 'Flèche : cliquer la case de départ, puis la case d’arrivée' },
  { type: 'darrow', value: '', label: 'Flèche pointillée : cliquer la case de départ, puis la case d’arrivée' },
  { type: 'arrow2', value: '', label: 'Flèche double : cliquer les deux cases extrêmes' },
  { type: 'darrow2', value: '', label: 'Flèche double pointillée : cliquer les deux cases extrêmes' },
  { type: 'text', value: 'sym:+', label: 'Plus' },
  { type: 'text', value: 'sym:x', label: 'Croix' },
  { type: 'text', value: 'sym:-', label: 'Moins' },
];

export const NUMBERS = Array.from({ length: 21 }, (_, i) => String(i)); // 0 à 20
export const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const PIECE_LETTERS = ['K', 'Q', 'R', 'B', 'N', 'P'];

// Traits, flèches et flèches doubles, pleins ou pointillés (« d » devant le nom : dline, darrow, darrow2)
export const TWO_CLICK = new Set(['line', 'dline', 'arrow', 'darrow', 'arrow2', 'darrow2']);

// Zones de cases, à coins droits ou arrondis (propriété « round » de l'élément) :
//   border = bordure seule        fill  = couleur seule (moitié transparente), sans bordure
//   zone   = bordure + couleur    shade = hachures seules, sans bordure
//   hatch  = bordure + hachures
export const ZONE_TYPES = new Set(['border', 'fill', 'zone', 'shade', 'hatch']);

// --------------------------------------------------
// DONNÉES
// --------------------------------------------------

export function createMarkSet() {
  const items = [];

  const sameEnds = (item, from, to, ordered) =>
    ordered ? item.from === from && item.to === to : (item.from === from && item.to === to) || (item.from === to && item.to === from);

  return {
    items,

    clear() {
      items.length = 0;
    },

    isEmpty() {
      return items.length === 0;
    },

    /** Pose un élément dans une case ; le même clic une seconde fois l'enlève. */
    placeSquare(key, type, value, color) {
      const index = items.findIndex((item) => item.key === key && item.type === type);
      const item = { type, value, color, key };
      if (index < 0) items.push(item);
      else if (items[index].value === value && items[index].color === color) items.splice(index, 1);
      else items[index] = item;
    },

    /** Ajoute ou retire une case d'une zone entourée (bordure seule, coins droits). */
    toggleBorder(key, color) {
      this.toggleZone(key, color, 'border');
    },

    /**
     * Ajoute ou retire une case d'une zone (une zone par type et par couleur).
     * type : 'border', 'fill', 'zone', 'shade' ou 'hatch' ; round : coins arrondis.
     */
    toggleZone(key, color, type = 'zone', round = false) {
      const index = items.findIndex((item) => item.type === type && item.key === key && item.color === color);
      if (index >= 0) items.splice(index, 1);
      else items.push(round ? { type, value: '', color, key, round: true } : { type, value: '', color, key });
    },

    /** Trait, flèche ou flèche double entre deux cases (pleins ou pointillés). */
    toggleLink(type, from, to, color) {
      const ordered = type === 'arrow' || type === 'darrow';
      const index = items.findIndex((item) => item.type === type && sameEnds(item, from, to, ordered));
      const item = { type, color, from, to };
      if (index < 0) items.push(item);
      else if (items[index].color === color) items.splice(index, 1);
      else items[index] = item;
    },

    /** Gomme : retire tout ce qui touche la case (éléments, appartenance aux zones, traits et flèches). */
    eraseAt(key) {
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item.key === key || item.from === key || item.to === key) items.splice(i, 1);
      }
    },
  };
}

// --------------------------------------------------
// CODE TEXTE DES ANNOTATIONS (sauvegarde / indice)
// --------------------------------------------------
//
// Les annotations d'une position se résument en une ligne de texte, à coller dans le champ
// « marks » de la position (positions.js). Chaque élément a la forme  GENRE:COULEUR:CASES
// et les éléments sont séparés par des espaces :
//
//   circle:rouge:e4,f5                       un cercle rouge sur e4 et sur f5
//   text=A:bleu:c3   text=12:noir:d5         une lettre / un nombre
//   plus:vert:b2  cross:rouge:b3  minus:noir:b4     symboles + × −
//   label=a%27:rouge:e6                      texte libre (caractères spéciaux en %XX : a' = a%27)
//   piece=Kb:rouge:g1                        figurine : lettre K Q R B N P, puis b (plein) ou w (creux)
//   border:rouge:d4,d5,e4,e5                 zone avec bordure seule
//   fill:vert:d4,d5,e4,e5                    zone colorée (moitié transparente), sans bordure
//   zone:vert:d4,d5,e4,e5                    zone avec bordure et intérieur coloré
//   shade:vert:d4,d5,e4,e5                   zone hachurée, sans bordure
//   hatch:vert:d4,d5,e4,e5                   zone avec bordure et intérieur hachuré
//   rborder rfill rzone rshade rhatch        les mêmes zones à coins arrondis (r devant le nom)
//   arrow:bleu:e2>e4,g1>f3                   flèches (départ>arrivée) ; arrow2 = double, line = trait
//   darrow, darrow2, dline                   les mêmes en pointillés
//
// Genres de forme : circle square box diamond triangle star disc.
// Couleurs : noir gris blanc marron rouge orange jaune vert vertclair cyan bleu violet rose.
// ==================================================

const SQUARE_PATTERN = /^[a-h][1-8]$/;
const SHAPE_KINDS = new Set(['circle', 'square', 'box', 'diamond', 'triangle', 'star', 'disc']);
const SYMBOL_KINDS = { plus: 'sym:+', cross: 'sym:x', minus: 'sym:-' };
const SYMBOL_NAMES = Object.fromEntries(Object.entries(SYMBOL_KINDS).map(([name, value]) => [value, name]));
const LINK_KINDS = TWO_CLICK;
const ZONE_KINDS = ZONE_TYPES;

/** Encodage d'une valeur de texte : tout ce qui n'est pas lettre, chiffre ou -_.~ est écrit en %XX. */
function encodeValue(text) {
  return encodeURIComponent(String(text)).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

/** Début d'un élément (« genre=valeur:couleur »), ou null si l'élément n'est pas reconnu. */
function headOf(item) {
  let kind;
  switch (item.type) {
    case 'shape':
      kind = item.value;
      break;
    case 'text':
      kind = SYMBOL_NAMES[item.value] || 'text=' + encodeValue(item.value);
      break;
    case 'label':
      kind = 'label=' + encodeValue(item.value);
      break;
    case 'piece':
      kind = 'piece=' + String(item.value).replace(':', '');
      break;
    default:
      kind = (item.round && ZONE_KINDS.has(item.type) ? 'r' : '') + item.type; // zones (rzone…), traits et flèches
  }
  return kind + ':' + item.color;
}

/** Transforme la liste d'annotations en une ligne de texte (chaîne vide s'il n'y en a pas). */
export function encodeMarks(items) {
  const groups = [];
  for (const item of items) {
    const head = headOf(item);
    const target = LINK_KINDS.has(item.type) ? item.from + '>' + item.to : item.key;
    const global = ZONE_KINDS.has(item.type); // l'ordre des cases n'a pas d'importance : on regroupe tout
    const existing = global ? groups.find((group) => group.head === head) : groups[groups.length - 1];
    if (existing && existing.head === head && existing.global === global) existing.targets.push(target);
    else groups.push({ head, global, targets: [target] });
  }
  return groups.map((group) => group.head + ':' + group.targets.join(',')).join(' ');
}

/**
 * Lit une ligne de texte produite par encodeMarks.
 * Renvoie { items, errors } : les éléments reconnus, et un message par morceau ignoré.
 */
export function decodeMarks(code) {
  const marks = createMarkSet();
  const errors = [];
  const tokens = String(code || '').split(/\s+/).filter(Boolean);

  for (const token of tokens) {
    const parts = token.split(':');
    if (parts.length !== 3) {
      errors.push('« ' + token + ' » : forme attendue GENRE:COULEUR:CASES');
      continue;
    }
    const [kindPart, colorId, targetPart] = parts;
    const separator = kindPart.indexOf('=');
    let kind = separator < 0 ? kindPart : kindPart.slice(0, separator);
    let rawValue = separator < 0 ? '' : kindPart.slice(separator + 1);
    let round = false;
    if (kind.charAt(0) === 'r' && ZONE_KINDS.has(kind.slice(1))) {
      round = true; // zone à coins arrondis : rzone, rfill, rborder, rshade, rhatch
      kind = kind.slice(1);
    }

    if (!COLOR_BY_ID[colorId]) {
      errors.push('« ' + token + ' » : couleur inconnue « ' + colorId + ' »');
      continue;
    }

    // type et valeur de l'élément
    let type;
    let value = '';
    if (SHAPE_KINDS.has(kind)) {
      type = 'shape';
      value = kind;
    } else if (SYMBOL_KINDS[kind]) {
      type = 'text';
      value = SYMBOL_KINDS[kind];
    } else if (kind === 'text' || kind === 'label') {
      type = kind;
      try {
        value = decodeURIComponent(rawValue);
      } catch (error) {
        value = '';
      }
      if (!value) {
        errors.push('« ' + token + ' » : texte manquant');
        continue;
      }
    } else if (kind === 'piece') {
      const match = /^([KQRBNP])([bw])$/.exec(rawValue);
      if (!match) {
        errors.push('« ' + token + ' » : figurine attendue sous la forme piece=Kb ou piece=Nw');
        continue;
      }
      type = 'piece';
      value = match[1] + ':' + match[2];
    } else if (ZONE_KINDS.has(kind) || LINK_KINDS.has(kind)) {
      type = kind;
    } else {
      errors.push('« ' + token + ' » : genre inconnu « ' + kind + ' »');
      continue;
    }

    // cases visées
    for (const target of targetPart.split(',').filter(Boolean)) {
      if (LINK_KINDS.has(type)) {
        const [from, to] = target.split('>');
        if (!SQUARE_PATTERN.test(from || '') || !SQUARE_PATTERN.test(to || '') || from === to) {
          errors.push('« ' + token + ' » : « ' + target + ' » n’est pas de la forme e2>e4');
          continue;
        }
        marks.items.push({ type, color: colorId, from, to });
      } else if (!SQUARE_PATTERN.test(target)) {
        errors.push('« ' + token + ' » : « ' + target + ' » n’est pas une case');
      } else {
        const sameSlot = (item) => item.key === target && item.type === type && (!ZONE_KINDS.has(type) || item.color === colorId);
        const index = marks.items.findIndex(sameSlot); // une seule annotation de chaque genre par case
        const item = round ? { type, value, color: colorId, key: target, round: true } : { type, value, color: colorId, key: target };
        if (index < 0) marks.items.push(item);
        else marks.items[index] = item;
      }
    }
  }
  return { items: marks.items, errors };
}

// --------------------------------------------------
// ZONES ENTOURÉES (outil « Bordures »)
// --------------------------------------------------

/**
 * Contours extérieurs d'un ensemble de cases (coordonnées [colonne, rangée] à l'écran).
 * Renvoie une liste de boucles, chacune étant une liste de sommets [x, y] sur la grille ;
 * l'intérieur est à droite du sens de parcours. Les côtés communs à deux cases disparaissent.
 */
export function borderLoops(cells) {
  const set = new Set(cells.map(([c, r]) => c + ',' + r));
  const has = (c, r) => set.has(c + ',' + r);

  const outgoing = new Map(); // sommet -> arêtes sortantes
  const addEdge = (x1, y1, x2, y2) => {
    const key = x1 + ',' + y1;
    if (!outgoing.has(key)) outgoing.set(key, []);
    outgoing.get(key).push({ x1, y1, x2, y2, dx: x2 - x1, dy: y2 - y1, used: false });
  };

  for (const [c, r] of cells) {
    if (!has(c, r - 1)) addEdge(c, r, c + 1, r);
    if (!has(c + 1, r)) addEdge(c + 1, r, c + 1, r + 1);
    if (!has(c, r + 1)) addEdge(c + 1, r + 1, c, r + 1);
    if (!has(c - 1, r)) addEdge(c, r + 1, c, r);
  }

  const loops = [];
  for (const edges of outgoing.values()) {
    for (const start of edges) {
      if (start.used) continue;
      const loop = [];
      let edge = start;
      while (edge && !edge.used) {
        edge.used = true;
        loop.push([edge.x1, edge.y1]);
        const candidates = (outgoing.get(edge.x2 + ',' + edge.y2) || []).filter((e) => !e.used);
        // aux sommets de contact en diagonale : on tourne à droite pour séparer les contours
        const right = [-edge.dy, edge.dx];
        const left = [edge.dy, -edge.dx];
        const pick = (vector) => candidates.find((e) => e.dx === vector[0] && e.dy === vector[1]);
        edge = pick(right) || pick([edge.dx, edge.dy]) || pick(left) || candidates[0];
      }
      if (loop.length >= 4) loops.push(loop);
    }
  }
  return loops;
}

/** Décale une boucle vers l'intérieur de `inset` (unités de 100 par case) et supprime les sommets alignés. */
export function insetLoop(loop, inset) {
  const points = [];
  const count = loop.length;
  for (let i = 0; i < count; i++) {
    const previous = loop[(i + count - 1) % count];
    const current = loop[i];
    const next = loop[(i + 1) % count];
    const inDir = [Math.sign(current[0] - previous[0]), Math.sign(current[1] - previous[1])];
    const outDir = [Math.sign(next[0] - current[0]), Math.sign(next[1] - current[1])];
    if (inDir[0] === outDir[0] && inDir[1] === outDir[1]) continue; // sommet aligné : inutile
    const normalIn = [-inDir[1], inDir[0]]; // normale vers l'intérieur (à droite)
    const normalOut = [-outDir[1], outDir[0]];
    points.push([
      current[0] * 100 + inset * (normalIn[0] + normalOut[0]),
      current[1] * 100 + inset * (normalIn[1] + normalOut[1]),
    ]);
  }
  return points;
}

// --------------------------------------------------
// DESSIN
// --------------------------------------------------

const number = (value) => Math.round(value * 10) / 10;
const ROUND = 'stroke-linecap="round" stroke-linejoin="round"';
const MITER = 'stroke-linejoin="miter" stroke-miterlimit="10"'; // angles vifs

/** Trait avec un liseré de couleur contrastée (blanc, ou noir pour les marques blanches). */
function stroked(tag, attributes, color, width, extra = '') {
  return (
    `<${tag} ${attributes} fill="none" stroke="${color.outline}" stroke-width="${width + 7}" ${extra}/>` +
    `<${tag} ${attributes} fill="none" stroke="${color.hex}" stroke-width="${width}" ${extra}/>`
  );
}

function starPoints() {
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = ((-90 + i * 36) * Math.PI) / 180;
    const radius = i % 2 === 0 ? 42 : 17;
    points.push(number(50 + radius * Math.cos(angle)) + ',' + number(54 + radius * Math.sin(angle)));
  }
  return points.join(' ');
}

function escapeText(text) {
  return String(text).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
}

const TEXT_STYLE = 'font-weight="700" font-family="Arial, Helvetica, sans-serif" stroke-linejoin="round" paint-order="stroke"';

/** Figurine dans une case de 100 × 100 : style plein (« b ») ou creux (« w »). */
function pieceFragment(value, color) {
  const [letter, style] = value.split(':');
  const paths = PIECE_PATHS[letter];
  if (!paths) return '';
  const scale = (90 / 2048).toFixed(5);
  const stroke = `stroke="${color.outline}" stroke-width="95" stroke-linejoin="round" paint-order="stroke"`;
  let inner;
  if (style === 'w') {
    // le liseré doit entourer le contour de la figurine (et pas seulement son fond) : on le dessine d'abord
    inner =
      `<path d="${paths.whiteLine}" fill="${color.outline}" ${stroke}/>` +
      `<path d="${paths.whiteBody}" fill="#fafafa"/>` +
      `<path d="${paths.whiteLine}" fill="${color.hex}"/>`;
  } else {
    // comme dans l'image d'origine : les parties claires sont dessous, le contour foncé (coloré ici) dessus
    inner =
      (paths.blackDetail ? `<path d="${paths.blackDetail}" fill="${color.outline}"/>` : '') +
      `<path d="${paths.black}" fill="${color.hex}" ${stroke}/>`;
  }
  return `<g transform="translate(5 5) scale(${scale})">${inner}</g>`;
}

/** Dessin d'un élément (hors texte libre) dans une case de 100 × 100 unités. */
function squareFragment(item, color) {
  switch (item.type) {
    case 'shape':
      switch (item.value) {
        case 'disc':
          return `<circle cx="50" cy="50" r="15" fill="${color.hex}" stroke="${color.outline}" stroke-width="4"/>`;
        case 'circle':
          return stroked('circle', 'cx="50" cy="50" r="39"', color, 8);
        case 'square':
          return stroked('rect', 'x="10" y="10" width="80" height="80" rx="15" ry="15"', color, 8);
        case 'diamond':
          return stroked('polygon', 'points="50,9 91,50 50,91 9,50"', color, 8, ROUND);
        case 'box':
          // même tracé que « Contours » appliqué à une seule case
          return stroked('rect', 'x="8" y="8" width="84" height="84"', color, 8, MITER);
        case 'triangle':
          return stroked('polygon', 'points="50,12 90,87 10,87"', color, 8, ROUND);
        case 'star':
          return `<polygon points="${starPoints()}" fill="${color.hex}" stroke="${color.outline}" stroke-width="5" stroke-linejoin="round" paint-order="stroke"/>`;
        default:
          return '';
      }

    case 'piece':
      return pieceFragment(item.value, color);

    case 'text':
      switch (item.value) {
        case 'sym:+':
          return stroked('path', 'd="M50 24V76M24 50H76"', color, 11, ROUND);
        case 'sym:x':
          return stroked('path', 'd="M28 28L72 72M72 28L28 72"', color, 11, ROUND);
        case 'sym:-':
          return stroked('path', 'd="M24 50H76"', color, 11, ROUND);
        default: {
          const length = item.value.length;
          const size = length <= 1 ? 66 : length === 2 ? 56 : 90 / (length * 0.62);
          return (
            `<text x="50" y="53" text-anchor="middle" dominant-baseline="central" font-size="${number(size)}" ${TEXT_STYLE} ` +
            `fill="${color.hex}" stroke="${color.outline}" stroke-width="7">${escapeText(item.value)}</text>`
          );
        }
      }

    default:
      return '';
  }
}

/** Trait, flèche ou flèche double entre deux points (unités de 100 par case). */
function linkFragment(fullType, ax, ay, bx, by, color, preview = false) {
  const dashed = fullType.charAt(0) === 'd'; // dline, darrow, darrow2
  const type = dashed ? fullType.slice(1) : fullType; // line, arrow ou arrow2
  const dx = bx - ax;
  const dy = by - ay;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const px = -uy;
  const py = ux;

  // aperçu : pointes réduites, le trait s'étend sur toute la longueur comme pour le trait simple
  const inset = preview ? 3 : 12;
  const headLength = preview ? 22 : 34;
  const headHalf = preview ? 15 : 22;

  const headAt = (tipX, tipY, sign) => {
    const tx = tipX - sign * ux * inset;
    const ty = tipY - sign * uy * inset;
    const baseX = tx - sign * ux * headLength;
    const baseY = ty - sign * uy * headLength;
    return {
      base: [baseX, baseY],
      points:
        `${number(tx)},${number(ty)} ` +
        `${number(baseX + px * headHalf)},${number(baseY + py * headHalf)} ` +
        `${number(baseX - px * headHalf)},${number(baseY - py * headHalf)}`,
    };
  };

  const endHead = type === 'line' ? null : headAt(bx, by, 1);
  const startHead = type === 'arrow2' ? headAt(ax, ay, -1) : null;
  const from = startHead ? startHead.base : [ax, ay];
  const to = endHead ? endHead.base : [bx, by];
  const shaft = `x1="${number(from[0])}" y1="${number(from[1])}" x2="${number(to[0])}" y2="${number(to[1])}"`;
  const heads = [endHead, startHead].filter(Boolean);

  // pointillé : tirets à bouts arrondis (le liseré clair, plus large, déborde de chaque côté des tirets)
  const dash = dashed ? ` stroke-dasharray="${preview ? '6 28' : '22 38'}"` : '';
  const layer = (paint, width, headWidth) =>
    `<line ${shaft} stroke="${paint}" stroke-width="${width}" stroke-linecap="round"${dash}/>` +
    heads
      .map((head) => `<polygon points="${head.points}" fill="${paint}" stroke="${paint}" stroke-width="${headWidth}" stroke-linejoin="round"/>`)
      .join('');

  return `<g opacity=".92">${layer(color.outline, 21, 7)}${layer(color.hex, 14, 2)}</g>`;
}

/** Coin supérieur gauche d'une case dans le SVG de 800 × 800 unités. */
function squareOrigin(key, white) {
  const file = key.charCodeAt(0) - 97;
  const rank = parseInt(key[1], 10) - 1;
  return white ? [file * 100, (7 - rank) * 100] : [(7 - file) * 100, rank * 100];
}

/** Groupes de cases d'un type de zone, par couleur et par style de coins, dans l'ordre d'apparition. */
function zoneGroups(items, type, white) {
  const groups = new Map();
  for (const item of items) {
    if (item.type !== type) continue;
    const [x, y] = squareOrigin(item.key, white);
    const id = item.color + (item.round ? '|r' : '');
    if (!groups.has(id)) groups.set(id, { colorId: item.color, round: Boolean(item.round), cells: [] });
    groups.get(id).cells.push([x / 100, y / 100]);
  }
  return [...groups.values()];
}

// Coins arrondis : rayon du bord extérieur de la zone, en unités de 100 par case (« légèrement » arrondis)
export const CORNER_RADIUS = 16;

/**
 * Tracé d'une boucle de sommets ; avec `radius`, les coins saillants (vers l'extérieur de la zone) sont arrondis
 * et les coins rentrants restent vifs, de sorte que les cases sélectionnées restent entièrement couvertes.
 * L'intérieur est à droite du sens de parcours (voir borderLoops) : un virage à droite est un coin saillant.
 */
function loopPath(points, radius) {
  const count = points.length;
  let d = '';
  for (let i = 0; i < count; i++) {
    const previous = points[(i + count - 1) % count];
    const current = points[i];
    const next = points[(i + 1) % count];
    const inLength = Math.hypot(current[0] - previous[0], current[1] - previous[1]);
    const outLength = Math.hypot(next[0] - current[0], next[1] - current[1]);
    const inDir = [(current[0] - previous[0]) / inLength, (current[1] - previous[1]) / inLength];
    const outDir = [(next[0] - current[0]) / outLength, (next[1] - current[1]) / outLength];
    const convex = inDir[0] * outDir[1] - inDir[1] * outDir[0] > 0;
    const r = radius && convex ? Math.min(radius, inLength / 2, outLength / 2) : 0;
    const command = i === 0 ? 'M' : 'L';
    if (r > 0) {
      const start = [current[0] - inDir[0] * r, current[1] - inDir[1] * r];
      const end = [current[0] + outDir[0] * r, current[1] + outDir[1] * r];
      d += `${command}${number(start[0])} ${number(start[1])}A${number(r)} ${number(r)} 0 0 1 ${number(end[0])} ${number(end[1])}`;
    } else {
      d += `${command}${number(current[0])} ${number(current[1])}`;
    }
  }
  return d + 'Z';
}

/**
 * Tracé (attribut d) du contour des cases, décalé vers l'intérieur de `inset` ; chemin vide s'il n'y a rien à tracer.
 * round : coins saillants arrondis, de sorte que le bord extérieur (inset 0, ou bord extérieur du trait de largeur
 * 2 x inset) ait le rayon CORNER_RADIUS.
 */
function zonePath(cells, inset, round = false) {
  const radius = round ? Math.max(CORNER_RADIUS - inset, 1) : 0;
  return borderLoops(cells)
    .map((loop) => insetLoop(loop, inset))
    .filter((points) => points.length >= 3)
    .map((points) => loopPath(points, radius))
    .join('');
}

// Hachures des zones : traits fins « \\ » (perpendiculaires à celles des cases sombres du mode Diagramme),
// environ 7 à 8 traits par case. Le motif est ancré sur l'échiquier : deux zones voisines se raccordent.
const HATCH_SPACING = 9.4; // écart entre deux traits (unités de 100 par case) : 100 / 7,5 hachures / racine de 2
const HATCH_WIDTH = 3.2;

function hatchPattern(id, color, spacing = HATCH_SPACING, width = HATCH_WIDTH) {
  return (
    `<pattern id="${id}" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">` +
    `<line x1="${spacing / 2}" y1="0" x2="${spacing / 2}" y2="${spacing}" stroke="${color.hex}" stroke-width="${width}"/></pattern>`
  );
}

const BORDER_INSET = 3; // la bordure (trait de 6) occupe les 6 unités les plus extérieures de la zone
const BORDER_WIDTH = 6;

/**
 * Zones, de dessous en dessus : « fill » (couleur seule), « shade » (hachures seules), « zone » (bordure + couleur),
 * « hatch » (bordure + hachures) puis « border » (bordure seule). Sans bordure, le tracé suit exactement le bord des
 * cases ; avec bordure, le trait est tout entier à l'intérieur des cases. Aucun liseré clair autour des bordures.
 */
function zonesFragment(items, white) {
  let defs = '';
  let body = '';

  for (const { colorId, round, cells } of zoneGroups(items, 'fill', white)) {
    const color = COLOR_BY_ID[colorId] || COLOR_BY_ID.rouge;
    const d = zonePath(cells, 0, round);
    if (d) body += `<path d="${d}" fill="${color.hex}" fill-opacity=".5" fill-rule="evenodd"/>`;
  }

  for (const { colorId, round, cells } of zoneGroups(items, 'shade', white)) {
    const color = COLOR_BY_ID[colorId] || COLOR_BY_ID.rouge;
    const d = zonePath(cells, 0, round);
    if (!d) continue;
    const id = 'mk-hatch-' + color.id;
    if (!defs.includes(`id="${id}"`)) defs += hatchPattern(id, color);
    body += `<path d="${d}" fill="url(#${id})" fill-rule="evenodd"/>`;
  }

  for (const { colorId, round, cells } of zoneGroups(items, 'zone', white)) {
    const color = COLOR_BY_ID[colorId] || COLOR_BY_ID.rouge;
    const d = zonePath(cells, BORDER_INSET, round);
    if (d) body += `<path d="${d}" fill="${color.hex}" fill-opacity=".5" fill-rule="evenodd" stroke="${color.hex}" stroke-width="${BORDER_WIDTH}" ${MITER}/>`;
  }

  for (const { colorId, round, cells } of zoneGroups(items, 'hatch', white)) {
    const color = COLOR_BY_ID[colorId] || COLOR_BY_ID.rouge;
    const d = zonePath(cells, BORDER_INSET, round);
    if (!d) continue;
    const id = 'mk-hatch-' + color.id;
    if (!defs.includes(`id="${id}"`)) defs += hatchPattern(id, color);
    body += `<path d="${d}" fill="url(#${id})" fill-rule="evenodd" stroke="${color.hex}" stroke-width="${BORDER_WIDTH}" ${MITER}/>`;
  }

  for (const { colorId, round, cells } of zoneGroups(items, 'border', white)) {
    const color = COLOR_BY_ID[colorId] || COLOR_BY_ID.rouge;
    const d = zonePath(cells, BORDER_INSET, round);
    if (d) body += `<path d="${d}" fill="none" stroke="${color.hex}" stroke-width="${BORDER_WIDTH}" ${MITER}/>`;
  }

  return (defs ? `<defs>${defs}</defs>` : '') + body;
}

const RANK = { piece: 1, shape: 2, line: 3, dline: 3, arrow: 3, darrow: 3, arrow2: 3, darrow2: 3, text: 4, label: 5 };

/**
 * SVG complet des annotations pour l'orientation donnée.
 * pending : case de départ d'un trait ou d'une flèche en cours de tracé (anneau pointillé).
 */
export function renderSvg(items, white, pending = null) {
  const ordered = items.filter((item) => !ZONE_TYPES.has(item.type)).sort((a, b) => RANK[a.type] - RANK[b.type]);
  let body = zonesFragment(items, white);

  for (const item of ordered) {
    const color = COLOR_BY_ID[item.color] || COLOR_BY_ID.rouge;

    if (TWO_CLICK.has(item.type)) {
      const [fx, fy] = squareOrigin(item.from, white);
      const [tx, ty] = squareOrigin(item.to, white);
      body += linkFragment(item.type, fx + 50, fy + 50, tx + 50, ty + 50, color);
      continue;
    }

    const [x, y] = squareOrigin(item.key, white);

    if (item.type === 'label') {
      // centré sur la case ; peut déborder sur les voisines mais jamais hors de l'échiquier
      const text = String(item.value);
      let size = 44;
      let width = text.length * size * 0.62;
      if (width > 780) {
        size = 780 / (text.length * 0.62);
        width = 780;
      }
      const center = Math.min(Math.max(x + 50, 8 + width / 2), 792 - width / 2);
      body +=
        `<text x="${number(center)}" y="${number(y + 53)}" text-anchor="middle" dominant-baseline="central" font-size="${number(size)}" ${TEXT_STYLE} ` +
        `fill="${color.hex}" stroke="${color.outline}" stroke-width="7">${escapeText(text)}</text>`;
      continue;
    }

    body += `<g transform="translate(${x} ${y})">${squareFragment(item, color)}</g>`;
  }

  if (pending) {
    const [x, y] = squareOrigin(pending, white);
    body += `<g transform="translate(${x} ${y})"><circle cx="50" cy="50" r="44" fill="none" stroke="#2f6fd6" stroke-width="6" stroke-dasharray="11 9"/></g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%" aria-hidden="true">${body}</svg>`;
}

/** Petit SVG de prévisualisation d'un outil (boutons de la palette). */
export function glyphSvg(type, value, colorId, round = false) {
  const color = COLOR_BY_ID[colorId] || COLOR_BY_ID.rouge;
  const hex = color.hex;
  const corner = round ? 12 : 0; // rayon d'arrondi des petits carrés de la palette
  // identifiant propre à chaque bouton : un motif défini dans un groupe masqué (display:none) ne s'afficherait pas ailleurs
  const hatchId = `mk-hatch-glyph-${color.id}-${type}-${round ? 'r' : 's'}`;
  // trait plus gros et plus espacé que sur l'échiquier : lisible dans un petit bouton
  const hatchDefs = `<defs>${hatchPattern(hatchId, color, 13, 5)}</defs>`;
  let inner;
  if (TWO_CLICK.has(type)) inner = linkFragment(type, 20, 80, 80, 20, color, true);
  else if (type === 'border') inner = `<rect x="14" y="14" width="72" height="72" rx="${corner}" fill="none" stroke="${hex}" stroke-width="8"/>`;
  else if (type === 'fill') inner = `<rect x="10" y="10" width="80" height="80" rx="${corner}" fill="${hex}" fill-opacity=".5"/>`;
  else if (type === 'zone') inner = `<rect x="14" y="14" width="72" height="72" rx="${corner}" fill="${hex}" fill-opacity=".5" stroke="${hex}" stroke-width="8"/>`;
  else if (type === 'shade') inner = `${hatchDefs}<rect x="10" y="10" width="80" height="80" rx="${corner}" fill="url(#${hatchId})"/>`;
  else if (type === 'hatch') inner = `${hatchDefs}<rect x="14" y="14" width="72" height="72" rx="${corner}" fill="url(#${hatchId})" stroke="${hex}" stroke-width="8"/>`;
  else inner = squareFragment({ type, value }, color);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true">${inner}</svg>`;
}
