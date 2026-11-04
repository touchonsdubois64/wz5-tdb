// ==================================================
// RÉGLAGES (roue dentée) : thème général (clair / classique / sombre), aspect de l'échiquier
// (couleurs ou « diag. » façon diagramme de livre), couleurs des cases, taille des coordonnées
// et notation des coups (figurines, RDTFCP ou KQRBNP).
// Les choix sont mémorisés dans le navigateur (localStorage).
// ==================================================

const STORAGE_KEY = 'winning-zone.settings';

const PRESETS = [
  { id: 'classique', label: 'Classique', light: '#f0d9b5', dark: '#bdac8d' },
  { id: 'brun', label: 'Brun', light: '#f0d9b5', dark: '#b58863' },
  { id: 'vert', label: 'Vert', light: '#eeeed2', dark: '#769656' },
  { id: 'bleu', label: 'Bleu', light: '#dee3e6', dark: '#8ca2ad' },
  { id: 'gris', label: 'Gris', light: '#ebebeb', dark: '#a6a6a6' },
];
const DEFAULT = PRESETS[0];

const THEMES = [['clair', 'Clair'], ['classique', 'Classique'], ['dark', 'Sombre']];

// Taille des coordonnées (a-h, 1-8) : multiple de la taille d'origine
const COORD_SIZES = [
  { id: 'petites', label: 'Petites', scale: 1 },
  { id: 'moyennes', label: 'Moyennes', scale: 1.5 },
  { id: 'grandes', label: 'Grandes', scale: 2 },
];

// Notation des coups : la valeur est celle de la liste cachée #notation (lue par app.js)
const NOTATIONS = [
  { id: 'figurines', label: 'Figurines', pieces: ['wK', 'wQ', 'wR', 'wB', 'wN'] },
  { id: 'french', label: 'Notation française : R D T F C', text: 'RDTFCP' },
  { id: 'international', label: 'Notation internationale : K Q R B N', text: 'KQRBNP' },
];

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved) {
      const valid = (value) => /^#[0-9a-f]{6}$/i.test(value);
      return {
        light: valid(saved.light) ? saved.light : DEFAULT.light,
        dark: valid(saved.dark) ? saved.dark : DEFAULT.dark,
        theme: THEMES.some(([id]) => id === saved.theme) ? saved.theme : 'classique',
        board: saved.board === 'diag' ? 'diag' : 'couleurs',
        coords: COORD_SIZES.some((size) => size.id === saved.coords) ? saved.coords : 'petites',
        notation: NOTATIONS.some((entry) => entry.id === saved.notation) ? saved.notation : 'figurines',
      };
    }
  } catch (error) {
    /* stockage indisponible : on garde les réglages par défaut */
  }
  return { light: DEFAULT.light, dark: DEFAULT.dark, theme: 'classique', board: 'couleurs', coords: 'petites', notation: 'figurines' };
}

function save(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    /* sans importance : le réglage vaut pour la session */
  }
}

function apply(settings, notationSelect) {
  const root = document.documentElement;
  if (notationSelect && notationSelect.value !== settings.notation) {
    notationSelect.value = settings.notation;
    notationSelect.dispatchEvent(new Event('change', { bubbles: true })); // app.js réécrit la liste des coups
  }
  root.style.setProperty('--board-light', settings.light);
  root.style.setProperty('--board-dark', settings.dark);
  if (settings.theme === 'dark' || settings.theme === 'clair') root.setAttribute('data-theme', settings.theme);
  else root.removeAttribute('data-theme');
  const size = COORD_SIZES.find((entry) => entry.id === settings.coords) || COORD_SIZES[0];
  root.style.setProperty('--coord-scale', String(size.scale));
  // aspect « diag. » : cases blanches / hachurées + contour noir (voir style.css)
  if (settings.board === 'diag') root.setAttribute('data-board', 'diag');
  else root.removeAttribute('data-board');
}

export function setupSettings({ button, menu, notation, pieceUrl = (name) => './pieces/alpha/' + name + '.svg' }) {
  let settings = load();
  apply(settings, notation);

  const close = () => {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };

  function render() {
    menu.innerHTML = '';

    const title = document.createElement('p');
    title.className = 'settings-title';
    title.textContent = 'Réglages';
    menu.appendChild(title);

    const themeTitle = document.createElement('p');
    themeTitle.className = 'settings-section';
    themeTitle.textContent = 'Thème';
    menu.appendChild(themeTitle);

    const themes = document.createElement('div');
    themes.className = 'settings-presets';
    for (const [id, label] of THEMES) {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'settings-preset settings-theme' + (settings.theme === id ? ' selected' : '');
      element.dataset.theme = id;
      element.textContent = label;
      element.addEventListener('click', () => change({ ...settings, theme: id }));
      themes.appendChild(element);
    }
    menu.appendChild(themes);

    const boardTitle = document.createElement('p');
    boardTitle.className = 'settings-section';
    boardTitle.textContent = 'Échiquier';
    menu.appendChild(boardTitle);

    const boards = document.createElement('div');
    boards.className = 'settings-presets';
    for (const [id, label] of [['couleurs', 'Couleurs'], ['diag', 'Diag.']]) {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'settings-preset settings-theme' + (settings.board === id ? ' selected' : '');
      element.dataset.board = id;
      element.title = id === 'diag' ? 'Rendu diagramme de livre : cases blanches et hachurées, contour noir' : 'Cases colorées';
      element.textContent = label;
      element.addEventListener('click', () => change({ ...settings, board: id }));
      boards.appendChild(element);
    }
    menu.appendChild(boards);

    // les couleurs restent modifiables en mode « Diag. », mais sont sans effet tant qu'il est actif
    const colorBlock = document.createElement('div');
    colorBlock.className = 'settings-colorblock' + (settings.board === 'diag' ? ' inactive' : '');
    menu.appendChild(colorBlock);

    const section = document.createElement('p');
    section.className = 'settings-section';
    section.textContent = settings.board === 'diag' ? 'Couleurs des cases (inactives en mode Diag.)' : 'Couleurs des cases';
    colorBlock.appendChild(section);

    const presets = document.createElement('div');
    presets.className = 'settings-presets';
    for (const preset of PRESETS) {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'settings-preset' + (preset.light === settings.light && preset.dark === settings.dark ? ' selected' : '');
      element.innerHTML =
        `<span class="settings-swatch"><i style="background:${preset.light}"></i><i style="background:${preset.dark}"></i></span>` +
        `<span>${preset.label}</span>`;
      element.addEventListener('click', () => change({ ...settings, light: preset.light, dark: preset.dark }));
      presets.appendChild(element);
    }
    colorBlock.appendChild(presets);

    const colors = document.createElement('div');
    colors.className = 'settings-colors';
    const makePicker = (label, key) => {
      const wrapper = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'color';
      input.value = settings[key];
      input.addEventListener('input', () => change({ ...settings, [key]: input.value }, false));
      wrapper.append(document.createTextNode(label), input);
      return wrapper;
    };
    colors.append(makePicker('Claires', 'light'), makePicker('Foncées', 'dark'));
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'settings-reset';
    reset.textContent = 'Rétablir';
    reset.addEventListener('click', () => change({ ...settings, light: DEFAULT.light, dark: DEFAULT.dark }));
    colors.appendChild(reset);
    colorBlock.appendChild(colors);

    const coordTitle = document.createElement('p');
    coordTitle.className = 'settings-section';
    coordTitle.textContent = 'Coordonnées';
    menu.appendChild(coordTitle);

    const coords = document.createElement('div');
    coords.className = 'settings-presets';
    for (const size of COORD_SIZES) {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'settings-preset settings-theme' + (settings.coords === size.id ? ' selected' : '');
      element.dataset.coords = size.id;
      element.textContent = size.label;
      element.addEventListener('click', () => change({ ...settings, coords: size.id }));
      coords.appendChild(element);
    }
    menu.appendChild(coords);

    const notationTitle = document.createElement('p');
    notationTitle.className = 'settings-section';
    notationTitle.textContent = 'Notation des coups';
    menu.appendChild(notationTitle);

    const notations = document.createElement('div');
    notations.className = 'settings-presets';
    for (const entry of NOTATIONS) {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'settings-preset settings-theme settings-notation' + (settings.notation === entry.id ? ' selected' : '');
      element.dataset.notation = entry.id;
      element.title = entry.label;
      element.setAttribute('aria-label', entry.label);
      if (entry.pieces) {
        for (const piece of entry.pieces) {
          const image = document.createElement('img');
          image.src = pieceUrl(piece);
          image.alt = '';
          image.className = 'settings-notation-piece';
          element.appendChild(image);
        }
      } else {
        element.textContent = entry.text;
      }
      element.addEventListener('click', () => change({ ...settings, notation: entry.id }));
      notations.appendChild(element);
    }
    menu.appendChild(notations);

    const note = document.createElement('p');
    note.className = 'settings-note';
    note.textContent = 'D’autres réglages pourront être ajoutés ici.';
    menu.appendChild(note);
  }

  function change(next, redraw = true) {
    settings = next;
    apply(settings, notation);
    save(settings);
    if (redraw) render();
  }

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    if (menu.hidden) {
      render();
      menu.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    } else {
      close();
    }
  });
  document.addEventListener('click', (event) => {
    if (!menu.hidden && !event.composedPath().includes(menu)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}
