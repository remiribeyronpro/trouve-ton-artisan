# MCD / MLD

## MCD
CATÉGORIE (id, nom)
1,N — possède — 1,1
SPÉCIALITÉ (id, nom)
1,N — regroupe — 1,1
ARTISAN (id, nom, note, ville, à_propos, email, site_web, top)

## Règles
- Une catégorie peut posséder plusieurs spécialités.
- Une spécialité appartient à une seule catégorie.
- Une spécialité peut regrouper plusieurs artisans.
- Un artisan appartient à une seule spécialité.

## MLD
CATEGORIE(#id, nom)
SPECIALITE(#id, nom, categorie_id => CATEGORIE.id)
ARTISAN(#id, nom, note, ville, a_propos, email, site_web, top, specialite_id => SPECIALITE.id)
