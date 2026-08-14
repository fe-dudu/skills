# Error Handling

- Throw only for exceptional situations that an Error Boundary is meant to handle.
- Represent expected business, empty, permission, or validation branches as normal control flow.
- Distinguish error kinds in `catch`; do not handle every error through one generic path.
- Model API errors, validation errors, and domain errors as distinct types when their handling differs.
- Structure errors so their type determines the recovery, message, telemetry, or UI response.
- Do not collapse network, validation, domain, and unknown failures into one generic error.
- Treat broken API or domain invariants as exceptional contract failures. Do not convert them into an empty state just to keep rendering.
- Use Error Boundaries to isolate render failures and provide a useful fallback. Do not use them to hide expected API or validation states.

## Error chaining and domain errors

- Wrap an error only at a boundary where the new layer adds meaningful context. Preserve the original error with `new Error(message, { cause })`; do not concatenate `error.message` or replace the original error.
- Keep the caught value as `unknown`. A `cause` can be an `Error` or structured non-Error data; narrow it before reading `message`, `name`, or `stack`.
- Separate the user-facing message, machine-readable `code`, transport `statusCode`, and root `cause`. Use specific error classes when recovery or reporting differs; do not branch on message text.
- API error bases may carry readonly `statusCode` and optional `code`. Subclasses should represent stable transport or domain categories, not every call site.
- Do not chain every minor error or add a wrapper without new context. Log the cause chain explicitly through the project logger; `Error.cause` is not guaranteed to appear in a top-level log automatically.
- Use `new Error(message, { cause })` only when the TypeScript `target` and `lib` support `ErrorOptions` (ES2022 or the repository's approved equivalent).

```ts
export class BaseApiError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;

  constructor(message: string, statusCode: number, code?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class ProductCatalogError extends BaseApiError {
  constructor(cause: unknown) {
    super("Failed to load product catalog", 500, "PRODUCT_CATALOG_LOAD_FAILED", { cause });
  }
}

export async function loadProducts(): Promise<Product[]> {
  try {
    return await fetchProducts();
  } catch (error) {
    throw new ProductCatalogError(error);
  }
}
```

Test both the boundary error and its root cause when chaining changes recovery or diagnostics:

```ts
expect(error).toBeInstanceOf(ProductCatalogError);
expect(error.cause).toBeInstanceOf(TimeoutError);
```

```ts
try {
  return await createOrder(input);
} catch (error) {
  if (error instanceof ValidationError) {
    return { kind: "validation", fields: error.fields };
  }

  if (error instanceof ApiError) {
    return { kind: "api", status: error.status };
  }

  throw error;
}
```

Keep expected form errors in the form flow and let broken contracts reach an Error Boundary:

```tsx
// Expected: show a recoverable validation message
if (submitState.kind === "validation") {
  return <FieldErrors errors={submitState.fields} />;
}

// Exceptional: do not turn a missing required field into an empty UI
if (!product.id) {
  throw new ProductContractError("Product id is missing");
}

return <ProductDetail product={product} />;
```
