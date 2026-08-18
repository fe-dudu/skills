# Functions and Abstraction

- Name functions after the action they perform, not only after the event that called them. Prefer `addProductToCart` over `handleClick` when the function adds a product to the cart.
- Keep short, one-use logic at its call site.
- Prefer short, one-use React event handlers inline in JSX. Keeping `<input onChange={(event) => ...} />` next to the rendered element makes the interaction easier to understand.
- Do not extract an event handler merely to give a short inline expression a name. As a component grows, a separated handler can become physically distant from the element, making it harder to tell which handler corresponds to which UI element.
- Do not extract a function only to reduce file length or make a line shorter.
- Extract a function only when the logic is complex, reused, or owns a named domain action or other clear responsibility. Keep the extracted function physically close to the component and its use.
- Do not add a pass-through helper or wrapper that only forwards arguments or returns another function's result without owning a distinct responsibility.
- Keep the physical distance between a function and its use short.
- Separate create and update flows into different components or functions when their responsibilities, validation, API contracts, or side effects differ.
- Abstract implementation details only when the abstraction communicates domain intent or defines a contract that callers use. A wrapper that owns behavior can improve readability; a pass-through wrapper or HOC that only hides code adds indirection.
- Design public React abstractions declaratively: accept desired state or configuration and expose operations named after user or domain intent, rather than requiring callers to coordinate refs, handlers, and effects.
- Keep an abstraction's public surface small. Add an option or return field only for a real use case; prefer composable primitives over feature-heavy helpers.
- Do not create generic lifecycle wrappers such as `useMount` or `useEffectOnce`. Use a purpose-specific hook for a real external synchronization problem and keep setup and cleanup explicit.
- For reusable hooks, inject external clients, fetchers, or clocks when practical instead of importing project-specific implementations inside the abstraction. This improves testability and portability.
- Keep hidden side effects such as logging, analytics, or synchronization outside a function unless callers can infer the effect from its name and contract and the effect is required for its responsibility.

Keep a short input handler beside the element:

```tsx
// Prefer
<input onChange={(event) => setSearchQuery(event.target.value)} />

// Avoid: the short interaction is now farther from the input
function handleSearchQueryChange(event: ChangeEvent<HTMLInputElement>): void {
  setSearchQuery(event.target.value);
}

return <input onChange={handleSearchQueryChange} />;
```

Extract a meaningful action, not a forwarding wrapper:

```ts
// Avoid
function onSubmitOrder(order: Order): Promise<void> {
  return saveOrder(order);
}

// Prefer
async function saveOrderAndRefresh(order: Order): Promise<void> {
  await saveOrder(order);
  await refreshOrders();
}
```

## AHA check before extracting

Ask:

1. Does the code repeat in more than one real call site?
2. Do those call sites have the same responsibility, inputs, outputs, and expected change pattern?
3. Does the abstraction make each call site clearer than the local code?
4. Is the new module placed in the narrowest domain that owns it?

If the answer is no, keep the code local and accept the duplication for now.
