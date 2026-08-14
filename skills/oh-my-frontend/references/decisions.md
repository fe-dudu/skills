# Decision Records

Use this reference when a choice has durable product, domain, architecture, security, data, or coordination consequences.

## File rule

Create one file per date and feature:

```text
docs/decisions/YYYY-MM-DD-<feature-name>.md
```

Append multiple decisions to that file. Do not create a decision record for every chat message, local variable, or reversible implementation detail.

## Required decision content

For a complete decision record example, see `example-decision.md` from the parent `SKILL.md` reference list.

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

Keep proposed decisions separate from accepted decisions. Workers may propose a decision, but only the Coordinator records it as accepted after the user
approval is captured in the decision record or task packet.

## Lifecycle

```text
question → options → user approval → accepted decision → implementation
```

Do not delete a superseded decision. Append a new decision that names the old one and explains the replacement. If code and a decision disagree, stop, identify
the source of truth, and update the appropriate record.
