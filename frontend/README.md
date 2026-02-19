# Frontend — Astro v5

Site vitrine Une Rose Un Espoir, construit avec Astro v5 et Tailwind CSS v4.

## Commandes

```bash
npm run dev       # Dev server (port 4321)
npm run build     # Build de production
npm run preview   # Prévisualiser le build
```

## Configuration

Créer un fichier `.env` à la racine du dossier `frontend/` :

```env
# URL du backend Strapi
STRAPI_URL=http://localhost:1337

# Contact form (Resend)
# Clé API : https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx
# Email de réception des messages
CONTACT_EMAIL=votre@email.com
```

## Pages

| Route | Fichier | Rendu | Description |
|---|---|---|---|
| `/` | `index.astro` | SSG | Accueil, édition en cours, articles récents |
| `/association` | `association.astro` | SSG | Présentation |
| `/action` | `action.astro` | SSG | L'action caritative |
| `/actualites` | `actualites/index.astro` | SSG | Liste des articles |
| `/actualites/[slug]` | `actualites/[slug].astro` | SSR | Détail article avec contenu riche |
| `/galeries` | `galeries.astro` | SSG | Photos + vidéos avec lightbox |
| `/secteurs` | `secteurs.astro` | SSG | Zones couvertes |
| `/contact` | `contact.astro` | SSG | Formulaire de contact |
| `/api/contact` | `api/contact.ts` | SSR | Endpoint POST envoi email |

## Librairies internes

- **`lib/strapi.ts`** : Client pour l'API REST Strapi
- **`lib/helpers.ts`** : Utilitaires partagés (`getImageUrl`, `formatDate`, `blocksToText`)
- **`lib/blocks-renderer.ts`** : Convertit le format Blocks de Strapi en HTML (gras, liens, titres, listes, citations, images, code)

## Notes techniques

- **Pas de React côté client** : toutes les interactions (lightbox, formulaire) utilisent du vanilla JS pour éviter les problèmes d'hydratation et réduire le bundle
- **Tailwind CSS v4** avec le plugin `@tailwindcss/typography` pour le styling du contenu riche (classe `prose`)
- **Fallback offline** : si Strapi n'est pas joignable, les pages affichent un message d'erreur plutôt que de crasher
