# Le Nouvel Âge RP — migration fidèle du site ChatGPT

Cette version a été reconstruite depuis les sauvegardes SingleFile du site original.

## Objectif
- conserver le rendu visuel original ;
- conserver les textes, images et sections ;
- rendre tous les liens internes compatibles avec GitHub Pages dans un sous-dossier ;
- ne plus dépendre de l’URL `chatgpt.site`.

## Routes migrées
- `/`
- `/activites`
- `/bestiaire`
- `/creer-son-personnage`
- `/demi-dieux`
- `/factions`
- `/histoire`
- `/metiers`
- `/mods`
- `/mods/le-nouvel-age`
- `/origines`
- `/reglement`
- `/religions`
- `/royaumes`
- `/royaumes/asharun`
- `/royaumes/erythros`
- `/royaumes/falkheim`
- `/royaumes/nerethis`
- `/royaumes/shintai`
- `/royaumes/vanloria`
- `/territoire`

## Publication
Copier tout le contenu de ce dossier à la racine du dépôt `Benskanor/le-nouvel-age-rp`, commit puis Push origin. GitHub Pages est déjà configuré sur `main / (root)`.

## Important
Cette première migration privilégie la fidélité visuelle : les images et polices sont encore intégrées directement dans les HTML, comme dans les sauvegardes SingleFile. Une seconde passe pourra ensuite factoriser les assets pour rendre le site plus léger et plus facile à éditer sans changer son apparence.
