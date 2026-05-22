---
description: Walkthrough adaptatif — explique uniquement ce qui est nouveau ou changé, skip les concepts déjà couverts
model: sonnet
effort: medium
---
## Cible
$ARGUMENTS
(Si pas d'argument, analyse les changements non-commités ou le dernier commit si tout est commité)

## Workflow

### Étape 1 — Inventaire des changements

Exécute les commandes suivantes :

```bash
# Changements non-commités
git status --short

# Si tout est commité, diff du dernier commit
git diff HEAD~1 --name-status

# Pour chaque fichier M (modifié), récupère l'état avant
git show HEAD~1:<fichier> 2>/dev/null | wc -l
# Si wc -l = 0 ou erreur → fichier n'existait pas → c'est un ajout déguisé
```

Classifie chaque fichier :
- **NOUVEAU** : n'existait pas avant ces changements (A dans git status, ou M mais vide/inexistant avant)
- **MODIFIÉ** : existait déjà avec du contenu → expliquer UNIQUEMENT le delta (`git diff HEAD~1 <fichier>`)
- **IGNORÉ** : fichiers de config mineurs (.env.example, package.json dépendances seules) sauf si la cible l'indique

### Étape 2 — Registre des concepts connus

Lis `.claude/known-concepts.md` à la racine du projet (s'il existe).

Ce fichier contient la liste des concepts déjà expliqués dans des sessions précédentes, au format :
```
- [NomConcept]: description courte de ce qui a été couvert
```

### Étape 3 — Auto-évaluation

Avant d'expliquer quoi que ce soit, dresse une liste des concepts-clés touchés par les changements de cette session.

Exemples de concepts : "Supabase SSR client", "RLS policies", "Next.js middleware", "server-only", "Stripe webhook signature", "Route Groups Next.js", etc.

**Format :**
```
Voici les concepts couverts dans ces changements. Coche ceux que tu maîtrises déjà — je les skipperai ou les traiterai en une ligne :

[ ] ConceptA — description en 5 mots
[ ] ConceptB — description en 5 mots
[ ] ConceptC — description en 5 mots
...

Tu peux répondre "tous sauf X et Y" ou donner les numéros.
```

Attends la réponse avant de continuer.

### Étape 4 — Explications delta

Pour chaque fichier **non skippé** (ni connu, ni confirmé maîtrisé par l'utilisateur) :

**Si NOUVEAU :**
```
**[chemin/fichier.ts]** — nouveau
Scope : [partie de l'app + contexte d'exécution : browser/server/edge/sql]
Rôle : [1 phrase — quel problème ça résout]
Entrants → Sortants : [ce qui entre, ce qui sort]
Pattern clé : [syntaxe ou mécanisme spécifique au langage/outil, avec extrait de code si non trivial]
Connecté à : [quels autres fichiers l'utilisent ou en dépendent]
Concrètement : [exemple "quand l'utilisateur fait X → ce fichier fait Y grâce à Z"]
```

**Si MODIFIÉ :**
```
**[chemin/fichier.ts]** — modifié
[Montre uniquement le git diff — pas le fichier complet]
Ce qui a changé : [liste des lignes/blocs modifiés]
Pourquoi : [raison de chaque changement — technique ou architecturale]
Impact : [ce que ça casse, améliore, ou débloque]
```

**Règles d'économie :**
- Si un concept apparaît dans plusieurs fichiers, l'expliquer une seule fois et référencer pour les suivants
- Si un fichier touché est un **stub** (retourne des valeurs vides sans logique réelle), une ligne suffit : son rôle contractuel et quand il sera complété
- Ne pas répéter les entrants/sortants si identiques à un fichier déjà expliqué dans la même session

### Étape 5 — Mise à jour du registre

Ajoute les concepts **nouvellement expliqués** (non skippés, non déjà présents) dans `.claude/known-concepts.md`.

Crée le fichier s'il n'existe pas. Format :
```markdown
# Concepts expliqués — Armonil

<!-- Mis à jour automatiquement par /explain-delta -->
<!-- Ne pas modifier manuellement -->

- [NomConcept]: ce qui a été couvert (scope, mécanisme, pourquoi ce choix)
```

Un concept par ligne. Ne pas dupliquer. Ne pas modifier les entrées existantes sauf si le concept a évolué (ex : proxy.ts était un stub → maintenant contient la vraie logique auth → mettre à jour l'entrée).
