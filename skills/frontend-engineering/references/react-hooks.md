# React Hooks

- Use `useMemo` only when there is a measured calculation cost or a real referential-stability requirement.
- Treat a measured calculation that takes `1ms` or more as expensive. React UI work shares the roughly `16.6ms` budget of a 60 FPS frame, so one `1ms` calculation is already meaningful; measure in a production build on representative or throttled hardware before adding `useMemo`.
- Reference: [React `useMemo` — How to tell if a calculation is expensive](https://react.dev/reference/react/useMemo#how-to-tell-if-a-calculation-is-expensive)
- Use `useCallback` only when a consumer actually needs stable function identity.
- Do not add memoization as a precaution without evidence or a concrete dependency requirement.
- Use `useEffect` only for side effects that cannot be expressed in render or in an event handler.
- Do not use `useEffect` to create derived state or move event-driven logic out of its event handler.
- Use `useEffect` for clear cases such as initialization or synchronization with an external system.
- The effect that starts a timer, subscription, listener, observer, or request owns its cleanup or cancellation.
- Do not create a broad page hook that owns every query parameter or state value. Split by domain responsibility, consumer boundary, and change reason, not merely by technical category.
- Keep unrelated values from sharing a subscription or context when an update would re-render consumers that do not use the changed value. Split the owner when the narrower boundary is clearer and materially reduces the update surface.

## Declaration order

- Define a consistent declaration order for each component and follow it. A reasonable default is `useRef` → `useState` → custom hooks → derived values → `useMemo` → functions/`useCallback` → `useEffect`.
- Reorder when dependencies or physical locality make another order clearer. Treat this as a readability convention, not a correctness rule.
- Keep related state, derived values, functions, and effects physically close when they form one behavior.

## Effect boundaries

- Treat direct `useEffect` as an escape hatch for synchronizing with an external system. Before adding one, check whether render-time derivation, an event handler, the established data-fetching layer, or a keyed remount expresses the behavior more directly.
- Do not use an effect to derive state, relay a user action, fetch data, or reset state when the corresponding render, handler, query, or `key` mechanism is available.
- For a true external-system integration, keep the lifecycle in a dedicated domain hook that owns the actual setup and cleanup. Do not add a pass-through wrapper only to rename or hide `useEffect`; if the repository bans direct calls, enforce that boundary with lint and allow only approved integration hooks.

```tsx
function useProductPreview(productId: string): void {
  useEffect(() => {
    const preview = createProductPreview(productId);
    preview.mount();

    return () => preview.unmount();
  }, [productId]);
}

function ProductList({ products }: { products: Product[] }): JSX.Element {
  const availableProducts = products.filter((product) => product.isAvailable);

  return <ProductGrid products={availableProducts} />;
}

function ProductEditorContainer({ productId }: { productId: string }): JSX.Element {
  return <ProductEditor key={productId} productId={productId} />;
}
```

Use a functional updater when the next state depends on the previous state:

```tsx
// Avoid: can read stale `cartProductIds`
setCartProductIds([...cartProductIds, productId]);

// Prefer
setCartProductIds((productIds) => [
  ...productIds,
  productId,
]);
```

Keep cleanup with the effect that owns the external work:

```tsx
useEffect(() => {
  const timeoutId = window.setTimeout(saveDraft, 500);

  return () => window.clearTimeout(timeoutId);
}, [saveDraft]);
```
