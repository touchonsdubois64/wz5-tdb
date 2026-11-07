import test from 'node:test';
import assert from 'node:assert/strict';
import { COLORS, NUMBERS, SHAPES, borderLoops, createMarkSet, decodeMarks, encodeMarks, glyphSvg, insetLoop, renderSvg } from '../src/marks.js';

test('13 couleurs (marron après le blanc, vert clair après le vert), liseré blanc partout sauf pour le blanc', () => {
  assert.deepEqual(COLORS.map((c) => c.id), ['noir','gris','blanc','marron','rouge','orange','jaune','vert','vertclair','cyan','bleu','violet','rose']);
  for (const c of COLORS) assert.equal(c.outline, c.id === 'blanc' ? '#141414' : '#ffffff', c.id);
});

test('nombres de 0 à 20 et ordre des formes', () => {
  assert.equal(NUMBERS.length, 21); assert.equal(NUMBERS[0], '0'); assert.equal(NUMBERS[20], '20');
  assert.deepEqual(SHAPES.map((s) => s.value || s.type), ['circle','square','box','diamond','triangle','star','disc','line','dline','arrow','darrow','arrow2','darrow2','sym:+','sym:x','sym:-']);
});

test('pose, remplacement et retrait d’un élément de case', () => {
  const m = createMarkSet();
  m.placeSquare('e4', 'shape', 'circle', 'rouge');
  m.placeSquare('e4', 'shape', 'square', 'rouge');
  assert.equal(m.items.length, 1); assert.equal(m.items[0].value, 'square');
  m.placeSquare('e4', 'shape', 'square', 'bleu'); assert.equal(m.items[0].color, 'bleu');
  m.placeSquare('e4', 'text', 'a', 'bleu'); assert.equal(m.items.length, 2);
  m.placeSquare('e4', 'label', "a''", 'bleu'); assert.equal(m.items.length, 3);
  m.placeSquare('e4', 'piece', 'K:b', 'rouge'); assert.equal(m.items.length, 4);
  m.placeSquare('e4', 'shape', 'square', 'bleu'); assert.equal(m.items.length, 3);
});

test('traits, flèches et flèches doubles', () => {
  const m = createMarkSet();
  m.toggleLink('arrow', 'a1', 'h8', 'vert');
  m.toggleLink('arrow', 'h8', 'a1', 'vert');          // sens inverse : autre flèche
  assert.equal(m.items.length, 2);
  m.toggleLink('line', 'a1', 'h8', 'rouge');
  m.toggleLink('line', 'h8', 'a1', 'rouge');          // un trait n'a pas de sens : bascule
  assert.equal(m.items.length, 2);
  m.toggleLink('arrow2', 'c3', 'f6', 'noir'); m.toggleLink('arrow2', 'f6', 'c3', 'bleu');
  assert.equal(m.items.length, 3); assert.equal(m.items[2].color, 'bleu');
  m.eraseAt('h8'); assert.deepEqual(m.items.map((i) => i.type), ['arrow2']);
});

test('zone : bascule par couleur ; la gomme retire la case', () => {
  const m = createMarkSet();
  m.toggleBorder('d4', 'rouge'); m.toggleBorder('d4', 'bleu'); assert.equal(m.items.length, 2);
  m.toggleBorder('d4', 'rouge'); assert.equal(m.items.length, 1);
  m.eraseAt('d4'); assert.ok(m.isEmpty());
});

const loops = (cells) => borderLoops(cells).map((l) => l.length);

test('contours : 1 case, domino, 3 alignées, L, trou, contact diagonal', () => {
  assert.deepEqual(loops([[0,0]]), [4]);
  assert.deepEqual(loops([[0,0],[1,0]]), [6]);                         // 6 sommets bruts (4 après suppression des alignés)
  assert.deepEqual(insetLoop(borderLoops([[0,0],[1,0]])[0], 8).length, 4);   // rectangle 1×2
  assert.deepEqual(insetLoop(borderLoops([[0,0],[1,0],[2,0]])[0], 8).length, 4); // rectangle 1×3
  assert.equal(insetLoop(borderLoops([[0,0],[0,1],[1,1]])[0], 8).length, 6);    // L
  const ring = [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2]];                 // anneau 3×3 : 2 contours
  assert.equal(borderLoops(ring).length, 2);
  assert.equal(borderLoops([[0,0],[1,1]]).length, 2);                              // contact diagonal : 2 contours
  assert.equal(borderLoops([[0,0],[1,0],[0,1],[1,1]]).length, 1);                  // bloc 2×2 : 1 contour
});

test('contour décalé vers l’intérieur', () => {
  const pts = insetLoop(borderLoops([[2,3]])[0], 8);
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  assert.equal(Math.min(...xs), 208); assert.equal(Math.max(...xs), 292);
  assert.equal(Math.min(...ys), 308); assert.equal(Math.max(...ys), 392);
});

test('rendu SVG : orientation, texte libre qui reste dans l’échiquier, figurines, zones', () => {
  const m = createMarkSet();
  m.placeSquare('a1', 'shape', 'star', 'rouge');
  m.placeSquare('h8', 'text', '20', 'bleu');
  m.placeSquare('a4', 'label', "longtexte''", 'noir');
  m.placeSquare('e5', 'piece', 'Q:w', 'vert'); m.placeSquare('e6', 'piece', 'N:b', 'blanc');
  m.toggleBorder('b2', 'orange'); m.toggleBorder('b3', 'orange');
  m.toggleLink('arrow2', 'a1', 'h8', 'vert');
  const svg = renderSvg(m.items, true);
  assert.match(svg, /translate\(0 700\)/); assert.match(svg, /translate\(700 0\)/);
  assert.match(svg, />20</); assert.match(svg, /longtexte/);
  assert.equal((svg.match(/<polygon/g) || []).length >= 3, true);       // étoile + 2 pointes de flèche double
  const x = Number(svg.match(/<text x="([\d.]+)"[^>]*>longtexte/)[1]);
  assert.ok(x >= 8 + 1 && x <= 792, 'texte libre dans les limites : ' + x);
  assert.match(svg, /M\d/);                                              // tracé de zone
  const black = renderSvg(m.items, false);
  assert.notEqual(black, svg);
  assert.match(renderSvg([], true, 'e4'), /stroke-dasharray/);
});

test('texte libre collé au bord : décalé vers l’intérieur', () => {
  const m = createMarkSet();
  m.placeSquare('h5', 'label', 'abcdefgh', 'rouge');
  const svg = renderSvg(m.items, true);
  const x = Number(svg.match(/<text x="([\d.]+)"/)[1]);
  assert.ok(x < 750, 'recentré à gauche : ' + x);
  m.clear(); m.placeSquare('a5', 'label', 'abcdefgh', 'rouge');
  const x2 = Number(renderSvg(m.items, true).match(/<text x="([\d.]+)"/)[1]);
  assert.ok(x2 > 50, 'recentré à droite : ' + x2);
});

test('aperçus des outils', () => {
  for (const s of SHAPES) assert.match(glyphSvg(s.type, s.value, 'rouge'), /^<svg/);
  assert.match(glyphSvg('piece', 'K:b', 'bleu'), /<path/);
  assert.match(glyphSvg('piece', 'P:w', 'blanc'), /<path/);
});

test('zones : bascule, rendu fusionné à 50 % de transparence, sans liseré clair', () => {
  const m = createMarkSet();
  m.toggleZone('b2', 'rouge'); m.toggleZone('c2', 'rouge'); m.toggleZone('b3', 'bleu');
  assert.equal(m.items.length, 3);
  const svg = renderSvg(m.items, true);
  assert.equal((svg.match(/fill-opacity="\.5"/g) || []).length, 2);           // une zone par couleur
  assert.ok(!/stroke="#ffffff"[^>]*fill-opacity/.test(svg) && !/fill-opacity[^>]*stroke="#ffffff"/.test(svg));
  m.toggleZone('b2', 'rouge'); assert.equal(m.items.length, 2);
  m.eraseAt('c2'); assert.equal(m.items.length, 1);
});

test('carré à angles droits : joints vifs, comme un contour à une case', () => {
  const m = createMarkSet();
  m.placeSquare('d4', 'shape', 'box', 'vert');
  assert.match(renderSvg(m.items, true), /miter/);
  m.clear(); m.toggleBorder('d4', 'vert');
  assert.match(renderSvg(m.items, true), /miter/);
});

test('traits, flèches et flèches doubles pointillés : mêmes règles, tirets sur le fût seulement', () => {
  const m = createMarkSet();
  m.toggleLink('darrow', 'a1', 'h8', 'vert');
  m.toggleLink('darrow', 'h8', 'a1', 'vert');          // la flèche pointillée a un sens, comme la flèche pleine
  assert.equal(m.items.length, 2);
  m.toggleLink('dline', 'a1', 'h8', 'rouge');
  m.toggleLink('dline', 'h8', 'a1', 'rouge');          // un trait n'a pas de sens : bascule
  assert.equal(m.items.length, 2);
  m.toggleLink('line', 'a1', 'h8', 'rouge');           // le trait plein est un autre élément que le pointillé
  assert.equal(m.items.length, 3);
  const dashed = renderSvg([{ type: 'darrow2', color: 'bleu', from: 'c3', to: 'f6' }], true);
  const plain = renderSvg([{ type: 'arrow2', color: 'bleu', from: 'c3', to: 'f6' }], true);
  assert.match(dashed, /stroke-dasharray=/); assert.doesNotMatch(plain, /stroke-dasharray=/);
  assert.equal((dashed.match(/<polygon/g) || []).length, (plain.match(/<polygon/g) || []).length); // pointes inchangées
  assert.match(glyphSvg('dline', '', 'rouge'), /stroke-dasharray=/);
});

test('zone sans bordure : cases entièrement recouvertes, 50 % de transparence, aucun contour', () => {
  const m = createMarkSet();
  m.toggleZone('d4', 'vert', 'fill'); m.toggleZone('d5', 'vert', 'fill'); m.toggleZone('d4', 'vert', 'zone');
  assert.deepEqual(m.items.map((i) => i.type), ['fill', 'fill', 'zone']);
  const svg = renderSvg(m.items.filter((i) => i.type === 'fill'), true);
  assert.match(svg, /fill-opacity="\.5"/); assert.doesNotMatch(svg, /stroke=/);
  const points = svg.match(/<path d="([^"]+)"/)[1].match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = points.filter((_, i) => i % 2 === 0); const ys = points.filter((_, i) => i % 2 === 1);
  assert.equal(points.length, 8);                                              // un rectangle : 4 sommets
  assert.deepEqual([Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)], [300, 400, 300, 500]); // d5 + d4, sans retrait
  m.toggleZone('d4', 'vert', 'fill'); assert.equal(m.items.filter((i) => i.type === 'fill').length, 1);
  m.eraseAt('d5'); assert.deepEqual(m.items.map((i) => i.type), ['zone']);
});

test('zone hachurée : motif diagonal de la couleur choisie, même bordure que la zone colorée', () => {
  const svg = renderSvg([{ type: 'hatch', value: '', color: 'rouge', key: 'e4' }], true);
  assert.match(svg, /<pattern id="mk-hatch-rouge"/);
  assert.match(svg, /patternTransform="rotate\(-45\)"/);        // perpendiculaire aux hachures « / » du mode Diagramme
  assert.match(svg, /fill="url\(#mk-hatch-rouge\)"/);
  assert.match(svg, /stroke="#e02424" stroke-width="6"/);        // bordure identique à la zone colorée
  const zone = renderSvg([{ type: 'zone', value: '', color: 'rouge', key: 'e4' }], true);
  assert.equal(svg.match(/<path d="([^"]+)"/)[1], zone.match(/<path d="([^"]+)"/)[1]); // même contour
  const spacing = Number(svg.match(/<pattern id="mk-hatch-rouge" width="([\d.]+)"/)[1]);
  const hatchesPerSquare = 100 / (spacing * Math.SQRT2);
  assert.ok(hatchesPerSquare >= 7 && hatchesPerSquare <= 8, 'hachures par case : ' + hatchesPerSquare);
  assert.match(glyphSvg('hatch', '', 'vert'), /<pattern/); assert.match(glyphSvg('fill', '', 'vert'), /fill-opacity/);
});

test('code texte : nouveaux genres, aller-retour et regroupement', () => {
  const m = createMarkSet();
  m.toggleLink('dline', 'a1', 'c3', 'rouge'); m.toggleLink('darrow', 'e2', 'e4', 'bleu'); m.toggleLink('darrow', 'g1', 'f3', 'bleu');
  m.toggleLink('darrow2', 'b1', 'b7', 'noir');
  for (const k of ['d4', 'd5', 'e5']) m.toggleZone(k, 'vert', 'fill');
  for (const k of ['a8', 'b8']) m.toggleZone(k, 'orange', 'hatch');
  const code = encodeMarks(m.items);
  assert.equal(code, 'dline:rouge:a1>c3 darrow:bleu:e2>e4,g1>f3 darrow2:noir:b1>b7 fill:vert:d4,d5,e5 hatch:orange:a8,b8');
  const back = decodeMarks(code);
  assert.deepEqual(back.errors, []);
  for (const white of [true, false]) assert.equal(renderSvg(back.items, white), renderSvg(m.items, white));
  assert.equal(encodeMarks(back.items), code);
});

test('cinq types de zones, à coins droits ou arrondis, sans liseré blanc', () => {
  const m = createMarkSet();
  for (const type of ['border', 'fill', 'zone', 'shade', 'hatch']) m.toggleZone('d4', 'rouge', type);
  assert.deepEqual(m.items.map((i) => i.type), ['border', 'fill', 'zone', 'shade', 'hatch']);
  const straight = renderSvg(m.items, true);
  assert.doesNotMatch(straight, /A\d/);                 // coins droits : aucun arc
  assert.doesNotMatch(straight, /#ffffff/i);              // aucun liseré blanc
  assert.equal((straight.match(/<path/g) || []).length, 5);
  assert.match(straight, /fill="none" stroke="#e02424" stroke-width="6"/);    // bordure seule
  // mêmes zones à coins arrondis : 4 arcs par case isolée et par tracé
  const rounded = renderSvg(m.items.map((i) => ({ ...i, round: true })), true);
  assert.equal((rounded.match(/A/g) || []).length, 5 * 4);
  assert.doesNotMatch(rounded, /#ffffff/i);
});

test('coins arrondis : seuls les coins saillants sont arrondis, les cases restent entièrement couvertes', () => {
  // case d4 (x 300-400, y 400-500) sans bordure : le tracé suit exactement le bord de la case, avec rayon 16
  const one = renderSvg([{ type: 'fill', value: '', color: 'vert', key: 'd4', round: true }], true);
  assert.match(one, /d="M300 416A16 16 0 0 1 316 400L384 400A16 16 0 0 1 400 416L400 484A16 16 0 0 1 384 500L316 500A16 16 0 0 1 300 484Z"/);
  assert.doesNotMatch(one, /stroke=/);
  // avec bordure, le tracé est décalé de 3 et son rayon réduit de 3, pour que le bord extérieur du trait garde le rayon 16
  const bordered = renderSvg([{ type: 'zone', value: '', color: 'vert', key: 'd4', round: true }], true);
  assert.match(bordered, /d="M303 416A13 13 0 0 1 316 403L384 403/);
  // forme en L (3 cases) : 6 coins dont 1 rentrant, donc 5 arcs seulement
  const ell = renderSvg(['d4', 'e4', 'd5'].map((key) => ({ type: 'fill', value: '', color: 'vert', key, round: true })), true);
  assert.equal((ell.match(/A/g) || []).length, 5);
  // zone trouée (anneau de 8 cases) : les 4 coins du trou sont rentrants pour la zone, donc vifs ; 4 arcs pour l'extérieur
  const ring = ['c3','d3','e3','c4','e4','c5','d5','e5'].map((key) => ({ type: 'fill', value: '', color: 'vert', key, round: true }));
  assert.equal((renderSvg(ring, true).match(/A/g) || []).length, 4);
});

test('zones : le style des coins fait partie du code texte (r devant le genre)', () => {
  const m = createMarkSet();
  m.toggleZone('d4', 'vert', 'zone'); m.toggleZone('d5', 'vert', 'zone');
  m.toggleZone('a1', 'vertclair', 'shade', true); m.toggleZone('a2', 'vertclair', 'shade', true);
  m.toggleZone('h1', 'marron', 'border', true);
  const code = encodeMarks(m.items);
  assert.equal(code, 'zone:vert:d4,d5 rshade:vertclair:a1,a2 rborder:marron:h1');
  const back = decodeMarks(code);
  assert.deepEqual(back.errors, []);
  assert.deepEqual(back.items.map((i) => !!i.round), [false, false, true, true, true]);
  for (const white of [true, false]) assert.equal(renderSvg(back.items, white), renderSvg(m.items, white));
  assert.equal(encodeMarks(back.items), code);
  // une case déjà prise dans une zone du même type et de la même couleur se retire, quel que soit le style des coins
  m.toggleZone('d4', 'vert', 'zone', true); assert.equal(m.items.filter((i) => i.type === 'zone').length, 1);
  assert.match(glyphSvg('shade', '', 'marron', true), /rx="12"/);
  assert.match(glyphSvg('border', '', 'vertclair', false), /rx="0"/);
});
