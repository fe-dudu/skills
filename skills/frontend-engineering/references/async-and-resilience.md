# Async and Resilience

## Fault tolerance

- Aim for graceful degradation: keep core user flows available when a non-essential dependency fails, show when a feature is reduced or data is stale, and never present failed data as successful.
- Isolate exceptions thrown during component rendering or lifecycle work in an Error Boundary. Handle API, network, and async failures as error states in the repository's data-fetching or state layer.
- Define these states for each UI that displays remote data: loading, success, stale or degraded data, expected failure, and contract failure.

## Async

- Do not use `void promise` to silently ignore async work that requires error handling. If a deliberate fire-and-forget operation uses `void`, handle its rejection inside the operation before discarding it.

## Resilience

- Cancel in-flight work when its owner unmounts or its inputs change. Prevent stale responses from overwriting newer state and handle request races explicitly.
- Retry only transient network failures and 5xx responses that the project's data-fetching policy marks as retryable. Use bounded exponential backoff, and retry mutations only when their operation is safe or idempotent.
- Do not blindly retry validation failures, permission failures, or destructive mutations.
- When the network reconnects, refetch stale server state through the repository's data-fetching layer and provide recoverable user feedback.
- On request failure, use cached or stale data, or a fallback, only when the product contract defines that data as usable. Mark the result as stale or degraded; never use fallback data to hide an invalid response contract or silently turn failure into an empty success.

## Loading and recovery feedback

- Represent remote-data states clearly. Show an accessible spinner or skeleton when the expected wait is long enough to notice; delay transient indicators to avoid flicker and layout shift.
- Make feedback state-specific: show an actionable error message for recoverable failures, disable a mutation while an identical mutation is in flight when duplicate submission is unsafe, and show progress for operations that do not complete immediately.
- When the network is unavailable, provide recoverable feedback such as a toast or banner. On reconnect, refetch stale server state through the repository's data-fetching layer.

Let the repository's data-fetching layer own cancellation and stale-response handling. Include every input that changes the request in its cache key and pass its cancellation signal:

```ts
useQuery({
  queryKey: ["products", searchQuery],
  queryFn: ({ signal }) => fetchProducts(searchQuery, signal),
  retry: (failureCount, error) => failureCount < 3 && isTransientFailure(error),
  retryDelay: (attemptIndex) => Math.min(1_000 * 2 ** attemptIndex, 30_000),
});
```
