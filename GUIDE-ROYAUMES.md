# Modifier les Royaumes — Le Nouvel Âge RP

La première zone du site est maintenant pilotée par :

`data/royaumes.json`

Tu peux modifier ce fichier avec Bloc-notes, Notepad++, VS Code ou directement GitHub.

## Exemple : changer Asharun

Cherche :

```json
"asharun": {
```

Les champs principaux sont :

- `identity` : nom officiel + gentilé affichés au-dessus du titre
- `motto` : grande devise
- `intro` : présentation courte du royaume
- `heroImage` : image principale
- `stats` : capitale, régime/foi, nombre d'événements, etc.
- `values` : les trois valeurs et leurs descriptions
- `ending` : bloc final de la page

Un `\n` dans `motto` crée un retour à la ligne.

## Page qui compare les six Royaumes

La section :

```json
"directory": {
```

contrôle la page `/royaumes/` :

- grande introduction
- cartes des six royaumes
- résumés
- valeurs affichées sur les cartes
- image principale
- bloc final

## Images

Les images principales ont maintenant des noms lisibles :

`assets/images/royaumes/`

Exemples :

- `asharun-hero.png`
- `falkheim-hero.png`
- `shintai-hero.png`
- `vanloria-hero.png`
- `nerethis-hero.png`
- `erythros-hero.png`

Pour remplacer une image sans modifier le JSON, remplace simplement le fichier
par une nouvelle image portant exactement le même nom et la même extension.

## Important pour tester

En ouvrant directement `index.html` par double-clic, Chrome peut empêcher le chargement
du JSON pour des raisons de sécurité `file://`.

Le HTML garde volontairement les données originales en secours, donc le site reste beau,
mais tes modifications JSON se voient après publication sur GitHub Pages.

Le workflow le plus simple est donc :

1. modifier `data/royaumes.json`
2. commit dans GitHub Desktop
3. Push origin
4. recharger le site GitHub Pages

## Ce qui reste encore dans le HTML

Pour cette V2, je n'ai volontairement pas touché aux parties complexes afin de préserver
le rendu validé :

- institutions
- hiérarchies
- justice
- chroniques détaillées
- histoire complète de chaque royaume

Ce sera la prochaine brique de migration des Royaumes.
