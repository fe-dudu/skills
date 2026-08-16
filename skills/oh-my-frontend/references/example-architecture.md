# Member invitation module boundary

<!-- Example only. Use this shape for a stable boundary shared by features or packages. Do not turn a one-off detail into architecture. -->

**Boundary:**
- `features/member-invitation` owns invitation user flows and feature state.
- `domain/invitations` owns invitation terms and invariants.
- `shared/ui` owns reusable presentation primitives only.
- `lib/api` owns transport; it does not decide invitation policy.

**Dependency direction:**
```mermaid
flowchart LR
  Page[Route page] --> Feature[Member invitation feature]
  Feature --> Domain[Invitation domain]
  Feature --> API[API transport]
  Feature --> UI[Shared UI]
  API --> Backend[Backend contract]
```

**Ownership:**
- The feature owner coordinates changes across UI, domain, and API adapters.
- The domain owner approves changes to invitation invariants.
- Shared UI changes have one owner and are integrated before dependent feature work.

**Integration rule:** Workers may implement inside this boundary. A worker must report a proposed boundary change instead of silently adding a cross-feature dependency.

**Related:**
- Feature: `<project-canonical-feature-source>`
- Domain: `<project-canonical-domain-source>`
- Decision: `<project-canonical-decision-source>`

<!-- Example paths are illustrative. Write the reason when the boundary is not self-evident. Update an existing Mermaid source only when a durable ownership or
dependency boundary changes and the diagram remains useful. -->
