# Performance and Runtime

Use for slow UI, bundle growth, render cost, hydration, server rendering, streaming, image or font loading, layout shift, or a change with a performance
budget. Do not claim improvement without a before-and-after measurement.

## Runtime decision

Make the rendering boundary explicit for the affected feature:

```text
CSR | SSR | SSG | streaming | server component | client component | native view
```

Follow the framework's current contract. Document why a component or data path runs on the server or client, what must be serialized, and what users see while
the boundary resolves. Do not introduce a rendering strategy only for theoretical optimization.

## Review dimensions

- initial response and critical rendering path;
- JavaScript size, code splitting, dependency cost, and long tasks;
- render frequency, expensive computation, and interaction latency;
- image dimensions, format, priority, lazy loading, and font behavior;
- hydration cost, server/client boundary, streaming, and fallback layout;
- caching, revalidation, CDN behavior, and invalidation;
- layout stability and responsive behavior at project-supported viewports covering each changed responsive branch.

Define a small budget or target before optimizing. Prefer the smallest change that improves the measured bottleneck without obscuring the code.

## Evidence

Collect only evidence required by the changed risk:

- production or project-supported browser measurements covering the changed runtime branch;
- profiler, trace, bundle report, network waterfall, or Web Vitals result;
- before/after value, environment, route, viewport, and test conditions;
- visual check for fallback, loading, hydration, and layout shift.

Record stable rendering boundaries and budgets in architecture or feature documentation. Record a trade-off when performance changes caching, consistency,
component ownership, or platform behavior.
