# Skills

[![skills.sh](https://skills.sh/b/fe-dudu/skills)](https://skills.sh/fe-dudu/skills)
[![Claude Code Marketplace](https://img.shields.io/badge/Claude%20Code-Marketplace-8A63D2)](./.claude-plugin/marketplace.json)

TypeScript, React, 협업형 프론트엔드 작업을 위한 두 계층 Agent Skills입니다. 코드 원칙만 필요하면 `frontend-engineering`을 단독으로 사용하고, 작업 오케스트레이션이 필요하면 `oh-my-frontend`를 추가합니다. 각 스킬은 짧은 `SKILL.md`를 제공하며, 상세 지침은 필요할 때만 reference에서 읽습니다.

## 스킬

| 스킬 | 용도 |
| --- | --- |
| [frontend-engineering](./skills/frontend-engineering/) | 읽기 쉽고 명확하며 예측 가능한 TypeScript·React 구현 원칙입니다. |
| [oh-my-frontend](./skills/oh-my-frontend/) | 선택형 프론트엔드 workflow·orchestration 계층입니다. |

<details>
<summary><strong>frontend-engineering</strong> — 코드 원칙과 구현 품질</summary>
읽기 쉽고 명확하며 예측 가능한 TypeScript·React 구현 원칙을 단독으로 적용합니다. Planner, `/docs`, 승인 인터뷰, 병렬 에이전트가 없어도 사용할 수 있습니다.

- TypeScript 계약, narrowing, data boundary를 다룹니다.
- React rendering, component, hook, context, state ownership을 다룹니다.
- Form, error, async resilience, URL state를 다룹니다.
- Testing, accessibility, security, module, naming, file structure를 다룹니다.

[SKILL.md](./skills/frontend-engineering/SKILL.md)부터 읽습니다.
</details>

<details>
<summary><strong>oh-my-frontend</strong> — 문서·승인·에이전트 오케스트레이션</summary>
프로젝트 메모리, 승인, 병렬 작업, specialist review, 위험 기반 검증을 위한 선택형 프론트엔드 workflow·orchestration 계층입니다. 사람과 에이전트의 작업을 조율하며, `frontend-engineering`의 구현 원칙을 대체하지 않습니다.

- Domain language, business rule, feature, decision, architecture를 `/docs`에 장기 메모리로 관리합니다.
- Planner 대화, 필요한 승인, 범위가 제한된 Worker brief, 안전한 병렬 wave를 관리합니다.
- Component architecture, UI state, browser·visual verification, accessibility, debugging을 다룹니다.
- Data fetching, routing, performance, security, responsive UI, form, i18n, compatibility, observability를 라우팅합니다.
- TDD나 과도한 테스트 코드를 강제하지 않고 위험 기반으로 테스트합니다.

`docs/*ko/`의 한국어 mirror는 로컬 열람용이며 공개하거나 설치 패키지에 포함하지 않습니다.

[SKILL.md](./skills/oh-my-frontend/SKILL.md)부터 읽습니다.
</details>

## 설치

모든 스킬을 설치합니다.

```bash
npx skills add fe-dudu/skills
```

하나의 스킬만 설치합니다.

```bash
npx skills add fe-dudu/skills --skill frontend-engineering
# 또는: npx skills add fe-dudu/skills --skill oh-my-frontend
```

두 스킬이 모두 필요한 작업에서는 다음 명령을 사용합니다.

```bash
npx skills add fe-dudu/skills --skill frontend-engineering
npx skills add fe-dudu/skills --skill oh-my-frontend
```

Claude Code plugin CLI로 설치합니다.

```bash
claude plugin marketplace add fe-dudu/skills
claude plugin install frontend-engineering@fe-dudu
claude plugin install oh-my-frontend@fe-dudu
```

또는 Claude Code 내부에서 plugin 명령을 실행합니다.

```text
/plugin marketplace add fe-dudu/skills
/plugin install frontend-engineering@fe-dudu
/plugin install oh-my-frontend@fe-dudu
```

이 저장소에는 Claude marketplace catalog인 [`.claude-plugin/marketplace.json`](./.claude-plugin/marketplace.json)도 포함되어 있습니다.
