import { defineConfig } from "vite";

// Comme cc2 : le site compilé est écrit dans "docs" (GitHub Pages > dossier /docs).
// base "./" : les chemins restent valides quel que soit le nom du dépôt.
// ATTENTION : positions.js est compilé DANS le site. Après chaque modification,
// relancer "npm run build" puis publier (commit + push) tout le dossier docs.
export default defineConfig({
    base: "./",
    build: {
        outDir: "docs",
        emptyOutDir: true
    }
});
