# Architecture Rules

Use this reference for stable boundaries shared by multiple features or packages. Do not create architecture documentation for a one-off detail.

## What belongs here

Use the optional architecture example from `SKILL.md` only when creating or reviewing a complete boundary document.

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

Report the reason and affected boundary when a rule is not self-evident.

## Architecture change gate

For a new or changed shared boundary:

1. inspect current imports, runtime ownership, and project conventions;
2. identify affected features and agents;
3. compare viable options and their integration cost;
4. report the decision and approval status;
5. report documentation impact and whether an existing Mermaid diagram is stale and remains useful;
6. implement sequentially when the shared contract is still changing.

Do not let parallel workers independently redefine a shared boundary. Workers may implement within an approved boundary and report a proposed change.

This reference does not prescribe Feature-Sliced Design, layered architecture, DDD, or another framework. If the project has a preferred architecture, record
its stable boundaries and dependency direction in the project's existing canonical documentation location. If no such location exists, report the gap through
`documentation.md`; do not invent a new architecture for one feature.

## Diagrams

Use Mermaid for module relationships, data flow, or ownership only when the diagram reduces ambiguity. Keep the source in the repository and update an existing
diagram only when a durable relationship or ownership boundary changed. A screenshot is evidence, not the architecture source.
