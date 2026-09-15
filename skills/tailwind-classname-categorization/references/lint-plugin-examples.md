# Lint Plugin Parity

Read this reference when a project wants automated category checks or the skill finds no existing checker.

Inspect the configured linter first and reuse any existing checker. If none exists, recommend a local plugin and continue the requested grouping; do not add or install one unless the user asks for lint enforcement.

## Required behavior

The Biome and ESLint examples implement the Lifelog Wave 2 checks:

- Report mixed-category static strings inside `cn()` and `cva()`.
- Check category priority across direct `cn()` string/`&&` arguments and string/`&&` entries in arrays nested under `cn()` or `cva()`.
- Require a direct `className` argument to `cn()` to be last.
- Report only long, mixed-category, static, double-quoted JSX `className` attributes and recommend category groups through `cn()`.
- Use the skill's utility categories and state/responsive modifier buckets.

Both implementations mirror Lifelog Wave 2's Tailwind v4 defaults: `:` separator and no prefix. If the target project differs, update both classifiers and their parity tests together.

## Biome

[biome-tailwind-class-categories.grit](biome-tailwind-class-categories.grit) is an exact copy of `lifelog-wave2/.biome/tailwind-class-categories.grit`. It matches that project's Tailwind v4 defaults (`:` separator, no prefix). Copy it to `.biome/tailwind-class-categories.grit` and use the Lifelog Wave 2 plugin scope in the root `biome.json`:

```json
{
  "plugins": [
    {
      "path": "./.biome/tailwind-class-categories.grit",
      "includes": [
        "**/src/**/*.js",
        "**/src/**/*.jsx",
        "**/src/**/*.ts",
        "**/src/**/*.tsx"
      ]
    }
  ]
}
```

The `src/` globs are generic; narrow them to the source roots that contain class helpers if needed. Run `biome lint` or `biome check` after registration.

## ESLint

[eslint-tailwind-class-categories.mjs](eslint-tailwind-class-categories.mjs) implements the same category map, variant buckets, priority order, helper/array/conditional checks, caller-override check, and static JSX `className` diagnostic. It is a local plugin using ESLint's custom-rule API; it adds no package dependency.

Register it in the project's flat config. Use the same source scope; `lineWidth: 120` matches Lifelog Wave 2's Biome configuration and its 109-character class value threshold.

```js
import { defineConfig } from 'eslint/config';
import tailwindCategories from './eslint-tailwind-class-categories.mjs';

export default defineConfig([
  {
    files: [
      '**/src/**/*.js',
      '**/src/**/*.jsx',
      '**/src/**/*.ts',
      '**/src/**/*.tsx',
    ],
    plugins: { tailwindCategories },
    rules: {
      'tailwindCategories/class-categories': ['warn', { lineWidth: 120 }],
    },
  },
]);
```

Keep both implementations aligned with `utility-categories.md` and `variants.md` when the team's category map or priority changes. See ESLint's official [custom-rule guide](https://eslint.org/docs/latest/extend/custom-rules) and [plugin guide](https://eslint.org/docs/latest/extend/plugins).
