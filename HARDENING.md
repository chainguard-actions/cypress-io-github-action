<!-- markdownlint-disable -->

# Hardening Report: cypress-io--github-action/v7.4.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **cypress-io--github-action/v7.4.2** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Every workflow file uses tag-based or branch-based `uses:` references instead of pinned 40-character SHA commit hashes. This exposes the workflows to supply-chain attacks if any referenced action is compromised or its tag is moved. Failing references include: `actions/checkout@v7`, `actions/setup-node@v7`, `cycjimmy/semantic-release-action@v6`, `pnpm/action-setup@v6`, `browser-actions/setup-chrome@v2`, `actions/upload-artifact@v7`, `actions/download-artifact@v8`, `cypress-io/cypress/.github/workflows/triage_add_to_project.yml@develop`, `cypress-io/cypress/.github/workflows/triage_handle_new_comments.yml@develop`, and others across all 33 workflow files.

Locations:

- `.github/workflows/add-issue-to-triage-board.yml:14`
- `.github/workflows/check-dist.yml:20`
- `.github/workflows/check-dist.yml:22`
- `.github/workflows/check-markdown.yml:14`
- `.github/workflows/example-basic-pnpm.yml:20`
- `.github/workflows/example-basic-pnpm.yml:26`
- `.github/workflows/example-basic-pnpm.yml:32`
- `.github/workflows/example-basic.yml:22`
- `.github/workflows/example-basic.yml:44`
- `.github/workflows/example-basic.yml:62`
- `.github/workflows/example-basic.yml:64`
- `.github/workflows/example-build-artifacts.yml:30`
- `.github/workflows/example-build-artifacts.yml:37`
- `.github/workflows/example-build-artifacts.yml:44`
- `.github/workflows/example-build-artifacts.yml:55`
- `.github/workflows/example-build-artifacts.yml:57`
- `.github/workflows/example-chrome-for-testing.yml:13`
- `.github/workflows/example-chrome-for-testing.yml:17`
- `.github/workflows/example-chrome.yml:12`
- `.github/workflows/example-chrome.yml:18`
- `.github/workflows/example-component-test.yml:13`
- `.github/workflows/example-config.yml:12`
- `.github/workflows/example-cron.yml:10`
- `.github/workflows/example-custom-ci-build-id.yml:43`
- `.github/workflows/example-debug.yml:22`
- `.github/workflows/example-docker.yml:18`
- `.github/workflows/example-edge.yml:11`
- `.github/workflows/example-env.yml:22`
- `.github/workflows/example-expose.yml:12`
- `.github/workflows/example-firefox.yml:11`
- `.github/workflows/example-install-command.yml:12`
- `.github/workflows/example-node-versions.yml:14`
- `.github/workflows/example-quiet.yml:11`
- `.github/workflows/example-recording.yml:33`
- `.github/workflows/example-start-and-pnpm-workspaces.yml:19`
- `.github/workflows/example-start-and-yarn-workspaces.yml:19`
- `.github/workflows/example-start.yml:12`
- `.github/workflows/example-wait-on.yml:12`
- `.github/workflows/example-webpack.yml:11`
- `.github/workflows/example-yarn-classic.yml:12`
- `.github/workflows/example-yarn-modern-pnp.yml:12`
- `.github/workflows/example-yarn-modern.yml:12`
- `.github/workflows/main.yml:14`
- `.github/workflows/main.yml:16`
- `.github/workflows/main.yml:41`
- `.github/workflows/main.yml:44`
- `.github/workflows/triage_closed_issue_comment.yml:11`

### script-injection (severity: high)

Multiple `run:` blocks directly interpolate `${{ }}` expressions into shell commands, violating sub-rule (a). This allows expression values to be parsed as shell code before the shell ever sees them.

**example-recording.yml** (line 35): `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]` — a secret value is interpolated directly into a shell conditional inside a `run:` block.

**example-recording.yml** (lines 70-71): `echo Cypress finished with: ${{ steps.cypress.outcome }}` and `echo See results at ${{ steps.cypress.outputs.resultsUrl }}` — step outputs interpolated directly into shell echo commands.

**example-custom-ci-build-id.yml** (line 47): `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]` — same pattern as above.

**example-custom-ci-build-id.yml** (line 68): `echo "generated id ${{ steps.uuid.outputs.value }}"` — step output interpolated into shell.

**example-custom-ci-build-id.yml** (lines 78, 103): `echo "Custom build id is ${{ needs.prepare.outputs.uuid }}"` — job output interpolated into shell.

**main.yml** (line 55): `git push https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git HEAD:refs/heads/v${{steps.semantic.outputs.new_release_major_version}}` — step output `steps.semantic.outputs.new_release_major_version` is interpolated directly into a shell git push command. All these should use environment variables instead of direct `${{ }}` interpolation in `run:` blocks.

Locations:

- `.github/workflows/example-recording.yml:35`
- `.github/workflows/example-recording.yml:70`
- `.github/workflows/example-recording.yml:71`
- `.github/workflows/example-custom-ci-build-id.yml:47`
- `.github/workflows/example-custom-ci-build-id.yml:68`
- `.github/workflows/example-custom-ci-build-id.yml:78`
- `.github/workflows/example-custom-ci-build-id.yml:103`
- `.github/workflows/main.yml:55`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references across 33+ workflow files by pinning to full 40-character SHA commit hashes: actions/checkout@v7→SHA 3d3c42e, actions/setup-node@v7→SHA 820762786, cycjimmy/semantic-release-action@v6→SHA b12c8f6, pnpm/action-setup@v6→SHA 0977fd9, browser-actions/setup-chrome@v2→SHA 2e1d749, actions/upload-artifact@v7→SHA 043fb46, actions/download-artifact@v8→SHA 3e5f45b, and both cypress-io/cypress reusable workflow @develop references→SHA a0e59ce. Fixed all script-injection issues by moving ${{ }} expressions from run: blocks to env: blocks in example-recording.yml (secrets.EXAMPLE_RECORDING_KEY, steps.cypress.outcome, steps.cypress.outputs.resultsUrl), example-custom-ci-build-id.yml (secrets.EXAMPLE_RECORDING_KEY, steps.uuid.outputs.value, needs.prepare.outputs.uuid in two jobs), and main.yml (steps.semantic.outputs.new_release_major_version moved to NEW_RELEASE_MAJOR_VERSION env var).

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed two script-injection findings:
1. hardened/action/.github/workflows/main.yml (line 57): The git push command was in a single-quoted YAML scalar, preventing shell quoting of `${NEW_RELEASE_MAJOR_VERSION}`. Converted to a block scalar (`|`) and wrapped both the URL and refspec arguments in double-quotes so the variable expansion is properly quoted.
2. hardened/action/.github/workflows/example-recording.yml (lines 77-78): Added double-quotes around `$CYPRESS_OUTCOME` and `$CYPRESS_RESULTS_URL` in the echo commands to prevent shell metacharacter interpretation of step output values.

