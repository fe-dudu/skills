# Modules and Exports

- Prefer named exports over default exports.
- Avoid `index.ts` barrel exports that hide a module's real location or create cycles.
- Prefer direct imports that show the source module.
- Prefer an established alias path over deeply nested relative imports.
- Do not create paths such as `../../../../` when a stable project alias is available.
- Do not add a module alias, re-export, or barrel file solely to shorten an import, hide its source, or create a convenient facade. Preserve existing aliases when they are already part of the repository convention.

Make the import source visible:

```ts
// Avoid: the real source is hidden by a barrel
import { ProductCard } from "@/catalog";

// Prefer
import { ProductCard } from "@/catalog/ProductCard";
```
