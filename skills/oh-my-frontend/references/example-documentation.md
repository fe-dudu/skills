# Member invitation

<!-- Example only. Replace terms, behavior, paths, and links with approved project knowledge and the project's existing documentation structure. The paths below are placeholders, not a default docs convention. -->

**Purpose:** Allow a Workspace Owner to invite a member by email.

**Scope:**
- Create an invitation for an email address.
- Show the invitation status to the Owner.
- Allow the recipient to accept an unexpired invitation.

**Non-goals:**
- Managing Workspace roles.
- Sending reminder emails.

**User-visible behavior:**
1. An Owner submits an email address.
2. The UI shows a pending invitation after the request succeeds.
3. The recipient accepts the invitation before it expires.
4. Expired or already accepted invitations cannot be accepted again.

**Acceptance criteria:**
- Only a Workspace Owner can send an invitation.
- A pending invitation shows its current status.
- An expired invitation cannot be accepted.
- A failed request exposes a recoverable error.

**User flow:**
```mermaid
flowchart TD
  Owner[Workspace Owner] --> Form[Invitation form]
  Form -->|submit| Create[Create invitation]
  Create -->|success| Pending[Pending invitation]
  Create -->|failure| Error[Recoverable error]
  Pending --> Accept[Recipient accepts]
  Pending --> Expired[Invitation expires]
```

**State model:**
```mermaid
stateDiagram-v2
  [*] --> Pending
  Pending --> Accepted: recipient accepts
  Pending --> Expired: expiry reached
  Accepted --> [*]
  Expired --> [*]
```

**Related:**
- Domain: `<project-canonical-domain-source>`
- Rules: `<project-canonical-rules-source>`
- Decision: `<project-canonical-decision-source>`
- Architecture: `<project-canonical-architecture-source>`

<!-- Keep current behavior and acceptance criteria here. Put durable rules in the domain document, rationale in a decision record, and temporary execution details in the task packet. -->
