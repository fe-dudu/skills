# Async and Resilience

## Fault tolerance

- Aim for graceful degradation: keep safe core flows available when a non-critical dependency fails, make reduced capability or stale data visible, and never pretend failed data is successful.
- Isolate render and lifecycle failures with an Error Boundary. Handle network and async failures through the established data-fetching and state layers; do not rely on an Error Boundary as the only request error handler.
- Define recovery states for each remote surface: loading, success, stale or degraded, expected failure, and contract failure.

## Async

- Do not use `void promise` to silently ignore async work that requires error handling. If a deliberate fire-and-forget operation uses `void`, handle its rejection inside the operation before discarding it.

## Resilience

- Cancel in-flight work when its owner unmounts or its inputs change. Prevent stale responses from overwriting newer state and handle request races explicitly.
- Retry only transient network failures and eligible 5xx responses. Use bounded exponential backoff, and retry mutations only when their operation is safe or idempotent.
- Do not blindly retry validation failures, permission failures, or destructive mutations.
- When the network reconnects, refetch stale server state through the established data-fetching layer and provide recoverable user feedback.
- On request failure, use previously validated cache, stale data, or an explicit safe fallback only when the domain permits it. Mark the result as stale or degraded; never use fallback data to hide an invalid response contract or silently turn failure into an empty success.

## Loading and recovery feedback

- Represent remote-data states clearly. Show an accessible spinner or skeleton when waiting is perceptible; delay transient indicators when appropriate to avoid flicker and layout shift.
- Make feedback state-specific: show an actionable error message for recoverable failures, disable the affected unsafe action while a duplicate mutation would be harmful, and show progress for long-running work.
- When the network is unavailable, provide recoverable feedback such as a toast or banner. On reconnect, refetch stale server state through the established data-fetching layer.

Let the established data-fetching layer own cancellation and stale-response handling. Include every request input in its key and pass its cancellation signal:

```ts
useQuery({
  queryKey: ["products", searchQuery],
  queryFn: ({ signal }) => fetchProducts(searchQuery, signal),
  retry: (failureCount, error) => failureCount < 3 && isTransientFailure(error),
  retryDelay: (attemptIndex) => Math.min(1_000 * 2 ** attemptIndex, 30_000),
});
```
