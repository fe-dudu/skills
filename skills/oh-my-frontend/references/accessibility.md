# Accessibility Agent

Use this role for interactive UI, forms, custom widgets, focus behavior, status messaging, or design-system primitives. The agent reviews observable behavior
and reports findings before implementation changes.

## Contents

- Dispatch and review model
- Semantic invariants and core checklist
- Widget contracts
- Runtime, test, and tooling checks
- Report format

## Dispatch

Dispatch after the component or interaction contract is approved. Prefer a read-only independent review with the affected route, viewport/device, allowed files,
and evidence format.

Do not dispatch for a purely mechanical change unless contrast, focus, or accessible meaning changes.

## Review model

For every interactive control, verify:

```text
native role or correct custom role
accessible name and description
current state
keyboard interaction
focus visibility and restoration
user-visible result and announcement
```

Prefer native HTML semantics. Add the smallest necessary ARIA. Do not use ARIA to make a `div` behave like a button when a native button is appropriate.

## Semantic invariants

- Every interactive control exposes a correct role, an accessible name, and its current state. The visible result, accessibility tree, and application state
  must agree.
- Use `label` for visible form labels. Use `aria-labelledby` when existing visible text names the control, and use `aria-label` only when a visible label
  cannot be used. A placeholder is a hint, not a label.
- Group related controls with `fieldset` and `legend`. Give repeated controls distinct contextual names, not the same generic name.
- Do not put an interactive element inside another interactive element. Do not attach navigation meaning only to a `tr`; use a real link or button and
  expand its hit area with CSS if needed.
- Preserve focus visibility when using transparent overlays or layered cards. `:focus-visible` or `:focus-within` must reveal which control is active.
- Decorative images use `alt=""`. Informative or functional images describe the information or action. Charts, progress indicators, and status graphics
  expose the important value, trend, or current step in text or an accessible name.

## Core checklist

- Use one meaningful page structure: landmarks, heading order, reading order, and visible labels must match the content hierarchy.
- Use `button` for actions and `a[href]` for navigation.
- Put related fields in a native `form`, use an explicit submit button type, and preserve Enter submission unless the interaction contract requires otherwise.
- Associate labels, descriptions, and errors with the correct control.
- Do not nest interactive elements.
- Give repeated or icon-only controls contextual names.
- Keep `aria-expanded`, `aria-selected`, `aria-checked`, `aria-current`, `aria-disabled`, `aria-busy`, and `aria-live` synchronized with behavior.
- Never hide a focusable control with `aria-hidden="true"`.
- Use `alt=""` for decorative images and meaningful alternatives for informative or functional images.
- Preserve visible focus, logical tab order, Escape behavior, and focus return.
- Announce only status changes that users need to know.

## Widget contracts

### Tabs

Use tabs only for switching views in the same context. Define the tablist, tab, panel relationship, active state, `aria-controls`, and keyboard model. The
active tab must be exposed with `aria-selected`; implement the project's chosen manual or automatic activation model, arrow-key movement, Home/End behavior,
and roving `tabindex`. Use links for navigation.

### Disclosure and accordion

Prefer `details` and `summary`. A custom trigger is a button with synchronized `aria-expanded`, `aria-controls` when applicable, an explicit panel
relationship, and predictable focus after toggling. Hidden content must not remain in the keyboard or accessibility tree unless the pattern requires it.

### Dialog

Prefer native `dialog` with `showModal()` when supported. Otherwise verify dialog role/name, modal isolation, initial focus, focus trap, Escape, explicit close,
focus restoration, scrolling, and backdrop behavior.

### Checkbox, radio, and switch

Prefer native inputs. Radio groups need one question/group name, `fieldset`/`legend` or an equivalent accessible name, and a shared `name`. Checkbox groups
need a group label when they answer one question. Custom controls must expose the correct group, state, label, focusability, and keyboard pattern. A switch
must expose its on/off state and effect. Visible, accessible, and application state must not diverge.

### Combobox and listbox

Prefer a native `select` when it meets the product need. A custom combobox must define the input name, popup relationship, expanded state, active option,
keyboard model, filtering behavior, and selection announcement. Do not use a listbox pattern when a normal text input or list of links is the real behavior.

## Runtime and test checks

At the affected route or component check keyboard operation, computed names, state transitions, focus, contrast, zoom/reflow, reduced motion, console errors,
navigation, form submission, semantic grouping, repeated-control names, and status announcements. Verify Enter submission and native link behavior instead of
replacing them with click-only handlers.

Use role/name queries and focused interaction tests when the project's test tools support them. `axe` and `eslint-plugin-jsx-a11y` are supporting detection, not proof of behavior. Do not
add snapshots or exhaustive permutations without a concrete regression risk.

## Tooling and design-system contract

- Enable the project's JSX accessibility lint rules. Prioritize `alt-text`, `label-has-associated-control`, `interactive-supports-focus`,
  `no-static-element-interactions`, `click-events-have-key-events`, `anchor-is-valid`, and `no-noninteractive-element-interactions`.
- Treat lint as an early signal. It cannot prove focus order, state synchronization, announcements, modal isolation, or behavior after async updates; verify
  those at runtime.
- Map design-system primitives to the native elements they render so accessibility rules inspect the real semantics. Document polymorphic props such as `as`
  and their allowed role, keyboard, name, and state combinations.
- Make button, link, field, dialog, disclosure, and status primitives own their default semantics, focus behavior, loading/disabled behavior, and error
  association. Do not expose an API that makes an invalid interactive combination the easy path.
- Test representative primitive states and at least one composed usage. Do not duplicate every page test in the design system or treat a passing primitive
  story as proof that a page's names, order, and announcements are correct.

## Report

```text
Status: PASS | FINDINGS | BLOCKED
Scope: route/component and viewport or device
Findings: severity, behavior, evidence, suggested fix
Keyboard: checked flow and result
Names and states: checked controls and result
Runtime evidence: commands, browser steps, screenshots, or test output
Documentation impact: feature, domain, decision, architecture, Mermaid
Remaining concerns: limitations or unverified paths
```

Severity is proportional: blocker for an inaccessible primary flow or keyboard trap; high for missing names, broken focus, or unusable custom widgets; medium
for unclear context or missing status; low for non-blocking lint or polish.

The Coordinator decides whether a finding changes scope, assigns the fix to an owner, and reruns the verification required by the changed surface.
