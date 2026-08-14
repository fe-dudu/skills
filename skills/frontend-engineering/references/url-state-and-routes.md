# URL State and Routes

- Treat URL path parameters, query parameters, and hash parameters as user-controlled input. They can represent navigation, filter, sort, pagination, or other persisted UI state, but the user can edit them at any time.
- Follow the route boundary contract and repository conventions when converting URL values into domain values; do not treat a router's TypeScript type, URL shape, or browser-history value as proof that the value satisfies the contract.
- Convert strings into the domain types required by the route contract. For optional UI state, use the documented valid default; when a required value does not satisfy the contract, use the existing error-handling path.
- Never use URL values as an authorization decision. Re-check resource existence and permissions on the server or trusted data boundary.
- Use the router or `URLSearchParams` to encode URL state. Do not build query strings through unescaped string concatenation.
- Do not put secrets, access tokens, or sensitive personal data in URL state. URLs can be retained in browser history, logs, analytics, referrers, and shared links.

```ts
// Avoid: router and URL values are still untrusted strings
const productId = routeParams.productId;
const page = Number(searchParams.get("page"));

// Prefer: use the route boundary's established contract
const route: ProductListRoute = getProductListRouteState(
  routeParams,
  searchParams,
);

const products = await getProductList(route);
```
