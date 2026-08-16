# Internationalization and Localization

Use when UI text, locale, language, currency, date, time, timezone, translation, right-to-left layout, or locale-sensitive URL behavior changes.

## Contract

- supported locales, fallback locale, and locale detection source;
- translation key ownership, interpolation, pluralization, and missing-key behavior;
- date, time, number, currency, timezone, calendar, and sorting rules;
- locale in URLs, metadata, persistence, cache keys, and server requests;
- text expansion, line breaking, font coverage, RTL mirroring, and mixed direction;
- user preference changes and whether content reloads or preserves state.

Never concatenate translated fragments when grammar can change. Keep business terms consistent with the project's canonical domain terminology source when
one exists. If none exists, report the missing terminology source through `documentation.md`; do not assume a `docs/` path. Do not use flag icons as a
language selector without an accessible text label.

## Verification

Use a locale matrix with short and long text, missing translations, plural counts, dates near timezone boundaries, currency formats, RTL, keyboard navigation,
small viewports, and server/client locale consistency. Check that locale changes do not corrupt URLs, cache identity, form values, or analytics privacy.

Report supported-locale and formatting decisions and terminology impact.
