#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
command -v gh >/dev/null || { echo 'Install the GitHub CLI first: https://cli.github.com'; exit 1; }
gh api user --jq .login >/dev/null
if ! git remote get-url origin >/dev/null 2>&1; then
  gh repo create cedar-lantern-35b227 --public --source=. --remote=origin --push --description "Nickerson’s Creative Services — Anacortes, Washington"
else
  git push -u origin main
fi
repository=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
if gh api "repos/$repository/pages" --silent 2>/dev/null; then
  gh api --method PUT "repos/$repository/pages" -f build_type=workflow --silent
else
  gh api --method POST "repos/$repository/pages" -f build_type=workflow --silent
fi
gh workflow run pages.yml --ref main
echo "GitHub Pages deployment started."
echo "Repository: https://github.com/$repository"
gh api "repos/$repository/pages" --jq .html_url
