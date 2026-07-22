<!-- markdownlint-disable -->

# Hardening Report: cypress-io--github-action/v7.4.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **cypress-io--github-action/v7.4.1** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Every workflow file uses tag-based or branch-based `uses:` references instead of full 40-character SHA commit hashes. No SHA-pinned actions were found anywhere in .github/workflows/. Affected actions include: actions/checkout@v7, actions/setup-node@v6, actions/cache@v5, actions/upload-artifact@v7, actions/download-artifact@v8, pnpm/action-setup@v6, browser-actions/setup-chrome@v2, cycjimmy/semantic-release-action@v6, cypress-io/cypress/.github/workflows/triage_add_to_project.yml@develop, cypress-io/cypress/.github/workflows/triage_handle_new_comments.yml@develop. Tag and branch refs are mutable and can be silently redirected to malicious commits, enabling supply-chain attacks.

Locations:

- `.github/workflows/add-issue-to-triage-board.yml:14`
- `.github/workflows/check-dist.yml:20`
- `.github/workflows/check-dist.yml:22`
- `.github/workflows/check-markdown.yml:13`
- `.github/workflows/example-basic-pnpm.yml:19`
- `.github/workflows/example-basic-pnpm.yml:23`
- `.github/workflows/example-basic-pnpm.yml:28`
- `.github/workflows/example-basic.yml:34`
- `.github/workflows/example-basic.yml:55`
- `.github/workflows/example-basic.yml:68`
- `.github/workflows/example-build-artifacts.yml:32`
- `.github/workflows/example-build-artifacts.yml:36`
- `.github/workflows/example-build-artifacts.yml:51`
- `.github/workflows/example-build-artifacts.yml:57`
- `.github/workflows/example-chrome-for-testing.yml:13`
- `.github/workflows/example-chrome-for-testing.yml:16`
- `.github/workflows/example-chrome.yml:18`
- `.github/workflows/example-chrome.yml:40`
- `.github/workflows/example-chrome.yml:52`
- `.github/workflows/example-component-test.yml:12`
- `.github/workflows/example-config.yml:18`
- `.github/workflows/example-cron.yml:13`
- `.github/workflows/example-custom-ci-build-id.yml:40`
- `.github/workflows/example-custom-command.yml:14`
- `.github/workflows/example-debug.yml:18`
- `.github/workflows/example-docker.yml:18`
- `.github/workflows/example-edge.yml:12`
- `.github/workflows/example-env.yml:18`
- `.github/workflows/example-expose.yml:18`
- `.github/workflows/example-firefox.yml:12`
- `.github/workflows/example-install-command.yml:13`
- `.github/workflows/example-install-only.yml:14`
- `.github/workflows/example-install-only.yml:22`
- `.github/workflows/example-node-versions.yml:18`
- `.github/workflows/example-node-versions.yml:20`
- `.github/workflows/example-quiet.yml:12`
- `.github/workflows/example-recording.yml:33`
- `.github/workflows/example-start-and-pnpm-workspaces.yml:18`
- `.github/workflows/example-start-and-yarn-workspaces.yml:18`
- `.github/workflows/example-start.yml:18`
- `.github/workflows/example-wait-on.yml:18`
- `.github/workflows/example-webpack.yml:12`
- `.github/workflows/example-yarn-classic.yml:18`
- `.github/workflows/example-yarn-modern-pnp.yml:13`
- `.github/workflows/example-yarn-modern.yml:13`
- `.github/workflows/main.yml:14`
- `.github/workflows/main.yml:16`
- `.github/workflows/main.yml:42`
- `.github/workflows/triage_closed_issue_comment.yml:10`

### script-injection (severity: high)

Multiple `run:` blocks directly interpolate `${{ ... }}` expressions (sub-rule a), which are expanded by the GitHub Actions template engine before the shell processes the command. This allows expression values to break out of their intended context and inject arbitrary shell commands.

1. `.github/workflows/main.yml` — `run: 'git push https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git HEAD:refs/heads/v${{steps.semantic.outputs.new_release_major_version}}'` — the step output `new_release_major_version` is interpolated directly into the shell command.

2. `.github/workflows/example-recording.yml` — `run: |` block contains `echo Cypress finished with: ${{ steps.cypress.outcome }}` and `echo See results at ${{ steps.cypress.outputs.resultsUrl }}` — step outputs interpolated directly. Also, `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]` interpolates a secret directly into a shell conditional.

3. `.github/workflows/example-custom-ci-build-id.yml` — `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]` interpolates a secret directly; `run: echo "generated id ${{ steps.uuid.outputs.value }}"` and two instances of `run: echo "Custom build id is ${{ needs.prepare.outputs.uuid }}"` interpolate step/job outputs directly into shell commands.

Locations:

- `.github/workflows/main.yml:55`
- `.github/workflows/example-recording.yml:37`
- `.github/workflows/example-recording.yml:76`
- `.github/workflows/example-recording.yml:77`
- `.github/workflows/example-custom-ci-build-id.yml:46`
- `.github/workflows/example-custom-ci-build-id.yml:65`
- `.github/workflows/example-custom-ci-build-id.yml:73`
- `.github/workflows/example-custom-ci-build-id.yml:103`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references across 34 workflow files by replacing tag/branch refs with full SHA hashes (actions/checkout@v7→3d3c42e5, actions/setup-node@v6→249970729, actions/cache@v5→caa29612, actions/upload-artifact@v7→043fb46d, actions/download-artifact@v8→3e5f45b2, pnpm/action-setup@v6→0ebf4713, browser-actions/setup-chrome@v2→2e1d7496, cycjimmy/semantic-release-action@v6→b12c8f60, cypress-io/cypress reusable workflows @develop→fd056c9c). Fixed all script injection issues by moving ${{ }} expressions from run: blocks into step env: blocks and referencing them as plain shell variables: main.yml git push command, example-recording.yml secret check and Cypress output printing, example-custom-ci-build-id.yml secret check and UUID/build-id printing steps.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in .github/workflows/main.yml at the 'Push updates to branch for major version' step. Changed the run command from a single-quoted string (where NEW_RELEASE_MAJOR_VERSION was unquoted) to a multi-line run block using double-quoted arguments: `git push "https://..." "HEAD:refs/heads/v${NEW_RELEASE_MAJOR_VERSION}"`. The variable is now properly double-quoted, preventing shell metacharacter interpretation.

