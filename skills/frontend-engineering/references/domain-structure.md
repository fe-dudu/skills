# Domain Structure

- Organize by domain before technical category.
- Keep code used by one domain inside that domain.
- Move code to a project-wide shared area only when multiple domains share the same responsibility.
- Do not move code early into `utils`, `helpers`, or `common`.
- Generalize only after repeated code is confirmed to have the same responsibility and semantics.

## Vertical Structure

- Group code by what it does and what changes together, not only by technical type. A route, domain, or product area can own its components, hooks, types, query options, constants, and utilities together.
- Keep modules private to one vertical inside that vertical. Promote code to a shared vertical only after real cross-vertical use with the same responsibility and semantics.
- Put domain-independent shared UI and patterns in an explicit `design-system` vertical, not a vague `common` or `utils` folder.
- Treat each vertical's public modules as a boundary. Prevent deep imports into private modules; use existing package `exports` or boundary tooling when available. Do not add a barrel or facade only to create that boundary.

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
