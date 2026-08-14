---
name: oh-my-frontend
description: >
  Optional frontend workflow and orchestration for project memory, approval,
  parallel work, specialist review, and risk-based verification. Use when work
  needs durable /docs memory, Planner questions, user approval, task packets,
  cross-feature integration, domain language, business rules, feature
  documentation, architecture decisions, or specialist verification. For
  standalone TypeScript, React, styling, refactoring, or testing, use
  frontend-engineering.
---

# Oh My Frontend

Operate frontend work as a shared system for people and agents.

This is not only a coding-style skill. It coordinates four concerns:

1. **Project memory**: terms, rules, features, decisions, and architecture.
2. **Conversation**: clarify intent and obtain approval when a choice matters.
3. **Execution**: split independent frontend work and coordinate agents.
4. **Evidence**: verify code, UI behavior, accessibility, and documentation.

The Coordinator owns the workflow. Workers own bounded implementation tasks.

## Human documentation

This repository keeps Korean guides and mirrored references under `docs/oh-my-frontend.ko/`.

Read them when onboarding a person, reviewing the operating model, or extending this skill. Installed skill packages may not include the repository's human
documentation. Do not load all human documentation for every coding task. For normal work, use the compact rules below and load only the matching reference.

The system has three boundaries:

```text
/docs       durable project memory
task state  temporary coordination for the current change
evidence    actual command and runtime verification results
```

Do not confuse a plan, an agent report, or project memory with verification evidence.

## Durable memory model

The project `/docs` answers four different questions:

| Memory | Question | Typical path |
| --- | --- | --- |
| Domain | What do our words and rules mean? | `docs/domain/` |
| Feature | What does the user-facing capability do? | `docs/features/<feature>/` |
| Decision | Why did we choose this option? | `docs/decisions/YYYY-MM-DD-<feature>.md` |
| Architecture | Which stable boundaries must the code respect? | `docs/architecture/` |

Do not duplicate the same rule in every document. Put the rule in its source document and link or name it elsewhere.

Use this promotion rule:

```text
conversation insight → approved decision or document update
worker assumption     → report only unless durable
temporary task detail → discard after integration
verification result   → evidence/report, not project memory
```

## Progressive disclosure

Read only the reference that matches the current task:

| Need | Read |
| --- | --- |
| Choose document or feature-memory structure | [documentation.md](references/documentation.md) |
| Complete feature-document example | [example-documentation.md](references/example-documentation.md) |
| Add or change domain terms or business rules | [domain.md](references/domain.md) |
| Glossary and business-rule example | [example-domain.md](references/example-domain.md) |
| Record a durable choice | [decisions.md](references/decisions.md) |
| Complete decision-record example | [example-decision.md](references/example-decision.md) |
| Change a stable cross-feature boundary | [architecture.md](references/architecture.md) |
| Architecture-boundary example | [example-architecture.md](references/example-architecture.md) |
| Split or dispatch parallel work | [parallel-work.md](references/parallel-work.md) |
| Component boundaries | [component-architecture.md](references/component-architecture.md) |
| Component and screen state | [ui-state.md](references/ui-state.md) |
| Classify frontend concerns and route agents | [frontend-concern-routing.md](references/frontend-concern-routing.md) |
| Data fetching, caching, and async UI contracts | [data-fetching.md](references/data-fetching.md) |
| Routes, URLs, and navigation behavior | [routing-and-navigation.md](references/routing-and-navigation.md) |
| Rendering strategy and performance evidence | [performance-and-runtime.md](references/performance-and-runtime.md) |
| Bundling, build configuration, HMR, source maps, and bundle optimization | [bundling-and-build.md](references/bundling-and-build.md) |
| Frontend security and privacy review | [security-and-privacy.md](references/security-and-privacy.md) |
| Responsive behavior and design-system contracts | [responsive-design-system.md](references/responsive-design-system.md) |
| Forms and multi-step interaction behavior | [forms-and-interaction.md](references/forms-and-interaction.md) |
| Internationalization and localization | [internationalization.md](references/internationalization.md) |
| Browser, device, and WebView compatibility | [compatibility.md](references/compatibility.md) |
| Production errors, metrics, and telemetry | [observability.md](references/observability.md) |
| Web, WebView, and React Native boundaries | [platform-boundaries.md](references/platform-boundaries.md) |
| Accessibility agent review | [accessibility.md](references/accessibility.md) |
| Debugging agent investigation | [debugging-agent.md](references/debugging-agent.md) |
| Browser or visual review | [visual-verification.md](references/visual-verification.md) |
| Test and verification scope | [verification.md](references/verification.md) |

For TypeScript or React code changes, use the repository's frontend implementation skill (`frontend-engineering` in this project) and the applicable
framework-specific skill when installed.

## Operating workflow

### 1. Load project memory when needed

Use the classification in section 2 to choose the lightest memory scope before opening `/docs`:

- **Level 0:** for ordinary code, style, or markup changes, do not search `/docs` or run concern routing. For an explicit durable-document request, read
  `documentation.md` and the target document only. Inspect the affected code and use the minimum risk-based verification.
- **Level 1:** read only the directly affected feature document, if one exists, and the primary concern reference. Do not create a task packet unless the
  work is being delegated.
- **Level 2 or parallel work:** find the repository's `/docs` index or list, read the feature document when it exists, then read domain, decisions,
  architecture, component, and state references only when their boundaries are affected. Inspect existing code, scripts, tests, and runtime conventions.

Do not read every document for every task. Follow the task-to-document mapping in `documentation.md`.

If documents conflict, stop and surface the conflict. Do not silently choose a definition.

### 2. Classify the change

#### Level 0: mechanical

Examples: copy, spacing, color, isolated markup, simple rename, or an explicitly requested documentation-only change.

Proceed without an interview when the change is limited to the listed mechanical cases and does not change state, a contract, domain meaning, or user-visible
behavior. Run the checks in [verification.md](references/verification.md) that cover the changed risk.

#### Explicit durable-document request

When the user explicitly names a durable document and requested change, treat the named scope as already approved. Read `documentation.md`, the target document,
and its one applicable governing reference when one exists (`domain.md`, `decisions.md`, or `architecture.md`). Do not perform full `/docs` discovery. Update the
target directly without a Planner interview, additional approval, task packet, or parallel workers.

Inspect related project documents only when needed to check a conflict or canonical contract. Stop and surface the conflict when canonical documents disagree or
the request leaves a consequential domain, contract, architecture, or security choice unresolved. If code changes are also requested, classify the code work
separately by its changed risk.

#### Level 1: bounded behavior

Examples: form behavior, local state, component API, loading or error state, one existing feature pattern.

Ask only blocking questions. Ask one focused question at a time when multiple valid choices affect behavior or scope.

#### Level 2: architectural or cross-feature

Examples: new feature, domain rule, API contract, shared module, state architecture, authentication, authorization, payment, security, or parallel work.

Use this gate:

```text
inspect → interview → compare options → record decisions → user approval → implement
```

Do not implement Level 2 work before the user approves its intent, scope, and consequential design choices.

### Approval questions

Ask only questions whose answers can change the result. Good questions cover:

- desired user outcome and non-goals
- domain terms and business rules
- visible states and edge cases
- API or data contracts
- architecture and shared ownership
- verification expectations

Ask one question at a time. Give concrete options whenever two or more valid answers would change behavior or scope. When the existing project convention
resolves the question, use it and report the assumption instead of interrupting the user.

### Frontend concern classification

For Level 1, Level 2, or parallel work, classify the primary and secondary frontend concerns with
[frontend-concern-routing.md](references/frontend-concern-routing.md). Level 1 reads the primary concern reference; Level 2 and parallel work read the
references required by the approved risk. A task may activate multiple concerns, but it must have one primary owner and explicit specialist review lanes
when needed. Skip this routing step for Level 0 unless its risk changes.

### Planner interaction loop

For Level 2 or parallel work, the Planner runs before implementation workers:

```text
inspect repository → ask one question → wait for answer
→ record answer and updated assumptions → ask the next blocking question
→ summarize scope and options → request explicit approval
→ write the approved task packet
→ update durable documents only when durable knowledge changes
→ create implementation waves
```

Do not ask questions whose answers cannot change the work. Do not dispatch an implementation worker while a blocking answer, shared contract, domain term, or
ownership decision is unresolved. If an answer changes after dispatch, pause dependent lanes, invalidate affected assumptions, and update the task packet before
resuming.

### 3. Update durable memory

Record only durable information:

- new or changed domain term → `docs/domain/ubiquitous-language.md`
- business invariant → `docs/domain/business-rules.md`
- current feature behavior → `docs/features/<feature-name>/`
- rationale and tradeoff → `docs/decisions/YYYY-MM-DD-<feature-name>.md`
- stable cross-feature rule → `docs/architecture/`

Level 0 work does not update `/docs` unless it explicitly changes durable documentation or a documented contract. For other levels, update only the canonical
source whose durable knowledge changed.

Do not create `docs/plans`. Keep execution details in the host's temporary task state. If unavailable, use a temporary `.work/<task-id>.md` file and remove it
after integration.

The Coordinator owns global `/docs` updates. Workers report documentation impact instead of silently changing shared memory.

### Document update timing

Update memory at the point it becomes durable:

```text
before implementation  record approved decisions and new contracts
during implementation  report discovered contradictions or new terms
after implementation   synchronize feature behavior, diagrams, and rules
```

If code and a durable document disagree, do not hide the mismatch. Resolve whether the code or the document is wrong, then update the appropriate source.

### 4. Decompose and dispatch

Read [parallel-work.md](references/parallel-work.md) before dispatching. Create the task packet, ownership map, and wave order before creating workers.
Use the concern routing reference to assign the required capabilities, references, and evidence to each lane.

Parallelize only independent work with:

- non-overlapping file ownership
- approved shared contracts
- written acceptance criteria for each lane
- no unresolved architecture or domain questions

If work touches the same file or shared contract, assign one owner and integrate sequentially.

Do not create a worker merely to increase parallelism. A single capable worker is better when coordination overhead exceeds the implementation work.

Route by capability, not fixed vendor or model names:

```text
quick     mechanical work
standard  normal implementation
deep      architecture or complex reasoning
visual    UI and visual verification
accessibility  semantic, keyboard, focus, and assistive-technology review
debugging  reproduction, evidence, root-cause analysis, and regression verification
review    independent review
research  unfamiliar APIs or constraints
performance  runtime measurement and performance QA
security  security and privacy review
compatibility  browser, device, and WebView compatibility QA
```

### 5. Implement and report

Workers must read assigned documents, stay within scope, reuse existing patterns, and report assumptions.

Each worker report includes:

```text
status
changed files
documentation impact
assumptions
verification commands and results
remaining concerns
```

The Coordinator reviews every report for:

- scope drift
- file collisions
- undocumented domain changes
- missing decision records
- Mermaid drift
- unsupported completion claims

Workers must stop and ask when an unknown affects user-visible behavior, domain meaning, shared contracts, architecture, or security. They may resolve local
implementation details consistently with existing conventions.

### 6. Verify by changed risk

Read [verification.md](references/verification.md). Do not force TDD or a new test for every frontend change.

Verification must cover the changed behavior, the changed risk, and plausible regressions in the changed behavior or affected contract. Run browser, visual,
keyboard, or accessibility checks when the changed surface affects that behavior. Check code and durable documentation together only when durable knowledge is
in scope; otherwise report the documentation impact as none.

Never claim completion from an agent report alone. Run and inspect the required checks.

For UI work, source inspection is not visual verification. Read [visual-verification.md](references/visual-verification.md) and use the available browser,
simulator, screenshot, or equivalent runtime check.

For data, routing, performance, security, responsive behavior, forms, internationalization, compatibility, observability, rendering, or bundling changes, run the
concern-specific checks in the matching reference. Do not substitute a typecheck or unit test for browser, runtime, measurement, or security evidence when
the risk requires it.

For bug investigation, read [debugging-agent.md](references/debugging-agent.md) and require reproduction, evidence, root-cause reasoning, and the regression
checks selected by [verification.md](references/verification.md) before completion.

### 7. Reconcile memory

Before completion:

- update affected feature documentation only when current user-visible behavior changed
- record durable decisions only when rationale or trade-offs changed
- update domain terms and business rules only when their meaning or invariant changed
- update stable architecture rules only when a cross-feature boundary changed
- update Mermaid only when a durable flow, state model, dependency, or ownership boundary changed
- confirm code and documents do not contradict each other
- remove or archive temporary task state
- confirm the task packet contains the questions, approval, ownership, and integration result for consequential work

If no durable knowledge changed, report `Documentation impact: none` and state why.

Use these runtime states:

```text
READY → IMPLEMENTING → REPORTED → VERIFIED → INTEGRATED
```

`REPORTED` means the worker claims completion. `VERIFIED` requires actual evidence. `INTEGRATED` requires final conflict resolution and project-level checks.

## Anti-patterns

Do not:

- ask approval for every color, spacing, or one-file mechanical change
- create `docs/plans` for temporary task decomposition
- let workers silently rewrite shared domain or architecture memory
- run parallel workers against the same file without an owner
- select a model by vendor name when a capability is enough
- require TDD for purely visual changes
- add tests for implementation details or coverage numbers
- declare visual success without opening the affected UI
- dispatch accessibility review for every mechanical change
- create workers before contracts, ownership, and wave order are approved
- treat a worker report as proof without independent verification
- treat passing an accessibility linter as proof that keyboard and focus behavior work
- guess a root cause from an error message without reproduction or evidence
- fix a symptom with broad fallbacks, type assertions, or unrelated refactoring
- leave temporary `debugger` statements or diagnostic logs in completed code
- treat a Mermaid diagram as a substitute for rules and rationale
- mark a worker report as verified without actual evidence

## Completion gate

Do not declare completion until:

- approved scope is implemented
- no consequential question is unresolved
- every durable document affected by changed knowledge is synchronized, or `Documentation impact: none` is reported
- Mermaid source matches current behavior when a durable flow, state model, dependency, or ownership boundary changed
- verification required by the changed risk passed
- visual and accessibility behavior was checked when the changed surface affects UI or interaction
- debugging changes include reproduction and root-cause evidence when debugging was part of the task
- remaining risks are explicitly reported
