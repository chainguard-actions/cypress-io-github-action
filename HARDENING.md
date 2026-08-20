<!-- markdownlint-disable -->

# Hardening Report: cypress-io--github-action/v7.4.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **cypress-io--github-action/v7.4.3** was hardened automatically. 36 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is interpolated directly inside a run: shell command. In the 'Check for record key' step, `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]` injects the secret value directly into the shell script before the shell parses it. In the 'Print Cypress Cloud URL' step, `echo Cypress finished with: ${{ steps.cypress.outcome }}` and `echo See results at ${{ steps.cypress.outputs.resultsUrl }}` interpolate step outputs directly into the shell.

Locations:

- `.github/workflows/example-recording.yml:36`
- `.github/workflows/example-recording.yml:70`
- `.github/workflows/example-recording.yml:71`

### script-injection (severity: high)

Sub-rule (a): Multiple ${{ }} expressions are interpolated directly inside run: shell commands. The 'Check for record key' step uses `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]`; the 'Print unique ID' step uses `echo "generated id ${{ steps.uuid.outputs.value }}"`; and two 'Print custom build id' steps use `echo "Custom build id is ${{ needs.prepare.outputs.uuid }}"`.

Locations:

- `.github/workflows/example-custom-ci-build-id.yml:48`
- `.github/workflows/example-custom-ci-build-id.yml:65`
- `.github/workflows/example-custom-ci-build-id.yml:79`
- `.github/workflows/example-custom-ci-build-id.yml:100`

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression from steps.*.outputs.* context is interpolated directly inside a run: shell command. The 'Push updates to branch for major version' step uses `run: 'git push https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git HEAD:refs/heads/v${{steps.semantic.outputs.new_release_major_version}}'`, injecting the step output directly into the shell command string.

Locations:

- `.github/workflows/main.yml:55`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable branch ref instead of a full 40-character SHA commit hash: `cypress-io/cypress/.github/workflows/triage_add_to_project.yml@develop`

Locations:

- `.github/workflows/add-issue-to-triage-board.yml:14`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/setup-node@v7`

Locations:

- `.github/workflows/check-dist.yml:20`
- `.github/workflows/check-dist.yml:22`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/check-markdown.yml:11`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `pnpm/action-setup@v6`, `actions/setup-node@v7`

Locations:

- `.github/workflows/example-basic-pnpm.yml:20`
- `.github/workflows/example-basic-pnpm.yml:23`
- `.github/workflows/example-basic-pnpm.yml:28`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/setup-node@v7`

Locations:

- `.github/workflows/example-basic.yml:30`
- `.github/workflows/example-basic.yml:55`
- `.github/workflows/example-basic.yml:57`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/upload-artifact@v7`, `actions/download-artifact@v8`

Locations:

- `.github/workflows/example-build-artifacts.yml:30`
- `.github/workflows/example-build-artifacts.yml:36`
- `.github/workflows/example-build-artifacts.yml:47`
- `.github/workflows/example-build-artifacts.yml:55`
- `.github/workflows/example-build-artifacts.yml:58`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `browser-actions/setup-chrome@v2`

Locations:

- `.github/workflows/example-chrome-for-testing.yml:12`
- `.github/workflows/example-chrome-for-testing.yml:15`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/upload-artifact@v7`

Locations:

- `.github/workflows/example-chrome.yml:17`
- `.github/workflows/example-chrome.yml:35`
- `.github/workflows/example-chrome.yml:47`
- `.github/workflows/example-chrome.yml:55`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-component-test.yml:11`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-config.yml:17`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-cron.yml:10`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`

Locations:

- `.github/workflows/example-custom-ci-build-id.yml:42`
- `.github/workflows/example-custom-ci-build-id.yml:76`
- `.github/workflows/example-custom-ci-build-id.yml:97`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-custom-command.yml:18`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-debug.yml:18`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-docker.yml:20`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-edge.yml:11`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-env.yml:24`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-expose.yml:16`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/upload-artifact@v7`

Locations:

- `.github/workflows/example-firefox.yml:17`
- `.github/workflows/example-firefox.yml:30`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-install-command.yml:12`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/setup-node@v7`

Locations:

- `.github/workflows/example-node-versions.yml:17`
- `.github/workflows/example-node-versions.yml:19`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-quiet.yml:11`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`

Locations:

- `.github/workflows/example-recording.yml:28`
- `.github/workflows/example-recording.yml:53`
- `.github/workflows/example-recording.yml:78`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `pnpm/action-setup@v6`, `actions/setup-node@v7`

Locations:

- `.github/workflows/example-start-and-pnpm-workspaces.yml:22`
- `.github/workflows/example-start-and-pnpm-workspaces.yml:26`
- `.github/workflows/example-start-and-pnpm-workspaces.yml:31`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-start-and-yarn-workspaces.yml:18`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-start.yml:18`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-wait-on.yml:17`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable version tag instead of a full 40-character SHA commit hash: `actions/checkout@v7`

Locations:

- `.github/workflows/example-webpack.yml:11`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/setup-node@v7`

Locations:

- `.github/workflows/example-yarn-classic.yml:15`
- `.github/workflows/example-yarn-classic.yml:27`
- `.github/workflows/example-yarn-classic.yml:29`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/setup-node@v7`

Locations:

- `.github/workflows/example-yarn-modern-pnp.yml:11`
- `.github/workflows/example-yarn-modern-pnp.yml:18`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/setup-node@v7`

Locations:

- `.github/workflows/example-yarn-modern.yml:11`
- `.github/workflows/example-yarn-modern.yml:17`

### unpinned-uses (severity: high)

Uses references are pinned to mutable version tags instead of full 40-character SHA commit hashes: `actions/checkout@v7`, `actions/setup-node@v7`, `cycjimmy/semantic-release-action@v6`

Locations:

- `.github/workflows/main.yml:14`
- `.github/workflows/main.yml:16`
- `.github/workflows/main.yml:40`
- `.github/workflows/main.yml:44`

### unpinned-uses (severity: high)

Uses reference is pinned to a mutable branch ref instead of a full 40-character SHA commit hash: `cypress-io/cypress/.github/workflows/triage_handle_new_comments.yml@develop`

Locations:

- `.github/workflows/triage_closed_issue_comment.yml:11`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all 3 script-injection findings by moving ${{ }} expressions from run: shell commands into step env: blocks. Fixed all unpinned-uses findings by pinning all action references to full 40-character SHA commit hashes: actions/checkout@v7→3d3c42e5..., actions/setup-node@v7→820762786..., pnpm/action-setup@v6→0977fd99..., actions/upload-artifact@v7→043fb46d..., actions/download-artifact@v8→3e5f45b2..., browser-actions/setup-chrome@v2→48ad9237..., cycjimmy/semantic-release-action@v6→b12c8f60..., cypress-io/cypress triage workflows @develop→ee092e15... All changes preserve the original tag as a comment for readability.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in .github/workflows/main.yml at the 'Push updates to branch for major version' step. The run: command was a YAML single-quoted string that passed the shell command literally, leaving ${NEW_RELEASE_MAJOR_VERSION} unquoted in the shell. Changed to a YAML block scalar (|) and wrapped both the git URL and the refspec in double quotes so that ${NEW_RELEASE_MAJOR_VERSION} is properly double-quoted, preventing word splitting and glob expansion.

