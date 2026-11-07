import test from 'node:test';
import assert from 'node:assert/strict';
import { Chess } from 'chess.js';
import { readFileSync } from 'node:fs';
import { NAG_SUFFIXES, NAG_SYMBOLS, isMoveNag, parsePgn } from '../src/pgn.js';

const line = (node) => { const out = []; for (let n = node; n.children.length; n = n.children[0]) out.push(n.children[0].move.san); return out; };

test('partie simple avec en-têtes, commentaires et NAG', () => {
  const r = parsePgn(`[Event "Test"]
[White "A"]
[Black "B"]

1. e4 {bon coup} e5 $1 2. Nf3 Nc6 3. Bb5 a6 ; fin de ligne
4. Ba4 Nf6 5. O-O Be7 1-0`, Chess);
  assert.equal(r.error, null);
  assert.equal(r.moveCount, 10);
  assert.deepEqual(line(r.root), ['e4','e5','Nf3','Nc6','Bb5','a6','Ba4','Nf6','O-O','Be7']);
  assert.equal(r.title, 'Test');
  assert.equal(r.hasFen, false);
  assert.equal(r.endNode.parent.parent !== null, true);
});

test('variantes imbriquées', () => {
  const r = parsePgn('1. e4 e5 (1... c5 2. Nf3 (2. c3 d5) 2... d6) 2. Nf3 *', Chess);
  assert.equal(r.error, null);
  const e4 = r.root.children[0];
  assert.equal(e4.children.length, 2);               // e5 et c5
  assert.equal(e4.children[0].move.san, 'e5');
  assert.equal(e4.children[1].move.san, 'c5');
  const c5 = e4.children[1];
  assert.equal(c5.children.length, 2);               // Nf3 et c3
  assert.equal(c5.children[1].move.san, 'c3');
  assert.deepEqual(line(r.root), ['e4', 'e5', 'Nf3']);
});

test('en-tête FEN, roques en zéros, coup nul', () => {
  const r = parsePgn(`[SetUp "1"]
[FEN "r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1"]

1. 0-0 0-0-0 2. -- Kb8 3. Rfe1`, Chess);
  assert.equal(r.error, null);
  assert.equal(r.hasFen, true);
  assert.equal(r.moveCount, 5);
  const nul = r.root.children[0].children[0].children[0];
  assert.equal(nul.move.nullMove, true);
  assert.match(nul.fen, / b /);
});

test('coup illégal : résultat partiel et message', () => {
  const r = parsePgn('1. e4 e5 2. Ke4 Nc6', Chess);
  assert.match(r.error, /Ke4/);
  assert.equal(r.moveCount, 2);
  assert.ok(r.root);
});

test('texte inutilisable', () => {
  assert.equal(parsePgn('bonjour tout le monde', Chess).root, null);
  assert.equal(parsePgn('[FEN "n importe quoi"]\n\n1. e4', Chess).root, null);
});

test('seulement un FEN dans les en-têtes', () => {
  const r = parsePgn('[FEN "8/8/8/4k3/8/8/8/K2Q4 w - - 0 1"]', Chess);
  assert.ok(r.root);
  assert.equal(r.moveCount, 0);
  assert.equal(r.hasFen, true);
});

test('première partie seulement', () => {
  const r = parsePgn(`[Event "Un"]

1. e4 e5 *

[Event "Deux"]

1. d4 d5 *`, Chess);
  assert.equal(r.moveCount, 2);
  assert.equal(r.title, 'Un');
});

test('mat détecté dans le commentaire', () => {
  const r = parsePgn('1. f3 e5 2. g4 Qh4#', Chess);
  assert.equal(r.endNode.comment, 'Mat');
});

test('PGN sur une seule ligne, en-têtes compris', () => {
  const r = parsePgn('[Event "Une ligne"] [FEN "8/8/8/4k3/8/8/8/K2Q4 w - - 0 1"] 1. Qd5+ Kf4 2. Qd2+ *', Chess);
  assert.equal(r.error, null);
  assert.equal(r.hasFen, true);
  assert.equal(r.moveCount, 3);
  assert.equal(r.title, 'Une ligne');
});

test('deux parties sur une seule ligne : la première seulement', () => {
  const r = parsePgn('[Event "A"] 1. e4 e5 * [Event "B"] 1. d4 d5 *', Chess);
  assert.equal(r.moveCount, 2);
  assert.equal(r.title, 'A');
});

test('commentaires, flèches et cercles', () => {
  const r = parsePgn('{Introduction} 1. e4 {Bon coup [%cal Ge2e4,Rd1h5] [%csl Yd5] [%clk 0:10:00]} e5 {Réponse} 2. Nf3 *', Chess);
  assert.equal(r.error, null);
  assert.equal(r.root.note, 'Introduction');
  const e4 = r.root.children[0];
  assert.equal(e4.note, 'Bon coup');
  assert.deepEqual(e4.shapes, [
    { orig: 'e2', dest: 'e4', brush: 'green' },
    { orig: 'd1', dest: 'h5', brush: 'red' },
    { orig: 'd5', brush: 'yellow' },
  ]);
  assert.equal(e4.children[0].note, 'Réponse');
  assert.equal(r.moveCount, 3);
});

test('commentaire dans une variante', () => {
  const r = parsePgn('1. e4 e5 (1... c5 {Sicilienne [%csl Rc5]}) 2. Nf3', Chess);
  const c5 = r.root.children[0].children[1];
  assert.equal(c5.note, 'Sicilienne');
  assert.deepEqual(c5.shapes, [{ orig: 'c5', brush: 'red' }]);
});

test('point-virgule et % à l\'intérieur d\'un commentaire { } : ils font partie du texte', () => {
  const r = parsePgn(`1. e4 { le Roi sort; le Cavalier suit
% ligne qui commence par un pourcentage
et la phrase continue } e5 2. Nf3 ; commentaire de ligne : ignoré
Nc6
% ligne d'échappement hors commentaire : ignorée
3. Bb5 *`, Chess);
  assert.equal(r.error, null);
  assert.equal(r.moveCount, 5);
  assert.deepEqual(line(r.root), ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5']);
  assert.match(r.root.children[0].note, /le Roi sort; le Cavalier suit/);
  assert.match(r.root.children[0].note, /% ligne qui commence par un pourcentage et la phrase continue/);
});

test('chapitre Lichess TdB2-4 (commentaires avec « ; », variantes imbriquées) : lu en entier', () => {
  const r = parsePgn(readFileSync(new URL('./tdb2-4.pgn', import.meta.url), 'utf8'), Chess);
  assert.equal(r.error, null);
  assert.equal(r.moveCount, 42);                    // 42 coups dans la ligne principale et toutes les variantes
  const nf5 = r.root.children[0];
  assert.equal(nf5.move.san, 'Nf5');
  assert.deepEqual(nf5.children.map((c) => c.move.san), ['Kg1', 'Kg2', 'Kh1']);
  assert.match(nf5.children[0].note, /intérieur du circuit; on en expliquera la raison plus tard/);
  const kg2 = nf5.children[1];                      // la variante qui contient « Ne3+ » puis « Kf2 »
  assert.deepEqual(kg2.children.map((c) => c.move.san), ['Ne3+']);
  assert.deepEqual(kg2.children[0].children.map((c) => c.move.san), ['Kf2']);
});

test('coup illégal : le message indique les coups qui précèdent et la position', () => {
  const r = parsePgn('1. e4 e5 2. Nf3 Nc6 3. Kf2 Nf6 4. Bb5', Chess);
  assert.equal(r.moveCount, 4);
  assert.match(r.error, /« Kf2 »/);
  assert.match(r.error, /5ᵉ coup lu/);
  assert.match(r.error, /après « 1\. e4 e5 2\. Nf3 Nc6 »/);
  assert.equal(r.errorFen.split(' ')[1], 'w');
  const inVariation = parsePgn('1. e4 e5 (1... c5 2. Ke2 Nc6 3. Kb1) 2. Nf3', Chess);
  assert.match(inVariation.error, /« Kb1 »/);
  assert.match(inVariation.error, /après « 1\. e4 c5 2\. Ke2 Nc6 »/);   // la ligne de la variante, pas celle de la partie
  assert.match(parsePgn('1. Ka9', Chess).error, /dès la position de départ/);
});

test('annotations des coups : suffixes ! ? !! ?? !? ?! et codes $n, sur le bon coup', () => {
  const r = parsePgn(`1. e4! e5?? 2. Nf3!? Nc6?! 3. Bb5!! $18 a6 $10 $13 $19 4. Ba4 $146 *`, Chess);
  assert.equal(r.error, null);
  const nodes = []; for (let n = r.root.children[0]; n; n = n.children[0]) nodes.push(n);
  assert.deepEqual(nodes.map((n) => n.nags || []), [[1], [4], [5], [6], [3, 18], [10, 13, 19], [146]]);
  assert.deepEqual(nodes.map((n) => n.move.san).slice(0, 3), ['e4', 'e5', 'Nf3']);   // le suffixe n'altère pas le coup
});

test('annotations : un $n placé après « ( » ne qualifie pas le coup remplacé, et chaque variante a les siennes', () => {
  const r = parsePgn('1. e4 $1 e5 (1... c5 $2 $13 2. Nf3 $14) (1... e6 $4) 2. Nf3 $16 *', Chess);
  assert.equal(r.error, null);
  const e4 = r.root.children[0];
  assert.deepEqual(e4.nags, [1]);
  const [e5, c5, e6] = e4.children;
  assert.deepEqual([e5.nags, c5.nags, e6.nags], [undefined, [2, 13], [4]]);
  assert.deepEqual(c5.children[0].nags, [14]);
  assert.deepEqual(e5.children[0].nags, [16]);
  const odd = parsePgn('$1 1. d4 $3 *', Chess);                             // $n avant tout coup : ignoré sans erreur
  assert.equal(odd.error, null);
  assert.deepEqual(odd.root.children[0].nags, [3]);
});

test('annotations : tableau des signes (affichage) et chapitre Lichess TdB2-4', () => {
  assert.equal(NAG_SYMBOLS[1], '!'); assert.equal(NAG_SYMBOLS[18], '+−'); assert.equal(NAG_SYMBOLS[19], '−+'); assert.equal(NAG_SYMBOLS[10], '=');
  assert.equal(NAG_SUFFIXES[5], '!?'); assert.equal(isMoveNag(3), true); assert.equal(isMoveNag(18), false);
  const r = parsePgn(readFileSync(new URL('./tdb2-4.pgn', import.meta.url), 'utf8'), Chess);
  const nf5 = r.root.children[0];
  assert.deepEqual(nf5.nags, [5]);                                          // 1. Nf5!?
  const kg1 = nf5.children.find((c) => c.move.san === 'Kg1');
  assert.deepEqual(kg1.nags, [1]);                                          // 1... Kg1!
  const kg2 = nf5.children.find((c) => c.move.san === 'Kg2');
  assert.deepEqual(kg2.nags, [4]);                                          // 1... Kg2??
  assert.deepEqual(kg2.children[0].nags, [1]);                              // 2. Ne3+!
  const all = []; (function walk(n) { n.children.forEach((c) => { all.push(c); walk(c); }); })(r.root);
  assert.equal(all.filter((n) => (n.nags || []).includes(10)).length, 8);   // $10 (=) : 8 coups dans le chapitre
  assert.equal(all.filter((n) => (n.nags || []).includes(19)).length, 4);   // $19 (−+) : 4 coups
});
