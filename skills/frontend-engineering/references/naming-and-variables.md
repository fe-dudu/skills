# Naming and Variables

- Name variables and functions with domain meaning. A reader should understand the role from the name alone.
- Replace vague names such as `data`, `item`, `value`, `result`, and `temp` with the domain term.
- Prefix booleans with `is`, `has`, `can`, or `should` when appropriate.
- Use `Boolean(value)` instead of `!!value` when converting to a boolean; the conversion intent is clearer.
- Prefer explicit comparisons or predicates over implicit truthy/falsy conversion when the distinction matters. Otherwise, it may be unclear whether an ambiguous falsy value such as `0` is intentionally included.
- Replace unexplained numeric literals with constants that express purpose and units, such as `ANIMATION_DELAY_MS`. Keep a literal inline when its meaning is standard, obvious, and has no independent change reason.
- Do not give a service wrapper the same name as the library it changes. Include added behavior in the wrapper or method name, such as `httpService.getWithAuth`.
- Keep short, simple one-off expressions inline. Extract a value when it is complex, reused, represents a meaningful domain concept, or improves type or branch clarity.
- Do not introduce a one-use variable solely to shorten a line or give a trivial expression another name.
- Destructure objects only when access is too long or repeated. Keep `object.property` when it makes the value's source clearer.

```ts
// Avoid
const data = response.data;
const result = data.filter((item) => item.isActive);

// Prefer
const availableProducts = response.data.filter(
  (product) => product.isAvailable,
);
```

Keep a simple one-use value inline, but name a complex expression when the name clarifies the branch:

```tsx
// Good
return <Button disabled={isSaving || !isFormValid} />;

// Good: the name explains a non-trivial decision
const canSubmitOrder = isFormValid && !isSubmitting && customer.email !== existingCustomerEmail;

return <Button disabled={!canSubmitOrder} />;
```
