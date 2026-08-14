# Responsive UI and Design-System Contracts

Use for breakpoints, layout, spacing, typography, color, themes, tokens, component variants, responsive interaction, or design-to-code changes.

## Contract

Define before implementation:

- supported viewport and input modes;
- layout constraints, breakpoints, content priority, and overflow behavior;
- design tokens for color, spacing, type, radius, elevation, and motion;
- component states and variants, including disabled, pending, error, and focus;
- dark mode, high contrast, reduced motion, zoom, and text expansion behavior;
- ownership of tokens, primitives, feature components, and page composition.

Prefer constraints and tokens over page-specific magic numbers. Do not create a shared component or token until its ownership and reuse are clear.

## Verification matrix

Check the smallest set of combinations that covers every changed viewport, input, theme, state, and content branch; do not rely on one desktop screenshot:

```text
viewport: narrow | wide | zoomed
input: keyboard | pointer | touch
theme: light | dark | high contrast
state: initial | pending | error | empty | success
content: short | long | translated
```

Verify no clipped content, accidental horizontal scroll, unreadable contrast, hidden focus, layout shift, or unreachable action. Compare against the approved
design or feature document and record intentional deviations.

Visual review is evidence, not a substitute for semantics, keyboard behavior, or focused tests. Update Mermaid ownership or component diagrams when boundaries
change.
