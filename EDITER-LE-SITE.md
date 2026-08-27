# Modifier Le Nouvel Âge RP

## Ce qui est centralisé

### Navigation, en-têtes et pieds de page
Fichier :

`data/layout.json`

Il contient la configuration de chaque route.
Pour changer le texte d'un lien de navigation, son URL ou un sous-titre d'en-tête,
c'est ici qu'il faut intervenir.

### Design
Les feuilles de style partagées sont dans :

`assets/css/`

### Images et polices
Les ressources du site sont dans :

`assets/media/`

## Modifier le texte d'une page

Chaque page possède maintenant un fichier HTML beaucoup plus léger :

- accueil : `index.html`
- royaumes : `royaumes/index.html`
- métiers : `metiers/index.html`
- règlement : `reglement/index.html`
- etc.

Le header et le footer ne sont plus recopiés dans chaque page.

## Règle de travail

1. Modifier une seule petite chose.
2. Ouvrir le site localement ou pousser sur GitHub.
3. Vérifier visuellement.
4. Commit seulement quand le résultat est validé.

## Étape suivante prévue

Les contenus structurés les plus souvent modifiés seront sortis des HTML :

- royaumes
- métiers
- bestiaire
- activités

Ils seront placés dans des fichiers JSON simples afin de pouvoir modifier les données
sans toucher au HTML.


---

# V2 — Royaumes éditables

Les données principales des Royaumes sont désormais centralisées dans :

`data/royaumes.json`

Voir `GUIDE-ROYAUMES.md` pour les instructions détaillées.
