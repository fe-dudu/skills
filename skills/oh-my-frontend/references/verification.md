# Risk-Based Verification

Verification must match changed behavior and risk. Do not force TDD or new tests for every frontend change.

## Verification matrix

| Change | Minimum verification | Tests |
| --- | --- | --- |
| Copy, style, simple markup | lint, typecheck, visual check when rendered output changes | no new test unless the change has a concrete behavior regression risk |
| Component interaction | lint, typecheck, focused user-flow check | interaction test when behavior is reusable or risky |
| Form or validation | typecheck, focused success and failure checks | focused interaction tests |
| Pure logic or domain rule | typecheck, focused unit checks, edge cases | focused test when the rule is externally observable |
| Bug fix | reproduce, fix, verify regression | regression test when deterministic |
| API or data flow | typecheck, request states, contract checks | integration test when boundary matters |
| Auth, permission, payment, security | broader integration and runtime checks | strong regression coverage |
| Critical user flow | browser or end-to-end flow | e2e or equivalent |

## Test scope

Cover:

1. acceptance criteria
2. changed risk
3. plausible regression in the changed behavior or affected contract

Avoid:

- implementation-detail assertions
- exhaustive snapshots
- duplicate tests for the same observable behavior
- tests for trivial wrappers
- mocks that test the mock setup instead of behavior
- tests added only to improve a coverage number

Choose the cheapest test or runtime boundary that can observe the changed behavior. Keep test implementation style, query choice, mocking, and accessibility
patterns in `frontend-engineering` and framework-specific skills.

## Completion evidence

For each required check:

1. identify the command or runtime flow
2. run it
3. inspect the result
4. compare it with acceptance criteria
5. report failures and limitations

An agent's statement that a test passed is not verification evidence without the actual result.

For deterministic time-dependent behavior, use fake timers or an equivalent controlled clock when the test framework supports it. For browser and async checks,
wait for an observable state or event; do not add arbitrary sleeps or extend timeouts to hide flakiness.

## Debugging evidence

For a bug fix, the report should distinguish:

```text
pre-fix reproduction → evidence → root cause → minimal fix → post-fix reproduction
```

Include the environment and trigger conditions, the focused check that failed, the focused check that passed, and any unverified browser, device, network, or
timing conditions. Use the debugging-agent reference when the failure involves reproduction, runtime evidence, lifecycle, state, async work, or toolchain
isolation.

Do not accept a passing typecheck, lint, or broad test suite as proof that an intermittent runtime bug is fixed. Add a focused regression check when the failure
is deterministic or can be bounded by an automated reproduction.
