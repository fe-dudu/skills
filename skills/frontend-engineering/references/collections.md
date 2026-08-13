# Collections and Data Processing

- Choose collection APIs by whole-flow readability, not by declarative style alone.
- Prefer `for...of` when a chain is long, early exits matter, or one pass is clearer than multiple traversals.

Use a chain when the full transformation is short and linear:

```ts
const availableProductNames = products
  .filter((product) => product.isAvailable)
  .map((product) => product.name);
```

Use `for...of` when the flow has early exits or several decisions:

```ts
const availableProductNames: string[] = [];

for (const product of products) {
  if (product.isDiscontinued) {
    continue;
  }

  if (availableProductNames.length === 10) {
    break;
  }

  if (product.isAvailable) {
    availableProductNames.push(product.name);
  }
}
```
