---
name: oh-my-frontend
description: >
  Frontend triage and orchestration for implementation, review, refactoring,
  testing, debugging, UI, architecture, documentation, risk classification,
  project memory, consequential approval, safe parallel work, and runtime or
  specialist evidence. Use when working on frontend implementation, review,
  refactoring, testing, debugging, UI, architecture, or documentation. Classify
  mechanical work as Level 0 and exit without planning overhead. Use
  frontend-engineering for TypeScript and React implementation rules.
---

# Oh My Frontend

Use this as a lightweight coordinator for frontend work. Start by classifying the change. Add questions, project-memory work, workers, and specialist review only when the changed risk requires them.

Use `frontend-engineering` and framework-specific skills for TypeScript, React, styling, refactoring, and test implementation details.

## Trigger policy

Use this skill for frontend implementation, review, refactoring, testing, debugging, UI, architecture, or documentation tasks. Use it when the user names it as well. Every frontend task may enter for triage; invocation does not imply orchestration.

For an isolated mechanical TypeScript, React, styling, refactoring, or test implementation with no behavior or contract change, use `frontend-engineering` and the relevant framework skill for implementation. If this skill is invoked, classify it as Level 0 and do not add workflow overhead. Otherwise, classify the task normally.

## Progressive disclosure

Load only the reference needed for the current risk:

- `documentation.md`: durable memory, canonical sources, or a missing documentation convention.
- `frontend-concern-routing.md`: choose one primary concern for Bounded, Consequential, or Parallel work.
- The routed concern reference: define the relevant contract and evidence.
- `parallel-work.md`: before creating workers, packets, handoffs, or reviews.
- `verification.md`: select proportional checks for Bounded, Consequential, or Parallel work; add `visual-verification.md` only for browser or visual evidence.
- `accessibility.md`: when the changed risk includes accessibility semantics, keyboard, focus, or announcements; create a specialist only when independent review adds value.
- `debugging-agent.md`: when diagnosing a bug, regression, failed check, intermittent behavior, or runtime/toolchain failure; reading it does not create a worker.

The links below are navigation only; do not preload every file. Use the routing table to select one primary concern, then open only that reference.

- Primary concern references: [accessibility.md](references/accessibility.md), [architecture.md](references/architecture.md), [bundling-and-build.md](references/bundling-and-build.md), [compatibility.md](references/compatibility.md), [component-architecture.md](references/component-architecture.md), [data-fetching.md](references/data-fetching.md), [debugging-agent.md](references/debugging-agent.md), [domain.md](references/domain.md), [forms-and-interaction.md](references/forms-and-interaction.md), [internationalization.md](references/internationalization.md), [observability.md](references/observability.md), [performance-and-runtime.md](references/performance-and-runtime.md), [platform-boundaries.md](references/platform-boundaries.md), [responsive-design-system.md](references/responsive-design-system.md), [routing-and-navigation.md](references/routing-and-navigation.md), [security-and-privacy.md](references/security-and-privacy.md), [ui-state.md](references/ui-state.md).
- Workflow and memory references: [documentation.md](references/documentation.md), [decisions.md](references/decisions.md), [frontend-concern-routing.md](references/frontend-concern-routing.md), [parallel-work.md](references/parallel-work.md), [verification.md](references/verification.md), [visual-verification.md](references/visual-verification.md).
- Optional examples: [example-architecture.md](references/example-architecture.md), [example-decision.md](references/example-decision.md), [example-documentation.md](references/example-documentation.md), [example-domain.md](references/example-domain.md). Read an example only when creating or reviewing that document type.

Do not load every reference or the Korean mirror for every task. Keep implementation details in `frontend-engineering` and framework-specific skills.

## Invocation contract

For every frontend task that reaches this skill:

1. Classify the change.
2. Choose the smallest required memory, coordination, and verification scope.
3. Stop the orchestration path when the task is direct or bounded and no consequential choice is unresolved.

Do not create an interview, task packet, worker, or durable document for a clear mechanical change. If the user explicitly names an existing durable document to edit and no behavior or contract changes, read only that target and `documentation.md`; treat it as Direct without discovering the whole tree. This skill may still report `Level 0` so the user can see why the heavier workflow was skipped.

## Change levels

| Level | Use when | Default path |
| --- | --- | --- |
| Level 0 (Direct) | Copy, spacing, color, non-semantic isolated markup, simple rename, or an explicitly named existing-document edit with no behavior, semantic, accessibility, or contract change | Inspect the target, make the change, run proportional checks |
| Bounded | Local state, form behavior, component API, loading/error state, or one existing feature pattern | Read affected code and one primary concern reference; ask only blocking questions; run focused checks |
| Consequential | Domain rule, permission, API contract, shared module, architecture boundary, security, payment, or an irreversible choice | Inspect relevant memory, batch blocking questions, summarize options, obtain approval, then implement |
| Parallel | Two or more independent lanes have enough work to outweigh dispatch and integration cost | Resolve shared contracts, assign ownership, dispatch, verify, and integrate; create a packet only when the packet gate requires it |

A new feature is not automatically consequential. Use the existing pattern when it resolves the scope, contract, and ownership. Escalate only when the result changes a shared boundary, durable rule, user-visible choice, or high-risk operation.

## Project memory

Use the repository's existing documentation structure and canonical sources. Read only the documents needed by the changed risk. Do not search `/docs` for Direct code work. For an explicitly named existing-document edit, read only that target and `documentation.md`.

If canonical sources conflict, stop the implementation path and surface the conflict before choosing a definition or dispatching dependent work.

If the repository has no durable documentation and the changed risk would benefit from it:

1. Tell the user that no project-memory structure was found.
2. Recommend the smallest structure that fits the task:

   ```text
   docs/
     domain/ubiquitous-language.md
     domain/business-rules.md
     features/<feature>.md
     decisions/YYYY-MM-DD-<feature>.md
     architecture/<boundary>.md
   ```

3. Ask whether to add it, or continue without it when the user has already chosen that scope.
4. Do not create the structure by implication.

Read [documentation.md](references/documentation.md) when durable documentation is in scope or when the repository has no clear documentation convention. Promote only durable terms, rules, feature behavior, rationale, and stable boundaries. Keep task details and verification output in task state or reports.

## Questions and decisions

Ask only questions whose answers can change the result. Batch up to three related blocking questions in one message. Use the existing project convention as an assumption when it resolves the choice and report that assumption.

Approval is required only for a consequential user-visible choice, domain or permission rule, shared contract, architecture boundary, security/payment decision, or ownership choice that changes a shared boundary or user-visible result. The main agent may assign ownership within disjoint lanes. Record the accepted decision only when it is durable.

## Concern routing

For Bounded, Consequential, or Parallel work, choose one primary concern and read its reference. Read a secondary concern only when it changes acceptance criteria or evidence. A concern match alone does not justify a specialist worker. Debugging is a reference-loading mode, not a worker-creation rule.

Use [frontend-concern-routing.md](references/frontend-concern-routing.md) to choose the primary concern and evidence. Keep implementation guidance in `frontend-engineering` and framework-specific skills.

## Parallel work

Read [parallel-work.md](references/parallel-work.md) before dispatching workers. Parallelize only when all are true:

- shared types, domain terms, and architecture are resolved;
- lanes have independent acceptance criteria;
- files are disjoint or worktrees are isolated;
- no lane depends on another lane's uncommitted output;
- at least two lanes contain enough work to outweigh coordination cost.

The main agent performs planning, decisions, ownership, integration, and final verification in the current task. Do not create separate Coordinator, Planner, or architect workers. Create a task packet only for two or more mutating lanes, or for long-running work or integration that must resume across turns. A one-owner or one-to-two-file task skips a packet unless the long-running or resume gate applies. Isolated worktrees are a safety mechanism, not a packet trigger.

Use [parallel-work.md](references/parallel-work.md) for the minimal worker brief, handoff, and report. Keep work with the main agent when one owner is cheaper and clearer; use one worker only when delegation provides concrete value. A worker report is a claim, not verification evidence.

## Verification

For Bounded, Consequential, or Parallel work, read [verification.md](references/verification.md) and collect evidence proportional to the changed risk. For Level 0, run proportional project checks directly and load the reference only when the required evidence is unclear. Use browser, visual, keyboard, accessibility, performance, security, compatibility, or build evidence when the changed surface requires it. Do not treat a typecheck, lint result, or worker report as proof of unrelated runtime behavior.

For UI work that requires browser or visual evidence, source inspection is not visual verification. Use the available browser, simulator, screenshot, or equivalent runtime check selected by the changed risk. For debugging, reproduce when possible, separate evidence from inference, and preserve the original failure and nearest regression check.

## Reconcile and finish

Update only the canonical document whose durable knowledge changed. Report `Documentation impact: none` when no durable knowledge changed. Update an existing Mermaid diagram only when a durable flow, state model, dependency, or ownership boundary changed and the diagram remains useful. Create a new diagram only when the user explicitly requests durable documentation or an approved durable document requires a new model. Never create one for a small local change.

For delegated work, use `READY → IMPLEMENTING → REPORTED → VERIFIED → INTEGRATED`. Direct and Bounded work do not need this worker state machine.

Finish only when the approved scope is implemented, required evidence was inspected, affected durable memory is synchronized, and remaining limitations are reported.

## Core anti-patterns

- Do not ask approval for every mechanical change.
- Do not create project documentation or `docs/plans` for temporary task details.
- Do not dispatch workers before shared contracts and ownership are clear.
- Do not create a specialist worker merely because a routing row matches.
- Do not claim parallel execution or completion from a plan or worker report alone.
