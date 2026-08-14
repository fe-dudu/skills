<!-- Example only. Use this for a durable choice with product, domain, architecture, security, data, or coordination impact. Replace the approval with the real approval. -->

# Member invitation decisions — 2026-08-14

**DEC-001 — Keep invitation status server-authoritative**

- Status: accepted
- Decision: The server owns invitation status. The client may display a cached status but must revalidate before acceptance.
- Reason: Expiration and one-time acceptance must remain consistent across browsers and sessions.
- Alternatives: Client-only timers were rejected because clock drift and multiple sessions can produce incorrect acceptance behavior.
- Impact: The acceptance API validates status; the UI models pending, accepted, expired, and error states; verification covers replay and expiry cases.
- Related: `docs/features/member-invitation/`, `docs/domain/business-rules.md`, `docs/architecture/module-boundaries.md`
- Approval: Product owner, 2026-08-14, member invitation scope
<!-- Record the question, options, and approval before implementation when the decision changes shared scope or behavior. Do not create a decision record for a reversible local implementation detail. Supersede an old decision with a new record; do not delete history. -->
