# React Components

- Do not split a component only to reduce file length.
- Keep component-specific logic close to the component.
- Declare module-level constants outside a component only when they do not depend on props or state. Keep component-specific values local.
- Do not mutate props. Treat them as read-only input.

Treat props as input and communicate changes through callbacks:

```tsx
// Avoid
function ProductCard({ product }: { product: Product }): JSX.Element {
  product.isFeatured = true;
  return <div>{product.name}</div>;
}

// Prefer
function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (productId: string) => void;
}): JSX.Element {
  return <button onClick={() => onAddToCart(product.id)}>{product.name}</button>;
}
```

Only move stable values outside the component:

```tsx
const productStatuses = ["available", "outOfStock"];

function ProductFilter({ selectedStatus }: Props): JSX.Element {
  const visibleStatuses = productStatuses.filter(
    (status) => status !== "outOfStock" || selectedStatus === "outOfStock",
  );

  return <StatusSelect options={visibleStatuses} />;
}
```
