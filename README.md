# 🌹 Une Rose Un Espoir — Site Web

Site vitrine pour l'association **Une Rose Un Espoir** — les motards s'unissent contre le cancer.

## 📦 Structure du Projet

Monorepo avec deux applications :

```
├── backend/     → CMS Headless (Strapi v5)
├── frontend/    → Site web (Astro v5 + Tailwind CSS v4)
└── README.md
```

## 🛠 Stack Technique

| Couche | Technologie |
|---|---|
| **Frontend** | Astro v5, Tailwind CSS v4, TypeScript |
| **Backend** | Strapi v5 (CMS Headless) |
| **Base de données** | SQLite (dev) / PostgreSQL (prod) |
| **Emails** | Resend |
| **Images** | Cloudinary (optionnel, local en dev) |
| **Hébergement** | Vercel (front) / Render (back) |

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ (LTS recommandé)
- npm

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/VerbalTheFirst/uneRoseUnEspoir.git
cd uneRoseUnEspoir

# Installer les dépendances
cd backend && npm install
cd ../frontend && npm install
```

### Configuration

```bash
# Frontend — créer le .env
cp frontend/.env.example frontend/.env
# Éditer avec vos clés (STRAPI_URL, RESEND_API_KEY, CONTACT_EMAIL)
```

### Lancer en développement

```bash
# Terminal 1 — Backend (port 1337)
cd backend
SEED=true npm run develop    # SEED=true pour créer les données de démo

# Terminal 2 — Frontend (port 4321)
cd frontend
npm run dev
```

> **⚠️ Après le premier lancement** : configurez les permissions dans l'admin Strapi
> (`http://localhost:1337/admin`) → Settings → Users & Permissions → Roles → Public →
> cochez `find` et `findOne` pour Edition, Article, Galerie.

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Accueil | `/` | Hero, édition en cours, articles récents, partenaires |
| L'Association | `/association` | Présentation de l'association |
| L'Action | `/action` | Détails de l'action caritative |
| Actualités | `/actualites` | Liste des articles |
| Article | `/actualites/[slug]` | Détail d'un article (contenu riche) |
| Galeries | `/galeries` | Photos et vidéos avec lightbox |
| Secteurs | `/secteurs` | Zones géographiques couvertes |
| Contact | `/contact` | Formulaire de contact (envoi email via Resend) |

## 📖 Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Architecture technique et flux de données
- [`backend/README.md`](./backend/README.md) — Documentation du CMS Strapi
- [`frontend/README.md`](./frontend/README.md) — Documentation du site Astro

## 📝 Licence

Projet privé — Tous droits réservés.
