# Architecture Technique - Une Rose Un Espoir

## Vue d'ensemble

Le projet suit une architecture **Headless CMS** découplée :

- **Backend** : Strapi (gestion du contenu, API REST).
- **Frontend** : Astro (génération statique SSG + composants dynamiques React).
- **Base de données** : PostgreSQL (Production), SQLite (Développement).
- **Assets** : Cloudinary (hébergement et optimisation des images).

## Flux de Données

1.  **Rédaction** : Les administrateurs créent/modifient le contenu dans le panneau admin Strapi.
2.  **Build** : Lors du déploiement (ou webhooks), Astro interroge l'API Strapi pour récupérer le contenu.
3.  **Rendu** : Astro génère les pages HTML statiques (SSG). Les parties dynamiques (recherche, formulaires) sont hydratées avec React (Islands Architecture).
4.  **Distribution** : Les fichiers statiques sont servis par le CDN (Vercel).

## Structure du Repository (Monorepo)

```
/
├── backend/            # App Strapi
│   ├── src/            # Code source (API, Extensions)
│   ├── config/         # Configuration (DB, Plugins)
│   └── public/         # Fichiers publics locaux
├── frontend/           # App Astro
│   ├── src/
│   │   ├── components/ # Composants UI (Astro, React)
│   │   ├── layouts/    # Layouts de pages
│   │   ├── pages/      # Routes et pages
│   │   └── lib/        # Utilitaires et API Client
│   └── public/         # Assets statiques
└── README.md
```

## Conventions

- **Commits** : Conventionnal Commits (`feat:`, `fix:`, `docs:`, ...).
- **Branches** : `main` (prod), `develop` (dev), `feature/*` (fonctionnalités).
- **Code Style** : Prettier + ESLint standard.

## Déploiement

- **Frontend** : Automatique via Vercel sur push `main`.
- **Backend** : Automatique via Render (Blueprint ou Docker).
