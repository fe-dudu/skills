# Data Fetching and Async UI

Use for API calls, queries, mutations, caching, pagination, retries, optimistic updates, or any UI whose data arrives asynchronously. Prefer the project's
data library and existing conventions; this reference defines behavior and coordination, not a library choice.

## Contract questions

- What is the source of truth: server, URL, local state, or persisted cache?
- Who owns the request and the resulting state?
- What identifies equivalent data? Define query keys or request identity.
- What is the freshness, cache, invalidation, and revalidation policy?
- Can requests be canceled, deduplicated, or reordered?
- Which failures are retryable, and what is the user-visible recovery action?
- Does the feature support pagination, partial data, offline use, permissions, or optimistic updates?

## State contract

Model the states required by the feature, not only `loading` and `error`:

```text
idle → pending → success
pending → canceled | error
success → refreshing | stale | empty
error → retrying → pending
```

For each state define visible content, available action, focus or announcement behavior, stale-data treatment, and recovery. Distinguish initial loading from
background refresh and mutation pending.

## Concurrency rules

- Cancel or ignore obsolete responses when the request identity changes.
- Do not let an older response overwrite newer user intent.
- Make retries bounded, observable, and safe for the operation.
- Make mutations idempotent when a user can double-submit or a client can retry.
- Define cache invalidation after mutations; do not rely on incidental rerenders.
- Preserve useful previous data during refresh only when the feature contract allows it.

## Verification

Check every listed case that the feature supports. Mark unsupported cases as `N/A` in the report:

- success, empty, permission denied, server error, network loss, slow response;
- refresh with existing data, retry, cancellation, unmount, and out-of-order responses;
- duplicate submission, optimistic failure, rollback, pagination boundary, and stale cache;
- browser network evidence or request logs for critical flows.

Record durable API behavior, business rules, and user-visible states in the feature document. Record cache or consistency trade-offs in a dated decision when
they affect multiple features.
