<!-- markdownlint-disable -->

# Hardening Report: cypress-io--github-action/v7.4.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **cypress-io--github-action/v7.4.0** was hardened automatically. 2 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. In main.yml, the step 'Push updates to branch for major version' interpolates `${{steps.semantic.outputs.new_release_major_version}}` directly inside a shell command string: `git push https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git HEAD:refs/heads/v${{steps.semantic.outputs.new_release_major_version}}`. In example-custom-ci-build-id.yml, three run: steps interpolate `${{ steps.uuid.outputs.value }}` and `${{ needs.prepare.outputs.uuid }}` directly in shell commands (e.g. `echo "generated id ${{ steps.uuid.outputs.value }}"`). In example-recording.yml, a run: step interpolates `${{ steps.cypress.outcome }}` and `${{ steps.cypress.outputs.resultsUrl }}` directly in shell commands.

Locations:

- `.github/workflows/main.yml:57`
- `.github/workflows/example-custom-ci-build-id.yml:68`
- `.github/workflows/example-custom-ci-build-id.yml:78`
- `.github/workflows/example-custom-ci-build-id.yml:103`
- `.github/workflows/example-recording.yml:65`
- `.github/workflows/example-recording.yml:66`

### unpinned-uses (severity: high)

Multiple workflow files reference external actions and reusable workflows using mutable tags, version strings, or branch names instead of immutable 40-character commit SHAs. Unpinned references include: `actions/checkout@v6`, `actions/setup-node@v6`, `actions/cache@v5`, `actions/upload-artifact@v7`, `actions/download-artifact@v8`, `browser-actions/setup-chrome@v2`, `pnpm/action-setup@v6`, `cycjimmy/semantic-release-action@v6`, `cypress-io/cypress/.github/workflows/triage_add_to_project.yml@develop`, and `cypress-io/cypress/.github/workflows/triage_handle_new_comments.yml@develop`. These can be silently updated to include malicious code.

Locations:

- `.github/workflows/main.yml:14`
- `.github/workflows/main.yml:16`
- `.github/workflows/main.yml:40`
- `.github/workflows/main.yml:44`
- `.github/workflows/check-dist.yml:18`
- `.github/workflows/check-dist.yml:20`
- `.github/workflows/check-markdown.yml:11`
- `.github/workflows/example-basic.yml:22`
- `.github/workflows/example-basic.yml:52`
- `.github/workflows/example-basic.yml:54`
- `.github/workflows/example-basic-pnpm.yml:17`
- `.github/workflows/example-basic-pnpm.yml:22`
- `.github/workflows/example-basic-pnpm.yml:27`
- `.github/workflows/example-build-artifacts.yml:31`
- `.github/workflows/example-build-artifacts.yml:36`
- `.github/workflows/example-build-artifacts.yml:50`
- `.github/workflows/example-build-artifacts.yml:55`
- `.github/workflows/example-chrome-for-testing.yml:13`
- `.github/workflows/example-chrome-for-testing.yml:16`
- `.github/workflows/example-recording.yml:42`
- `.github/workflows/example-recording.yml:68`
- `.github/workflows/example-recording.yml:80`
- `.github/workflows/example-custom-ci-build-id.yml:55`
- `.github/workflows/example-custom-ci-build-id.yml:75`
- `.github/workflows/example-custom-ci-build-id.yml:100`
- `.github/workflows/add-issue-to-triage-board.yml:13`
- `.github/workflows/triage_closed_issue_comment.yml:11`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all script injection issues by moving ${{ }} expressions from run: blocks into env: blocks and referencing them as plain environment variables. Fixed all unpinned action references by replacing mutable tags (v6, v7, v8, v2, develop) with full 40-character commit SHAs. Actions pinned: actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803, actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38, actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a, actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c, browser-actions/setup-chrome@2e1d749697dd1612b833dba4a722266286fbefcd, pnpm/action-setup@0ebf47130e4866e96fce0953f49152a61190b271, cycjimmy/semantic-release-action@b12c8f6015dc215fe37bc154d4ad456dd3833c90, cypress-io/cypress reusable workflows@d52f14584e09e121ca8572378c30d5eebf72ffe5. All original tag names preserved as inline comments.

### Iteration 2

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed 2 script injection issues by moving `${{ secrets.EXAMPLE_RECORDING_KEY }}` from run: shell strings into step-level env: blocks in example-recording.yml and example-custom-ci-build-id.yml. Fixed all unpinned action references across 20+ workflow files: actions/checkout@v6 → SHA d23441a48e516b6c34aea4fa41551a30e30af803, actions/upload-artifact@v7 → SHA 043fb46d1a93c77aae656e7c1c64a875d1fc6a0a, actions/cache@v5 → SHA caa296126883cff596d87d8935842f9db880ef25, actions/setup-node@v6 → SHA 249970729cb0ef3589644e2896645e5dc5ba9c38, pnpm/action-setup@v6 → SHA 0ebf47130e4866e96fce0953f49152a61190b271. All original tags preserved as inline comments.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed two script injection findings:
1. hardened/action/.github/workflows/main.yml (line 68): Converted single-quoted `run:` string to a multi-line `run: |` block and double-quoted the git push URL arguments so that `${NEW_RELEASE_MAJOR_VERSION}` (sourced from steps.semantic.outputs) cannot inject shell metacharacters into the URL path.
2. hardened/action/.github/workflows/example-recording.yml (lines 81-82): Added double quotes around the `echo` arguments containing `$CYPRESS_OUTCOME` and `$CYPRESS_RESULTS_URL` (both sourced from steps.cypress context values) to prevent shell metacharacter injection.

