# Frontend Concern Routing

Use this reference for Level 1, Level 2, or parallel work. Classify the task by risk, select the minimum matching references, and define evidence before
creating workers. Skip it for Level 0 mechanical work unless the risk changes. These are coordination contracts, not framework tutorials. Use
`frontend-engineering` and framework-specific skills for implementation details. Do not copy code-style rules into this skill.

## Routing table

| Trigger | Read | Primary owner | Specialist review | Evidence |
| --- | --- | --- | --- | --- |
| API, query, cache, mutation, retry | `data-fetching.md` | implementer | review or debugging | state and network-flow checks |
| route, URL, redirect, deep link, back/forward | `routing-and-navigation.md` | implementer | visual or accessibility | navigation-flow checks |
| slow, bundle, hydration, rendering, layout shift | `performance-and-runtime.md` | implementer | performance | before/after measurements |
| entry point, loader, plugin, chunk, tree shaking, source map, HMR, bundler, build config | `bundling-and-build.md` | implementer or toolchain | performance or debugging | build graph, output, and runtime evidence |
| auth, token, HTML, redirect, PII, third-party script | `security-and-privacy.md` | implementer | security | threat and abuse-case evidence |
| breakpoint, theme, token, density, viewport | `responsive-design-system.md` | implementer | visual and accessibility | viewport and state matrix |
| form, draft, validation, submit, autosave | `forms-and-interaction.md` | implementer | accessibility or review | keyboard and recovery flow |
| locale, translation, timezone, RTL | `internationalization.md` | implementer | visual and review | locale matrix |
| browser, device, WebView, touch, feature support | `compatibility.md` | implementer | compatibility or visual | support-matrix evidence |
| error tracking, metric, event, release | `observability.md` | implementer | security or review | emitted-event and privacy checks |
| CSR, SSR, SSG, RSC, hydration, native/web split | `platform-boundaries.md` and `performance-and-runtime.md` | architect or implementer | review | boundary and runtime evidence |

Read all matching rows. A concern can be secondary even when it does not own code. Do not add a specialist worker merely because a row matches; add one when the
risk, user impact, or independent review value justifies the coordination cost.

## Routing rules

- Choose one primary owner. Specialist workers are read-only reviewers by default; grant write access only when the task packet names their files and change scope.
- Resolve shared contracts before dispatching lanes that depend on them.
- Keep data, route, and UI-state contracts together when changing the same user flow.
- Keep design tokens, global styles, route registries, package manifests, and `/docs` single-owner unless isolated worktrees are guaranteed.
- Record the required evidence in the task packet, not only in a worker prompt.
- A typecheck or lint result does not prove visual, runtime, performance, accessibility, or security correctness.
- If a concern changes a business rule, domain term, public contract, or stable boundary, update the `/docs` source that defines it and add or update the decision record.

## Minimal concern handoff

Every specialist report answers:

```text
Risk reviewed:
Evidence collected:
Failures or gaps:
Required fix:
Can the lane be closed:
Documentation impact:
```
