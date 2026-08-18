# React Hooks

- Use `useMemo` only when there is a measured calculation cost or a real referential-stability requirement.
- Treat a measured calculation that takes `1ms` or more as expensive. React UI work shares the roughly `16.6ms` budget of a 60 FPS frame, so one `1ms` calculation is already meaningful; measure in a production build on representative or throttled hardware before adding `useMemo`.
- Reference: [React `useMemo` — How to tell if a calculation is expensive](https://react.dev/reference/react/useMemo#how-to-tell-if-a-calculation-is-expensive)
- Use `useCallback` only when a consumer actually needs stable function identity.
- Do not add memoization as a precaution without evidence or a concrete dependency requirement.
- Use `useEffect` only for side effects that cannot be expressed in render or in an event handler.
- Do not use `useEffect` to create derived state or move event-driven logic out of its event handler.
- Use `useEffect` for clear cases such as connecting to, initializing, or synchronizing an external system.
- The effect that starts a timer, subscription, listener, observer, or request owns its cleanup or cancellation.
- Define the SSR and hydration contract for any shared or browser-dependent hook. Do not read browser APIs in a state initializer; use a stable server-safe initial value plus synchronization, or `useSyncExternalStore` with a server snapshot. A guarded initializer is acceptable only for an explicitly client-only hook.
- Use `useSyncExternalStore` for browser APIs and external store subscriptions when the source has a subscribe/get-snapshot contract. It provides the React-aware subscription and SSR boundary instead of hand-rolling state synchronization.
- If an object or function is used only by one effect, define it inside that effect rather than adding a dependency only to satisfy the dependency array. Keep values outside the effect when they are shared with render or another behavior.
- Cancel or ignore obsolete async effect work when inputs change or the owner unmounts so an older response cannot overwrite newer state.
- Notify a parent or external caller in the event handler that caused the change, not in a follow-up effect that watches the changed state.
- For reusable hooks, prefer object parameters when there are multiple options and an object return when multiple values may evolve. Follow the repository's established tuple or object convention; do not wrap a fixed, natural tuple only to apply a universal rule.
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
- For high-frequency external events, measure before adding throttling or transitions; when required, deduplicate unchanged values before state updates, throttle to the interaction budget, and use `startTransition` only for non-urgent work.

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

## Hook review checklist

Review a hook in this order:

1. **API** — Does it describe intent, keep a small surface, and follow the repository's parameter and return conventions?
2. **Lifecycle** — Is browser or external-system work SSR-safe, synchronized through the right React primitive, and cleaned up by its owner?
3. **State** — Are values derived during render, props used directly unless intentionally named `initialX`, and mutually exclusive states modeled explicitly?
4. **Effects** — Is each effect necessary for external synchronization, free of derived-state chains, and protected from stale async work?
5. **Contract** — Are exported types, return values, errors, and reusable public APIs documented without `any` or unsafe assertions?
6. **Performance** — Is memoization, throttling, deduplication, or transition usage supported by a concrete identity need or measurement?
