# Tailwind Variant Buckets

Variants are modifiers before the final utility. Parse them independently from the base utility and preserve the full token. Use the project's configured separator; `:` is the default. This reference only decides the `state` versus `responsive` grouping bucket; it does not reorder modifiers or utilities according to Tailwind's CSS generation order.

## Bucket map

| Bucket | Variant families |
| --- | --- |
| `state` | Structural pseudo-classes, interaction states, form states, ARIA/data attributes, relational states, pseudo-elements, theme/environment variants, arbitrary selectors, arbitrary at-rules, and custom non-responsive variants |
| `responsive` | Viewport breakpoints, arbitrary viewport ranges, container queries, arbitrary container ranges, and configured responsive variants |

## `state`

| Family | Variants |
| --- | --- |
| Structural pseudo-classes | `first`, `last`, `only`, `odd`, `even`, `nth`, `first-of-type`, `last-of-type`, `only-of-type`, `empty`, `inert` |
| Interaction states | `hover`, `focus-within`, `focus`, `focus-visible`, `active`, `visited`, `target` |
| Form states | `enabled`, `disabled`, `checked`, `indeterminate`, `default`, `required`, `optional`, `valid`, `invalid`, `user-valid`, `user-invalid`, `in-range`, `out-of-range`, `placeholder-shown`, `autofill`, `read-only`, `open` |
| Attribute states | ARIA variants and data-attribute variants, including arbitrary attribute values |
| Relational states | `group-*`, `peer-*`, `*`, `**`, parent, sibling, descendant, implicit-parent, `has-*`, `in-*`, and `not-*` variants, including named and arbitrary forms |
| Pseudo-elements | `before`, `after`, `first-letter`, `first-line`, `marker`, `selection`, `file`, `placeholder`, `backdrop`, `details-content` |
| Environment | `dark`, `light`, `rtl`, `ltr`, `motion-safe`, `motion-reduce`, `contrast-more`, `contrast-less`, `forced-colors`, `inverted-colors`, `pointer`, `any-pointer`, `orientation`, `noscript`, `print`, `supports`, and `starting-style` |
| Arbitrary and custom | `[&>*]:...`, `[@supports(...)]:...`, and custom variants without viewport or container semantics |

An unknown modifier is `state` by default. If project configuration identifies it as responsive, use `responsive`.

## `responsive`

| Family | Variants |
| --- | --- |
| Theme breakpoints | `sm:`, `md:`, `lg:`, `xl:`, `2xl:`, and custom breakpoint names |
| Arbitrary viewport ranges | `min-[...]:`, `max-[...]:`, and named `max-*:` breakpoint forms |
| Container queries | `@3xs:`, `@2xs:`, `@xs:`, `@sm:`, `@md:`, `@lg:`, `@xl:`, `@2xl:`, `@3xl:`, `@4xl:`, `@5xl:`, `@6xl:`, `@7xl:` |
| Named container queries | `@sm/name:`, `@md/name:`, and configured `@*/name:` forms |
| Max-width container queries | `@max-3xs:` through `@max-7xl:`, and named `@max-*/name:` forms |
| Arbitrary container ranges | `@min-[...]:`, `@max-[...]:`, and named arbitrary forms |
| Arbitrary viewport at-rules | `[@media(...)]:` when the condition targets the viewport |

## Modifier parsing

- A token with any viewport or container modifier belongs to `responsive`, regardless of its base utility.
- A token with only non-responsive modifiers belongs to `state`, including `dark`, print, feature-query, direction, and interaction variants.
- An arbitrary media modifier belongs to `responsive` only when its condition targets the viewport or a container; other arbitrary at-rules belong to `state`.
- For stacked modifiers, inspect every modifier before deciding between `state` and `responsive`.
- Split on the configured separator only outside square brackets, parentheses, quotes, and escaped sections. A separator in an arbitrary value or selector is not a variant separator.
- If the project configures a Tailwind v4 prefix, remove that known prefix from the leading modifier chain before deciding the bucket. For v3, remove the `tw-`-style prefix after the modifier chain and after a v3 important marker when present. For example, classify `tw:hover:bg-*` (v4), `hover:tw-bg-*` (v3), and `hover:!tw-bg-*` (v3) as `state`, not as custom variants.
- Treat a leading `-` and version-appropriate important markers (`!utility` or `utility!`) as utility syntax, not as variants; preserve them in the output token.
- Do not reorder stacked variants. Tailwind v3 and v4 differ in stacked-variant application order, so the original order is part of the token's meaning.
- Preserve arbitrary selectors, at-rules, named variants, and their values exactly.
- `@container`, `@container/name`, `@container-size`, and `@container-size/name` without a trailing `:` are layout utilities, not variants.

Reference: [Tailwind hover, focus, and other states](https://tailwindcss.com/docs/hover-focus-and-other-states) and [responsive design](https://tailwindcss.com/docs/responsive-design).
