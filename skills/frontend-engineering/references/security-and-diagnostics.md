# Security and Diagnostics

- Do not use `dangerouslySetInnerHTML`. If an unavoidable trusted-content boundary exists, sanitize it through the project's approved pipeline before rendering.
- Do not leave `console` calls or `debugger` statements in production frontend code. Use the project's logger and avoid recording sensitive data.

Keep untrusted HTML out of the render path:

```tsx
// Avoid
return <div dangerouslySetInnerHTML={{ __html: userComment }} />;

// Prefer
return <p>{userComment}</p>;
```

Log safe diagnostics, not the whole error or request:

```ts
try {
  await saveOrder(order);
} catch (error) {
  logger.error("Failed to save order", {
    errorName: error instanceof Error ? error.name : "UnknownError",
  });
  throw error;
}
```
