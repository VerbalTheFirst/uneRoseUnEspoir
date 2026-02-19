# Architecture Technique — Une Rose Un Espoir

## Vue d'ensemble

Architecture **Headless CMS** découplée :

```
┌──────────────┐     API REST     ┌──────────────┐
│   Strapi v5  │ ◄──────────────► │   Astro v5   │
│   (Backend)  │                  │  (Frontend)  │
│   Port 1337  │                  │  Port 4321   │
└──────┬───────┘                  └──────┬───────┘
       │                                 │
  SQLite/PG                         Tailwind v4
  Cloudinary                         Resend
```

## Flux de Données

1. **Rédaction** : Les admins créent le contenu dans le panneau Strapi (éditions, articles, galeries).
2. **Requêtes** : Astro interroge l'API REST Strapi — pages statiques (SSG) pour la majorité, SSR pour le détail d'article et l'API contact.
3. **Rendu** : Le contenu riche (Blocks) est converti en HTML par un renderer côté serveur.
4. **Distribution** : Pages statiques servies par CDN (Vercel), Strapi hébergé séparément (Render).

## Structure du Repository

```
/
├── backend/                    # Strapi v5
│   ├── config/
│   │   ├── database.ts         # SQLite (dev) / PostgreSQL (prod)
│   │   └── plugins.ts          # Cloudinary conditionnel
│   ├── src/
│   │   ├── api/                # Content Types
│   │   │   ├── article/        # Articles (titre, slug, contenu Blocks, image)
│   │   │   ├── edition/        # Éditions (année, date, montant, partenaires)
│   │   │   ├── galerie/        # Galeries (médias, vidéos YouTube)
│   │   │   └── page/           # Pages dynamiques (réservé)
│   │   ├── components/
│   │   │   └── elements/
│   │   │       └── partenaire  # Composant partenaire (nom, logo, URL)
│   │   ├── index.ts            # Bootstrap + seed
│   │   └── seed.ts             # Données de démo
│   └── public/uploads/         # Médias uploadés (dev local)
│
├── frontend/                   # Astro v5
│   ├── src/
│   │   ├── components/         # Header, Footer (Astro)
│   │   ├── layouts/            # Layout principal
│   │   ├── lib/
│   │   │   ├── strapi.ts       # Client API Strapi
│   │   │   ├── helpers.ts      # Utilitaires partagés
│   │   │   └── blocks-renderer.ts  # Renderer de contenu riche Strapi
│   │   ├── pages/
│   │   │   ├── index.astro             # Accueil
│   │   │   ├── actualites/index.astro  # Liste articles
│   │   │   ├── actualites/[slug].astro # Détail article (SSR)
│   │   │   ├── galeries.astro          # Galeries + lightbox
│   │   │   ├── contact.astro           # Formulaire contact
│   │   │   ├── api/contact.ts          # API endpoint email (SSR)
│   │   │   └── *.astro                 # Pages statiques
│   │   └── styles/
│   │       └── global.css      # Tailwind v4 + typography
│   └── public/                 # Assets statiques
│
├── ARCHITECTURE.md
└── README.md
```

## Content Types Strapi

| Type | Champs principaux | Notes |
|---|---|---|
| **Edition** | `annee` (string), `date_action`, `montant_collecte`, `description` (Blocks), `affiche` (media), `partenaires` (component) | Année validée par regex `^[0-9]{4}$` |
| **Article** | `titre`, `slug`, `contenu` (Blocks), `image` (media), `date`, `categorie` | Contenu riche : gras, liens, titres, listes, citations |
| **Galerie** | `titre`, `medias` (media multiple), `youtube_urls` (JSON) | Support images + vidéos YouTube |
| **Page** | `titre`, `slug`, `contenu` (Blocks) | Réservé pour pages dynamiques futures |

## Conventions

- **Commits** : Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Branches** : `main` (stable), `dev` (développement)
- **Rendu** : SSG par défaut, SSR pour les pages dynamiques (`export const prerender = false`)
- **Interactivité** : Vanilla JS (pas de React hydration côté client)
