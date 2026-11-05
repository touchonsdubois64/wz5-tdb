import test from 'node:test';
import assert from 'node:assert/strict';
import * as F from '../src/fen.js';

test('placement <-> grille', () => {
  const g = F.placementToGrid(F.START_PLACEMENT);
  assert.equal(F.gridToPlacement(g), F.START_PLACEMENT);
  assert.equal(F.gridToPlacement(F.placementToGrid(F.EMPTY_PLACEMENT)), F.EMPTY_PLACEMENT);
  assert.equal(F.placementToGrid('8/8/8'), null);
  assert.equal(F.placementToGrid('9/8/8/8/8/8/8/8'), null);
  assert.equal(F.placementToGrid('7/8/8/8/8/8/8/8'), null);
  assert.equal(F.placementToGrid('x7/8/8/8/8/8/8/8'), null);
});

test('parseFen complet ou réduit', () => {
  const a = F.parseFen('8/8/8/4k3/8/8/4K3/8 b - - 12 40');
  assert.deepEqual(a, { placement: '8/8/8/4k3/8/8/4K3/8', turn: 'b', hasTurn: true, castling: '-', half: 12, full: 40 });
  const b = F.parseFen('  8/8/8/4k3/8/8/4K3/8 ');
  assert.equal(b.turn, 'w'); assert.equal(b.full, 1); assert.equal(b.hasTurn, false);
  assert.equal(F.parseFen(''), null);
  assert.equal(F.parseFen('n’importe quoi'), null);
});

test('translation : valeurs exactes', () => {
  const g = F.placementToGrid('8/8/8/4k3/8/8/4K3/8');
  assert.equal(F.gridToPlacement(F.shiftGrid(g, 0, 1)), '8/8/4k3/8/8/4K3/8/8');
  assert.equal(F.gridToPlacement(F.shiftGrid(g, 0, -1)), '8/8/8/8/4k3/8/8/4K3');
  assert.equal(F.gridToPlacement(F.shiftGrid(g, 1, 0)), '8/8/8/5k2/8/8/5K2/8');
  assert.equal(F.gridToPlacement(F.shiftGrid(g, -1, 0)), '8/8/8/3k4/8/8/3K4/8');
  const edge = F.placementToGrid('K7/8/8/8/8/8/8/7k');
  assert.equal(F.shiftGrid(edge, -1, 0), null);
  assert.equal(F.shiftGrid(edge, 0, 1), null);
  assert.equal(F.shiftGrid(edge, 1, 0), null);
  assert.equal(F.shiftGrid(edge, 0, -1), null);
});

test('roques : droits conservés seulement si possibles', () => {
  const g = F.placementToGrid(F.START_PLACEMENT);
  assert.equal(F.sanitizeCastling(g, 'KQkq'), 'KQkq');
  const g2 = F.placementToGrid('r3k3/8/8/8/8/8/8/4K2R');
  assert.equal(F.sanitizeCastling(g2, 'KQkq'), 'Kq');
  assert.equal(F.sanitizeCastling(g2, '-'), '-');
  assert.equal(F.sanitizeCastling(F.placementToGrid('8/8/8/4k3/8/8/4K3/8'), 'KQkq'), '-');
});

test('validation structurelle', () => {
  const v = (p) => F.validateStructure(F.placementToGrid(p));
  assert.equal(v('8/8/8/4k3/8/8/4K3/8'), null);
  assert.match(v('8/8/8/8/8/8/4K3/8'), /Roi noir/);
  assert.match(v('4k3/8/8/8/8/8/8/8'), /Roi blanc/);
  assert.match(v('4k3/8/8/8/8/8/4K3/4P3'), /Pion/);
  assert.match(v('P3k3/8/8/8/8/8/8/4K3'), /Pion/);
  assert.match(v('4k3/pppppppp/p7/8/8/8/8/4K3'), /huit Pions/);
});

test('comptage et FEN complet', () => {
  assert.equal(F.countPieces('8/8/8/4k3/8/8/4K3/8 w - - 0 1'), 2);
  assert.equal(F.countPieces(F.START_PLACEMENT), 32);
  assert.equal(F.buildFen('8/8/8/4k3/8/8/4K3/8', 'b'), '8/8/8/4k3/8/8/4K3/8 b - - 0 1');
});
