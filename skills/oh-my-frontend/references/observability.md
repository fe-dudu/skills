# Frontend Observability

Use when changing error reporting, logging, analytics, performance marks, release metadata, feature flags, client diagnostics, or production recovery.

## Contract

Define:

- what event, error, metric, or trace is needed and who uses it;
- event name, stable properties, correlation/request identity, and sampling;
- privacy filtering, consent, retention, and secret/PII redaction;
- release, environment, source-map, and feature-flag context;
- user-facing fallback versus silent reporting behavior;
- ownership, alert threshold, and response path.

Do not add telemetry only because it is easy. Avoid high-cardinality or user-generated values unless justified. Never log tokens, secrets, or unnecessary PII.

## Verification

Trigger every listed success, failure, retry, offline, permission, and boundary case implemented by the feature. Mark unsupported cases as `N/A` in the report.
Inspect emitted payloads in a safe environment. Check deduplication,
sampling, source-map resolution, release identity, consent behavior, and that telemetry failure does not break the user flow.

Report stable event contracts and privacy rules.
Keep temporary debugging logs out of production code.
