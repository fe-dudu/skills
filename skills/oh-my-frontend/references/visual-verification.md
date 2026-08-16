# Visual and Browser Verification

Use this reference when the verification matrix or changed risk requires browser, visual, responsive, keyboard, or runtime evidence. A local copy, style, or
markup change does not require the full sequence below.

## Verification sequence

1. Start the app with the project's existing command.
2. Open the affected route or screen.
3. Exercise the changed flow and every changed state listed in the feature state model or acceptance criteria. Check loading, empty, success, and error only when
   the changed screen implements those states.
4. Check keyboard navigation and visible focus only when the changed surface is interactive or affects focus and semantics.
5. Check only the smallest set of project-supported viewports or devices that covers each changed responsive branch. For a non-responsive local change, one
   relevant viewport is enough.
6. Compare the result with feature documentation and accepted decisions when they define the changed behavior.
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

## Visual regression stability

When baseline screenshot comparison is available:

- wait for fonts, images, and required data to finish loading before capture;
- freeze or mask only known nondeterministic content such as animation, current time, random values, or live data; never mask the changed surface;
- inspect an intentional visual diff before updating its baseline; never blanket-update snapshots to make CI green;
- prefer representative changed components, routes, and states over indiscriminate full-page coverage.

## Mermaid and evidence

If an existing canonical feature diagram becomes stale because a durable flow or state transition changed, update it only when the diagram remains useful.
Do not create a diagram for a local visual change. A rendered screenshot does not replace an editable diagram.

```text
Route or screen:
Viewport or device:
Flow exercised:
States checked:
Accessibility checks:
Observed result:
Known limitation:
```
