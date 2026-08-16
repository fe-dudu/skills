# Frontend Concern Routing

Use for Bounded, Consequential, or Parallel work. Choose one primary concern, load its reference, and define the evidence before assigning work. Skip routing for Direct work unless the changed risk is higher than the description suggests.

## Routing table

| Trigger | Primary reference | Evidence |
| --- | --- | --- |
| API, query, cache, mutation, retry | `data-fetching.md` | request states, cache, and network-flow checks |
| route, URL, redirect, deep link, back/forward | `routing-and-navigation.md` | direct-entry and navigation-flow checks |
| slow UI, bundle, hydration, rendering, layout shift | `performance-and-runtime.md` | before/after measurement |
| loader, plugin, chunk, tree shaking, source map, HMR, build config | `bundling-and-build.md` | build graph, output, and runtime evidence |
| auth, token, HTML, redirect, PII, third-party script | `security-and-privacy.md` | threat and abuse-case evidence |
| breakpoint, theme, token, density, viewport | `responsive-design-system.md` | viewport and state matrix |
| form, draft, validation, submit, autosave | `forms-and-interaction.md` | keyboard and recovery flow |
| locale, translation, timezone, RTL | `internationalization.md` | locale matrix |
| browser, device, WebView, touch, feature support | `compatibility.md` | support-matrix evidence |
| error tracking, metric, event, release | `observability.md` | emitted-event and privacy checks |
| CSR, SSR, SSG, RSC, hydration, native/web split | `platform-boundaries.md` | boundary evidence; read `performance-and-runtime.md` only if a performance acceptance criterion changes |
| shared module, package boundary, dependency direction, ownership boundary | `architecture.md` | boundary and dependency evidence |
| shared component, design-system primitive, feature component boundary | `component-architecture.md` | rendered element, ownership, and consumer evidence |
| domain term, invariant, permission rule, limit, status meaning | `domain.md` | glossary, rule, and enforcement evidence |
| loading, empty, error, pending, stale, success, or user-observable state | `ui-state.md` | state matrix and transition evidence |
| bug, regression, failed test/build, runtime error, flaky or intermittent behavior | `debugging-agent.md` | reproduction, discriminating check, root cause, and regression evidence |

## Routing rules

- Pick one primary owner and one primary reference.
- Read a secondary reference only when it changes acceptance criteria or evidence.
- Do not create a specialist worker merely because a row matches. Use one when independent review or a specialized tool adds value.
- Keep data, route, and UI-state contracts together when they belong to one flow.
- Keep manifests, route registries, package files, design tokens, shared boundaries, and project documentation single-owner. Worktrees isolate disjoint files; they do not create multiple owners for a shared contract.
- A typecheck or lint result does not prove visual, runtime, performance, accessibility, or security correctness.
- If no row matches, use `frontend-engineering`, the framework-specific skill, and the repository's normal checks.

Routing precedence:

- Use `security-and-privacy.md` as primary when a redirect, route guard, token, or user data change has an abuse or authorization concern; use routing as secondary only when navigation behavior also changes.
- Use `bundling-and-build.md` as primary for build, loader, plugin, HMR, or source-map failures; use `debugging-agent.md` for the investigation workflow.
- Use `platform-boundaries.md` as primary when the implementation or shared behavior differs by platform; use `performance-and-runtime.md` as secondary only when a performance acceptance criterion changes.
- Use `responsive-design-system.md` as primary for viewport, theme, token, or responsive-branch changes; use `performance-and-runtime.md` as secondary only when a measured performance budget changes.
- Use `debugging-agent.md` for diagnosis regardless of whether a debugging worker is created.

Specialist lanes use the unified worker report defined in `parallel-work.md`; add concern-specific evidence there instead of creating another report format.
