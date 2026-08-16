package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestSelectSkillRequiresExplicitName(t *testing.T) {
	suite := &EvalSuite{
		Skills: []SkillEvals{
			{Name: "frontend-engineering"},
			{Name: "oh-my-frontend"},
		},
	}

	if _, err := selectSkill(suite, ""); err == nil {
		t.Fatal("expected --skill to be required")
	}

	selected, err := selectSkill(suite, "oh-my-frontend")
	if err != nil {
		t.Fatalf("selectSkill returned error: %v", err)
	}
	if selected.Name != "oh-my-frontend" {
		t.Fatalf("selected %q, want oh-my-frontend", selected.Name)
	}
}

func TestSelectSkillRejectsUnknownName(t *testing.T) {
	suite := &EvalSuite{Skills: []SkillEvals{{Name: "oh-my-frontend"}}}

	if _, err := selectSkill(suite, "missing"); err == nil {
		t.Fatal("expected an unknown skill error")
	}
}

func TestResolveIterationDirChoosesNumericallyLatest(t *testing.T) {
	root := t.TempDir()
	for _, name := range []string{"iteration-9", "iteration-10"} {
		if err := os.MkdirAll(filepath.Join(root, name, "eval-0"), 0o755); err != nil {
			t.Fatalf("MkdirAll returned error: %v", err)
		}
	}

	want := filepath.Join(root, "iteration-10")
	if got := resolveIterationDir(root); got != want {
		t.Fatalf("resolveIterationDir returned %q, want %q", got, want)
	}
}

func TestValidateEvalDirsRejectsUnknownID(t *testing.T) {
	skill := &SkillEvals{Name: "oh-my-frontend", Evals: []Eval{{ID: 0}}}

	if err := validateEvalDirs([]string{"/tmp/eval-99"}, skill); err == nil {
		t.Fatal("expected an unknown eval ID error")
	}
}

func TestValidateEvalDirsRejectsMissingID(t *testing.T) {
	skill := &SkillEvals{Name: "oh-my-frontend", Evals: []Eval{{ID: 0}, {ID: 1}}}

	if err := validateEvalDirs([]string{"/tmp/eval-0"}, skill); err == nil {
		t.Fatal("expected a missing eval ID error")
	}
}

func TestValidateEvalDirsRejectsEmptyWorkspace(t *testing.T) {
	skill := &SkillEvals{Name: "oh-my-frontend", Evals: []Eval{{ID: 0}}}

	if err := validateEvalDirs(nil, skill); err == nil {
		t.Fatal("expected an empty workspace error")
	}
}

func TestFindEvalDirsSortsNumerically(t *testing.T) {
	root := t.TempDir()
	for _, name := range []string{"eval-9", "eval-10"} {
		if err := os.Mkdir(filepath.Join(root, name), 0o755); err != nil {
			t.Fatalf("Mkdir returned error: %v", err)
		}
	}

	got := findEvalDirs(root)
	if filepath.Base(got[0]) != "eval-9" || filepath.Base(got[1]) != "eval-10" {
		t.Fatalf("findEvalDirs returned %v, want eval-9 then eval-10", got)
	}
}

func TestEvalMapsUseIDsFromSelectedSkill(t *testing.T) {
	noTrigger := false
	evals := []Eval{
		{ID: 0, ShouldTrigger: &noTrigger, Assertions: []Assertion{{Type: "contains", Value: "selected"}}},
		{ID: 1, ShouldTrigger: nil},
	}

	assertions := buildAssertionMap(evals)
	triggers := buildTriggerMap(evals)

	if len(assertions[0]) != 1 || assertions[0][0].Value != "selected" {
		t.Fatal("assertions were not keyed by the selected skill's eval ID")
	}
	if triggers[0] {
		t.Fatal("expected eval 0 to remain non-triggering")
	}
	if !triggers[1] {
		t.Fatal("expected omitted should_trigger to default to true")
	}
}

func TestGradeWorkspaceDoesNotSkipEmptyOutputs(t *testing.T) {
	root := t.TempDir()
	iteration := filepath.Join(root, "iteration-1")
	for _, dir := range []string{
		filepath.Join(iteration, "eval-0", "with_skill", "outputs"),
		filepath.Join(iteration, "eval-0", "without_skill", "outputs"),
	} {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			t.Fatalf("MkdirAll returned error: %v", err)
		}
	}

	skill := &SkillEvals{
		Name: "oh-my-frontend",
		Evals: []Eval{{
			ID:         0,
			Assertions: []Assertion{{Type: "contains", Value: "required"}},
		}},
	}

	if err := gradeWorkspace(root, skill); err == nil {
		t.Fatal("expected empty output to fail the assertion")
	}
	if _, err := os.Stat(filepath.Join(iteration, "static_summary.json")); err != nil {
		t.Fatalf("static summary was not written before grading failed: %v", err)
	}
}

func TestGradeWorkspaceChecksMetadataWithoutOutputText(t *testing.T) {
	root := t.TempDir()
	iteration := filepath.Join(root, "iteration-1")
	for _, dir := range []string{
		filepath.Join(iteration, "eval-0", "with_skill", "outputs"),
		filepath.Join(iteration, "eval-0", "without_skill", "outputs"),
	} {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			t.Fatalf("MkdirAll returned error: %v", err)
		}
	}
	metadata := []byte(`{"exit_code": 0}`)
	for _, dir := range []string{
		filepath.Join(iteration, "eval-0", "with_skill"),
		filepath.Join(iteration, "eval-0", "without_skill"),
	} {
		if err := os.WriteFile(filepath.Join(dir, "metadata.json"), metadata, 0o644); err != nil {
			t.Fatalf("WriteFile returned error: %v", err)
		}
	}

	skill := &SkillEvals{
		Name: "oh-my-frontend",
		Evals: []Eval{{
			ID:         0,
			Assertions: []Assertion{{Type: "exit_code", Value: "0"}},
		}},
	}

	if err := gradeWorkspace(root, skill); err != nil {
		t.Fatalf("metadata assertion failed without output text: %v", err)
	}
}
