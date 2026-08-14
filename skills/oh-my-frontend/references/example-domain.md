# Invitation domain

<!-- Example only. Use one canonical term and state each durable rule with its scope and enforcement boundary. -->

**Ubiquitous language:**

| Term | Meaning | Code name | Avoid |
| --- | --- | --- | --- |
| Workspace | A logical space managed by members | `Workspace` | `Project` |
| Owner | A member with Workspace management rights | `Owner` | `Admin` when the meaning differs |
| Invitation | A time-limited request for a person to join a Workspace | `Invitation` | `Invite` when referring to the domain object |

**Business rules:**

**INV-001 — Only an Owner can invite a member**

- Scope: invitations for a Workspace.
- Enforced at: invitation API authorization and UI action visibility.
- Visible result: a non-Owner cannot send an invitation.
- Exception: none.

**INV-002 — An invitation expires after seven days**

- Scope: pending invitations.
- Enforced at: acceptance API and invitation status presentation.
- Visible result: an expired invitation cannot be accepted.
- Exception: an accepted invitation keeps its accepted history.
<!-- Before adding Invitation, search the glossary, feature documents, code, and API fields. If the term conflicts with an existing contract, stop and request a decision. Use the same approved term in variables, types, events, routes, labels, and reports. -->
