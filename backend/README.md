# Backend — Strapi v5

CMS Headless pour la gestion du contenu du site Une Rose Un Espoir.

## Commandes

```bash
npm run develop   # Dev avec auto-reload (port 1337)
npm run start     # Production
npm run build     # Build du panneau admin
```

## Données de démo (Seed)

Pour pré-remplir la base avec des données réalistes :

```bash
SEED=true npm run develop
```

Le seed crée **1 édition**, **3 articles** (avec contenu riche) et **1 galerie** si la base est vide. Il ne s'exécute qu'une fois.

## Configuration

### Variables d'environnement (optionnelles)

| Variable | Description | Défaut |
|---|---|---|
| `DATABASE_CLIENT` | `sqlite` ou `postgres` | `sqlite` |
| `DATABASE_URL` | URL PostgreSQL (prod) | — |
| `CLOUDINARY_NAME` | Nom du cloud Cloudinary | — (uploads locaux) |
| `CLOUDINARY_KEY` | Clé API Cloudinary | — |
| `CLOUDINARY_SECRET` | Secret Cloudinary | — |

> Cloudinary n'est activé que si `CLOUDINARY_NAME` est défini. En dev, les uploads sont stockés localement dans `public/uploads/`.

## Permissions API (après premier lancement)

Dans l'admin (`http://localhost:1337/admin`) :

1. Settings → Users & Permissions → Roles → **Public**
2. Cocher `find` et `findOne` pour : **Edition**, **Article**, **Galerie**
3. Sauvegarder

## Content Types

- **Edition** : Année, date, montant collecté, description (Blocks), affiche, partenaires
- **Article** : Titre, slug, contenu riche (Blocks), image, date, catégorie
- **Galerie** : Titre, médias (images multiples), URLs YouTube
- **Page** : Réservé pour pages dynamiques futures
