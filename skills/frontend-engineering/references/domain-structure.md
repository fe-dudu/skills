# Domain Structure

- Organize by domain before technical category.
- Keep code used by one domain inside that domain.
- Promote code to a shared area only when the same responsibility and semantics are repeated across multiple domains.
- Do not generalize early into `utils`, `helpers`, or `common`. Wait until repetition and the actual change reasons justify it.

## Vertical Structure

- A route, domain, or product area can own its components, hooks, types, query options, constants, and utilities together.
- UI or utilities that are domain-independent and actually shared across multiple domains belong in a shared area above the domains. Depending on the repository, this may be project-level `components` and `utils` directories or `ui` and `utils` packages in a monorepo.
- Do not import another vertical's internal files directly. When sharing is necessary, use the vertical's public module and follow the repository's existing alias or package export conventions.

```text
catalog/
├── ProductCard.tsx
├── ProductDetail.tsx
├── useProduct.ts
├── product.ts
└── calculateProductDiscount.ts

order/
├── OrderForm.tsx
├── useOrder.ts
├── validateOrder.ts
└── calculateOrderTotal.ts
```
