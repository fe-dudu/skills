# Visual and Browser Verification

Use this reference for UI changes, browser behavior, responsive layout, keyboard flows, and runtime visual checks.

## Verification sequence

1. Start the app with the project's existing command.
2. Open the affected route or screen.
3. Exercise the primary flow and every state listed in the feature state model or acceptance criteria. If no state list exists, check loading, empty, success,
   and error only when the screen implements those states.
4. Check keyboard navigation and visible focus for interactive controls.
5. Check the smallest and largest project-supported viewports or devices. If the project has no support matrix, check the smallest supported viewport and one
   desktop viewport.
6. Compare the result with feature documentation and accepted decisions.
7. Record the exact route, command, evidence, and limitations.

Use the available browser, simulator, screenshot, or equivalent runtime tool. Source inspection alone is not visual verification.

## Inspection checklist

```text
layout       overflow, alignment, spacing, responsive behavior
content      hierarchy, truncation, empty/error copy
interaction  hover, focus, disabled, pending, success, failure
accessibility semantics, labels, keyboard, focus, announcements
runtime      console errors, failed requests, broken navigation
```

Check behavior, not only the happy-path screenshot. Report a limitation when a target browser, device, viewport, or assistive technology was unavailable.

## Mermaid and evidence

When user flow or state transitions change, update the Mermaid source in the affected feature document. A rendered screenshot does not replace an editable
diagram.

```text
Route or screen:
Viewport or device:
Flow exercised:
States checked:
Accessibility checks:
Observed result:
Known limitation:
```
