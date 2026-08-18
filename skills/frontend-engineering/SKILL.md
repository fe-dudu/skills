---
name: frontend-engineering
description: Apply standalone TypeScript and React implementation rules for readable, explicit, and predictable frontend code. Use when creating, reviewing, refactoring, testing, or debugging frontend code, especially changeability, cohesion, coupling, control flow, state ownership, forms, React effects, accessibility, async resilience, runtime data boundaries, render contracts, modules, files, domains, or abstractions.
---

# Frontend Engineering

Use these rules as the default style for frontend work. Optimize for code that is easy to change: keep intent obvious, code flow flat, and decisions local to the code that uses them. Prefer explicit code over clever compression. Allow small, visible duplication when it avoids a premature or misleading abstraction.

## Workflow

1. Inspect the repository's existing conventions, domain terms, types, scripts, and test setup.
2. Read only the reference file that matches the current task. Read more when the task crosses categories.
3. Before extracting, sharing, or centralizing code, identify which files or components change together for the same feature and which module owns the behavior.
4. Implement the smallest change that makes the behavior correct and clear.
5. Review the diff for unnecessary one-use variables, pass-through wrappers or helpers, aliases, re-exports, barrel files, layers, comments, and type assertions.
6. Validate behavior with the project's type checks, lint, tests, and relevant runtime checks.

## Reference map

| Task | Read |
| --- | --- |
| Control flow | [control-flow.md](references/control-flow.md) |
| Naming and variables | [naming-and-variables.md](references/naming-and-variables.md) |
| Functions and AHA abstraction | [functions-and-abstraction.md](references/functions-and-abstraction.md) |
| TypeScript | [typescript.md](references/typescript.md) |
| Collections and data processing | [collections.md](references/collections.md) |
| React rendering | [react-rendering.md](references/react-rendering.md) |
| React components | [react-components.md](references/react-components.md) |
| React hooks | [react-hooks.md](references/react-hooks.md) |
| State ownership | [state-ownership.md](references/state-ownership.md) |
| React context | [react-context.md](references/react-context.md) |
| Forms and validation | [forms-and-validation.md](references/forms-and-validation.md) |
| Error handling | [error-handling.md](references/error-handling.md) |
| Async work and resilience | [async-and-resilience.md](references/async-and-resilience.md) |
| API and runtime data boundaries | [api-and-data-fetching.md](references/api-and-data-fetching.md) |
| URL state and routes | [url-state-and-routes.md](references/url-state-and-routes.md) |
| Testing and accessibility | [testing.md](references/testing.md) |
| Modules and exports | [modules-and-exports.md](references/modules-and-exports.md) |
| Comments | [comments.md](references/comments.md) |
| Security and diagnostics | [security-and-diagnostics.md](references/security-and-diagnostics.md) |
| Dead code and tooling | [dead-code-and-tooling.md](references/dead-code-and-tooling.md) |
| File naming and structure | [file-naming-and-structure.md](references/file-naming-and-structure.md) |
| Domain structure | [domain-structure.md](references/domain-structure.md) |

## Core principles

- Prioritize correctness, accessibility, security, explicit user requirements, and repository conventions.
- Judge maintainability through four competing dimensions: readability, predictability, cohesion, and coupling. State which dimension a change improves when the tradeoff is not obvious; do not optimize one dimension blindly.
- Prefer readable, explicit, local code over clever compression and premature abstraction. Keep short, simple one-use expressions inline; extract values when complexity, reuse, domain meaning, type clarity, or branch clarity justifies the name.
- Design public React abstractions declaratively: accept desired state or configuration, expose intent-oriented operations, and avoid making every caller coordinate the same refs, handlers, and effects.
- Keep React abstractions small and lifecycle-safe. Prefer purpose-specific hooks for external synchronization; do not recreate generic mount or effect lifecycles or hide imperative work behind pass-through wrappers.
- Generalize only when code has the same responsibility, inputs, outputs, and is expected to change together. Prefer duplication when behavior may diverge; prefer cohesion when related code must change together.
- Keep changes small. Verify user-visible behavior and domain outcomes.
- Read the relevant reference before changing code. Keep exceptions narrow and visible in the code's names and structure.

When rules conflict, choose in this order: correctness and user requirements, repository and framework conventions, readability and locality, relevant references, then future reuse or theoretical consistency.
