# Functions and Abstraction

- Use `function` declarations by default.
- Name functions after the action they perform, not only after the event that called them. Prefer `addProductToCart` over `handleClick` when the function adds a product to the cart.
- Keep short, one-use logic at its call site.
- Prefer short, one-use React event handlers inline in JSX. Keeping `<input onChange={(event) => ...} />` next to the rendered element makes the interaction easier to understand.
- Do not extract an event handler merely to give a short inline expression a name. As a component grows, a separated handler can become physically distant from the element and harder to reason about.
- Do not extract a function only to reduce file length or make a line shorter.
- Extract a function only when the logic is complex, reused, or owns a meaningful action or responsibility. Keep the extracted function physically close to the component and its use.
- Do not add a pass-through helper or wrapper that only forwards arguments or returns another function's result without owning a meaningful responsibility.
- Keep the physical distance between a function and its use short.

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
2. Do those call sites have the same responsibility, inputs, outputs, and change reasons?
3. Does the abstraction make each call site clearer than the local code?
4. Is the new module placed in the narrowest domain that owns it?

If the answer is no, keep the code local and accept the duplication for now.
