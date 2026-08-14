# Forms and Interaction

Use for forms, search, filters, wizards, drafts, autosave, validation, submission, destructive actions, or multi-step user interaction.

## Interaction contract

Define:

- field, section, and form ownership;
- initial, dirty, touched, validating, submitting, success, and failure states;
- client validation versus server validation and the source of truth;
- draft, autosave, reset, cancellation, and unsaved-change behavior;
- duplicate submission, idempotency, retry, and partial success behavior;
- error placement, summary, focus movement, announcement, and recovery action.

Do not use disabled controls as the only explanation for why an action is unavailable. Preserve user input when recovery is safe. Keep business rules in domain
documents, not only in validation code.

## Verification

Check keyboard-only completion, labels, focus order, error association, correction, submit with Enter, cancellation, refresh, back navigation, slow network,
server rejection, duplicate click, expired session, and partial failure. Add focused tests only for new or regression-prone validation and state transitions; do
not generate tests for every visual arrangement.

Record durable form rules and user-visible behavior in the feature document. Record API or validation ownership decisions when client and server rules differ.
