# Testing and Accessibility

- Test user behavior and domain behavior, not implementation details.
- Verify what the user can do and observe rather than how many times an internal function was called.
- In UI tests, prefer accessible text, roles, labels, and behavior.
- For interactive flows, test keyboard access, focus behavior, and accessible names.
- Avoid depending heavily on DOM structure or CSS class names.
- Use the real application data-fetching path with a test server or boundary fixture when practical and safe. Do not depend on a live network or production API.
- Avoid excessive mocking added only to make tests convenient.
- Mock only the boundary that is expensive, unavailable, nondeterministic, or outside the test's responsibility.

Assert the user's outcome, not an implementation call count:

```tsx
// Avoid
expect(addProductToCart).toHaveBeenCalledTimes(1);

// Prefer
await user.click(screen.getByRole("button", { name: "Add to cart" }));

expect(await screen.findByText("Product added to cart")).toBeVisible();
```

Exercise keyboard and focus behavior for interactive UI:

```tsx
await user.tab();
expect(screen.getByRole("textbox", { name: "Product search" })).toHaveFocus();

await user.type(screen.getByRole("textbox", { name: "Product search" }), "wireless headphones");
expect(screen.getByRole("textbox", { name: "Product search" })).toHaveValue("wireless headphones");
```
