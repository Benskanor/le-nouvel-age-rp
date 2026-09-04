# Mise à jour Personnages — Le Nouvel Âge RP

Cette mise à jour remplace la première page Personnages par une version intégrée au template général du site.

## Fichiers à copier dans la racine du dépôt GitHub

- `index.html` — ajoute un accès direct depuis l'accueil et autorise le chargement des données partagées.
- `personnages/index.html` — nouvelle page Personnages.
- `data/personnages.json` — registre éditorial propre des 51 personnages.
- `data/layout.json` — ajoute « Personnages » à la navigation principale et le header/footer de la page.
- `assets/css/personnages.css` — design de la page.
- `assets/js/personnages.js` — filtres, dirigeants, fiches et relations.

## Installation

1. Ouvrir GitHub Desktop et sélectionner `Benskanor/le-nouvel-age-rp`.
2. `Repository` → `Show in Explorer`.
3. Décompresser ce ZIP.
4. Copier tous les fichiers/dossiers du ZIP dans la racine du dépôt.
5. Accepter **Fusionner les dossiers** et **Remplacer les fichiers** pour les fichiers portant le même nom.
6. Dans GitHub Desktop, vérifier les changements.
7. Commit : `Refonte du registre des personnages`.
8. Cliquer sur `Push origin`.
9. Cloudflare Pages redéploiera automatiquement le site.

La page sera accessible depuis la navigation de l'accueil et à l'adresse `/personnages/`.

## Contenu éditorial

- 51 personnages.
- Tri par royaume.
- Statuts Vivant / Porté disparu / Mort.
- Dirigeants mis en évidence.
- Les disparus ordinaires restent visuellement sobres ; Halfdan et Ryūsei restent mis en avant car ils occupent/occupaient une fonction dirigeante.
- Relations publiques uniquement ; les secrets de fiches ne sont pas révélés.
- Toph Beifong, Zhao Tianlong et Arthur de Clairval sont présents sans biographie inventée : leur fiche indique simplement que les informations publiques restent à compléter.
