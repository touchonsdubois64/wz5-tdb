// ==================================================
// BOUTON « ENREGISTRER LE DIAGRAMME » ET SA FENÊTRE
// ==================================================
//
// Un clic ouvre une fenêtre avec un aperçu du diagramme, le nom du fichier (« diagramme.png » par défaut), le format
// (PNG, JPEG, WebP, PDF, SVG) et la largeur de l'image. Le nom et le format sont liés : l'extension tapée choisit le
// format, et changer de format change l'extension.
//
// setupDiagramExport({ button, collect, pieceUrl })
//   collect()    renvoie l'état à dessiner (voir buildDiagram dans diagram.js, sans les fichiers de pièces)
//   pieceUrl(c)  adresse du fichier SVG d'une pièce (c = 'wK', 'bP'…)
// ==================================================

import { FORMATS, buildDiagram, canEncode, finalFilename, formatForFilename, renderFile, sizeSvg } from './diagram.js';

const SIZES = [800, 1200, 1600, 2400];
const DEFAULT_SIZE = 1600;
const DEFAULT_NAME = 'diagramme.png';

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function element(tag, className, attributes = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  return node;
}

function labelled(text, control) {
  const row = element('label', 'diagram-row');
  const caption = element('span');
  caption.textContent = text;
  row.append(caption, control);
  return row;
}

export function setupDiagramExport({ button, collect, pieceUrl }) {
  const pieceCache = new Map(); // code de pièce → texte du fichier SVG
  let diagram = null;
  let busy = false;

  // --- la fenêtre (créée une fois, réutilisée)
  const dialog = element('dialog', 'diagram-dialog', { 'aria-label': 'Enregistrer le diagramme' });
  const form = element('form', 'diagram-form', { method: 'dialog' });
  const title = element('h2', 'diagram-title');
  title.textContent = 'Enregistrer le diagramme';
  const preview = element('img', 'diagram-preview', { alt: 'Aperçu du diagramme' });

  const nameInput = element('input', 'diagram-name', { type: 'text', value: DEFAULT_NAME, spellcheck: 'false', autocomplete: 'off', 'aria-label': 'Nom du fichier' });

  const formatSelect = element('select', 'diagram-format', { 'aria-label': 'Format' });
  const available = FORMATS.filter((format) => format.id === 'svg' || format.id === 'pdf' || canEncode(format.mime));
  for (const format of available) {
    const option = element('option', '', { value: format.id });
    option.textContent = format.label;
    formatSelect.appendChild(option);
  }

  const sizeSelect = element('select', 'diagram-size', { 'aria-label': 'Largeur de l’image' });
  for (const pixels of SIZES) {
    const option = element('option', '', { value: String(pixels) });
    option.textContent = pixels + ' px' + (pixels === DEFAULT_SIZE ? ' (par défaut)' : '');
    if (pixels === DEFAULT_SIZE) option.selected = true;
    sizeSelect.appendChild(option);
  }

  const error = element('p', 'diagram-error', { role: 'alert' });
  error.hidden = true;

  const actions = element('div', 'diagram-actions');
  const cancel = element('button', 'diagram-cancel', { type: 'button' });
  cancel.textContent = 'Annuler';
  const save = element('button', 'diagram-save', { type: 'submit' });
  save.textContent = 'Enregistrer';
  actions.append(cancel, save);

  form.append(title, preview, labelled('Nom du fichier', nameInput), labelled('Format', formatSelect), labelled('Largeur', sizeSelect), error, actions);
  dialog.appendChild(form);
  document.body.appendChild(dialog);

  const currentFormat = () => FORMATS.find((format) => format.id === formatSelect.value) || FORMATS[0];

  // le nom et le format sont liés
  formatSelect.addEventListener('change', () => {
    nameInput.value = finalFilename(nameInput.value, currentFormat());
  });
  nameInput.addEventListener('input', () => {
    const typed = formatForFilename(nameInput.value);
    if (typed && available.includes(typed)) formatSelect.value = typed.id;
  });

  cancel.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close(); // clic sur le fond grisé
  });

  const showError = (message) => {
    error.textContent = message;
    error.hidden = !message;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || !diagram) return;
    busy = true;
    save.disabled = true;
    showError('');
    try {
      const format = currentFormat();
      const filename = finalFilename(nameInput.value, format);
      const blob = await renderFile(diagram, format, Number(sizeSelect.value));
      download(blob, filename);
      dialog.close();
    } catch (problem) {
      showError(problem && problem.message ? problem.message : 'L’enregistrement a échoué.');
    } finally {
      busy = false;
      save.disabled = false;
    }
  });

  // --- chargement des pièces utilisées (une seule fois chacune)
  async function loadPieces(codes) {
    const missing = codes.filter((code) => !pieceCache.has(code));
    await Promise.all(
      missing.map(async (code) => {
        const response = await fetch(pieceUrl(code));
        if (!response.ok) throw new Error('Pièce ' + code + ' introuvable.');
        pieceCache.set(code, await response.text());
      }),
    );
    return Object.fromEntries(codes.map((code) => [code, pieceCache.get(code)]));
  }

  async function open() {
    if (busy) return;
    showError('');
    const state = collect();
    try {
      const pieceSvgs = await loadPieces([...new Set(state.pieces.map(([, code]) => code))]);
      diagram = buildDiagram({ ...state, pieceSvgs });
      const small = sizeSvg(diagram.svg, diagram.width, diagram.height, 520);
      preview.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(small.svg);
    } catch (problem) {
      diagram = null;
      preview.removeAttribute('src');
      showError('Le diagramme ne peut pas être préparé : ' + (problem && problem.message ? problem.message : 'erreur inconnue') + '.');
    }
    save.disabled = !diagram;
    if (!dialog.open) dialog.showModal();
    nameInput.focus();
    const dot = nameInput.value.lastIndexOf('.');
    nameInput.setSelectionRange(0, dot > 0 ? dot : nameInput.value.length); // on propose de remplacer le nom, pas l'extension
  }

  button.addEventListener('click', open);
  return { open };
}
