# Architecture Rules

Use this reference for stable boundaries shared by multiple features or packages. Do not create architecture documentation for a one-off detail.

## What belongs here

For a complete boundary document with ownership and Mermaid, see `example-architecture.md` from the parent `SKILL.md` reference list.

- module and package boundaries
- dependency direction
- state ownership boundaries
- API and data-flow boundaries
- rendering or platform boundaries
- shared component and design-system contracts
- rules that affect parallel ownership or integration

## Example boundary rules

```md
- Features do not import another feature's internals.
- Shared modules do not import features.
- UI components do not own domain rules.
- Server state is not copied into global state without an explicit reason.
- A shared contract has one owner during a change.
```

Write the reason and affected boundary when a rule is not self-evident. Link the rule from affected feature documents and decisions.

## Architecture change gate

For a new or changed shared boundary:

1. inspect current imports, runtime ownership, and project conventions;
2. identify affected features and agents;
3. compare viable options and their integration cost;
4. record the approved decision;
5. update the architecture document and affected Mermaid diagrams;
6. implement sequentially when the shared contract is still changing.

Do not let parallel workers independently redefine a shared boundary. Workers may implement within an approved boundary and report a proposed change.

This reference does not prescribe Feature-Sliced Design, layered architecture, DDD, or another framework. If the project has a preferred architecture, record
its stable boundaries and dependency direction in `/docs/architecture/`; do not invent a new architecture for one feature.

## Diagrams

Use Mermaid for module relationships, data flow, or ownership when the diagram reduces ambiguity. Keep the source in the repository and update it with the
architecture rule. A screenshot is evidence, not the architecture source.
