# Screenshot Index & Replacement Guide

This folder contains high-resolution verification cards for all 10 evaluation checkpoints of **Lab 1**.
You can use these cards as-is in your report, or overwrite any `.png` with a browser/terminal screenshot taken on your computer.

| Filename | Checkpoint / Description | Where to capture if replacing |
| :--- | :--- | :--- |
| `01-live-vercel-deployment.png` | Live OpsPulse running on Vercel | Open `https://opspulse-devops-lab1.vercel.app` in your browser |
| `02-git-config-status.png` | Git Configuration & Identity | Run `git config --list --show-origin` in PowerShell |
| `03-github-repo-overview.png` | GitHub Repository & GitFlow Branches | Open `https://github.com/Achindra2003/devops-lab1-opspulse` |
| `04-pull-requests-list.png` | Closed Pull Requests Table (#1–#7) | Open `https://github.com/Achindra2003/devops-lab1-opspulse/pulls?q=is%3Apr+is%3Aclosed` |
| `05-merge-conflict-collision.png` | Terminal / GitHub Conflict Collision | Terminal output of `git merge develop` on `feature/incident-logger` |
| `06-conflict-markers-editor.png` | Conflict Markers in `index.html` | Code editor view showing `<<<<<<< HEAD`, `=======`, `>>>>>>> develop` |
| `07-precommit-hook-blocker.png` | Pre-commit Hook Conflict Blocker | Terminal output when running `git commit` with unresolved markers |
| `08-conflict-resolved-merged-pr.png` | Resolved Alert Banner & Merged PR #3 | GitHub PR #3 page showing purple "Merged" badge |
| `09-github-actions-ci-pipeline.png` | GitHub Actions Passing CI Runs | Open `https://github.com/Achindra2003/devops-lab1-opspulse/actions` |
| `10-git-graph-topology.png` | GitFlow Commit Graph | Run `git log --graph --oneline -n 15` in PowerShell |
