# Domain Language and Business Rules

Use this reference when a change introduces or changes terms, invariants, permissions, limits, statuses, or domain behavior.

## Ubiquitous language

Use the optional domain example from `SKILL.md` only when creating or reviewing a combined glossary and business-rule document.

Use one approved term in code and product language. Apply it to variables, types, functions, events, API fields, routes, and UI labels.

```md
| Term | Meaning | Code name | Avoid |
| --- | --- | --- | --- |
| Workspace | A logical space managed by members | `Workspace` | `Project` |
| Owner | A member with management rights | `Owner` | `Admin` when meaning differs |
```

Before adding a term:

1. Search the existing glossary and feature documents.
2. Check whether an existing term already has the intended meaning.
3. Ask for approval when the new term changes a shared contract or conflicts with an existing term.
4. Report glossary impact before or with the implementation.

Do not use synonyms to hide a domain distinction. Do not rename a canonical term only to match a local preference.

## Business rules

Report durable invariants, permissions, limits, and state rules.

```md
- Only a Workspace Owner can invite a member.
- An invitation expires after seven days.
- An expired invitation cannot be accepted.
```

A rule is durable when violating it would make the product incorrect, unsafe, or inconsistent across screens or services. Keep temporary UI decisions in the
task packet instead.

For each rule, make its scope and enforcement boundary clear:

```text
Rule: An invitation expires after seven days.
Scope: pending invitations.
Enforced at: acceptance API and invitation status presentation.
Visible result: expired invitations cannot be accepted.
```

Report exceptions, permissions, and state transitions in Markdown. Report whether an existing Mermaid state diagram is needed when numerous transitions are easy
to misread. A new diagram is created only when the user explicitly requests durable
documentation or the approved document requires a new model. Do not create one for a local UI detail.

## Change protocol

- A changed term requires a glossary review and affected code search.
- A changed invariant requires a decision review and focused verification.
- A newly discovered contradiction blocks parallel implementation until the main agent resolves it.
- Workers report proposed domain changes; resolve shared domain memory centrally before integration.
