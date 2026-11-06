import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FORMATS, buildDiagram, finalFilename, formatForFilename, makePdf, sizeSvg } from '../src/diagram.js';

const PIECE = readFileSync(new URL('../public/pieces/alpha/wK.svg', import.meta.url), 'utf8');
const pieceSvgs = { wK: PIECE, bK: PIECE, wP: PIECE };
const count = (text, pattern) => (text.match(pattern) || []).length;

test('diagramme : fond blanc, 64 cases colorées, coordonnées a-h et 1-8, aucune case hachurée', () => {
  const { svg, width, height } = buildDiagram({ pieces: [], light: '#f0d9b5', dark: '#bdac8d' });
  assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 [\d.]+ [\d.]+"/);
  assert.match(svg, /<rect width="[\d.]+" height="[\d.]+" fill="#ffffff"\/>/);            // fond blanc sur toute la surface
  assert.equal(count(svg, /fill="#f0d9b5"/g), 32);
  assert.equal(count(svg, /fill="#bdac8d"/g), 32);
  assert.doesNotMatch(svg, /pattern/);
  assert.deepEqual([...svg.matchAll(/<text[^>]*>([a-h1-8])<\/text>/g)].map((m) => m[1]).filter((c) => /[a-h]/.test(c)), [...'abcdefgh']);
  assert.deepEqual([...svg.matchAll(/<text[^>]*>([a-h1-8])<\/text>/g)].map((m) => m[1]).filter((c) => /[1-8]/.test(c)), [...'87654321']);
  assert.ok(width > 800 && height > 800 && height > width, 'marges + lettres sous l’échiquier : plus haut que large');
});

test('diagramme : retourné, les coordonnées s’inversent et les pièces changent de place', () => {
  const pieces = [['e1', 'wK'], ['e8', 'bK']];
  const normal = buildDiagram({ pieces, pieceSvgs });
  const flipped = buildDiagram({ pieces, pieceSvgs, orientation: 'black' });
  const letters = (d) => [...d.svg.matchAll(/<text[^>]*>([a-h])<\/text>/g)].map((m) => m[1]).join('');
  assert.equal(letters(normal), 'abcdefgh');
  assert.equal(letters(flipped), 'hgfedcba');
  const positions = (d) => [...d.svg.matchAll(/<svg [^>]*x="([\d.]+)" y="([\d.]+)" width="100" height="100"/g)].map((m) => [+m[1], +m[2]]);
  const [a, b] = positions(normal); const [c, e] = positions(flipped);
  assert.equal(positions(normal).length, 2);
  assert.ok(a[1] > b[1]);                       // Blancs en bas : le roi blanc (e1) est plus bas que le roi noir (e8)
  assert.ok(c[1] < e[1]);                       // retourné : l’inverse
  assert.equal(a[0], b[0]);                     // même colonne (e) dans les deux cas
});

test('diagramme : mode Diag. = cases blanches / 32 cases hachurées + contour noir, mêmes réglages que style.css', () => {
  const { svg } = buildDiagram({ diag: true });
  assert.match(svg, /<pattern id="dg-hatch" width="7\.5" height="7\.5"[^>]*rotate\(45\)/);
  assert.match(svg, /stroke="#a3a3a3" stroke-width="4"/);
  const hatchedGroup = svg.match(/<g fill="url\(#dg-hatch\)">(.*?)<\/g>/)[1];
  assert.equal(count(hatchedGroup, /<rect /g), 32);
  assert.doesNotMatch(hatchedGroup, /x="0" y="0"/);                                           // a8 (haut gauche) reste blanche
  assert.match(svg, /fill="none" stroke="#000000" stroke-width="3\.77"/);                      // contour noir
});

test('diagramme : taille des coordonnées (petites / moyennes / grandes) = 0,30 / 0,45 / 0,60 case', () => {
  const size = (scale) => Number(buildDiagram({ coordScale: scale }).svg.match(/font-size="([\d.]+)"/)[1]);
  assert.equal(size(1), 30); assert.equal(size(1.5), 45); assert.equal(size(2), 60);
});

test('diagramme : annotations insérées à l’échelle de l’échiquier, pièces inconnues ignorées', () => {
  const marks = '<circle cx="50" cy="50" r="40"/>';
  const { svg } = buildDiagram({ pieces: [['a1', 'wP'], ['b2', 'xx'], ['z9', 'wP']], pieceSvgs, marksInner: marks });
  assert.match(svg, /<svg x="[\d.]+" y="[\d.]+" width="800" height="800" viewBox="0 0 800 800"><circle cx="50" cy="50" r="40"\/><\/svg>/);
  assert.equal(count(svg, /<svg [^>]*width="100" height="100"/g), 1);    // seule la pièce valide (a1) est dessinée
  assert.doesNotMatch(buildDiagram({ pieceSvgs }).svg, /viewBox="0 0 800 800"/);   // sans annotations : pas de calque
});

test('dimensions de sortie : rapport conservé, en-tête XML pour un fichier .svg', () => {
  const d = buildDiagram({});
  const sized = sizeSvg(d.svg, d.width, d.height, 1600, true);
  assert.equal(sized.width, 1600);
  assert.equal(sized.height, Math.round((1600 * d.height) / d.width));
  assert.match(sized.svg, /^<\?xml version="1\.0" encoding="UTF-8"\?>\n<svg /);
  assert.match(sized.svg, new RegExp(`width="1600" height="${sized.height}"`));
  assert.doesNotMatch(sizeSvg(d.svg, d.width, d.height, 800).svg, /<\?xml/);
});

test('noms de fichier : « diagramme.png » par défaut, extension liée au format', () => {
  const [png, jpeg, webp, pdf, svg] = FORMATS;
  assert.equal(formatForFilename('diagramme.png'), png);
  assert.equal(formatForFilename('Mon Diagramme.JPG'), jpeg);
  assert.equal(formatForFilename('x.jpeg'), jpeg);
  assert.equal(formatForFilename('x.webp'), webp);
  assert.equal(formatForFilename('x.PDF'), pdf);
  assert.equal(formatForFilename('x.svg'), svg);
  assert.equal(formatForFilename('v1.2'), null);
  assert.equal(formatForFilename('sans extension'), null);
  assert.equal(finalFilename('diagramme.png', png), 'diagramme.png');
  assert.equal(finalFilename('diagramme.png', pdf), 'diagramme.pdf');          // changer de format change l’extension
  assert.equal(finalFilename('mon diagramme', jpeg), 'mon diagramme.jpg');
  assert.equal(finalFilename('v1.2', png), 'v1.2.png');                        // « .2 » n’est pas une extension de format
  assert.equal(finalFilename('  ', png), 'diagramme.png');
  assert.equal(finalFilename('a/b:c*?.png', png), 'a_b_c__.png');              // caractères interdits remplacés
  assert.equal(finalFilename('fin.', svg), 'fin.svg');
});

test('PDF : structure valide (en-tête, table xref exacte, une page, image pleine page)', () => {
  const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);          // un pixel 2 x 2 en RGB, non compressé (test de structure)
  const pdf = makePdf({ data, filter: 'FlateDecode', width: 2, height: 2, dpi: 144 });
  const text = Buffer.from(pdf).toString('latin1');
  assert.ok(text.startsWith('%PDF-1.4\n'));
  assert.ok(text.trimEnd().endsWith('%%EOF'));
  assert.match(text, /\/MediaBox \[0 0 1 1\]/);                                    // 2 px à 144 dpi = 1 pt
  assert.match(text, /\/Width 2 \/Height 2 \/ColorSpace \/DeviceRGB \/BitsPerComponent 8 \/Filter \/FlateDecode/);
  const xref = text.match(/startxref\n(\d+)\n/);
  assert.equal(text.slice(Number(xref[1]), Number(xref[1]) + 4), 'xref');
  const entries = [...text.slice(Number(xref[1])).matchAll(/(\d{10}) 00000 n /g)].map((m) => Number(m[1]));
  assert.equal(entries.length, 5);
  entries.forEach((offset, index) => assert.equal(text.slice(offset, offset + `${index + 1} 0 obj`.length), `${index + 1} 0 obj`));
});
