# Forms and Validation

- Choose the validation boundary based on what must be validated and submitted together; do not centralize every field rule by default.
- Use field-level validation when a field has independent rules, needs reuse across forms, or owns asynchronous validation such as availability checks.
- Use form-level validation when fields form one business operation, depend on one another, or are part of a multi-step flow such as a wizard.
- Keep cross-field rules in the nearest form or field-group component that owns all related fields. Do not duplicate the same rule in unrelated field components and the form schema.
- Keep expected validation failures in the form flow. Render accessible field or form messages; reserve exceptions for broken contracts or unexpected failures.

Choose by change boundary:

| Situation | Prefer |
| --- | --- |
| Reusable field with independent or async rules | Field-level validation |
| Password confirmation, totals, or cross-field constraints | Form-level validation |
| One payment, shipping, or signup submission | Form-level validation |
| Shared input used in unrelated forms with the same meaning | Field-level validation |

The library is secondary to deciding which component or form owns the rule. `react-hook-form`, Zod, or another tool can implement either boundary; do not introduce a library only to move a small local rule away from its owner.
