# Decision Records

Use this reference when a choice has durable product, domain, architecture, security, data, or coordination consequences.

## File rule

Use the project's existing canonical decision-record location. If no durable documentation structure exists and the user approves the recommended structure,
use one file per date and feature:

```text
docs/decisions/YYYY-MM-DD-<feature-name>.md
```

Append multiple decisions to that file. Do not create a decision record for every chat message, local variable, or reversible implementation detail.

## Required decision content

Use the optional decision example from `SKILL.md` only when creating or reviewing a complete decision record.

```md
# <Feature> Decisions — YYYY-MM-DD

## DEC-001: <short decision title>

- Status: proposed | accepted | superseded
- Decision: <what was chosen>
- Reason: <why it fits the product and constraints>
- Alternatives: <options considered and rejected>
- Impact: <code, data, UX, ownership, or verification impact>
- Related: <feature, domain, or architecture links>
- Approval: <approver, date/time, and approved scope>
```

Ask the user before recording an accepted decision when the choice changes scope, user-visible behavior, shared contracts, domain meaning, architecture,
security, or parallel ownership.

Keep proposed decisions separate from accepted decisions. Workers may propose a decision, but only the main agent records it as accepted after the user
approval is captured in the decision record or task packet.

## Lifecycle

```text
question → options → user approval → accepted decision → implementation
```

Do not delete a superseded decision. Append a new decision that names the old one and explains the replacement. If code and a decision disagree, stop, identify
the source of truth, and update the appropriate record.
