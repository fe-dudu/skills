# API and Runtime Data Boundaries

- Keep the API response type as the frontend domain type when structure and meaning match.
- Do not add a DTO-to-domain mapping layer only to satisfy an architecture diagram.
- Do not maintain duplicate server and frontend types without a different contract.
- Give API errors a type that can be distinguished from other error kinds.
- Treat network, validation, and domain failures as different cases.
- Put fetching, caching, retries, loading, and error behavior in the project's established data-fetching layer.
- Treat API responses, `localStorage` values, and user input as untrusted. Validate them at the runtime boundary before using them as domain data; TypeScript types alone do not validate runtime data.
- Validate an external response once at the boundary and expose the narrowed domain contract to render code. If a response declared as an array is actually an object, raise a typed contract error instead of adding render-time `Array.isArray`, `?.`, or `?? []` fallbacks.

Parse external data once, then keep render code typed:

```ts
async function getProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new ApiError(response.status);
  }

  const responseBody: unknown = await response.json();

  return parseProducts(responseBody);
}
```

Validate persisted values before using them:

```ts
const storedFilters = localStorage.getItem("product-filters");
const productFilters = storedFilters ? parseStoredProductFilters(storedFilters) : defaultProductFilters;
```
