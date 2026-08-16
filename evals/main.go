package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	workspace := flag.String("workspace", "", "skill-creator workspace directory to grade")
	skillName := flag.String("skill", "", "skill name from evals.json to grade")
	flag.Parse()

	if *workspace == "" {
		fmt.Fprintln(os.Stderr, "Usage: skill-eval --skill <name> --workspace <path>")
		fmt.Fprintln(os.Stderr, "  Grades one skill's outputs with static assertions from evals.json.")
		os.Exit(1)
	}

	evalsDir := findEvalsDir()
	evalsFile := filepath.Join(evalsDir, "evals.json")

	suite, err := loadEvalSuite(evalsFile)
	if err != nil {
		fatal("loading evals.json: %v", err)
	}

	skill, err := selectSkill(suite, *skillName)
	if err != nil {
		fatal("selecting skill: %v", err)
	}

	wsPath := *workspace
	if !filepath.IsAbs(wsPath) {
		if cwd, err := os.Getwd(); err == nil {
			wsPath = filepath.Join(cwd, wsPath)
		}
	}

	if err := gradeWorkspace(wsPath, skill); err != nil {
		fatal("grading workspace: %v", err)
	}
}

func selectSkill(suite *EvalSuite, name string) (*SkillEvals, error) {
	if name != "" {
		for i := range suite.Skills {
			if suite.Skills[i].Name == name {
				return &suite.Skills[i], nil
			}
		}
		return nil, fmt.Errorf("skill %q not found", name)
	}

	return nil, fmt.Errorf("pass --skill to select an eval namespace")
}

// findEvalsDir returns the directory containing this binary's evals.json.
// It checks the directory of os.Args[0] first, then falls back to cwd.
func findEvalsDir() string {
	if exe, err := os.Executable(); err == nil {
		dir := filepath.Dir(exe)
		if _, err := os.Stat(filepath.Join(dir, "evals.json")); err == nil {
			return dir
		}
	}
	if cwd, err := os.Getwd(); err == nil {
		if _, err := os.Stat(filepath.Join(cwd, "evals.json")); err == nil {
			return cwd
		}
		evalsDir := filepath.Join(cwd, "evals")
		if _, err := os.Stat(filepath.Join(evalsDir, "evals.json")); err == nil {
			return evalsDir
		}
	}
	fatal("cannot find evals.json; run from the evals/ directory or the repo root")
	return ""
}

func fatal(format string, args ...interface{}) {
	fmt.Fprintf(os.Stderr, "Error: "+format+"\n", args...)
	os.Exit(1)
}
