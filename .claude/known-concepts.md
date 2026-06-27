# Concepts expliqués — Une Rose Un Espoir

<!-- Mis à jour automatiquement par /explain-delta -->
<!-- Ne pas modifier manuellement -->

- [VercelBuildOutputAPI]: structure de .vercel/output/ générée par npm run build — static/ pour le SSG, functions/ pour le SSR, config.json pour le routing
- [AstroSSRAdapter]: comment @astrojs/vercel compile les pages prerender=false en fonctions serverless (.mjs dans _functions/)
- [PostgresDump]: fichier .dump = export binaire pg_dump — schéma + données, utilisé pour migrations, ne jamais commiter
- [GitignoreLayering]: .gitignore racine s'applique à tout le repo, .gitignore sous-dossier s'applique localement — les deux coexistent sans conflit
