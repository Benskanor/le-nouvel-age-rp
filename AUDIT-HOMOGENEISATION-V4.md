# Audit d’homogénéisation — Thème Fantasy Noir / Doré V4

## Correctif principal

Le retour du vert venait des feuilles CSS d’origine (`--night:#090d0b`, `--panel:#101713`) et du fait que l’override global n’était pas chargé sur plusieurs pages exportées sans balise `</head>` explicite. Le lien vers `global-overrides.css` est maintenant injecté en dernier sur toutes les pages.

## Contrôles globaux

- 101 fichiers HTML : thème global chargé en dernier sur 101/101.
- 0 ressource locale cassée détectée dans les balises image/script/stylesheet.
- Les 27 routes principales ont un en-tête, un pied de page et un H1.
- Palette centrale : noir / brun charbon / or, avec couleurs de royaumes limitées aux accents.
- Base typographique portée à 18 px sur desktop, 17 px tablette et 16 px mobile.
- Boutons, formulaires, encadrés, cartes, sidebars et tableaux partagent maintenant la même grammaire visuelle.

## Vérification page par page

| Route | État | Contrôle principal |
|---|---|---|
| `/` | OK | Accueil — portail, registre, sections, cartes et navigation |
| `/royaumes/` | OK | Royaumes — cartes, drapeaux, couleurs de factions, CTA final |
| `/royaumes/asharun/` | OK | Asharun — noir/or avec accent vert |
| `/royaumes/falkheim/` | OK | Falkheim — noir/or avec accent violet |
| `/royaumes/shintai/` | OK | Shintai — noir/or avec accent rouge |
| `/royaumes/vanloria/` | OK | Vanloria — noir/or avec accent bleu |
| `/royaumes/nerethis/` | OK | Nerethis — noir/or avec accent or faction |
| `/royaumes/erythros/` | OK | Erythros — noir/or avec accent cyan |
| `/territoire/` | OK | Territoire — ressources, règles créatures, panneaux et CTA |
| `/bestiaire/` | OK | Bestiaire — filtres, cartes, contrôles et panneaux |
| `/activites/` | OK | Activités — index, événements, donjons, panneaux et galeries |
| `/creer-son-personnage/` | OK | Création personnage — guide, règles, exemple et CTA |
| `/metiers/` | OK | Métiers — index, fiches professions, galeries et sidebars |
| `/origines/` | OK | Origines — cartes, images, intro, archives et navigation |
| `/histoire/` | OK | Histoire — chapitres, index, sidebar et blocs narratifs |
| `/religions/` | OK | Religions — croyances, fiches, calendriers et rituels |
| `/demi-dieux/` | OK | Demi-dieux — cartes légendes, fiches boss et pacte |
| `/factions/` | OK | Factions — catégories, fiches, archives et cartes |
| `/mods/` | OK | Mods — catégories, mod officiel, principes et CTA |
| `/mods/le-nouvel-age/` | OK | Mod officiel — hero, contenu, chips et communauté |
| `/reglement/` | OK | Règlement — règles, sidebar, chapitres et blocs finaux |
| `/personnages/` | OK | Registre — cartes, statuts, dirigeants, filtres et modales |
| `/wiki/` | OK | Wiki — accueil, catégories, cartes et recherche |
| `/wiki/economie/` | OK | Wiki Économie — stations, royaumes, transformations et consommables |
| `/wiki/ressources/` | OK | Wiki Ressources — filtres, cartes, images et catalogue |
| `/wiki/consommables/` | OK | Wiki Consommables — cartes royaume et refonte vanilla |
| `/wiki/nouveautes/` | OK | Wiki Nouveautés — V4 uniquement, cartes et statuts |

## Points éditoriaux nettoyés

- Le bloc « Source de référence » a été retiré du Wiki.
- Le registre des personnages est maintenant accessible depuis le sommaire et depuis une carte visible de la page d’accueil.
- La V5 reste absente du Wiki.
- Savoroot, Longrass, Rockarrot et Citronal restent retirés du catalogue de ressources territoriales.
- Les visuels Erythros fournis ont remplacé les images de remplacement pour Olive, Raisin, Figue, Moût de raisin, Vinaigre de raisin, Figues séchées et Huile d’olive.

## Remarque de maintenance

Les futures corrections de thème doivent être faites en priorité dans `assets/css/global-overrides.css`. Cela évite de réintroduire les anciennes palettes vertes dispersées dans les exports historiques.
