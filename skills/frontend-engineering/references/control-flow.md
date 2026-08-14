# Control Flow

- Use guard clauses and early returns to handle invalid, empty, or exceptional cases first.
- Avoid nested `if` statements.
- Avoid `else`; let the previous branch return or continue.
- Use `switch` when a branch must cover all cases of a discriminated state or union.
- Do not compress a complex branch into one expression.
- Use an inline ternary only when it is short and easy to read in one pass.
- Replace a ternary that becomes complex, requires line breaks, or contains nested conditions with explicit control flow or a small IIFE when a value must be computed. JSX branch selection follows the React Rendering reference.
- Write range checks in the order they are read: `minimum <= value && value <= maximum`.

Avoid nesting and `else` when the branch can finish early:

```ts
// Avoid
if (order) {
  if (order.status === "cancelled") {
    return renderCancelledOrder(order);
  } else {
    return renderOrder(order);
  }
}

// Prefer
if (!order) {
  return null;
}

if (order.status === "cancelled") {
  return renderCancelledOrder(order);
}

return renderOrder(order);
```

Keep a simple ternary inline, but move a multi-branch expression into explicit control flow:

```tsx
// Good
return <StatusBadge tone={isActive ? "positive" : "neutral"} />;

// Avoid
return isLoading
  ? <Spinner />
  : hasError
    ? <ErrorMessage />
    : hasOrders
      ? <OrderList />
      : <EmptyState />;
```

Keep range conditions visually aligned with the domain statement:

```ts
// Avoid: the middle value must be read twice before the range is clear
if (score >= minimumScore && score <= maximumScore) {
  return "passing";
}

// Prefer
if (minimumScore <= score && score <= maximumScore) {
  return "passing";
}
```
