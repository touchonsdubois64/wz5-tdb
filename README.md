# Touchons du Bois — L’Intégrale

Version simplifiée de Winning Zone, centrée sur la résolution d'exercices.

```
npm install
npm run dev      # développement
npm run build    # site statique dans docs/ (GitHub Pages)
```

- Positions : uniquement via le dossier (`src/positions.js`, explications en tête du fichier).
- Les images, pièces et Stockfish sont dans `public/` (copiés tels quels dans `docs/` à la compilation).
- Après modification de `positions.js` : `npm run build`, puis commit + push de **tout** le dossier `docs`.
