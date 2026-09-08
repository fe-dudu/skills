---
name: tailwind-classname-categorization
description: "Use when a Tailwind v3 or Tailwind v4 task involves a long, multi-concern className and an existing compatible classname helper can group it."
---

# Tailwind Classname Categorization

Use this skill for long, multi-concern Tailwind `className` values when the project has an existing compatible classname helper. It preserves dynamic values and conflict-sensitive order; it does not sort canonical class order, format line breaks, or implement a helper.

## Trigger

Use when a task works on a multi-concern Tailwind class value whose source line exceeds the project's configured line width or whose grouping clearly improves readability, even when categorization is not named explicitly. Check `printWidth`, `max-len`, or formatter settings; do not invent a numeric threshold when none is defined.

Do not use for short or single-concern class lists, generic CSS/CSS Modules, class-order-only changes, or helper implementation/refactoring.

Line width alone does not trigger this skill for a single-concern value.

## Preconditions

An existing compatible helper is required: `cn()`, `clsx()`, `classnames()`, `twMerge()`, or a wrapper that accepts grouped class-value arguments. Handle `cva()` through its existing base/config shape and class-bearing fields; never add positional base arguments. If the helper is missing or incompatible, leave the code unchanged and report the constraint.

## Workflow

1. Confirm that the target is a multi-concern Tailwind value and check the project's line-width convention when deciding whether it is long.
2. Inspect the project version, prefix, separator, helper signature, merge behavior, and any category-priority convention from package metadata, config, CSS, and plugins. Do not assume v4 when the syntax is unclear.
3. Read [utility-categories.md](references/utility-categories.md); read [variants.md](references/variants.md) when variants, arbitrary selectors, or container queries are present.
4. Parse static tokens without changing them. Ignore the configured separator inside brackets, parentheses, quotes, or escaped sections. Strip prefixes only for classification.
5. Classify each token using the contract below, then regroup only safe static literals. Preserve dynamic values, conditions, overrides, conflict order, and function shape.
6. Run applicable project checks and inspect the diff for unchanged tokens and helper behavior.

## Classification contract

| Token form | Group key | Rule |
| --- | --- | --- |
| Unmodified known utility | Its base category | Remove variant modifiers for classification only |
| Any viewport or container modifier | `responsive` | Responsive wins for stacked modifiers |
| Only non-responsive modifiers | `state` | Keep the complete token |
| Unmodified project-specific or unknown utility | `custom` | Do not guess from arbitrary theme values |
| Caller override identified by the component contract | `override` | Keep separate and preserve its position unless the contract requires last |

`state` and `responsive` are modifier buckets, not replacements for the base utility map. `responsive` means viewport or container conditions; `print`, `orientation`, and other environment variants remain `state` by this skill's convention. `@container`, `@container/name`, `@container-size`, and `@container-size/name` without a trailing `:` are layout utilities.

For modified tokens, choose the modifier bucket first and preserve every modifier. Do not create nested groups unless the task asks for them.

## Category order

Use project- or task-provided priority first. Otherwise use this order and omit empty groups:

| Order | Group key | Scope |
| ---: | --- | --- |
| 1 | `custom` | Project-specific and unknown classes |
| 2 | `layout` | Layout, flow, position, and stacking |
| 3 | `flex-grid` | Flexbox and grid arrangement |
| 4 | `spacing` | Margin, padding, and child spacing |
| 5 | `sizing` | Width, height, and logical sizes |
| 6 | `typography` | Font, text, and inline presentation |
| 7 | `backgrounds` | Background colors, images, and geometry |
| 8 | `borders` | Radius, border, divider, ring, and outline |
| 9 | `effects` | Shadows, opacity, blend, and masks |
| 10 | `filters` | Filters and backdrop filters |
| 11 | `tables` | Table layout, spacing, and captions |
| 12 | `transitions-animation` | Transitions, timing, and animation |
| 13 | `transforms` | Transform operations and perspective |
| 14 | `interactivity` | Input, pointer, scroll, snap, and scheduling |
| 15 | `svg` | Fill and stroke |
| 16 | `accessibility` | Screen-reader and forced-color utilities |
| 17 | `state` | Non-responsive conditional variants |
| 18 | `responsive` | Viewport and container-query variants |
| 19 | `override` | Caller-provided class or override argument |

This is semantic grouping, not Tailwind CSS ordering. A configured priority that omits a category appends it using the remaining default order.

Example:

```tsx
cn('flex', 'flex-col', 'p-4', 'text-sm text-slate-700', 'bg-white', 'hover:bg-gray-100', 'md:flex-row', className)
```

## Helper rules

- Keep one complete group per static argument when precedence is unchanged. Keep dynamic values, conditions, and caller overrides separate.
- Do not split interpolated templates or move arguments across dynamic values. Preserve the relative order of potentially conflicting utilities, especially when the helper merges Tailwind classes.
- Preserve `clsx()`/`classnames()` object shape and conditional keys. In `cva()`, regroup only class-bearing base, variant, or `compoundVariants.class/className` values while preserving keys, conditions, and string/array shape.
- Keep exact class tokens, modifiers, arbitrary values, quotes, source context, and the helper's existing call shape. Do not force an override to the end unless its contract requires it.

## Output boundary

Change only the requested grouping. Do not perform unrelated class sorting, CSS or dependency changes, line wrapping, or helper refactoring. Add an import only when a new call is required and its path is unambiguous. If equivalence is uncertain, leave the uncertain segment unchanged and report it.
