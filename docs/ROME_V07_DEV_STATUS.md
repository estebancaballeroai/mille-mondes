# Rome V0.7 — chantier préservé (29 octobre 2026)

## État
- Source de développement : fichier autonome V0.6 conservé en dehors de la branche principale.
- Branche GitHub `experimental/rome-v0.7` créée pour ne pas écraser `main`.
- Sauvegarde de la version actuelle : `backup/main-before-rome-v07-20261029`.
- Correctif local V0.7 : bandeau toujours visible, défilement horizontal, dimensions adaptatives en paysage, minimap replacée, commandes de zoom préservées.
- Les images haute définition de V0.6 sont intégrées dans le fichier autonome local, mais **pas encore synchronisées sur GitHub** : ne pas présenter la page GitHub comme V0.7.

## Tests exécutés localement
Chromium / Playwright via set_content, 2026-10-29 :
- 915 × 412 : 8 cibles visibles, bandeau 87 px, chargement OK, aucune erreur JS.
- 1024 × 768 : 8 cibles, bandeau 116 px, chargement OK.
- 390 × 844 : 8 cibles, bandeau 110 px, écran de rotation proposé.
- Scénario interactif : ouverture/fermeture du bandeau, zoom, validation d'un objet en mode observation, chargement des trois quartiers ; assertions satisfaites.
- Vérification syntaxique JavaScript : OK.

## Critères restant avant la publication du jeu V0.7
1. Transférer la source V0.6 autonome et ses médias (8,1 Mo) sans substitution des illustrations ni pertes de qualité.
2. Réaliser et incorporer de nouveaux détails graphiques réellement natifs (ne pas qualifier un simple agrandissement de nouveau graphisme).
3. Tests du build **hébergé** GitHub Pages, iOS et Android réel, compatibilité anciennes tablettes.
4. Comparaison et non-régression des zones cliquables sur les 24 éléments.

Aucune modification de `main` pour cette V0.7 à ce stade.
