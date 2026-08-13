# Frontend Engineering Skills

[![skills.sh](https://skills.sh/b/fe-dudu/skills)](https://skills.sh/fe-dudu/skills)
[![Claude Code Marketplace](https://img.shields.io/badge/Claude%20Code-Marketplace-8A63D2)](./.claude-plugin/marketplace.json)

Readable, explicit frontend engineering guidance for TypeScript and React, packaged as public [Agent Skills](https://agentskills.io/specification). Each skill is an independent directory with a `SKILL.md`; detailed guidance is split into references and loaded only when relevant.

## Installation

### As a Claude Code plugin

This repository includes a Claude Code marketplace catalog at `.claude-plugin/marketplace.json`.

```text
/plugin marketplace add fe-dudu/skills
/plugin install frontend-engineering@fe-dudu
/reload-plugins
```

Update the marketplace catalog later with:

```text
/plugin marketplace update fe-dudu
```

Validate the marketplace catalog locally before publishing:

```bash
claude plugin validate .
claude plugin marketplace add .
claude plugin install frontend-engineering@fe-dudu
```

### Via the `skills` CLI

The official command is `npx skills add` with plural `skills`.

Install every skill in this repository:

```bash
npx skills add fe-dudu/skills
```

Install only this skill:

```bash
npx skills add fe-dudu/skills --skill frontend-engineering
```

Install globally for the current user:

```bash
npx skills add fe-dudu/skills --skill frontend-engineering --global
```

List skills without installing:

```bash
npx skills add fe-dudu/skills --list
```

Use the skill for one task without installing it:

```bash
npx skills use fe-dudu/skills --skill frontend-engineering --agent claude-code
```

`npx skill add` is a different npm package. It does not install this repository's Agent Skills.

## Discovery and publishing

### Vercel Skills / skills.sh

There is no separate submission step. After this repository is public on GitHub, the `skills` CLI and [skills.sh](https://skills.sh) can discover each valid `skills/<skill-name>/SKILL.md`.

Check discovery locally or after publishing:

```bash
npx skills add fe-dudu/skills --list
npx skills find frontend-engineering
```

The expected directory pages are:

- [Repository](https://skills.sh/fe-dudu/skills)
- [Frontend Engineering](https://skills.sh/fe-dudu/skills/frontend-engineering)

Push the repository to a public GitHub repository to make it indexable. The `SKILL.md` must have valid YAML frontmatter with `name` and `description`; the `name` must match its parent directory.

### Claude Code marketplace

The repository is its own marketplace. `.claude-plugin/marketplace.json` registers `frontend-engineering` and resolves the plugin from this repository's root. Once the public repository is pushed, users can add it with `/plugin marketplace add fe-dudu/skills`.

Being usable through a custom marketplace is separate from being listed in Anthropic's official marketplace. Official listing requires submission through [Claude plugin submission](https://claude.ai/settings/plugins/submit).

The Claude Code badge above links to this repository's custom marketplace catalog. It does not claim inclusion in Anthropic's official marketplace.

## Available Skills

### [frontend-engineering](./skills/frontend-engineering/)

Readable, explicit frontend engineering conventions for TypeScript and React code.

| Category | What it covers |
| --- | --- |
| [Control flow](./skills/frontend-engineering/references/control-flow.md) | Guard clauses, early returns, limited nesting, exhaustive `switch`, and readable ternaries or IIFEs |
| [Naming and variables](./skills/frontend-engineering/references/naming-and-variables.md) | Domain names, explicit booleans, inline simple values, and justified declarations |
| [Functions and abstraction](./skills/frontend-engineering/references/functions-and-abstraction.md) | Function declarations, locality, inline handlers, AHA checks, and no pass-through helpers |
| [TypeScript](./skills/frontend-engineering/references/typescript.md) | Explicit state, ref, and function contracts; safe narrowing; no `any` or non-null assertions |
| [Collections and data processing](./skills/frontend-engineering/references/collections.md) | Choose collection chains or `for...of` by whole-flow readability and early-exit needs |
| [React rendering](./skills/frontend-engineering/references/react-rendering.md) | Boolean conditions, stable domain keys, explicit JSX branches, and required render contracts |
| [React components](./skills/frontend-engineering/references/react-components.md) | Component locality, stable module constants, cohesive files, and immutable props |
| [React hooks](./skills/frontend-engineering/references/react-hooks.md) | Measured memoization, effect boundaries, cleanup, dependency locality, and declaration-order conventions |
| [State ownership](./skills/frontend-engineering/references/state-ownership.md) | Separate server and UI state, avoid duplicate query data, and derive values during render |
| [React context](./skills/frontend-engineering/references/react-context.md) | Use Context for dependency injection, not as a general-purpose global state store |
| [Error handling](./skills/frontend-engineering/references/error-handling.md) | Typed error categories, Error Boundaries, React Query `throwOnError`, and error causes |
| [Async and resilience](./skills/frontend-engineering/references/async-and-resilience.md) | Cancellation, stale responses, bounded transient retries, graceful degradation, and recovery feedback |
| [API and runtime data boundaries](./skills/frontend-engineering/references/api-and-data-fetching.md) | Validate API, storage, and input data once at runtime before exposing domain data to render code |
| [URL state and routes](./skills/frontend-engineering/references/url-state-and-routes.md) | Parse user-controlled path, query, and hash values; validate domain state; keep secrets out of URLs |
| [Testing and accessibility](./skills/frontend-engineering/references/testing.md) | Test user and domain outcomes, including roles, labels, keyboard access, focus, and accessible names |
| [Modules and exports](./skills/frontend-engineering/references/modules-and-exports.md) | Named exports, direct imports, existing aliases, and no speculative barrels or re-exports |
| [Comments](./skills/frontend-engineering/references/comments.md) | Comments for constraints, decisions, and external facts—not syntax or duplicated code intent |
| [Security and diagnostics](./skills/frontend-engineering/references/security-and-diagnostics.md) | Avoid unsafe HTML, production `console` and `debugger`; use safe project logging |
| [Dead code and tooling](./skills/frontend-engineering/references/dead-code-and-tooling.md) | Remove confirmed unused code and use Knip or an equivalent only for detection |
| [File naming and structure](./skills/frontend-engineering/references/file-naming-and-structure.md) | PascalCase components, camelCase TypeScript files, domain names, and responsibility-based files |
| [Domain structure](./skills/frontend-engineering/references/domain-structure.md) | Organize by domain and vertical, delay sharing, and keep public module boundaries explicit |

## Development

This project uses [Task](https://taskfile.dev) as a task runner. Install it with `brew install go-task`.

```bash
task --list                          # show available tasks
task discover                        # verify skills CLI discovery
task lint                            # run the skill linter
task lint:test                       # run linter unit tests
task check                           # run discovery, lint, and tests
task eval:grade -- /path/to/workspace # grade a skill-creator workspace
```

The repository does not require a runtime npm dependency. `npx skills` is used only for Agent Skills discovery and installation.

## Repository Structure

```text
.
├── .claude-plugin/
│   └── marketplace.json             # Claude Code marketplace catalog
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .github/
│   └── workflows/
│       └── lint.yml                 # CI checks
├── README.md
├── Taskfile.yml
├── evals/                           # static skill evaluation harness
│   ├── README.md
│   ├── evals.json
│   └── *.go
├── lint/                            # frontmatter and structure linter
│   ├── go.mod
│   ├── go.sum
│   └── *.go
└── skills/
    └── frontend-engineering/
        ├── SKILL.md                 # skill entry point and reference map
        ├── agents/
        │   └── openai.yaml           # agent UI metadata
        └── references/               # category-specific guidance
            ├── control-flow.md
            ├── naming-and-variables.md
            ├── functions-and-abstraction.md
            ├── typescript.md
            ├── collections.md
            ├── react-rendering.md
            ├── react-components.md
            ├── react-hooks.md
            ├── state-ownership.md
            ├── react-context.md
            ├── error-handling.md
            ├── async-and-resilience.md
            ├── api-and-data-fetching.md
            ├── url-state-and-routes.md
            ├── testing.md
            ├── modules-and-exports.md
            ├── comments.md
            ├── security-and-diagnostics.md
            ├── dead-code-and-tooling.md
            ├── file-naming-and-structure.md
            └── domain-structure.md
```

The skill directory's top-level `SKILL.md` is the table of contents. Reference files are read only when they match the current task, keeping the agent context focused.

## Contributing

### Adding a new skill

1. Create `skills/<skill-name>/SKILL.md`.
2. Use the same lowercase `name` in the YAML frontmatter and parent directory. Use lowercase letters, digits, and hyphens only.
3. Write a `description` that states both the capability and when to use it.
4. Keep the main `SKILL.md` concise. Move detailed guidance into directly linked `references/` files.
5. Add the skill to this README and `.claude-plugin/marketplace.json` when it should be available through the Claude marketplace.
6. Run the repository linter and verify CLI discovery with `npx skills add . --list`.

### Writing guidelines

- Keep `SKILL.md` files under 500 lines.
- Add only guidance an agent needs for the task; do not restate general knowledge.
- Prefer concrete examples over abstract explanations.
- Preserve correctness, accessibility, security, and existing project conventions.
- Keep references one level deep from `SKILL.md`.

## Repository configuration

- `.claude-plugin/marketplace.json`: Claude Code marketplace catalog.
- `.github/workflows/lint.yml`: pull-request and main-branch lint checks.
- `Taskfile.yml`: local discovery, lint, test, and evaluation commands.
- `lint/`: development-only frontmatter and skill structure linter.
- `evals/`: development-only static evaluation harness.

Skill packages contain documentation only. The repository has no runtime dependency, unnecessary npm package, or custom installer.

## References

- [Agent Skills specification](https://agentskills.io/specification)
- [`skills` CLI](https://github.com/vercel-labs/skills)
- [skills.sh](https://skills.sh)
- [Claude Code plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
