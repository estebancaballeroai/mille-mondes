# MILLE MONDES — Rome : Les vies cachées · V0.4

Prototype de cherche-et-trouve éducatif, avec **trois quartiers illustrés nativement** (forum, port et marché), **24 cibles** mêlant monuments, personnes, animaux et petits objets, et **deux façons de jouer** :

- **Observer** — chercher dans l'image puis confirmer sur une carte, sans toucher aux objets ; afficher une solution quand on le souhaite.
- **Toucher** — toucher le personnage ou l'objet dans l'image, après déplacement ou zoom.

5 difficultés, sauvegardes locales séparées, anecdotes historiques, commandes tactiles, souris et clavier. Ouvrir `index.html` (ou héberger le dossier sur un serveur HTTP statique).

## Limites connues

- Les décors sont des **créations originales d'ImageGen**. Chaque quartier est un fichier natif entre 1100 et 1450 pixels de large, sans agrandissement artificiel à 4K. Le jeu permet d'examiner les scènes à cette résolution et limite le zoom pour éviter les pixels excessifs.
- **Ce n'est pas du 4K natif par quartier.** Une évolution devra générer des tuiles de détails cohérentes et indépendantes d'au moins 2048 px chacune.
- L'illustration est une **composition historique imaginaire**, pas une reconstitution topographique fidèle de Rome.
- Les zones de recherche ont été calibrées visuellement sur les images fournies : des essais utilisateurs restent nécessaires pour affiner les tolérances des petits personnages.
- Pas de publicité, de compte, de réseau, de collecte de données ni de connexion externe.

## Structure

- `index.html` : moteur complet HTML5, Canvas, CSS et JavaScript, utilisable hors ligne.
- `assets/*.webp` : trois illustrations originales nécessaires au jeu.
- `tests/` : scénario de test de navigation/tactile.

## Hébergement GitHub Pages

Copier tout le contenu du dossier dans un dépôt GitHub, puis activer Pages sur la branche choisie. L'ensemble fonctionne sur une URL statique. Conserver la V0.3 avant toute fusion.