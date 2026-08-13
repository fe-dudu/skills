# URL State and Routes

- Treat URL path parameters, query parameters, and hash parameters as user-controlled input. They can represent navigation, filter, sort, pagination, or other persisted UI state, but the user can edit them at any time.
- Parse and validate URL values at the route boundary before using them as domain values. Do not trust a router's TypeScript type, a URL shape, or a value restored from browser history as proof of validity.
- Convert strings into explicit domain types and validate enums, IDs, numbers, dates, and ranges. For optional UI state, apply a documented valid default; for a broken required resource or contract, raise the appropriate typed error.
- Never use URL values as an authorization decision. Re-check resource existence and permissions on the server or trusted data boundary.
- Use the router or `URLSearchParams` to encode URL state. Do not build query strings through unescaped string concatenation.
- Do not put secrets, access tokens, or sensitive personal data in URL state. URLs can be retained in browser history, logs, analytics, referrers, and shared links.

```ts
// Avoid: router and URL values are still untrusted strings
const productId = routeParams.productId;
const page = Number(searchParams.get("page"));

// Prefer: parse once at the route boundary
const productId = parseProductId(routeParams.productId);
const page = parsePositiveInteger(searchParams.get("page")) ?? 1;
const sort = parseProductSort(searchParams.get("sort")) ?? "relevance";

const products = await getProductList({ productId, page, sort });
```
