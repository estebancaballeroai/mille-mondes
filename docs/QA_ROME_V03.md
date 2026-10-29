# Rome - QA V0.3

## Avancement
- L'illustration de Rome est présente dans `assets/rome-4k.webp`.
- Six hotspots recalibrés par comparaison visuelle avec le fichier réel.
- Cinq parcours avec énoncés différents : deux pour enfants, trois pour adultes.
- Séparation des sauvegardes par niveau, avec migration depuis `mm-found-enfant`.
- Correction du déclenchement d'une sélection après un geste à deux doigts.
- Correction de l'écran de fin qui masquait l'anecdote de la dernière découverte.
- Mode diagnostic : ajouter `?debug=1` à l'URL pour afficher tous les centres et contours.
- Scénario de tests navigateur Chromium dans `tests/smoke.mjs` pour desktop et mobile.

## À contrôler sur appareils physiques avant fusion
1. Charger complètement l'illustration sur une ancienne tablette Android.
2. Taper les six objets (arc à gauche, temple au centre-droit, navires en haut, statue équestre, fontaine et étals).
3. Pincer à deux doigts puis relâcher : aucun objet ne doit se valider par accident.
4. Déplacer l'image, augmenter le zoom, puis recentrer.
5. Passer dans les cinq parcours et vérifier les progrès séparés.
6. Fermer l'anecdote de la sixième découverte et consulter le bilan.
7. Fermer et rouvrir le navigateur pour confirmer la sauvegarde.

## Limite graphique à conserver dans l'interface
Le fichier porte un nom 4K mais est issu d'une image native 1672 x 941 agrandie par rééchantillonnage à 3840 x 2160. L'agrandissement ne crée pas de véritables détails natifs. Une V0.4 devra intégrer des tuiles haute résolution réellement détaillées.

## Limite historique
L'image rassemble volontairement monuments, port et marchés dans une même composition imaginaire. Elle ne représente pas la topographie authentique de Rome en 117.

## Sources pour renforcer les fiches pédagogiques
- Ville de Rome, Marchés de Trajan : https://www.mercatiditraiano.it/en/infopage/mercados-de-trajano
- Ville de Rome, Forum de Trajan : https://turismoroma.it/en/node/1041
- Ministère de la Culture, aqueducs dans la ville romaine : https://archeologie.culture.gouv.fr/paris/en/aqueduct
- Metropolitan Museum of Art, Roman Art : https://www.metmuseum.org/zh/-/media/files/learn/for-educators/publications-for-educators/roman.pdf

Les descriptions du prototype sont générales et doivent être enrichies avec les sources attachées à chaque objet dans une future version.
