# State Ownership

- Keep server state in the project's data-fetching and cache layer. Keep UI state in component state or the established UI store.
- Do not copy API data into Jotai or another global store just to duplicate the query cache. Store it globally only when it is client-owned state with a distinct lifecycle or contract.
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
