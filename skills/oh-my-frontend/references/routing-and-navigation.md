# Routing and Navigation

Use for route creation, URL state, redirects, deep links, navigation guards, nested layouts, or browser and mobile back/forward behavior.

## Route contract

For every affected route, define:

- path, parameters, query values, and canonical URL behavior;
- route owner and the feature document it serves;
- authentication, authorization, redirect, and not-found behavior;
- loading, error, empty, and pending-navigation states;
- data dependencies and whether the URL is the source of truth;
- title, focus target, scroll restoration, and deep-link behavior.

Do not hide meaningful user state in component state when the URL must support refresh, sharing, bookmarking, or back/forward navigation.

## Navigation risks

- Preserve or intentionally reset state across route changes.
- Prevent duplicate navigation and unsafe redirect targets.
- Define unsaved-change behavior before adding a guard.
- Handle direct entry, refresh, expired session, missing permission, and stale route data.
- Keep route registries, navigation menus, and permission rules single-owner.
- Treat Web, WebView, and React Native navigation differences as explicit platform decisions.

## Verification

Run the affected flow from direct URL entry and normal navigation. Check:

- back, forward, refresh, deep link, redirect, 404/403, and session expiry;
- keyboard focus, screen-reader route announcement, title, scroll position, and narrow viewport;
- pending navigation, failed data load, duplicate clicks, and unsaved form recovery;
- URL encoding and query persistence for routes that accept or expose parameters; unsafe redirect rejection whenever the redirect destination is user- or external-input-controlled.

Update the feature user flow and state model. Record route ownership or cross-feature navigation decisions in `/docs/architecture/`.
