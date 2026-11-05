// ==================================================
// DIAGRAMME EXPORTABLE : l'échiquier affiché, avec ses annotations, sur fond blanc
// ==================================================
//
// buildDiagram() fabrique un SVG autonome (cases, pièces, annotations, coordonnées, marge blanche) à partir de l'état de
// l'interface. Le même SVG sert à l'aperçu, à l'export vectoriel (.svg) et, une fois dessiné sur un canvas, aux exports
// PNG / JPEG / WebP / PDF. Ce fichier ne dépend pas du navigateur, sauf rasterize() et makePdf() (canvas, Blob,
// CompressionStream), qui ne sont appelés que depuis l'interface.
//
// Les pièces sont les mêmes fichiers SVG que ceux de l'interface (pieces/alpha/wK.svg…), passés dans pieceSvgs.
// ==================================================

export const FILES = 'abcdefgh';

const SQUARE = 100; // une case = 100 unités (les annotations de marks.js utilisent la même échelle : échiquier de 800)
const BOARD = SQUARE * 8;

// Hachures du mode « Diag. » : mêmes valeurs que le fond de l'échiquier dans style.css (case de 40 unités → 100 ici)
const DIAG_HATCH = { spacing: 7.5, stroke: 4, color: '#a3a3a3' };

const INK = '#4a3a2c'; // couleur des coordonnées (fond blanc : jamais la couleur claire du thème sombre)
const FONT = 'Helvetica, Arial, sans-serif';

/** Texte d'un fichier de pièce SVG avec position et taille imposées (un svg imbriqué garde son viewBox). */
function placePiece(svgText, x, y, size) {
  const body = svgText.replace(/<\?xml[^>]*\?>/g, '').trim();
  return body.replace(/<svg\b([^>]*)>/, (match, attributes) => {
    const cleaned = attributes.replace(/\s(?:x|y|width|height)="[^"]*"/g, '');
    return `<svg${cleaned} x="${x}" y="${y}" width="${size}" height="${size}">`;
  });
}

const round = (value) => Math.round(value * 100) / 100;

/**
 * Fabrique le diagramme.
 * @param {object} options
 * @param {Array<[string,string]>} options.pieces      [case, code de pièce] : [['e4','wP'], ['g8','bK'], …]
 * @param {string}  options.orientation               'white' (Blancs en bas) ou 'black'
 * @param {boolean} options.diag                      mode « Diag. » (cases blanches / hachurées + contour noir)
 * @param {string}  options.light, options.dark       couleurs des cases claires et foncées (mode couleurs)
 * @param {number}  options.coordScale                1, 1,5 ou 2 (taille des coordonnées, comme dans les Réglages)
 * @param {string}  options.marksInner                contenu SVG des annotations (échelle 800), ou ''
 * @param {Object<string,string>} options.pieceSvgs   code de pièce → texte du fichier SVG
 * @returns {{ svg: string, width: number, height: number }}  dimensions en unités ; width / height : rapport à respecter
 */
export function buildDiagram({
  pieces = [],
  orientation = 'white',
  diag = false,
  light = '#f0d9b5',
  dark = '#bdac8d',
  coordScale = 1,
  marksInner = '',
  pieceSvgs = {},
}) {
  const white = orientation !== 'black';
  const font = SQUARE * 0.3 * coordScale; // 0,30 case : même proportion que dans l'interface
  const outline = diag ? round((2 / 424) * BOARD) : 0; // contour noir du mode Diag. (2 px pour un échiquier de 424 px)

  // marges (blanches) : autour de tout, puis colonne des numéros à gauche et ligne des lettres en bas
  const margin = SQUARE * 0.35;
  const rankColumn = font * 0.6 + 14 + outline;
  const fileRow = font * 1.05 + 14 + outline;
  const boardX = margin + rankColumn;
  const boardY = margin;
  const width = round(boardX + BOARD + margin);
  const height = round(boardY + BOARD + fileRow + margin);

  const parts = [];
  parts.push(`<rect width="${width}" height="${height}" fill="#ffffff"/>`);

  // --- cases
  const squares = [];
  const hatched = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const darkSquare = (col + row) % 2 === 1; // en haut à gauche : case claire, quelle que soit l'orientation
      const rect = `<rect x="${col * SQUARE}" y="${row * SQUARE}" width="${SQUARE}" height="${SQUARE}"`;
      if (diag) {
        if (darkSquare) hatched.push(`${rect}/>`);
      } else {
        squares.push(`${rect} fill="${darkSquare ? dark : light}"/>`);
      }
    }
  }
  let boardMarkup;
  if (diag) {
    const { spacing, stroke, color } = DIAG_HATCH;
    boardMarkup =
      `<defs><pattern id="dg-hatch" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
      `<line x1="0" y1="0" x2="0" y2="${spacing * 5 / 3}" stroke="${color}" stroke-width="${stroke}"/></pattern></defs>` +
      `<rect width="${BOARD}" height="${BOARD}" fill="#ffffff"/>` +
      `<g fill="url(#dg-hatch)">${hatched.join('')}</g>`;
  } else {
    boardMarkup = squares.join('');
  }
  parts.push(`<g transform="translate(${round(boardX)} ${round(boardY)})">${boardMarkup}</g>`);

  if (diag) {
    parts.push(
      `<rect x="${round(boardX - outline / 2)}" y="${round(boardY - outline / 2)}" width="${round(BOARD + outline)}" ` +
        `height="${round(BOARD + outline)}" fill="none" stroke="#000000" stroke-width="${outline}"/>`,
    );
  }

  // --- pièces
  for (const [key, code] of pieces) {
    const text = pieceSvgs[code];
    if (!text || !/^[a-h][1-8]$/.test(key)) continue;
    const file = FILES.indexOf(key[0]);
    const rank = Number(key[1]) - 1;
    const col = white ? file : 7 - file;
    const row = white ? 7 - rank : rank;
    parts.push(placePiece(text, round(boardX + col * SQUARE), round(boardY + row * SQUARE), SQUARE));
  }

  // --- annotations (même échelle que l'échiquier : 800 unités)
  if (marksInner) {
    parts.push(`<svg x="${round(boardX)}" y="${round(boardY)}" width="${BOARD}" height="${BOARD}" viewBox="0 0 ${BOARD} ${BOARD}">${marksInner}</svg>`);
  }

  // --- coordonnées : lettres sous l'échiquier, numéros à sa gauche
  const labelStyle = `font-family="${FONT}" font-weight="bold" font-size="${round(font)}" fill="${INK}" text-anchor="middle"`;
  const labels = [];
  for (let i = 0; i < 8; i++) {
    const letter = white ? FILES[i] : FILES[7 - i];
    const number = white ? 8 - i : i + 1;
    const fileY = boardY + BOARD + outline / 2 + 8 + font * 0.5;
    const rankX = margin + (rankColumn - outline) / 2;
    labels.push(`<text x="${round(boardX + i * SQUARE + SQUARE / 2)}" y="${round(fileY + font * 0.35)}" ${labelStyle}>${letter}</text>`);
    labels.push(`<text x="${round(rankX)}" y="${round(boardY + i * SQUARE + SQUARE / 2 + font * 0.35)}" ${labelStyle}>${number}</text>`);
  }
  parts.push(labels.join(''));

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">` +
    parts.join('') +
    '</svg>';
  return { svg, width, height };
}

/** Même SVG, avec les dimensions de sortie voulues (largeur en pixels) et l'en-tête XML d'un fichier .svg. */
export function sizeSvg(svg, width, height, pixels, withHeader = false) {
  const outWidth = Math.round(pixels);
  const outHeight = Math.round((pixels * height) / width);
  const sized = svg.replace(/ width="[^"]*" height="[^"]*">/, ` width="${outWidth}" height="${outHeight}">`);
  return { svg: (withHeader ? '<?xml version="1.0" encoding="UTF-8"?>\n' : '') + sized, width: outWidth, height: outHeight };
}

// --------------------------------------------------
// FORMATS DE SORTIE
// --------------------------------------------------

export const FORMATS = [
  { id: 'png', label: 'PNG', extension: 'png', mime: 'image/png' },
  { id: 'jpeg', label: 'JPEG', extension: 'jpg', mime: 'image/jpeg' },
  { id: 'webp', label: 'WebP', extension: 'webp', mime: 'image/webp' },
  { id: 'pdf', label: 'PDF', extension: 'pdf', mime: 'application/pdf' },
  { id: 'svg', label: 'SVG (vectoriel)', extension: 'svg', mime: 'image/svg+xml' },
];

/** Format correspondant à l'extension d'un nom de fichier (« diagramme.jpeg » → JPEG), ou null. */
export function formatForFilename(name) {
  const match = /\.([A-Za-z0-9]+)$/.exec(String(name).trim());
  if (!match) return null;
  const extension = match[1].toLowerCase();
  if (extension === 'jpeg') return FORMATS.find((format) => format.id === 'jpeg');
  return FORMATS.find((format) => format.extension === extension) || null;
}

/** Nom de fichier propre, avec l'extension du format choisi (celle déjà tapée est remplacée si elle diffère). */
export function finalFilename(name, format) {
  let base = String(name).trim().replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_');
  const typed = formatForFilename(base);
  if (typed) base = base.replace(/\.[A-Za-z0-9]+$/, '');
  else base = base.replace(/\.+$/, '');
  if (!base) base = 'diagramme';
  return base + '.' + format.extension;
}

// --------------------------------------------------
// PDF : une page, l'image en pleine page (sans bibliothèque)
// --------------------------------------------------

const encoder = new TextEncoder();

function concatBytes(chunks) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

/**
 * Fichier PDF d'une page contenant une image RGB (8 bits).
 * @param {Uint8Array} data       pixels RGB (sans transparence) si filter = 'FlateDecode', ou fichier JPEG si 'DCTDecode'
 * @param {string} filter        'FlateDecode' (données compressées zlib) ou 'DCTDecode' (JPEG)
 * @param {number} dpi           résolution annoncée : fixe la taille de la page
 */
export function makePdf({ data, filter, width, height, dpi = 150 }) {
  const pageWidth = round((width * 72) / dpi);
  const pageHeight = round((height * 72) / dpi);
  const content = encoder.encode(`q ${pageWidth} 0 0 ${pageHeight} 0 0 cm /Im0 Do Q`);

  const objects = [
    encoder.encode('<< /Type /Catalog /Pages 2 0 R >>'),
    encoder.encode('<< /Type /Pages /Kids [3 0 R] /Count 1 >>'),
    encoder.encode(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
    ),
    null, // image : fabriquée ci-dessous (flux binaire)
    null, // contenu
  ];

  const header = encoder.encode('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  const chunks = [header];
  const offsets = [];
  let position = header.length;
  const push = (bytes) => {
    chunks.push(bytes);
    position += bytes.length;
  };
  const stream = (dictionary, bytes) => [
    encoder.encode(`<< ${dictionary} /Length ${bytes.length} >>\nstream\n`),
    bytes,
    encoder.encode('\nendstream'),
  ];

  const imageDictionary =
    `/Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /${filter}`;

  objects.forEach((body, index) => {
    offsets.push(position);
    push(encoder.encode(`${index + 1} 0 obj\n`));
    if (index === 3) for (const part of stream(imageDictionary, data)) push(part);
    else if (index === 4) for (const part of stream('', content)) push(part);
    else push(body);
    push(encoder.encode('\nendobj\n'));
  });

  const xrefPosition = position;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) xref += String(offset).padStart(10, '0') + ' 00000 n \n';
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPosition}\n%%EOF\n`;
  push(encoder.encode(xref));
  return concatBytes(chunks);
}

// --------------------------------------------------
// NAVIGATEUR : SVG → canvas → fichier
// --------------------------------------------------

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Le diagramme n’a pas pu être dessiné.'));
    image.src = url;
  });
}

/** Dessine le SVG (déjà aux dimensions voulues) sur un canvas à fond blanc. */
export async function rasterize(svg, width, height) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const image = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const canvasToBlob = (canvas, mime, quality) => new Promise((resolve) => canvas.toBlob(resolve, mime, quality));

/** Le navigateur sait-il enregistrer ce format d'image ? (WebP : pas sur tous les navigateurs) */
export function canEncode(mime) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  return canvas.toDataURL(mime).startsWith('data:' + mime);
}

async function deflate(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** PDF d'une page à partir d'un canvas : image sans perte si le navigateur sait compresser, sinon JPEG. */
export async function canvasToPdf(canvas, dpi = 150) {
  const { width, height } = canvas;
  if (typeof CompressionStream === 'function') {
    const rgba = canvas.getContext('2d').getImageData(0, 0, width, height).data;
    const rgb = new Uint8Array(width * height * 3);
    for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
      rgb[j] = rgba[i];
      rgb[j + 1] = rgba[i + 1];
      rgb[j + 2] = rgba[i + 2];
    }
    return makePdf({ data: await deflate(rgb), filter: 'FlateDecode', width, height, dpi });
  }
  const jpeg = new Uint8Array(await (await canvasToBlob(canvas, 'image/jpeg', 0.95)).arrayBuffer());
  return makePdf({ data: jpeg, filter: 'DCTDecode', width, height, dpi });
}

/** Fichier (Blob) du diagramme dans le format demandé. */
export async function renderFile(diagram, format, pixels) {
  const sized = sizeSvg(diagram.svg, diagram.width, diagram.height, pixels, format.id === 'svg');
  if (format.id === 'svg') return new Blob([sized.svg], { type: format.mime });
  const canvas = await rasterize(sized.svg, sized.width, sized.height);
  if (format.id === 'pdf') return new Blob([await canvasToPdf(canvas)], { type: format.mime });
  const blob = await canvasToBlob(canvas, format.mime, format.id === 'png' ? undefined : 0.95);
  if (!blob) throw new Error('Ce format n’est pas disponible dans ce navigateur.');
  return blob;
}
