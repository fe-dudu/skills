# Comments

- Do not write explanatory comments for code whose intent can be expressed through names and structure.
- Use `TODO` only for actionable unfinished work.
- Keep comments for constraints, decisions, or external facts that cannot be made clear in the code itself; do not use them as a substitute for clarity.
- Document exported hooks, components, and functions when consumers need a contract that is not obvious from the signature. Include purpose, meaningful parameters and return values, and a short example for reusable or library-facing APIs; do not add ceremonial JSDoc to local code.

Comment the reason, not the syntax:

```ts
// Avoid: repeats the code
// Add one to the retry count.
retryCount += 1;

// Prefer: records an external constraint
// The external payment provider rejects more than 3 retries.
const MAX_PAYMENT_RETRIES = 3;
```
