# MILLE MONDES — Les secrets cachés

Un jeu de cherche-et-trouve éducatif à explorer sur mobile et ordinateur.

## Jouer et tester

- **Version stable V0.1 :** [ouvrir la page](./index.html)
- **Préversion Rome V0.3 :** [ouvrir la page](./preview/rome-v03/index.html) — tests navigateur réussis, à tester sur tablette réelle
- **Code de développement V0.3 :** branche `experimental/rome-v0.3`
- **Pull request de validation :** [#2](https://github.com/estebancaballeroai/mille-mondes/pull/2)

Si GitHub Pages est configuré sur la branche `main` et le dossier racine, ouvrir :

- V0.1 : https://estebancaballeroai.github.io/mille-mondes/
- Préversion V0.3 : https://estebancaballeroai.github.io/mille-mondes/preview/rome-v03/

Pour activer Pages : `Settings > Pages > Build and deployment > Deploy from a branch > main / (root)`. Les liens publics ne sont accessibles qu'une fois le déploiement terminé.

## Parcours de Rome (V0.3)

- Enfants de 6 à 7 ans
- Enfants de 8 à 10 ans
- Adultes : normal, difficile et expert

Six objets à découvrir, zoom et déplacement tactile, indices, anecdotes historiques et sauvegarde locale indépendante par niveau.

L'image actuelle est une composition artistique inspirée de Rome vers 117 apr. J.-C., sans fidélité topographique. Elle est agrandie en 4K depuis un original moins détaillé : le véritable zoom haute définition par tuiles reste au programme.

## Qualité et documentation

- [Méthode de création des scènes](./docs/METHODOLOGIE_SCENARIOS.md)
- [Compte rendu de validation V0.3](./docs/QA_ROME_V03.md) (branche expérimentale)
- Tests Chromium desktop/mobile via `tests/smoke.mjs` et GitHub Actions (branche expérimentale)
- Branches de développement, conservation des anciennes versions et validation avant fusion

**Priorités futures :** tests réels sur tablette Android ancienne, véritables détails haute résolution, scène pédagogique plus riche, puis autres univers historiques.
