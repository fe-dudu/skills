# Documentation Contract

Use this reference to choose the durable document type, source of truth, and update timing before changing `/docs`.

`/docs` is durable project memory. It is not a chat transcript, temporary plan, worker log, or test artifact.

## Contents

- Structure and task-based reading
- Feature documents
- Source of truth
- Update protocol

## Structure

```text
/docs
  /domain
    ubiquitous-language.md
    business-rules.md
  /features/<feature-name>
    overview.md
    user-flow.md
    state-model.md
  /decisions
    YYYY-MM-DD-<feature-name>.md
  /architecture
    module-boundaries.md
```

Do not create `docs/plans`. Add another document only when it holds durable knowledge that does not belong in an existing document.

## Read by task

| Task | Read |
| --- | --- |
| Copy, style, or isolated markup | affected feature document |
| New feature | feature, domain, decisions governing it, architecture governing the changed boundary |
| Domain logic | `domain.md` |
| State change | feature state model, `ui-state.md`, architecture governing state ownership |
| API or external integration | feature contract, domain rules, data-flow architecture |
| Shared module | `component-architecture.md`, architecture, affected features |
| Data fetching or async UI | feature state model, `data-fetching.md`, API/data-flow architecture |
| Route or navigation change | feature user flow, `routing-and-navigation.md`, route architecture |
| Performance or rendering change | `performance-and-runtime.md`, architecture, runtime evidence |
| Bundling or build configuration | `bundling-and-build.md`, `performance-and-runtime.md`, build evidence |
| Security or privacy change | `security-and-privacy.md`, domain rules, security evidence |
| Responsive or design-system change | `responsive-design-system.md`, component architecture, visual evidence |
| Form or multi-step interaction | `forms-and-interaction.md`, feature state model, accessibility |
| Locale or compatibility change | `internationalization.md` or `compatibility.md`, feature and platform boundary |
| Telemetry or production diagnostics | `observability.md`, architecture, privacy decision |
| Parallel work | `parallel-work.md`, then only the references required by each lane |
| Documentation change | this document and the target document |

If documents conflict, stop and report the conflict. Do not silently choose a definition.

## Feature documents

For a complete feature-document example with user flow and state diagrams, see `example-documentation.md` from the parent `SKILL.md` reference list.

Feature documentation describes current user-visible behavior, not temporary implementation steps. Use headings only for substantial sections that need
independent navigation. Keep short fields as bold labels to avoid unnecessary spacing and visual separators:

```md
# Feature name

**Purpose:** <why this feature exists>
**Scope:** <included behavior>
**Non-goals:** <explicit exclusions>

**User-visible behavior:**
- <observable behavior>

**Acceptance criteria:**
- <testable condition>

**User flow:**
<Mermaid flow when it reduces ambiguity>

**State model:**
<Mermaid state diagram when states or transitions matter>

**Related:** <domain, decisions, and architecture links>
```

Use Mermaid when it makes a flow, state transition, ownership boundary, or dependency easier to understand. Keep permissions, exceptions, invariants, and
rationale in Markdown; Mermaid is not the only source of business rules.

## Source of truth

Use one canonical location for each kind of knowledge:

| Knowledge | Canonical document |
| --- | --- |
| Meaning of a term | `docs/domain/ubiquitous-language.md` |
| Invariant or permission | `docs/domain/business-rules.md` |
| Current user-visible behavior | `docs/features/<feature-name>/` |
| Rationale and trade-off | `docs/decisions/YYYY-MM-DD-<feature-name>.md` |
| Stable cross-feature boundary | `docs/architecture/` |

Link to the canonical document instead of copying a rule into a feature, decision, or task report. Temporary implementation notes belong in the task packet and
must not become feature memory by accident.

## Update protocol

1. Identify the affected document type.
2. Read the existing document before writing.
3. Preserve canonical terms and existing links.
4. Update affected Mermaid source when behavior or structure changes.
5. Add links to features, decisions, and architecture affected by the change.
6. Report unresolved contradictions instead of hiding them.

Promote information only when it becomes durable:

```text
conversation insight → approved document or decision
worker assumption     → worker report unless durable
task detail           → temporary task packet
verification result   → evidence/report, not project memory
```

The Coordinator owns shared `/docs` updates. Workers report documentation impact and proposed changes; they do not silently rewrite shared memory.
