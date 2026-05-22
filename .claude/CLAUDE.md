# CLAUDE.md — Une Rose Un Espoir (URUE)

Contexte pour toutes les sessions Claude dans ce projet.

## Projet

**Nom** : Une Rose Un Espoir (URUE)
**Type** : Site web d'association caritative (lutte contre le cancer)
**Rôle du dev** : Bénévole — développeur volontaire pour l'association
**Origine** : Initialement développé avec Antigravity (outil Google), repris manuellement

Le site présente l'association, ses actions annuelles (collecte de fonds à moto), les galeries photos/vidéos, les actualités, et un formulaire de contact.

**Notion URUE** : *(lien privé — disponible auprès du mainteneur du projet)*

---

## Stack technique

| Couche | Outil | Version |
|--------|-------|---------|
| Frontend | Astro | v5.17.1 |
| Styling | Tailwind CSS | v4.1.18 |
| Hydration client | React | v19 (islands uniquement) |
| Adapter deploy | @astrojs/vercel | v9.0.4 |
| CMS headless | Strapi | v5.35.0 |
| DB développement | SQLite | (better-sqlite3) |
| DB production | PostgreSQL via **Neon** | — |
| Email | Resend | v6.9.2 |
| Images CDN | Cloudinary | conditionnel (si `CLOUDINARY_NAME` défini) |
| Frontend deploy | **Vercel** | — |
| Backend deploy | **Render.com** | — |

**Note DB** : Migration Render PostgreSQL natif → **Neon** (PostgreSQL serverless) **terminée**. Attention : il n'existe pas encore d'environnement Neon séparé pour le dev — à créer (guide dans Notion URUE).

---

## Structure du repo

```
uneRoseUnEspoir/
├── frontend/               # Site Astro v5
│   ├── src/
│   │   ├── pages/          # Routes (index, association, action, actualites, galeries, secteurs, contact)
│   │   ├── components/     # Header.astro, Footer.astro
│   │   ├── layouts/        # Layout.astro (template principal)
│   │   ├── lib/            # strapi.ts (API client), helpers.ts, blocks-renderer.ts
│   │   └── styles/         # global.css (imports Tailwind)
│   ├── public/             # Favicons
│   ├── astro.config.mjs    # Config Astro (adapter Vercel, React, Tailwind)
│   ├── tsconfig.json
│   └── .env.example        # Template variables d'environnement
│
├── backend/                # CMS Strapi v5
│   ├── src/
│   │   ├── api/            # Content types : articles, editions, galeries, pages, global-settings
│   │   ├── components/     # elements/partenaire (nom, logo, URL)
│   │   ├── seed.ts         # Données de démo (activé avec SEED=true)
│   │   └── index.ts        # Entry point
│   ├── config/             # database.ts, server.ts, plugins.ts, middlewares.ts, api.ts
│   └── .env.example        # Template variables d'environnement
│
├── .claude/                # Config Claude Code (ce fichier)
├── .editorconfig           # UTF-8, 2 espaces, LF
├── .prettierrc             # semi, singleQuote, tabWidth: 2, plugins Astro + Tailwind
├── ARCHITECTURE.md         # Diagramme architecture headless CMS
└── README.md               # Démarrage rapide (FR)
```

---

## Pages frontend

| Route | Rendu | Description |
|-------|-------|-------------|
| `/` | SSR | Homepage : héros, édition courante, 3 derniers articles |
| `/association` | SSG | À propos — contenu placeholder (à alimenter via Strapi) |
| `/action` | SSG | L'action annuelle — contenu placeholder |
| `/actualites` | SSR | Liste des articles |
| `/actualites/[slug]` | SSR | Détail article (rich content Strapi Blocks) |
| `/galeries` | SSR | Galeries photos + YouTube, lightbox |
| `/secteurs` | SSG | Zones géographiques — contenu placeholder |
| `/contact` | SSG + SSR | Formulaire + endpoint `/api/contact` (Resend) |

---

## Commandes utiles

```bash
# Backend (depuis backend/)
npm run dev          # Strapi en mode dev (port 1337)
SEED=true npm run dev  # Avec données de démo

# Frontend (depuis frontend/)
npm run dev          # Astro dev server (port 4321)
npm run build        # Build production
npm run preview      # Prévisualiser le build local
```

**Ordre de démarrage** : toujours démarrer le backend (Strapi) avant le frontend.

---

## Conventions de code

- **Variables/fonctions** : camelCase
- **Composants/types** : PascalCase
- **Fichiers** : kebab-case
- **Commits** : Conventional Commits obligatoires (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`)
- **Formatter** : Prettier (config à la racine, 2 espaces, single quotes)
- **TypeScript** : strict (Astro), CommonJS (Strapi)

---

## Hygiène du repo — Règles strictes

### Fichiers à ne JAMAIS commiter
- `*.env`, `.env.local`, `.env.production` — secrets réels
- Clés API, tokens, mots de passe (même en commentaire)
- Dumps de base de données (`*.dump`, `*.sql` avec données)
- `.DS_Store`, `Thumbs.db`
- `node_modules/`, `dist/`, `.tmp/`

### Variables d'environnement
- Toujours mettre à jour `.env.example` quand une nouvelle variable est ajoutée
- Documenter chaque variable dans `.env.example` avec un commentaire
- Ne jamais mettre de vraie valeur dans `.env.example`

### Workflow Git
```
main          ← branche de production (stable, déployée)
  └── dev     ← branche d'intégration (base de travail)
        ├── feature/nom-feature   ← nouvelles fonctionnalités
        └── fix/nom-bug           ← corrections de bugs
```
- Toujours créer une branche depuis `dev`
- PR (ou merge) vers `dev` pour intégration
- `dev` → `main` uniquement pour une release validée
- Commits atomiques et descriptifs (Conventional Commits)

### Avant chaque commit
```bash
git status          # Vérifier les fichiers stagés
git diff --cached   # Relire le diff complet
```
Ne jamais utiliser `git add .` sans avoir relu `git status` au préalable.

---

## Contenu manquant — À renseigner

Les informations suivantes sont nécessaires pour travailler sereinement sur ce projet.
Elles sont documentées en détail dans la page Notion privée du projet.

### Domaine & DNS
- [x] Domaine custom décidé *(nom confidentiel — voir Notion)*
- [ ] Registrar choisi et domaine acheté : ?
- [ ] Date de renouvellement : ?

### Hébergement
- [x] URL prod frontend (Vercel) : *(voir Notion)*
- [ ] URL backend Strapi (Render) : ?
- [ ] Détails Neon : URL de connexion, project ID, branche prod
- [ ] Créer une branche Neon séparée pour le dev (guide dans Notion)

### Association
- [ ] Membres impliqués dans le projet (noms, rôles) : ?
- [ ] Interlocuteur principal (décisions design/contenu) : ?
- [x] Outil de communication : **Teams** (décision en cours)
- [ ] Contraintes ou décisions sur le design/contenu : ?

### Développement
- [x] Accès GitHub : mainteneur principal (repo public)
- [x] Accès admin Strapi prod : mainteneur + 1 collaborateur dev
- [ ] Environnement de staging : non (uniquement prod actuellement)
- [ ] URL admin Strapi prod : ?

### Services tiers
- [ ] Analytics : à décider
- [ ] Email "from" Resend : domaine custom à configurer pour la prod
- [ ] Email de l'asso pour recevoir les messages de contact : ?
- [ ] Cloudinary account prod : ?
