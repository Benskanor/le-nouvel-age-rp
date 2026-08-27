# Le Nouvel Âge RP — version GitHub optimisée

Cette version conserve le rendu de la migration fidèle validée, mais les ressources
SingleFile ont été extraites et dédupliquées.

## Structure

- `index.html` : accueil
- chaque route possède son propre `index.html`
- `assets/media/` : images et polices partagées
- `assets/css/` : feuilles de style dédupliquées
- `.nojekyll` : publication GitHub Pages sans traitement Jekyll

## Modifier le site

Les textes restent actuellement dans les fichiers HTML des pages.
Cette version est volontairement une étape intermédiaire : fidélité visuelle d'abord,
puis simplification éditoriale dans une étape suivante.

## Publication

Copier tout le contenu à la racine du dépôt GitHub Pages et pousser sur `main`.
