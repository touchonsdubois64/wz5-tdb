// ==================================================
// STOCKFISH (worker WASM) — une recherche à la fois
// ==================================================
//
// Même moteur que cc2 (stockfish-18-lite-single), à sa force maximale
// (aucune limitation de niveau). Une nouvelle recherche annule la précédente
// proprement : le bestmove de la recherche annulée est ignoré.
// ==================================================

export class Engine {
  constructor(url) {
    this.worker = new Worker(url);
    this.current = null;
    this.queued = null;
    this.multipv = 1;

    this.worker.onmessage = (event) => this.onMessage(String(event.data));
    this.worker.postMessage('uci');
  }

  /**
   * job = { fen, depth, movetime?, multipv?, searchmoves?, onInfo?(line), onBest?(uci) }
   * Remplace toute recherche en cours ou en attente.
   */
  search(job) {
    this.queued = job;
    if (this.current) {
      this.current.cancelled = true;
      this.worker.postMessage('stop');
    } else {
      this.startQueued();
    }
  }

  /** Annule la recherche en cours et celle en attente. */
  cancel() {
    this.queued = null;
    if (this.current) {
      this.current.cancelled = true;
      this.worker.postMessage('stop');
    }
  }

  startQueued() {
    if (this.current || !this.queued) return;
    this.current = this.queued;
    this.queued = null;

    const job = this.current;
    const lines = job.multipv || 1;
    if (lines !== this.multipv) {
      this.worker.postMessage('setoption name MultiPV value ' + lines);
      this.multipv = lines;
    }
    this.worker.postMessage('position fen ' + job.fen);
    let go = 'go depth ' + (job.depth || 20);
    if (job.movetime) go += ' movetime ' + job.movetime;
    // « searchmoves » doit rester en dernier : la recherche ne porte que sur ces coups
    if (job.searchmoves && job.searchmoves.length > 0) go += ' searchmoves ' + job.searchmoves.join(' ');
    this.worker.postMessage(go);
  }

  onMessage(line) {
    const job = this.current;

    if (line.startsWith('info')) {
      if (job && !job.cancelled && job.onInfo) job.onInfo(line);
      return;
    }

    if (line.startsWith('bestmove')) {
      this.current = null;
      if (job && !job.cancelled && job.onBest) {
        const best = line.trim().split(/\s+/)[1];
        if (best && best !== '(none)') job.onBest(best);
      }
      this.startQueued();
    }
  }
}

/**
 * Convertit une ligne « info … score … » en texte d'évaluation du point de
 * vue des Blancs (« +1.25 », « -0.40 », « #3 », « #-2 »), ou null.
 */
export function evaluationFromInfo(line, sideToMove) {
  const score = scoreFromInfo(line);
  return score ? formatScore(score, sideToMove) : null;
}

/**
 * Texte d'un score du point de vue des Blancs (« +1.25 », « 0.00 », « #3 », « #-2 »),
 * à partir d'un score { cp } ou { mate } donné pour le camp qui a le trait.
 */
export function formatScore(score, sideToMove) {
  const sign = sideToMove === 'w' ? 1 : -1;
  if (score.mate !== undefined) {
    const distance = sign * score.mate;
    return distance < 0 ? '#-' + Math.abs(distance) : '#' + Math.abs(distance);
  }
  const pawns = (sign * score.cp) / 100;
  if (pawns === 0) return '0.00';
  return (pawns > 0 ? '+' : '') + pawns.toFixed(2);
}

/** Valeur numérique comparable d'un score (un mat vaut beaucoup plus qu'un avantage). */
export function scoreValue(score) {
  if (score.mate !== undefined) return score.mate > 0 ? 100000 - score.mate : -100000 - score.mate;
  return score.cp;
}

/**
 * Ligne « info » d'une recherche MultiPV : { depth, multipv, score, move }.
 * Renvoie null pour les lignes sans score ou provisoires (bornes d'aspiration).
 */
export function parseInfo(line) {
  if (!line.startsWith('info') || /\b(lowerbound|upperbound)\b/.test(line)) return null;
  const score = scoreFromInfo(line);
  const pv = line.match(/\bpv\s+(\S+)/);
  const depth = depthFromInfo(line);
  if (!score || !pv || depth === null) return null;
  const multipv = line.match(/\bmultipv\s+(\d+)/);
  return { depth, multipv: multipv ? parseInt(multipv[1], 10) : 1, score, move: pv[1] };
}

export function depthFromInfo(line) {
  const match = line.match(/\bdepth\s+(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Score brut d'une ligne « info » : { cp } ou { mate }, du point de vue du
 * camp qui a le trait dans la position analysée. null si la ligne n'en a pas.
 */
export function scoreFromInfo(line) {
  const mate = line.match(/\bscore\s+mate\s+(-?\d+)/);
  if (mate) return { mate: parseInt(mate[1], 10) };
  const cp = line.match(/\bscore\s+cp\s+(-?\d+)/);
  if (cp) return { cp: parseInt(cp[1], 10) };
  return null;
}
