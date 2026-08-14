# Bundling and Build

Use for bundler configuration, module graphs, entry points, loaders, plugins, output, assets, development servers, HMR, source maps, code splitting, tree shaking, bundle analysis, or build failures.

## Contents

- Build contract
- Dependency graph and module boundaries
- Loaders and plugins
- Output, assets, and caching
- Development server, HMR, and source maps
- Optimization
- Verification and debugging

## Build contract

Before changing build configuration, record:

- supported browsers, runtimes, platforms, and build modes;
- entry points and whether they are static or dynamic;
- module formats, package conditions, aliases, extensions, and resolution roots;
- TypeScript, JSX, CSS, asset, font, and image transformations;
- output paths, public URL base, filename/hash policy, and cache invalidation;
- development-server, HMR, source-map, and production-parity expectations;
- bundle-size, initial-load, or build-time budget when the change is an optimization.

Keep the repository's existing tool and config conventions. Do not replace a bundler, add a loader, or add a plugin without a measured need or an approved
architecture decision.

Choose or evaluate a bundler by the project boundary: application or library, target runtime, module format, development speed, customization needs, build
output, and team maintenance cost. Tool popularity alone is not a decision criterion.

## Dependency graph and module boundaries

- Treat each entry point as the root of a dependency graph. Trace imports, dynamic imports, package exports, aliases, and generated files before changing config.
- Keep imports explicit and acyclic. Investigate duplicate modules, unexpected polyfills, and accidental cross-platform imports instead of hiding them in output.
- Resolve packages using the project's declared conditions and extensions. Check ESM/CJS interop, `exports`, `main`, `module`, and platform conditions when a
  package resolves differently across environments.
- Use ESM and static imports where the project supports them. Tree shaking depends on analyzable imports and accurate side-effect declarations.
- Mark package side effects accurately. Never claim a module is side-effect-free when it registers CSS, polyfills, globals, or runtime initialization.
- Separate application entry points from library entry points. Libraries must define public exports and peer-dependency behavior; applications must protect
  their startup path and route-level loading behavior.

## Loaders and plugins

Use a loader or transform for a module-local conversion. Use a plugin for build-wide behavior or lifecycle integration. Before adding either:

1. identify the input and output boundary;
2. check whether an existing rule or framework already handles it;
3. confirm ordering, scope, caching, and development/production behavior;
4. verify the generated output and warnings;
5. document a stable rule or decision if the boundary affects future features.

Keep rules narrow. Do not apply a costly transform to dependencies or unrelated assets. Do not hide a configuration error with a broad catch-all loader.

## Output, assets, and caching

- Use content hashes for cacheable production assets and ensure every HTML, CSS, JS, font, and image reference uses the correct public URL base.
- Keep generated output separate from source and clean stale files according to the project convention.
- Distinguish assets imported through the module graph from files served directly from a public/static directory. Verify URL, MIME type, copying, and cache
  behavior for both.
- Preserve CSS ordering and font loading behavior. Verify that asset handling does not introduce layout shift, broken preload, or inaccessible fallback text.
- Do not split vendor code or create manual chunks by habit. Use the dependency graph and measurement to justify chunk boundaries.

## Development server, HMR, and source maps

- HMR is a development feedback mechanism, not proof that the production bundle works. Test a clean build and a full reload for consequential changes.
- HMR updates must preserve valid state or fall back to a full reload. Clean subscriptions, timers, styles, and module-level caches when a module is replaced.
- Keep source maps accurate for the target environment. Verify original file, line, column, and source content policy when debugging a built artifact.
- Do not expose private source, secrets, or internal paths through production source maps. Upload maps to the approved error-reporting system when that is the
  project's practice, and verify release identity and upload completeness.
- Treat dev-server proxy, history fallback, HTTPS, host checks, and environment variables as runtime boundaries. Test them separately from the application.

## Optimization

Measure before optimizing:

1. capture a baseline build, initial transfer, parsed/evaluated JavaScript, and relevant Web Vitals or runtime measure;
2. inspect the bundle graph or analyzer for the largest modules, duplicate dependencies, unused exports, and unexpected polyfills;
3. choose the smallest boundary that addresses the measured cost;
4. remeasure the same route, environment, and build mode;
5. record the before/after result and remaining trade-offs.

Use dynamic imports for route or feature boundaries when the deferred code is not required for the initial interaction. Every lazy boundary needs loading,
error, retry, and offline or slow-network behavior. Prefetch only when the expected navigation and network cost justify it.

Tree shaking requires analyzable module boundaries, correct `sideEffects` metadata, and a production optimization mode. Minification does not remove a bad
dependency graph. Do not optimize a warning or a size number without showing its user or build impact.

Remove unused dependencies or choose a smaller equivalent only after bundle analysis and behavior checks show a meaningful gain. Preserve required locale,
polyfill, accessibility, and side-effect behavior during the replacement.

## Verification and debugging

For a build change, verify:

- clean development start and the repository's production build command;
- every changed entry point, output asset, public URL, and generated manifest;
- warnings, unresolved imports, duplicate modules, circular dependencies, and missing source files;
- direct route entry, refresh, lazy-chunk loading, failure, retry, and offline or slow-network behavior;
- HMR update and full-reload behavior when development tooling changed;
- source-map resolution for a representative runtime error without exposing protected source;
- before/after bundle, chunk, transfer, and build-time evidence when optimization was claimed.

When the build fails, classify the boundary as module resolution, transform, plugin lifecycle, output path, runtime asset loading, source map, or environment.
Read `debugging-agent.md` for reproduction and root-cause workflow. Do not fix a build symptom by broadening a loader or suppressing a warning without proving
the underlying contract.
