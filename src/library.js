// ==================================================
// BIBLIOTHÈQUE DE POSITIONS : menu déroulant à plusieurs niveaux
// ==================================================
//
// Le menu s'ouvre à droite du bouton « dossier ». On y descend de niveau en
// niveau (catégorie → sous-catégories → position) ; « ‹ Retour » remonte d'un niveau et
// « « Début » revient à la racine. À la réouverture, le menu reprend au dernier niveau consulté.
// Le premier choix « TdB Aléatoire » charge une position tirée au hasard parmi celles de « TdB Chronologique ».
// Les données viennent de positions.js (voir les explications en tête de ce fichier).
// ==================================================

import { Chess } from 'chess.js';
import { categories, positions } from './positions.js';

const asset = (path) => new URL(path, document.baseURI).href;

// ==================================================
// LIBELLÉS AVEC FIGURINES
// ==================================================
//
// Dans un nom de catégorie, de sous-catégorie ou de position, tout groupe de
// lettres placé entre accolades est remplacé par des figurines :
//
//    {P}-Tour en 7ème     →  [Pion blanc]-Tour en 7ème
//    {RTP} vs {rt}        →  Roi, Tour, Pion blancs  vs  Roi, Tour noirs
//
// Lettres françaises : R Roi, D Dame, T Tour, F Fou, C Cavalier, P Pion.
// MAJUSCULE = figurine blanche, minuscule = figurine noire.
//
// Raccourci conservé : « fig: RTP vs RT » équivaut à « {RTP} vs {rt} ».
// ==================================================

const FRENCH_PIECES = { R: 'K', D: 'Q', T: 'R', F: 'B', C: 'N', P: 'P' };
const GROUP = /\{([RDTFCPrdtfcp]+)\}/g;

/** Convertit l'ancienne écriture « fig: … » vers celle à accolades. */
function expandShortcut(text) {
  const match = /^fig:\s*(.*)$/i.exec(String(text));
  if (!match) return String(text);
  const [whites, blacks] = match[1].split(/\s+vs\s+/i);
  const group = (letters, upper) => '{' + (upper ? letters.toUpperCase() : letters.toLowerCase()) + '}';
  return blacks === undefined ? group(whites, true) : group(whites, true) + ' vs ' + group(blacks, false);
}

/** Texte brut d'un libellé (les accolades disparaissent : « {RTP} vs {rt} » devient « RTP vs rt »). */
export function plainLabel(text) {
  return expandShortcut(text).replace(GROUP, (all, letters) => letters.toUpperCase());
}

/** Remplit un élément avec un libellé : texte et figurines mélangés. */
export function fillLabel(element, text) {
  element.textContent = '';
  const label = expandShortcut(text);

  let last = 0;
  for (const match of label.matchAll(GROUP)) {
    if (match.index > last) element.appendChild(document.createTextNode(label.slice(last, match.index)));
    for (const letter of match[1]) {
      const white = letter === letter.toUpperCase();
      const image = document.createElement('img');
      image.className = 'library-piece';
      image.src = asset('pieces/alpha/' + (white ? 'w' : 'b') + FRENCH_PIECES[letter.toUpperCase()] + '.svg');
      image.alt = '';
      element.appendChild(image);
    }
    last = match.index + match[0].length;
  }
  if (last < label.length) element.appendChild(document.createTextNode(label.slice(last)));
  element.setAttribute('aria-label', plainLabel(text));
}

const makeNode = (name) => ({ name, entries: [], folders: new Map() });

/** Construit l'arbre à partir du tableau plat de positions.js. */
function buildTree() {
  const roots = new Map(categories.map((name) => [name, makeNode(name)]));

  positions.forEach((position, index) => {
    const label = '#' + (index + 1) + ' (' + (position && position.title) + ')';
    const path = position && Array.isArray(position.path) ? position.path.filter(Boolean) : [];
    if (path.length === 0 || !position.fen || !position.title) {
      console.warn('positions.js : position ' + label + ' ignorée (path, title et fen sont obligatoires).');
      return;
    }
    if (!new Chess().load(position.fen)) {
      console.warn('positions.js : position ' + label + ' ignorée (FEN invalide : ' + position.fen + ').');
      return;
    }

    let node = roots.get(path[0]);
    if (!node) {
      console.warn('positions.js : catégorie inconnue « ' + path[0] + ' » (position ' + label + '). Ajoutez-la à "categories" pour fixer sa place.');
      node = makeNode(path[0]);
      roots.set(path[0], node);
    }
    for (const name of path.slice(1)) {
      let child = node.folders.get(name);
      if (!child) {
        child = makeNode(name);
        node.folders.set(name, child);
        node.entries.push({ folder: child });
      }
      node = child;
    }
    node.entries.push({ position });
  });

  return [...roots.values()];
}

function countPositions(node) {
  return node.entries.reduce((total, entry) => total + (entry.folder ? countPositions(entry.folder) : 1), 0);
}

/** Toutes les positions d'une catégorie, sous-dossiers compris. */
function collectPositions(node) {
  return node.entries.flatMap((entry) => (entry.folder ? collectPositions(entry.folder) : [entry.position]));
}

// Premier choix « TdB Aléatoire » : une position tirée au hasard parmi celles de cette catégorie
const RANDOM_LABEL = 'TdB Aléatoire';
const RANDOM_SOURCE = 'TdB Chronologique';

/**
 * Branche le bouton et le menu.
 * onSelect(position) est appelé quand l'utilisateur choisit une position.
 */
export function setupLibrary({ button, menu, onSelect }) {
  const roots = buildTree();
  let trail = []; // sous-dossiers traversés depuis la catégorie choisie
  let lastRandom = null; // dernière position tirée au hasard (pour ne pas la proposer deux fois de suite)

  /** Position au hasard parmi celles de RANDOM_SOURCE, différente de la précédente quand c'est possible. */
  function randomPosition() {
    const source = roots.find((root) => root.name === RANDOM_SOURCE);
    const pool = source ? collectPositions(source) : [];
    const candidates = pool.length > 1 ? pool.filter((position) => position !== lastRandom) : pool;
    lastRandom = candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : null;
    return lastRandom;
  }

  const close = () => {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };

  function item(label, { count, folder = false, empty = false, onClick, title }) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'library-item' + (folder ? ' folder' : '') + (empty ? ' empty' : '');
    element.title = title || plainLabel(label);
    const text = document.createElement('span');
    text.className = 'library-text';
    fillLabel(text, label);
    element.appendChild(text);
    if (count !== undefined || folder) {
      const side = document.createElement('span');
      side.className = 'library-side';
      side.textContent = (count !== undefined ? count : '') + (folder && !empty ? ' ›' : '');
      element.appendChild(side);
    }
    if (empty) element.disabled = true;
    else element.addEventListener('click', onClick);
    return element;
  }

  function render() {
    menu.innerHTML = '';

    if (trail.length === 0) {
      for (const root of roots) {
        const count = countPositions(root);
        menu.appendChild(
          item(root.name, {
            folder: true,
            count: count || undefined,
            empty: count === 0,
            title: count === 0 ? 'Aucune position pour le moment' : undefined,
            onClick: () => {
              trail = [root];
              render();
            },
          }),
        );
      }

      // « TdB Aléatoire » : charge directement une position au hasard (un nouveau clic en donne une autre)
      const source = roots.find((root) => root.name === RANDOM_SOURCE);
      const poolSize = source ? countPositions(source) : 0;
      menu.appendChild(
        item(RANDOM_LABEL, {
          empty: poolSize === 0,
          title:
            poolSize === 0
              ? 'Aucune position pour le moment'
              : 'Une position tirée au hasard parmi les ' + poolSize + ' de ' + RANDOM_SOURCE,
          onClick: () => {
            const position = randomPosition();
            if (!position) return;
            close();
            onSelect(position);
          },
        }),
      );
      return;
    }

    const current = trail[trail.length - 1];

    // « « Début » revient à la liste des catégories ; « ‹ Retour » remonte d'un seul niveau
    const nav = document.createElement('div');
    nav.className = 'library-nav';

    const start = item('« Début', {
      title: 'Revenir au début des choix',
      onClick: () => {
        trail = [];
        render();
      },
    });
    start.classList.add('library-back', 'library-start');
    nav.appendChild(start);

    const back = item('‹ Retour', {
      onClick: () => {
        trail.pop();
        render();
      },
    });
    back.classList.add('library-back');
    nav.appendChild(back);
    menu.appendChild(nav);

    const crumb = document.createElement('div');
    crumb.className = 'library-crumb';
    trail.forEach((node, index) => {
      if (index > 0) crumb.appendChild(document.createTextNode(' › '));
      const part = document.createElement('span');
      fillLabel(part, node.name);
      crumb.appendChild(part);
    });
    menu.appendChild(crumb);

    for (const entry of current.entries) {
      if (entry.folder) {
        menu.appendChild(
          item(entry.folder.name, {
            folder: true,
            count: countPositions(entry.folder),
            onClick: () => {
              trail.push(entry.folder);
              render();
            },
          }),
        );
      } else {
        const { position } = entry;
        menu.appendChild(
          item(position.title, {
            title: position.note || position.fen,
            onClick: () => {
              close();
              onSelect(position);
            },
          }),
        );
      }
    }
  }

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    if (menu.hidden) {
      // on rouvre le menu là où on l'avait laissé (dernier niveau consulté) ; « « Début » ramène à la racine
      render();
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    } else {
      close();
    }
  });
  document.addEventListener('click', (event) => {
    // composedPath : l'élément cliqué a pu être retiré du menu par render() avant d'arriver ici
    if (!menu.hidden && !event.composedPath().includes(menu)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}
