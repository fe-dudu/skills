# React Rendering

- Prefer `condition && <Component />` for simple conditional rendering.
- Use `&&` only when the left side is a boolean expression. Compare numeric values explicitly to avoid rendering `0`.
- Do not write `condition ? <Component /> : null` when `&&` states the intent clearly.
- Do not put complex nested ternaries in JSX.
- Choose a readable explicit branch strategy for complex JSX: use the repository's `SwitchCase` when a static case map is clearer, or use a local IIFE with `switch` when branches need statements, ordering, or local values. Neither option is mandatory.
- When mutually exclusive branches have different effects, permissions, or interaction contracts, split them into branch-specific components instead of interleaving both paths in one component.
- Do not introduce an `<If>` component only to replace clear native `&&` or ternary syntax. It can hide short-circuit behavior and weaken TypeScript narrowing.
- Keep rendering code near the variables and handlers it uses.
- Use a stable domain identifier for React `key`. Do not use an array index unless the list is truly static and cannot be reordered or removed.

## Required data and fallback

- Do not blanket required render data with optional chaining or nullish fallbacks to hide a broken API or domain contract.
- After the established boundary provides the typed contract, treat required fields as required. Do not make render code support array/object shape alternatives unless the contract genuinely allows that union.
- When required data violates its contract, let the error propagate to the existing Error Boundary fallback. Do not silently turn it into an empty or missing UI.
- Use optional chaining and nullish fallbacks when absence is a valid domain state, not as a defense against an impossible state.

Use a stable domain identifier for list keys:

```tsx
// Avoid: insertion or sorting makes component state move to another row
products.map((product, index) => (
  <ProductCard key={index} product={product} />
));

// Prefer
products.map((product) => (
  <ProductCard key={product.id} product={product} />
));
```

Keep the left side of `&&` boolean:

```tsx
// Avoid: renders `0` when the cart is empty
cartItemCount && <CartBadge count={cartItemCount} />;

// Prefer
cartItemCount > 0 && <CartBadge count={cartItemCount} />;
```

Render required data according to its contract:

```tsx
// Avoid: a broken contract becomes an empty screen
return response.products?.map((product) => (
  <ProductCard key={product.id} product={product} />
)) ?? <EmptyState />;

// Prefer: `products` follows the API boundary's established contract
return products.map((product) => (
  <ProductCard key={product.id} product={product} />
));
```

Choose `SwitchCase` or an IIFE with `switch` for a complex JSX state map:

```tsx
// Avoid: nested JSX ternaries hide the state branches
return isLoading
  ? <Spinner />
  : hasError
    ? <ErrorMessage />
    : <ProductGrid products={products} />;

// Option 1: use the existing SwitchCase component when a static map is clearest
return (
  <SwitchCase
    value={viewState}
    caseBy={{
      loading: <Spinner />,
      error: <ErrorMessage />,
      ready: <ProductGrid products={products} />,
    }}
    DefaultComponent={<EmptyState />}
  />
);
```

```tsx
// Option 2: use a local switch when branches need explicit control flow
return (() => {
  switch (viewState) {
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorMessage />;
    case "ready":
      return <ProductGrid products={products} />;
    default:
      return <EmptyState />;
  }
})();
```

Do not create another branch helper solely to avoid writing a local `switch` or existing `SwitchCase` usage.

Keep the existing `SwitchCase` contract explicit and preserve valid falsy nodes:

```tsx
interface Props<T extends string> {
  value: T;
  caseBy: Record<T, React.ReactNode>;
  DefaultComponent?: React.ReactNode;
}

export function SwitchCase<T extends string>(
  { value, caseBy, DefaultComponent }: Props<T>,
): React.ReactNode {
  return caseBy[value] ?? DefaultComponent ?? null;
}
```
