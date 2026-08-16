# Platform Boundaries

Use when the same feature targets Web, WebView, or React Native, or when a platform-specific implementation changes shared behavior.

## Boundary contract

Report what is shared and what is platform-specific:

- domain terms, business rules, data contracts, and feature behavior;
- navigation, storage, network, permissions, deep links, and lifecycle;
- input, focus, accessibility semantics, gestures, and keyboard behavior;
- rendering, styling, safe area, viewport, orientation, and performance;
- error, offline, update, and release behavior.

Keep platform adapters at the edge. Do not force identical UI implementation when platform conventions differ, but keep user-visible outcomes and business rules
consistent. A platform branch needs an owner, reason, and verification path.

## Verification

Run the shared acceptance flow on each affected platform. Add platform-specific checks for navigation, focus, touch, permissions, lifecycle, network loss,
orientation, safe area, WebView/native bridge, and performance. Report unsupported capabilities explicitly.

Report when a platform boundary or adapter changes, or when shared behavior intentionally diverges. Report whether an existing architecture diagram is stale or
whether a decision is needed.
