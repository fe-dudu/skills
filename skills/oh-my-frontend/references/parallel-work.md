# Parallel Work Protocol

Use parallel agents only when independent lanes can be integrated safely. The skill defines the protocol; the host is responsible for creating, waiting on, and
stopping workers.

## Contents

- Coordinator and host adapter
- Parallelization gate
- Task packet and worker brief
- Waves, roles, and capability routing
- Special handoffs
- Status, failure, replanning, and integration

## Coordinator

The Coordinator reads project memory, asks blocking questions, obtains approval, records durable decisions, creates the task packet, assigns ownership,
dispatches workers, reviews reports, integrates changes, and runs final checks.

Do not create a separate documentation agent by default. Shared memory needs one accountable owner.

## Host adapter contract

This reference defines coordination rules; it does not create processes or threads by itself. The host must provide equivalent operations for:

```text
dispatch(brief, isolation) → worker id
send(worker id, question or decision)
wait(worker ids) → status and report
cancel(worker id, reason)
```

If the host cannot create or isolate workers, run the lanes sequentially and tell the user that parallel execution is unavailable. Never claim parallel work
from a written plan alone.

For each worker, build a self-contained brief from the approved task packet. Do not pass the full conversation history as a substitute for scope, contracts,
ownership, or acceptance criteria. Dispatch all ready independent lanes in the same scheduling turn, then wait for their reports; do not serialize independent
dispatches merely because the host exposes one worker call at a time.

## Parallelization gate

Parallel work is allowed only when all are true:

- shared API, types, domain terms, and architecture are approved;
- each lane has independent acceptance criteria;
- each lane has non-overlapping files or an isolated worktree;
- no lane requires another lane's uncommitted output;
- dependencies and integration order are explicit;
- at least two independent lanes each contain enough work to outweigh dispatch and integration overhead.

Use one owner and sequential work for shared types, route registries, API clients, package manifests or lockfiles, global state, design tokens, and `/docs`. Do
not parallelize unresolved exploration, architecture, related failures, or tightly coupled state changes.

## Task packet

Create temporary coordination state at `.work/<task-id>/task-packet.md` when the host has no equivalent state. Remove or archive it after integration.

```text
Task:
Base commit or worktree:
Goal and non-goals:
Questions and answers:
Approval status and evidence:
Approved contracts:
Documents to read:
Ownership map:
Dependency graph and wave order:
Required capabilities and skills per lane:
Acceptance criteria:
Verification commands and runtime checks:
Frontend concerns and required evidence:
Integration order:
```

The packet is not project memory. Promote only durable decisions, terms, rules, feature behavior, and architecture to `/docs`.

The approval record must identify the approved scope, accepted decisions, alternatives that were discussed and rejected, approver, and approval time. If the user changes
an approved answer, mark affected lanes stale before resuming them.

## Worker brief

Give every worker a complete bounded brief:

```text
Role:
Capability:
Required skills and references:
Goal:
Scope:
Allowed files or worktree:
Prohibited files:
Documents to read:
Approved decisions and contracts:
Dependencies:
Acceptance criteria:
Verification command:
Concern-specific checklist and evidence:
Report format:
```

Workers stay inside scope, reuse existing patterns, record assumptions, and stop when an unknown changes user-visible behavior, domain meaning, shared
contracts, architecture, or security.

A worker may start only when its brief is `READY`, its allowed files are unambiguous, and its dependencies are satisfied. It returns a report even when blocked
or when it made no code changes. A worker must not broaden its scope to fix a collision; it reports the collision to the Coordinator.

## Waves and roles

Use a small dependency graph rather than a fixed team size:

```text
Wave 0: planner → interview, contract, ownership, approval
Wave 1: independent implementers or researchers
Wave 2: visual, accessibility, performance, security, compatibility, reviewer, or verifier
Wave 3: Coordinator → integrate, reconcile docs, final verification
```

Roles:

```text
planner       clarify intent and decompose
architect     define approved boundaries, contracts, and dependency edges
implementer   change assigned code
visual        inspect browser and visual behavior
accessibility inspect semantics and interaction behavior
debugger      investigate reproduction, evidence, and root cause
reviewer      independently inspect requirements and code
verifier      run checks and collect evidence
researcher    investigate unfamiliar APIs or constraints
performance   measure runtime cost and validate before/after evidence
bundling      inspect build graph, output, HMR, source maps, chunks, and tree-shaking evidence
security      inspect security, privacy, and trust boundaries
compatibility inspect browser, device, and WebView capability differences
```

One worker may combine roles for a task limited to one or two files with no unresolved shared contract and no required independent specialist review. Separate
reviewer roles from implementers for consequential changes.

## Capability routing

Request capabilities, not vendor or model names. The host may map them to any available model or runtime.

```text
quick          mechanical edits
standard       normal implementation
deep           architecture and complex reasoning
visual         UI and visual QA
accessibility  accessibility semantics and interaction QA
debugging      reproduction, runtime evidence, root cause, regression QA
review         independent correctness review
research       unfamiliar technology or external constraints
performance    runtime measurement and performance QA
bundling       build graph, output, HMR, source-map, and chunk analysis
security       security and privacy review
compatibility  browser, device, and WebView compatibility QA
```

Recommended skill selection is role-based:

Load 2–5 relevant skills or references by default. Add another only when a concrete concern, framework boundary, or verification risk requires it. Do not
preload the entire catalog; every worker should receive only the guidance needed for its lane.

```text
coordinator     oh-my-frontend
implementer    frontend-engineering + framework-specific skill when available
visual         visual-verification + browser/simulator capability
accessibility  accessibility + visual-verification
debugger       debugging-agent + verification
reviewer       verification + architecture/component references governing the changed boundary
performance    performance-and-runtime + visual-verification + framework tooling when available
bundling       bundling-and-build + performance-and-runtime + debugging when the build failure is unresolved
security       security-and-privacy + frontend-engineering security references
compatibility  compatibility + visual-verification
```

## Special handoffs

An accessibility worker is read-only by default. Give it the affected route, viewport/device, and report format. Dispatch it after the interaction contract is
approved and before implementation changes based on its findings.

A debugger starts as a read-only investigator with no implementation ownership. Assign a fixer only after root cause and owned files are explicit. Do not run an
investigator and implementer against the same changing files without a defined handoff point.

A performance worker is read-only by default until the bottleneck, measurement method, and owned files are agreed. Require before/after evidence; do not accept
optimization claims based only on code inspection.

A security worker is read-only by default. It reviews trust boundaries, abuse cases, privacy, and negative paths. The Coordinator decides whether a finding needs a
fixer, user approval, or escalation.

For mutating parallel workers, prefer isolated worktrees based on the packet's base commit. If the host guarantees disjoint writes in one worktree, record that
guarantee; otherwise do not share the worktree.

## Review gates

After each consequential mutating worker reports, run a scoped review for specification compliance and code quality before integrating its result. The review
checks the lane's acceptance criteria, owned files, approved contracts, and required evidence. A purely mechanical change may skip a separate reviewer when
its risk and scope are explicit. After all lanes are integrated, run one whole-change review for cross-lane conflicts, requirement coverage, and documentation
drift.

## Status, failure, and replanning

```text
READY → IMPLEMENTING → REPORTED → VERIFIED → INTEGRATED
              ↘ BLOCKED
```

`REPORTED` is a claim. `VERIFIED` requires actual evidence. `INTEGRATED` requires conflict resolution and project-level checks.

When a worker is blocked or fails:

1. keep independent lanes running;
2. pause dependent lanes;
3. record the blocker and affected edges in the task packet;
4. ask the Coordinator for a decision or reassign the lane;
5. invalidate stale results if a shared contract changes;
6. cancel lanes whose contract or ownership is no longer valid;
7. update ownership and wave order before resuming.

## Reports and integration

Every worker reports:

```text
Status:
Changed files:
Summary:
Documentation impact:
Verification commands:
Verification results:
Assumptions:
Remaining concerns:
```

Integration order:

1. review reports and ownership boundaries;
2. verify each result is based on the packet's base commit and approved contract;
3. integrate in dependency order using the host's merge or patch mechanism;
4. resolve shared-file conflicts by the Coordinator;
5. reconcile changed contracts and discard stale work;
6. update feature, domain, decision, architecture, and Mermaid sources;
7. run project-level typecheck, lint, tests, build, browser, visual, and accessibility checks that match the changed risk;
8. close the task only after evidence supports every acceptance criterion.
