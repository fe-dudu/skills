# Eval Harness

Static assertion grader for skill-creator eval workspaces. It applies the assertions in `evals.json` to the output files produced by a skill evaluation.

## Quick start

Prerequisites: [Task](https://taskfile.dev) and Go 1.25+.

```bash
task eval:grade -- /path/to/workspace
task eval:grade -- /path/to/workspace/iteration-1
```

## Adding cases

Add cases under the `frontend-engineering` entry in `evals.json`.

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Numeric ID matching `eval-N` in the evaluation workspace |
| `prompt` | yes | User-like task prompt |
| `should_trigger` | no | Whether the skill should activate; defaults to `true` |
| `expected_output` | no | Human-readable expected behavior |
| `assertions` | no | Static checks against generated output |

Supported assertions:

- `contains`: output includes `value`
- `contains_any`: output includes one of `values`
- `not_contains`: output excludes `value`
- `file_exists`: output file exists
- `exit_code`: `metadata.json` contains the expected exit code

The grader writes `static_grading.json` in each run and `static_summary.json` in the iteration directory.
