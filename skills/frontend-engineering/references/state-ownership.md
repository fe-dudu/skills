# State Ownership

- Keep server state in the project's data-fetching and cache layer. Keep UI state in component state or the project's UI store.
- Classify state before choosing an owner: server state, URL or route state, form state, and UI state have different lifecycles. Keep each state with the component, route, form, or store that owns its lifecycle. Promote client state to a global store only when multiple distant consumers need the same writable state and its lifecycle is independent of a single component.
- Do not copy API data into a separate global store just to duplicate the query cache. Store it globally only when it is client-owned state with its own lifecycle or contract, not merely a second copy of server data.
- Do not create derived state when render-time computation is sufficient.

Derive values during render instead of synchronizing them through an effect:

```tsx
// Avoid
const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

useEffect(() => {
  setAvailableProducts(
    products.filter((product) => product.isAvailable),
  );
}, [products]);

// Prefer
const availableProducts = products.filter(
  (product) => product.isAvailable,
);
```
