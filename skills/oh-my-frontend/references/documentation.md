# Documentation Contract

Use this reference when durable project memory is in scope or when the repository has no clear documentation convention. Adopt the repository's existing structure before suggesting a new one.

## Existing documentation

Find the repository's documentation index or canonical source only for Bounded work that already names a contract, and for Consequential or Parallel work. Do not search `/docs` for Direct work. Do not create a documentation tree by implication.

If no durable documentation exists and the change would benefit from it:

1. Tell the user that no project-memory structure was found.
2. Recommend this minimal structure, adapted to the repository's naming:

   ```text
   docs/
     domain/ubiquitous-language.md
     domain/business-rules.md
     features/<feature>.md
     decisions/YYYY-MM-DD-<feature>.md
     architecture/<boundary>.md
   ```

3. Ask whether to add it before creating files, unless the user explicitly requested the documentation.
4. Create only the documents needed by the durable knowledge that changed.

## Canonical knowledge

Use one source for each durable fact:

| Knowledge | Typical source |
| --- | --- |
| Term meaning or business invariant | Domain or business-rules document |
| Current user-visible behavior | Feature document |
| Rationale and trade-off | Dated decision record |
| Stable cross-feature boundary | Architecture document |

These are categories, not mandatory paths. Link to the canonical source instead of copying rules into every document.

## Feature documents

Describe current user-visible behavior, scope, non-goals, acceptance criteria, and related canonical sources. Use the optional documentation example from `SKILL.md` only when creating or reviewing a complete feature document. Update an existing flow or state diagram only when a durable model changed and the diagram remains useful. Create a new diagram only when the user explicitly requests durable documentation or the approved document requires a new model. Start with one feature document; split it only when the sections have independent ownership or navigation value.

## Update protocol

1. Read the existing canonical document before changing it.
2. Preserve project terminology and links.
3. Promote only durable terms, rules, behavior, rationale, or boundaries.
4. Update an existing Mermaid diagram only when a durable flow, state model, dependency, or ownership boundary changed and the diagram remains useful.
5. If canonical documents conflict, stop the implementation path and surface the conflict to the main agent or user; never choose a source silently.

Task details, worker assumptions, temporary plans, command output, and verification results belong in task state or reports. The main agent owns shared documentation updates; workers report proposed impact.
