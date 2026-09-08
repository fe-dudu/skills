# Tailwind Utility Categories

Classify the base utility after removing variant modifiers. This is a version-aware semantic map: it covers common Tailwind v4 utilities and version-specific v3 names where noted, but it is not exhaustive. Tailwind does not expose these semantic buckets itself; they are grouping categories for this skill, not Tailwind's generated CSS order.

Apply matching in this order:

| Priority | Rule |
| ---: | --- |
| 1 | Use the project's configured version, separator, prefix, negative markers, and important markers while matching the base utility |
| 2 | Match exact and disambiguated forms before broad prefixes |
| 3 | Match the utility family, including arbitrary values and theme variables |
| 4 | Classify an arbitrary property, project utility, or unresolved token as `custom` |

For a configured Tailwind v4 prefix, remove only the leading variant-like prefix for classification and keep it in the emitted token. For Tailwind v3, remove the configured `tw-`-style prefix after any variant and after a leading negative marker. Treat the v4 trailing `!` and the v3 leading `!` important syntax as markers, not as utility names. Never normalize between versions.

## `custom`

| Scope | Examples | Rule |
| --- | --- | --- |
| Project-specific | Component classes and custom utilities | Keep as `custom` |
| Arbitrary property | `[mask-type:luminance]`, `[--token:value]` | Keep as `custom` |
| Unknown | Tokens with no recognized utility family | Keep as `custom` |

Do not classify a known utility as `custom` only because it uses a custom theme value or arbitrary value.

## `layout`

| Family | Patterns |
| --- | --- |
| Aspect and columns | `aspect-*`, `columns-*` |
| Fragmentation | `break-before-*`, `break-after-*`, `break-inside-*`, `box-decoration-*` |
| Box sizing | `box-border`, `box-content` |
| Display | `block`, `inline`, `inline-block`, `flow-root`, `inline-flex`, `inline-grid`, `inline-table`, `contents`, `flex`, `grid`, `hidden`, `list-item`, display forms of `table-*` |
| Float and clearing | `float-*`, `clear-*` |
| Isolation | `isolate`, `isolation-auto` |
| Replaced content | `object-fit-*`, `object-position-*` |
| Overflow | `overflow-*`, `overscroll-*` |
| Position | `static`, `fixed`, `absolute`, `relative`, `sticky`, `inset-*`, `inset-x-*`, `inset-y-*`, `start-*`, `end-*`, `top-*`, `right-*`, `bottom-*`, `left-*` |
| Visibility | `visible`, `invisible`, `collapse` |
| Stacking | `z-*` |
| Container utilities | `container`, `@container`, `@container/name`, `@container-size`, `@container-size/name` |

`sr-only` and `not-sr-only` belong to `accessibility`.

## `flex-grid`

| Family | Patterns |
| --- | --- |
| Flex basis and direction | `basis-*`, `flex-*`, `flex-row`, `flex-row-reverse`, `flex-col`, `flex-col-reverse` |
| Flex wrapping and item behavior | `flex-wrap`, `flex-nowrap`, `grow`, `grow-*`, `shrink`, `shrink-*` |
| Item order | `order-*` |
| Grid templates and placement | `grid-cols-*`, `grid-rows-*`, `grid-flow-*`, `auto-cols-*`, `auto-rows-*`, `col-*`, `row-*` |
| Gaps | `gap-*`, `gap-x-*`, `gap-y-*` |
| Justification | `justify-*` |
| Alignment | `items-*`, `content-*` with alignment values, `self-*` |
| Place shorthands | `place-content-*`, `place-items-*`, `place-self-*` |

`content-center`, `content-between`, and similar alignment values belong here. Generated content forms such as `content-['...']` belong to `typography`.

## `spacing`

| Family | Patterns |
| --- | --- |
| Margin | `m-*`, `mx-*`, `my-*`, `ms-*`, `me-*`, `mbs-*`, `mbe-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*` |
| Padding | `p-*`, `px-*`, `py-*`, `ps-*`, `pe-*`, `pbs-*`, `pbe-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*` |
| Child spacing | `space-x-*`, `-space-x-*`, `space-y-*`, `-space-y-*`, `space-x-reverse`, `space-y-reverse` |

## `sizing`

| Family | Patterns |
| --- | --- |
| Unified size | `size-*` |
| Width | `w-*`, `min-w-*`, `max-w-*` |
| Height | `h-*`, `min-h-*`, `max-h-*` |
| Logical inline size | `inline-size-*`, `min-inline-size-*`, `max-inline-size-*` |
| Logical block size | `block-size-*`, `min-block-size-*`, `max-block-size-*` |

## `typography`

| Family | Patterns |
| --- | --- |
| Font family | `font-sans`, `font-serif`, `font-mono`, custom `font-*` families |
| Font size and combined line height | `text-*` size forms, `text-sm/6`, `text-[...]` |
| Smoothing and style | `antialiased`, `subpixel-antialiased`, `italic`, `not-italic` |
| Weight and stretch | `font-*` weight forms, `font-stretch-*` |
| Numeric and feature settings | `normal-nums`, `ordinal`, `slashed-zero`, `lining-nums`, `oldstyle-nums`, `proportional-nums`, `tabular-nums`, `diagonal-fractions`, `stacked-fractions`, `font-feature-*` |
| Letter metrics | `tracking-*`, `leading-*`, `indent-*`, `tab-*` |
| Text alignment | `text-left`, `text-center`, `text-right`, `text-justify`, `text-start`, `text-end` |
| Vertical alignment | `align-baseline`, `align-top`, `align-middle`, `align-bottom`, `align-text-top`, `align-text-bottom`, `align-sub`, `align-super` |
| Wrapping and breaking | `whitespace-*`, `text-wrap`, `text-nowrap`, `text-balance`, `text-pretty`, `wrap-*`, `break-normal`, `break-words`, `break-all`, `break-keep`, `overflow-wrap-*`, `hyphens-*` |
| Truncation | `truncate`, `text-ellipsis`, `text-clip`, `line-clamp-*` |
| Lists | `list-image-*`, `list-inside`, `list-outside`, `list-none`, `list-disc`, `list-decimal` |
| Decoration and case | `uppercase`, `lowercase`, `capitalize`, `normal-case`, `underline`, `overline`, `line-through`, `no-underline`, `decoration-*`, `underline-offset-*` |
| Text color | `text-*` color forms |
| Generated content | `content-*` value forms such as `content-['...']` |

When a `text-*` token cannot be distinguished from a size, alignment, or color form, keep it in `typography`.

## `backgrounds`

| Family | Patterns |
| --- | --- |
| Attachment | `bg-fixed`, `bg-local`, `bg-scroll` |
| Clip and origin | `bg-clip-*`, `bg-origin-*` |
| Color | `bg-*` color forms |
| Images and gradients | `bg-none`, `bg-linear-*`, `bg-radial`, `bg-radial-*`, `bg-conic`, `bg-conic-*`, `bg-[url(...)]`, v3 `bg-gradient-*`, `from-*`, `via-*`, `to-*` |
| Position, repeat, and size | `bg-position-*`, `bg-repeat-*`, `bg-size-*` |

Match `bg-clip-*` and `bg-origin-*` before the broad `bg-*` prefix. `bg-blend-*` belongs to `effects`; backdrop filter forms belong to `filters`.

## `borders`

| Family | Patterns |
| --- | --- |
| Radius | `rounded`, `rounded-*` when supported by the project |
| Border width, color, and style | `border`, `border-x`, `border-y`, `border-s`, `border-e`, `border-bs`, `border-be`, `border-t`, `border-r`, `border-b`, `border-l`, their `-*` forms, `border-solid`, `border-dashed`, `border-dotted`, `border-double`, `border-hidden`, `border-none` |
| Dividers | `divide-*`, `divide-x-*`, `divide-y-*`, divider style forms |
| Rings | `ring`, `ring-*`, `ring-inset`, `inset-ring`, `inset-ring-*`, `ring-offset-*` |
| Outlines | `outline`, `outline-*`, `outline-hidden`, `outline-none`, `outline-dashed`, `outline-dotted`, `outline-double`, `outline-offset-*` |

`border-collapse`, `border-separate`, and `border-spacing-*` belong to `tables`.

## `effects`

| Family | Patterns |
| --- | --- |
| Shadows | `shadow`, `shadow-*`, `inset-shadow-*`, `text-shadow-*` |
| Opacity | `opacity-*` |
| Blending | `mix-blend-*`, `bg-blend-*` |
| Masks | all known `mask-*` forms, including `mask-[...]`, `mask-none`, `mask-clip-*`, `mask-composite-*`, `mask-image-*`, `mask-mode-*`, `mask-origin-*`, `mask-position-*`, `mask-repeat-*`, `mask-size-*`, and `mask-type-*` |

## `filters`

| Family | Patterns |
| --- | --- |
| Filter | `filter`, `blur-*`, `brightness-*`, `contrast-*`, `drop-shadow-*`, `grayscale-*`, `hue-rotate-*`, `invert-*`, `saturate-*`, `sepia-*` |
| Backdrop filter | `backdrop-filter`, `backdrop-blur-*`, `backdrop-brightness-*`, `backdrop-contrast-*`, `backdrop-grayscale-*`, `backdrop-hue-rotate-*`, `backdrop-invert-*`, `backdrop-opacity-*`, `backdrop-saturate-*`, `backdrop-sepia-*` |

## `tables`

| Family | Patterns |
| --- | --- |
| Collapse and separation | `border-collapse`, `border-separate` |
| Spacing | `border-spacing-*`, `border-spacing-x-*`, `border-spacing-y-*` |
| Layout | `table-auto`, `table-fixed` |
| Caption placement | `caption-top`, `caption-bottom` |

## `transitions-animation`

| Family | Patterns |
| --- | --- |
| Transition property and behavior | `transition`, `transition-*`, `transition-behavior-*` |
| Timing | `duration-*`, `ease-*`, `delay-*` |
| Animation | `animate-*` |

## `transforms`

| Family | Patterns |
| --- | --- |
| Backface and perspective | `backface-*`, `perspective-*`, `perspective-origin-*` |
| Operations | `rotate-*`, `scale-*`, `skew-*`, `translate-*`, `zoom-*` |
| Configuration | `transform`, `transform-*`, `transform-style-*`, `origin-*` |

## `interactivity`

| Family | Patterns |
| --- | --- |
| Input and pointer behavior | `accent-*`, `appearance-*`, `caret-*`, `color-scheme-*`, `scheme-*`, `cursor-*`, `field-sizing-*`, `pointer-events-*`, `resize-*`, `select-*`, `touch-*` |
| Scrolling | `scroll-auto`, `scroll-smooth`, `scrollbar-*`, `scrollbar-gutter-*`, `scroll-m*`, `scroll-p*` |
| Scroll snapping | `snap-*` |
| Scheduling | `will-change-*` |

## `svg`

| Family | Patterns |
| --- | --- |
| Fill | `fill-*` |
| Stroke paint and width | `stroke-*`, including `stroke-current`, `stroke-none`, and stroke-width forms |

## `accessibility`

| Family | Patterns |
| --- | --- |
| Screen-reader visibility | `sr-only`, `not-sr-only` |
| Forced colors | `forced-color-adjust-*` |

## Disambiguation

Apply these rules before broad prefix matching:

| Specific case | Category |
| --- | --- |
| `break-before-*`, `break-after-*`, `break-inside-*` | `layout` |
| `break-normal`, `break-words`, `break-all`, `break-keep` | `typography` |
| v3 `overflow-ellipsis` | `typography` |
| v3 `decoration-slice`, `decoration-clone` | `layout` |
| `content-*` alignment values | `flex-grid` |
| Generated `content-*` values | `typography` |
| `inset-shadow-*` | `effects`, before the broad `inset-*` layout rule |
| `inset-ring-*` | `borders`, before the broad `inset-*` layout rule |
| All known `mask-*` utility forms | `effects`, before custom fallback |
| `border-collapse`, `border-separate`, `border-spacing-*` | `tables` |
| `border`, bare side-width forms, `outline`, `ring`, `inset-ring` | `borders` |
| Other `border-*` | `borders` |
| `bg-clip-*`, `bg-origin-*`, background geometry | `backgrounds` |
| `bg-blend-*` | `effects` |
| `bg-radial`, `bg-conic`, and v3 `bg-gradient-*` | `backgrounds` |
| Other `bg-*` | `backgrounds` |
| `inline-flex`, `inline-grid`, `inline-block`, `inline-table` | `layout` |
| `inline-size-*` and related logical sizes | `sizing` |
| `scroll-m*`, `scroll-p*` | `interactivity` |
| `m-*`, `p-*` | `spacing` |
| `text-shadow-*` | `effects` |
| Other `text-*` | `typography` |
| `backdrop-*` filter forms | `filters` |
| `transition` | `transitions-animation` |
| `sr-only`, `not-sr-only`, `forced-color-adjust-*` | `accessibility` |

Reference: [Tailwind CSS documentation](https://tailwindcss.com/docs).
