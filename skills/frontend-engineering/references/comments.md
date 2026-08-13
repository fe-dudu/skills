# Comments

- Do not write explanatory comments for code whose intent can be expressed through names and structure.
- Use `TODO` only for actionable unfinished work.
- Keep comments for constraints, decisions, or external facts that cannot be made clear in the code itself; do not use them as a substitute for clarity.

Comment the reason, not the syntax:

```ts
// Avoid: repeats the code
// Add one to the retry count.
retryCount += 1;

// Prefer: records an external constraint
// The payment provider rejects retries after 3 attempts.
const MAX_PAYMENT_RETRIES = 3;
```
