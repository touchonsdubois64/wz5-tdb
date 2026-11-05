// ==================================================
// ANNOTATIONS : barre d'outils et interaction
// ==================================================
//
// Le bouton « crayon » ouvre la barre d'outils. Tant qu'elle est ouverte, un clic
// sur une case pose (ou retire) l'annotation choisie ; les pièces peuvent toujours
// être déplacées par glisser-déposer. Fermée, la barre laisse les annotations affichées.
//
// Agencement : couleurs / « 0-20 a-z A-Z Texte » / pictogrammes « Figurines Formes Contours Zones » /
// « Gomme Effacer tout » / puis les outils du groupe choisi.
// ==================================================

import {
  COLORS,
  LOWERCASE,
  NUMBERS,
  PIECE_LETTERS,
  SHAPES,
  TWO_CLICK,
  UPPERCASE,
  createMarkSet,
  decodeMarks,
  encodeMarks,
  glyphSvg,
  renderSvg,
} from './marks.js';

const asset = (path) => new URL(path, document.baseURI).href;

// Pictogrammes des groupes d'outils
const PICT = {
  figurines: () =>
    `<img src="${asset('pieces/alpha/wN.svg')}" alt=""><img src="${asset('pieces/alpha/bR.svg')}" alt="">`,
  formes:
    '<svg viewBox="0 0 64 32" aria-hidden="true"><circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="3.5"/><polygon points="48,5 60,27 36,27" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/></svg>',
  // deux cases entourées d'un rectangle rouge, sans liseré blanc : coins droits, puis coins arrondis
  coinsDroits:
    '<svg viewBox="0 0 64 32" aria-hidden="true"><rect x="6" y="6" width="26" height="20" fill="#fff" stroke="#9a9a9a" stroke-width="1"/><rect x="32" y="6" width="26" height="20" fill="#b9b9b9"/><rect x="2" y="2" width="60" height="28" fill="none" stroke="#e02424" stroke-width="4"/></svg>',
  coinsArrondis:
    '<svg viewBox="0 0 64 32" aria-hidden="true"><rect x="6" y="6" width="26" height="20" fill="#fff" stroke="#9a9a9a" stroke-width="1"/><rect x="32" y="6" width="26" height="20" fill="#b9b9b9"/><rect x="2" y="2" width="60" height="28" rx="8" fill="none" stroke="#e02424" stroke-width="4"/></svg>',
};

const PIECE_NAMES = { K: 'Roi', Q: 'Dame', R: 'Tour', B: 'Fou', N: 'Cavalier', P: 'Pion' };

// les cinq options d'une zone, une fois choisi le type de bordure (coins droits ou arrondis)
const ZONE_OPTIONS = [
  { type: 'border', label: 'Zone avec bordure seule' },
  { type: 'fill', label: 'Zone avec couleur seule, sans bordure' },
  { type: 'zone', label: 'Zone avec bordure et intérieur coloré' },
  { type: 'shade', label: 'Zone avec hachures seules, sans bordure' },
  { type: 'hatch', label: 'Zone avec bordure et intérieur hachuré' },
];
const ZONE_TOOLS = ZONE_OPTIONS.map((option) => option.type);

/** Télécharge un texte (UTF-8 avec BOM, lignes à la mode Windows) sous le nom donné. */
function downloadText(filename, text) {
  const blob = new Blob(['\uFEFF' + text.replace(/\r?\n/g, '\r\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Nom de fichier tiré du titre de la position : « TdB1-1 : Fuster - Balogh… » donne annotations-tdb1-1.txt */
function exportFilename(title) {
  const start = String(title || '').split(' : ')[0];
  const slug = start.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return 'annotations-' + (slug || 'position').slice(0, 40) + '.txt';
}

// getExportInfo() doit renvoyer { title, fen } : la position à laquelle se rapportent les annotations.
export function setupMarks({ layer, panel, buttons, isWhite, onActiveChange, getExportInfo }) {
  const marks = createMarkSet();
  let hintItems = []; // annotations enregistrées avec la position (positions.js), affichées à la demande
  let hintShown = false;
  let saveButton = null;
  let active = false;
  let colorId = 'rouge';
  let tool = { type: 'shape', value: 'circle', round: false };
  let previousTool = tool; // pour revenir de la gomme
  let arrowStart = null;

  const colorButtons = [];
  const toolButtons = [];
  const groupTabs = {};
  const groupPanels = {};
  let eraserButton = null;
  let labelInput = null;

  function render() {
    // l'indice est dessiné en dessous des annotations tracées à la main
    layer.innerHTML = renderSvg(hintShown ? [...hintItems, ...marks.items] : marks.items, isWhite(), arrowStart);
    if (saveButton) saveButton.disabled = marks.isEmpty();
  }

  /** Fichier .txt : titre, FEN, code des annotations et la ligne à coller dans positions.js. */
  function saveMarks() {
    if (marks.isEmpty()) return;
    const info = (getExportInfo && getExportInfo()) || {};
    const code = encodeMarks(marks.items);
    const text = [
      'Titre : ' + (info.title || ''),
      'FEN : ' + (info.fen || ''),
      'Annotations : ' + code,
      '',
      'À coller dans positions.js, à la fin de cette position (après « url », ou après « fen » s’il n’y a pas d’url ;',
      'ne pas oublier la virgule à la fin de la ligne qui précède) :',
      "        marks: '" + code + "'",
      '',
    ].join('\n');
    downloadText(exportFilename(info.title), text);
  }

  const isSelected = (entry) => tool.type === entry.type && tool.value === entry.value && tool.round === Boolean(entry.round);

  function refreshButtons() {
    colorButtons.forEach(({ element, id }) => element.classList.toggle('selected', id === colorId));
    toolButtons.forEach((entry) => {
      entry.element.classList.toggle('selected', isSelected(entry));
      if (entry.preview) entry.element.innerHTML = glyphSvg(entry.type, entry.value, colorId, entry.round);
    });
    if (eraserButton) eraserButton.classList.toggle('selected', tool.type === 'erase');
  }

  function selectTool(type, value = '', round = false) {
    if (type !== 'erase') previousTool = { type, value, round };
    tool = { type, value, round };
    arrowStart = null;
    refreshButtons();
    render();
  }

  // ---- construction de la barre d'outils
  panel.innerHTML = '';
  const addRow = (className, parent = panel) => {
    const row = document.createElement('div');
    row.className = 'marks-row ' + className;
    parent.appendChild(row);
    return row;
  };
  const addButton = (row, className, label, onClick) => {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = className;
    element.textContent = label;
    element.addEventListener('click', onClick);
    row.appendChild(element);
    return element;
  };

  // 1. couleurs
  const colorsRow = addRow('marks-colors');
  for (const color of COLORS) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'marks-color' + (color.id === 'blanc' ? ' light' : '');
    element.style.setProperty('--c', color.hex);
    element.title = color.label;
    element.setAttribute('aria-label', color.label);
    element.addEventListener('click', () => {
      colorId = color.id;
      refreshButtons();
    });
    colorsRow.appendChild(element);
    colorButtons.push({ element, id: color.id });
  }

  // 2 et 3. onglets des groupes
  const tabsA = addRow('marks-tabs');
  const tabsB = addRow('marks-tabs');
  // 4. contenu du groupe choisi
  const content = addRow('marks-content');
  content.classList.remove('marks-row');

  function showGroup(id) {
    for (const key of Object.keys(groupPanels)) {
      groupPanels[key].hidden = key !== id;
      groupTabs[key].classList.toggle('selected', key === id);
    }
    // ces groupes ont un outil par défaut, choisi d'office (sauf si l'un de leurs outils est déjà actif)
    if (id === 'texte') selectTool('label');
    if (id === 'zones-droites' || id === 'zones-arrondies') {
      // même option que précédemment si c'était une zone, avec le style de coins du groupe ; sinon « bordure et couleur »
      selectTool(ZONE_TOOLS.includes(tool.type) ? tool.type : 'zone', '', id === 'zones-arrondies');
    }
  }

  function addGroup(id, label, tabsRow, pictogram = null) {
    groupTabs[id] = addButton(tabsRow, 'marks-tab' + (pictogram ? ' pict' : ''), pictogram ? '' : label, () => showGroup(id));
    if (pictogram) {
      groupTabs[id].innerHTML = typeof pictogram === 'function' ? pictogram() : pictogram;
      groupTabs[id].title = label;
      groupTabs[id].setAttribute('aria-label', label);
    }
    const body = document.createElement('div');
    body.className = 'marks-group';
    body.hidden = true;
    content.appendChild(body);
    groupPanels[id] = body;
    return body;
  }

  function addTool(parent, type, value, { label, preview = false, text = null, html = null, round = false }) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'marks-tool';
    element.title = label;
    element.setAttribute('aria-label', label);
    if (text !== null) element.textContent = text;
    if (html !== null) element.innerHTML = html;
    element.addEventListener('click', () => selectTool(type, value, round));
    parent.appendChild(element);
    toolButtons.push({ element, type, value, preview, round });
  }

  const flowRow = (parent) => {
    const row = document.createElement('div');
    row.className = 'marks-row';
    parent.appendChild(row);
    return row;
  };

  // nombres 0-20, minuscules, majuscules
  const numbers = addGroup('nombres', '0-20', tabsA);
  const numbersRow = flowRow(numbers);
  for (const value of NUMBERS) addTool(numbersRow, 'text', value, { label: 'Nombre ' + value, text: value });

  const lower = addGroup('minuscules', 'a-z', tabsA);
  const lowerRow = flowRow(lower);
  for (const letter of LOWERCASE) addTool(lowerRow, 'text', letter, { label: 'Lettre ' + letter, text: letter });

  const upper = addGroup('majuscules', 'A-Z', tabsA);
  const upperRow = flowRow(upper);
  for (const letter of UPPERCASE) addTool(upperRow, 'text', letter, { label: 'Lettre ' + letter, text: letter });

  // texte libre
  const free = addGroup('texte', 'Texte', tabsA);
  labelInput = document.createElement('input');
  labelInput.type = 'text';
  labelInput.className = 'marks-text text-field';
  labelInput.maxLength = 30;
  labelInput.placeholder = "Texte court, ex. a', b'', 12…";
  labelInput.setAttribute('aria-label', 'Texte libre à poser sur une case');
  labelInput.autocomplete = 'off';
  labelInput.spellcheck = false;
  labelInput.addEventListener('focus', () => selectTool('label'));
  labelInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') labelInput.blur();
  });
  free.appendChild(labelInput);
  const freeHint = document.createElement('p');
  freeHint.className = 'marks-hint';
  freeHint.textContent = 'Saisissez le texte, puis cliquez une case : il y est centré et peut déborder sur les cases voisines.';
  free.appendChild(freeHint);

  // figurines : deux rangées comme dans l'éditeur de position (style creux puis style plein)
  const figurines = addGroup('figurines', 'Figurines', tabsB, PICT.figurines);
  for (const style of ['w', 'b']) {
    const row = flowRow(figurines);
    for (const letter of PIECE_LETTERS) {
      addTool(row, 'piece', letter + ':' + style, { label: PIECE_NAMES[letter] + (style === 'w' ? ' (creux)' : ' (plein)'), preview: true });
    }
  }

  // formes
  const shapes = addGroup('formes', 'Formes', tabsB, PICT.formes);
  const shapesRow = flowRow(shapes);
  for (const shape of SHAPES) addTool(shapesRow, shape.type, shape.value, { label: shape.label, preview: true });

  // zones : on choisit d'abord le type de bordure (coins droits ou arrondis), puis l'une des cinq options
  for (const [id, label, pictogram, round] of [
    ['zones-droites', 'Zones à coins droits', PICT.coinsDroits, false],
    ['zones-arrondies', 'Zones à coins arrondis', PICT.coinsArrondis, true],
  ]) {
    const group = addGroup(id, label, tabsB, pictogram);
    const row = flowRow(group);
    for (const option of ZONE_OPTIONS) addTool(row, option.type, '', { label: option.label + (round ? ' (coins arrondis)' : ' (coins droits)'), preview: true, round });
    const hint = document.createElement('p');
    hint.className = 'marks-hint';
    hint.textContent =
      'Cliquez les cases de la zone : les cases voisines fusionnent (un clic de plus retire la case). Deux zones superposées mélangent leurs couleurs.';
    group.appendChild(hint);
  }

  // 5. pied de barre : gomme et « effacer tout » en bas à gauche, enregistrement en bas à droite
  const footer = addRow('marks-footer');
  const footerLeft = document.createElement('div');
  footerLeft.className = 'marks-footer-left';
  footer.appendChild(footerLeft);
  eraserButton = document.createElement('button');
  eraserButton.type = 'button';
  eraserButton.className = 'marks-tab marks-eraser';
  eraserButton.title = 'Gomme : efface tout ce qui touche la case cliquée';
  eraserButton.textContent = 'Gomme';
  eraserButton.addEventListener('click', () => {
    if (tool.type === 'erase') selectTool(previousTool.type, previousTool.value);
    else selectTool('erase');
  });
  footerLeft.appendChild(eraserButton);
  addButton(footerLeft, 'marks-tab', 'Effacer tout', () => api.clear());
  saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.className = 'marks-tab marks-save';
  saveButton.title = 'Enregistrer les annotations dans un fichier .txt (titre, FEN et code à coller dans positions.js)';
  saveButton.innerHTML =
    '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3v9m0 0-3.5-3.5M10 12l3.5-3.5M4 15.5h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Enregistrer</span>';
  saveButton.addEventListener('click', saveMarks);
  footer.appendChild(saveButton);

  showGroup('formes');
  refreshButtons();

  // ---- ouverture / fermeture : le crayon (un par disposition) bascule ; un clic en dehors de la barre
  // et de l'échiquier la referme.
  for (const button of buttons) button.addEventListener('click', () => api.setActive(!active));
  // (on réagit au « click » et non à l'appui : la barre se replie après l'action du bouton cliqué,
  // sinon la mise en page bougerait entre l'appui et le relâchement et le clic serait perdu)
  document.addEventListener(
    'click',
    (event) => {
      if (!active || !event.target.closest) return;
      if (event.target.closest('#marks-panel, .marks-opener, .board-and-files')) return;
      api.setActive(false);
    },
    true,
  );
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && arrowStart) {
      arrowStart = null;
      render();
    }
  });

  const api = {
    isActive: () => active,

    setActive(value) {
      if (value === active) return;
      active = value;
      panel.hidden = !active;
      for (const button of buttons) {
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      }
      document.body.classList.toggle('marking', active);
      arrowStart = null;
      render();
      if (onActiveChange) onActiveChange(active);
    },

    /** Clic sur une case de l'échiquier alors que l'outil est actif. */
    click(key) {
      if (!active) return;

      if (tool.type === 'erase') {
        marks.eraseAt(key);
        arrowStart = null;
      } else if (TWO_CLICK.has(tool.type)) {
        if (!arrowStart) arrowStart = key;
        else if (arrowStart === key) arrowStart = null;
        else {
          marks.toggleLink(tool.type, arrowStart, key, colorId);
          arrowStart = null;
        }
      } else if (ZONE_TOOLS.includes(tool.type)) {
        marks.toggleZone(key, colorId, tool.type, tool.round);
      } else if (tool.type === 'label') {
        const text = labelInput.value.trim();
        if (!text) {
          labelInput.focus();
          return;
        }
        marks.placeSquare(key, 'label', text, colorId);
      } else {
        marks.placeSquare(key, tool.type, tool.value, colorId);
      }
      render();
    },

    clear() {
      marks.clear();
      arrowStart = null;
      render();
    },

    render,

    /** Affiche les annotations enregistrées (code texte de positions.js) ; renvoie le nombre d'éléments et les erreurs. */
    showHint(code) {
      const decoded = decodeMarks(code);
      hintItems = decoded.items;
      hintShown = hintItems.length > 0;
      render();
      return { count: hintItems.length, errors: decoded.errors };
    },

    hideHint() {
      if (!hintShown && hintItems.length === 0) return;
      hintShown = false;
      hintItems = [];
      render();
    },

    isHintShown: () => hintShown,

    /** Contenu SVG (échelle 800) des annotations affichées, indice compris, pour l'export du diagramme. */
    snapshotInner() {
      const items = hintShown ? [...hintItems, ...marks.items] : marks.items;
      if (items.length === 0) return '';
      return renderSvg(items, isWhite()).replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    },
  };

  render();
  return api;
}
