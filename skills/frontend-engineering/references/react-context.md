# React Context

- Do not use React Context as a general-purpose global state store.
- Use Context for dependency injection, such as a client, configuration, or service boundary.

Use Context to provide a dependency, not to hide mutable application state:

```tsx
// Avoid: Context is now an unstructured global state store
const ProductStoreContext = createContext<Product[]>([]);

// Prefer: Context provides a client boundary
const ProductCatalogContext = createContext<ProductCatalog | null>(null);

function ProductCatalogProvider({ children }: Props): JSX.Element {
  return (
    <ProductCatalogContext.Provider value={productCatalog}>
      {children}
    </ProductCatalogContext.Provider>
  );
}
```
