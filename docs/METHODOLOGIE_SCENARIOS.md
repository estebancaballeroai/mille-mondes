# MILLE MONDES — Méthodologie de création des scénarios (v1)

## Objectif
Créer un cherche-et-trouve éducatif mobile-first. Chaque univers propose les mêmes illustrations aux enfants (6–10 ans) et aux adultes (normal, difficile, expert). Le cœur du jeu est l’observation et non une interrogation scolaire.

## Pipeline obligatoire, dans cet ordre
1. **Choix du thème** : époque, lieu, événement, apprentissages et niveau de sensibilité (ex. guerre). Énoncer précisément ce qui est historique, vraisemblable, fictif.
2. **Recherche documentaire** : consulter plusieurs sources fiables (musées, institutions patrimoniales, travaux historiques), établir une fiche des vêtements, métiers, architectures, objets, usages et éléments anachroniques à éviter. Conserver sources et dates.
3. **Design de scène** : établir une carte isométrique, plusieurs quartiers et une circulation visuelle ; définir la narration environnementale et les interactions prévues.
4. **Inventaire pédagogique** : préparer 30 à 80 cibles futures identifiées par un ID unique, un nom, une fonction historique, une source, des variantes enfant/adulte, une difficulté et les indices successifs.
5. **Production graphique d’abord** : générer décor(s), sprites, objets interactifs et variantes avec ImageGen / illustration. Valider la cohérence, le nombre et la visibilité des cibles. Aucun hotspot sans objet visible. Éviter les textes illisibles produits dans l’image : réaliser les textes via l’interface.
6. **Résolution** : vérifier la résolution native ; si une image est agrandie en 4K par rééchantillonnage, l’indiquer honnêtement. Pour un zoom vraiment net, créer des tuiles et détails sources à résolution native plus élevée. Compression WebP et versions adaptées à la mémoire des anciennes tablettes.
7. **Annotations** : enregistrer pour chaque cible `id`, `x`, `y`, `radius` normalisés en coordonnées image [0,1], variantes visuelles, états, anecdote historique, indices et crédit des sources. Vérifier manuellement chaque point à plusieurs zooms.
8. **Interaction** : pointer/tap pour valider, glisser pour naviguer, pinch pour zoomer, retour immédiat, animation et explication facultative. Les zones ne doivent pas se chevaucher ; ne pas confondre pan et tap.
9. **Parcours pédagogiques** : enfant 6–7, enfant 8–10, adulte normal, adulte difficile, adulte expert. Adapter complexité des indices, nombre de cibles, manipulations et enquêtes, pas seulement la taille tactile.
10. **Récompense & progression** : sauvegarde par profil, album historique, collection, objectifs optionnels, aucun blocage artificiel, mode libre.
11. **QA réelle** : vérifier que tous les objets existent dans l’image, que tous sont accessibles et sélectionnables ; tests sur Android ancien, iOS, ordinateur, navigateur tactile, faible mémoire et hors-ligne ; tests automatisés des changements de mode, sauvegardes et non-régression.
12. **Livraison/versionnage** : sauvegarde de la version précédente, branche Git expérimentale, capture comparative des écrans, inventaire des changements, validation avant fusion.

## Convention de fichier (objectif v0.2)
`univers/rome/scenes/forum/scene.json`, `background.webp`, `tiles/`, `objects.json`, `facts.fr.json`, `sources.md`, `qa.md`.

## Limites de la V0.1
Une image unique de 1672×941 pixels native, agrandie à 3840×2160 par Lanczos (ce n’est PAS du détail 4K natif). Six zones de clic approximées à vérifier manuellement. Une seule scène, deux modes à difficulté tactile différente, sans enquêtes, animations d’objets ni différents chapitres. Les scènes sont imaginaires : certains éléments historiques/topographiques sont assemblés pour le gameplay.

## Critères d’acceptation V0.2
Tous les hotspots annotés sur image à résolution d’origine et testés ; liste d’objets non ambigus ; au moins un bâtiment interactif avec ressources graphiques séparées ; missions distinctes enfants/adultes ; textes historiques sourcés ; vérification des gestes et de l’enregistrement sur appareils réels.