# Parallel Work Protocol

Use parallel agents only when independent lanes can be integrated safely and the work is large enough to justify coordination. The host is responsible for creating, waiting on, and stopping workers.

## Main agent and host

The main agent performs planning, decisions, ownership, integration, and final verification in the current task. Do not create separate Coordinator, Planner, or architect workers.

The host may provide equivalent operations:

```text
dispatch(brief, isolation) → worker id
send(worker id, question or decision)
wait(worker ids) → status and report
cancel(worker id, reason)
```

If the host cannot create or isolate workers, run the work sequentially and report that parallel execution is unavailable. Never claim parallel work from a plan alone.

## Contents

- Main agent and host
- Parallelization gate
- Task packet
- Worker brief and lifecycle
- Handoffs, review, and report
- Integration

## Parallelization gate

All conditions must hold:

- shared API, types, domain terms, and architecture are resolved;
- each lane has independent acceptance criteria;
- files are disjoint or worktrees are isolated;
- no lane needs another lane's uncommitted output;
- integration order is clear;
- at least two lanes contain enough work to outweigh dispatch and integration cost.

Use one owner for shared types, route registries, API clients, manifests, global state, design tokens, and project documentation. Do not parallelize unresolved exploration, architecture, related failures, or tightly coupled state changes.

## Task packet

Create a packet only for two or more mutating lanes, or for long-running work or integration that must resume across turns. A one-owner or one-to-two-file task skips a packet unless the long-running or resume gate applies. Isolated worktrees are a safety mechanism, not a packet trigger.

```text
Task:
Goal and non-goals:
Approved contracts and decisions:
Ownership map:
Dependencies and integration order:
Acceptance criteria:
Verification commands and runtime checks:
```

The packet is temporary coordination state, not project memory. Promote only durable decisions, terms, rules, feature behavior, rationale, and stable boundaries. Remove or archive the packet after integration.

## Worker brief

Give each worker a bounded brief:

```text
Role and capability:
Goal and scope:
Allowed and prohibited files:
Approved contracts:
Dependencies:
Acceptance criteria:
Verification:
Report format:
```

Workers may resolve local implementation details using repository conventions. They report an unknown when it changes user-visible behavior, domain meaning, a shared contract, architecture, or security. They do not broaden scope to fix collisions.

## Worker lifecycle

Use this state machine only for delegated work:

```text
READY → IMPLEMENTING → REPORTED → VERIFIED → INTEGRATED
            ↘ BLOCKED
```

`REPORTED` is a claim. `VERIFIED` requires the main agent to inspect actual evidence. If a worker is `BLOCKED`, stop dependent lanes, report the blocker, and
resolve, reassign, or cancel it centrally. A shared-contract change invalidates stale reports before work resumes.

## Handoffs and review

The main agent handles planning, integration, and final review by default. Use a separate specialist only when the review needs independent judgment or a tool the implementer does not have. A matching concern row alone is not enough.

- Accessibility: review the affected route or component and report behavior, evidence, severity, and required fix. Dispatch only when independent review adds value.
- Debugging: investigate and report reproduction, evidence, hypotheses, root cause, and regression scope. Assign a fixer only after the root cause and owned files are clear.
- Performance or security: read-only review by default; require the evidence appropriate to the claim before assigning a fix.

Use isolated worktrees for mutating parallel work unless the host guarantees disjoint writes in one worktree.

Run a separate review worker after a worker only for consequential changes when independent judgment or a missing tool adds value. A small mechanical lane uses the main agent's final review. After integration, the main agent reviews the whole change; add a separate reviewer only when cross-lane conflicts or shared contracts require independent judgment.

## Report

Every worker returns:

```text
Status:
Changed files:
Summary:
Verification commands and results:
Documentation impact:
Assumptions:
Remaining concerns:
```

A report is a claim. The main agent must inspect the evidence before marking the result verified.

## Integration

1. Review ownership, contracts, and worker reports.
2. Integrate in dependency order using the host's merge or patch mechanism.
3. Resolve shared-file conflicts centrally.
4. Discard stale work when a shared contract changes.
5. Update only the canonical durable documents that changed.
6. Run project checks and runtime evidence required by the changed risk.
