# Le Nouvel Âge RP ARK — Site

Version GitHub Pages du site communautaire.

## Structure

- `index.html` : accueil
- `pages/` : pages principales
- `data/site.json` : nom du site, royaumes, résumés et métiers
- `assets/css/styles.css` : design
- `assets/js/site.js` : chargement des données

## Modifier rapidement un texte

Les données générales faciles à modifier sont dans `data/site.json`.

Pour les pages détaillées, ouvrir le fichier HTML correspondant dans `pages/`.

## Publication GitHub Pages

1. Créer un dépôt GitHub public, par exemple `le-nouvel-age-rp`.
2. Importer le contenu de ce dossier à la racine du dépôt.
3. Ouvrir `Settings` > `Pages`.
4. Choisir le déploiement depuis la branche `main` et le dossier `/ (root)`.
5. Enregistrer.

## Domaine personnalisé

Une fois le domaine acheté, le configurer dans `Settings` > `Pages` > `Custom domain`.
Ne pas ajouter de fichier `CNAME` tant que le domaine définitif n'est pas choisi.

## Migration

Cette base reprend l'architecture connue du site. Les textes détaillés et les images de la version ChatGPT Sites devront être recopiés lorsque leurs sources seront récupérées.
