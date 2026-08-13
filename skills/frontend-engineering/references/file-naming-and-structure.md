# File Naming and Structure

- Use PascalCase for React component files and match the file name to the component name.
- Use camelCase for TypeScript files. Name hook files in `useXxx.ts` form, matching the hook function name.
- Avoid vague names such as `utils.ts`, `helpers.ts`, `common.ts`, or `misc.ts` when the responsibility can be named.
- Put the domain or responsibility in the file name.
- Split files by one responsibility, not by an arbitrary line count.
- Do not force unrelated responsibilities into one file or split a small, cohesive responsibility into meaningless fragments.
- Keep a type near the domain code that uses it. Move it to a separate file only when multiple files genuinely share it.

```text
ProductCard.tsx
ProductDetail.tsx
useProduct.ts
useProductStatus.ts
calculateProductDiscount.ts
```
