# Domain Language and Business Rules

Use this reference when a change introduces or changes terms, invariants, permissions, limits, statuses, or domain behavior.

## Ubiquitous language

For a combined glossary and business-rule example, see `example-domain.md` from the parent `SKILL.md` reference list.

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
4. Update the glossary before or with the implementation.

Do not use synonyms to hide a domain distinction. Do not rename a canonical term only to match a local preference.

## Business rules

Record durable invariants, permissions, limits, and state rules.

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

Document exceptions, permissions, and state transitions in Markdown. Use a Mermaid state diagram when the transitions are numerous or easy to misread.

## Change protocol

- A changed term requires a glossary review and affected code search.
- A changed invariant requires a decision review and focused verification.
- A newly discovered contradiction blocks parallel implementation until the Coordinator resolves it.
- Workers report proposed domain changes; the Coordinator updates shared domain memory.
