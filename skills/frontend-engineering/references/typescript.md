# TypeScript

- Annotate return types explicitly on named functions, hooks, exported functions, and async functions. Do not rely on inference for their contracts. Inline callbacks may use contextual typing when their return contract is obvious from the API.
- Add explicit types for important domain values when they improve the contract.
- Always provide explicit type arguments for `useState` and `useRef`. Do not rely on hook inference.
- Treat explicit hook type arguments and function return types as maintenance contracts, not only compiler hints. Make allowed state and response shapes visible so future contributors cannot accidentally infer or return an invalid value.
- Make the hook type argument describe the values the state can actually hold. Do not include `null` or `undefined` unless absence is a valid state.
- Never use `any`. Model the value, narrow `unknown`, or fix the boundary type.
- Use `as` only when it is genuinely required. Do not bypass a type-system problem with an assertion.
- Do not use the TypeScript non-null assertion operator `!`. Narrow the value or handle the missing case.
- Use `null` by default when the domain needs an explicit “no value” state.
- Reuse the server response type as the frontend domain type when the structures and semantics are the same.
- Define a separate frontend type only when the UI has a different contract, lifecycle, or meaning.
- Use discriminated unions for result contracts whose fields depend on a status, such as `{ ok: true } | { ok: false; reason: string }`. Keep functions with the same responsibility on the same return shape so callers do not need to inspect each implementation.

Make hook state contracts explicit for future maintainers:

```tsx
// Avoid: this infers `null`, so a Product cannot be set later
const [selectedProduct, setSelectedProduct] = useState(null);

// Prefer: `null` is allowed only because no product is a valid state
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

// The contract rejects `setCartItemCount(null)` even if a future contributor tries it
const [cartItemCount, setCartItemCount] = useState<number>(0);

const productSearchInputRef = useRef<HTMLInputElement>(null);
```

Do not use assertions to hide a contract mismatch:

```ts
// Avoid
const product = response.product as Product;

// Prefer: use the type defined by the established boundary
const product: Product = response.product;
```

```ts
// The return type documents the domain contract for future callers.
function calculateOrderTotal(order: Order): number {
  return order.lines.reduce((total, line) => total + line.price * line.quantity, 0);
}
```

Make validation results safe and predictable:

```ts
type ValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

function validateName(name: string): ValidationResult {
  if (name.trim() === "") {
    return { ok: false, reason: "Name is required" };
  }

  return { ok: true };
}
```
