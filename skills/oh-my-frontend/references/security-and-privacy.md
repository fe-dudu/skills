# Frontend Security and Privacy

Use when work touches authentication, authorization, tokens, HTML injection, redirects, third-party code, user data, client storage, telemetry, or dependency
boundaries. The client may improve UX, but the server remains the final authority for protected operations.

## Threat surface

Check the affected inputs and boundaries:

- user or remote content rendered as HTML, URLs, templates, or markdown;
- query parameters, redirect targets, postMessage, WebView bridges, and deep links;
- cookies, tokens, local storage, caches, logs, screenshots, and analytics;
- CSRF, CORS, CSP, iframe, third-party script, upload, and dependency behavior;
- authentication state, permission checks, PII, secrets, and error messages.

## Rules

- Prefer safe framework rendering and escaping; isolate and review any raw HTML path.
- Validate and constrain redirect, navigation, resource, and URL inputs.
- Never treat hidden UI, route guards, or client checks as authorization.
- Minimize stored and logged data. Do not put secrets in client bundles.
- Define trust boundaries for WebView, native bridges, iframes, and third-party scripts.
- Make retries, mutations, and telemetry safe against replay and accidental disclosure.
- Escalate uncertain vulnerabilities instead of silently accepting them.

## Review and evidence

Security workers are read-only by default. They report:

```text
Asset or boundary:
Threat or abuse case:
Existing control:
Gap and severity:
Recommended fix:
Verification:
```

Verify every listed negative case that touches a changed boundary: injection, unsafe redirect, unauthorized route or mutation, expired session, leaked data in logs
or URLs, and third-party failure. Mark non-applicable cases as `N/A` in the report. Use static tools as support, not as proof of runtime safety.

Record durable permission rules, privacy constraints, and trust-boundary decisions in domain, architecture, or decision documents.
