# API and Runtime Data Boundaries

- Keep the API response type as the frontend domain type when structure and meaning match.
- Do not add a DTO-to-domain mapping layer only to satisfy an architecture diagram.
- Do not maintain duplicate server and frontend types without a different contract.
- Give API errors a type that can be distinguished from other error kinds.
- Treat network, validation, and domain failures as different cases.
- Put fetching, caching, retries, loading, and error behavior in the project's established data-fetching layer.
- Keep the return contract consistent within one family of API functions or hooks. Do not mix a query object in one hook with unwrapped `data` in another; follow the repository's established data-fetching contract.
- Define the types used by API responses, persisted values, and user input at the project's established boundaries, then use those types consistently in domain code. Runtime validation or parsing is project-specific; follow repository conventions when they exist instead of imposing a library or pattern.
- Keep render code focused on the established domain contract. If data violates that contract, let the existing error propagate to the Error Boundary instead of adding ad hoc shape fallbacks or silently rendering empty UI.

Keep external data typed at the boundary:

```ts
type ProductResponse = Product[];

async function getProducts(): Promise<ProductResponse> {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  return response.json();
}
```

Define the persisted-data contract before using it:

```ts
type ProductFilters = {
  query: string;
  category: string;
};

const productFilters: ProductFilters = loadProductFilters();
```
