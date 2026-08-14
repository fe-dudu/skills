# Skills

[![skills.sh](https://skills.sh/b/fe-dudu/skills)](https://skills.sh/fe-dudu/skills)
[![Claude Code Marketplace](https://img.shields.io/badge/Claude%20Code-Marketplace-8A63D2)](./.claude-plugin/marketplace.json)

Two-layer Agent Skills for TypeScript, React, and coordinated frontend work.
Use `frontend-engineering` alone for code principles, or add `oh-my-frontend` as
an orchestration layer. Each skill has a short `SKILL.md`; detailed guidance is
loaded from references only when needed.

## Skills

| Skill | Use it for |
| --- | --- |
| [frontend-engineering](./skills/frontend-engineering/) | Standalone readable, explicit TypeScript and React implementation rules |
| [oh-my-frontend](./skills/oh-my-frontend/) | Optional frontend workflow and orchestration layer |

<details>
<summary><strong>frontend-engineering</strong> — Code principles and implementation quality</summary>
Standalone TypeScript and React implementation rules for readable, explicit, and
predictable frontend code. No Planner, `/docs`, approval interview, or parallel
agent is required.

- TypeScript contracts, narrowing, and data boundaries
- React rendering, components, hooks, context, and state ownership
- Forms, errors, async resilience, and URL state
- Testing, accessibility, security, modules, naming, and file structure

Start with [SKILL.md](./skills/frontend-engineering/SKILL.md).
</details>

<details>
<summary><strong>oh-my-frontend</strong> — Documentation, approval, and agent orchestration</summary>
Optional frontend workflow and orchestration for project memory, approval,
parallel work, specialist review, and risk-based verification. It coordinates
people and agents; it does not replace `frontend-engineering` implementation
rules.

- Durable `/docs` memory: domain language, business rules, features, decisions, and architecture
- Planner conversation, focused approval, bounded Worker briefs, and safe parallel waves
- Component architecture, UI state, browser/visual verification, accessibility, and debugging
- Data fetching, routing, performance, security, responsive UI, forms, i18n, compatibility, and observability routing
- Risk-based testing without mandatory TDD or excessive test code

Korean mirrors under `docs/*ko/` are local reading notes and are not published or included in installed packages.

Start with [SKILL.md](./skills/oh-my-frontend/SKILL.md).
</details>

## Install

Install all skills:

```bash
npx skills add fe-dudu/skills
```

Install one skill:

```bash
npx skills add fe-dudu/skills --skill frontend-engineering
# or: npx skills add fe-dudu/skills --skill oh-my-frontend
```

Use both when the task needs implementation rules plus orchestration:

```bash
npx skills add fe-dudu/skills --skill frontend-engineering
npx skills add fe-dudu/skills --skill oh-my-frontend
```

Install through the Claude Code plugin CLI:

```bash
claude plugin marketplace add fe-dudu/skills
claude plugin install frontend-engineering@fe-dudu
claude plugin install oh-my-frontend@fe-dudu
```

Or run the plugin commands inside Claude Code:

```text
/plugin marketplace add fe-dudu/skills
/plugin install frontend-engineering@fe-dudu
/plugin install oh-my-frontend@fe-dudu
```

The repository also includes the Claude marketplace catalog at
[`.claude-plugin/marketplace.json`](./.claude-plugin/marketplace.json).
