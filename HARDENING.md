<!-- markdownlint-disable -->

# Hardening Report: cypress-io--github-action/v7.1.9

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **cypress-io--github-action/v7.1.9** was hardened automatically. 4 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Every workflow file uses tag-based or branch-based `uses:` references instead of full 40-character SHA commit hashes. This exposes the action to supply-chain attacks if the referenced tag or branch is moved or compromised. Failing references include: actions/checkout@v6, actions/setup-node@v6, pnpm/action-setup@v5, actions/cache@v5, actions/upload-artifact@v7, actions/download-artifact@v8, cycjimmy/semantic-release-action@v6, cypress-io/cypress/.github/workflows/triage_add_to_project.yml@develop, cypress-io/cypress/.github/workflows/triage_handle_new_comments.yml@develop, and others across all workflow files.

Locations:

- `.github/workflows/main.yml:13`
- `.github/workflows/main.yml:15`
- `.github/workflows/main.yml:38`
- `.github/workflows/check-dist.yml:20`
- `.github/workflows/check-dist.yml:22`
- `.github/workflows/add-issue-to-triage-board.yml:13`
- `.github/workflows/triage_closed_issue_comment.yml:11`
- `.github/workflows/example-basic.yml:30`
- `.github/workflows/example-basic.yml:52`
- `.github/workflows/example-basic-pnpm.yml:19`
- `.github/workflows/example-basic-pnpm.yml:26`
- `.github/workflows/example-basic-pnpm.yml:31`
- `.github/workflows/example-build-artifacts.yml:30`
- `.github/workflows/example-build-artifacts.yml:38`
- `.github/workflows/example-build-artifacts.yml:51`
- `.github/workflows/example-recording.yml:50`
- `.github/workflows/example-custom-ci-build-id.yml:44`
- `.github/workflows/example-install-only.yml:22`
- `.github/workflows/example-yarn-modern.yml:14`
- `.github/workflows/example-yarn-modern.yml:18`
- `.github/workflows/example-yarn-modern-pnp.yml:14`
- `.github/workflows/example-yarn-modern-pnp.yml:18`

### missing-permissions (severity: medium)

No workflow file under .github/workflows/ defines a top-level `permissions:` key, and no individual job defines a `permissions:` key. Without explicit permissions, GitHub Actions grants the default (potentially write) token permissions to every job, violating the principle of least privilege.

Locations:

- `.github/workflows/main.yml:1`
- `.github/workflows/check-dist.yml:1`
- `.github/workflows/check-markdown.yml:1`
- `.github/workflows/add-issue-to-triage-board.yml:1`
- `.github/workflows/triage_closed_issue_comment.yml:1`
- `.github/workflows/example-basic.yml:1`
- `.github/workflows/example-basic-pnpm.yml:1`
- `.github/workflows/example-build-artifacts.yml:1`
- `.github/workflows/example-chrome-for-testing.yml:1`
- `.github/workflows/example-chrome.yml:1`
- `.github/workflows/example-component-test.yml:1`
- `.github/workflows/example-config.yml:1`
- `.github/workflows/example-cron.yml:1`
- `.github/workflows/example-custom-ci-build-id.yml:1`
- `.github/workflows/example-custom-command.yml:1`
- `.github/workflows/example-debug.yml:1`
- `.github/workflows/example-docker.yml:1`
- `.github/workflows/example-edge.yml:1`
- `.github/workflows/example-env.yml:1`
- `.github/workflows/example-firefox.yml:1`
- `.github/workflows/example-install-command.yml:1`
- `.github/workflows/example-install-only.yml:1`
- `.github/workflows/example-node-versions.yml:1`
- `.github/workflows/example-quiet.yml:1`
- `.github/workflows/example-recording.yml:1`
- `.github/workflows/example-start.yml:1`
- `.github/workflows/example-start-and-pnpm-workspaces.yml:1`
- `.github/workflows/example-start-and-yarn-workspaces.yml:1`
- `.github/workflows/example-wait-on.yml:1`
- `.github/workflows/example-webpack.yml:1`
- `.github/workflows/example-yarn-classic.yml:1`
- `.github/workflows/example-yarn-modern.yml:1`
- `.github/workflows/example-yarn-modern-pnp.yml:1`

### script-injection (severity: high)

Multiple `run:` blocks directly interpolate `${{ }}` expressions into shell commands (sub-rule a). This allows expression values to be interpreted as shell code before the shell ever sees them. Offending lines:
- example-recording.yml line 34: `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]`
- example-recording.yml line 68: `echo Cypress finished with: ${{ steps.cypress.outcome }}`
- example-recording.yml line 69: `echo See results at ${{ steps.cypress.outputs.resultsUrl }}`
- example-custom-ci-build-id.yml line 47: `if [ "${{ secrets.EXAMPLE_RECORDING_KEY }}" != '' ]`
- example-custom-ci-build-id.yml line 65: `echo "generated id ${{ steps.uuid.outputs.value }}"`
- example-custom-ci-build-id.yml line 79: `echo "Custom build id is ${{ needs.prepare.outputs.uuid }}"`
- example-custom-ci-build-id.yml line 113: `echo "Custom build id is ${{ needs.prepare.outputs.uuid }}"`
- main.yml line 54: `git push ... HEAD:refs/heads/v${{steps.semantic.outputs.new_release_major_version}}`

Locations:

- `.github/workflows/example-recording.yml:34`
- `.github/workflows/example-recording.yml:68`
- `.github/workflows/example-recording.yml:69`
- `.github/workflows/example-custom-ci-build-id.yml:47`
- `.github/workflows/example-custom-ci-build-id.yml:65`
- `.github/workflows/example-custom-ci-build-id.yml:79`
- `.github/workflows/example-custom-ci-build-id.yml:113`
- `.github/workflows/main.yml:54`

### github-env-injection (severity: high)

Two `run:` blocks write to `$GITHUB_OUTPUT` without sanitization, inside scripts that also directly interpolate `${{ }}` expressions. In example-recording.yml and example-custom-ci-build-id.yml, the `check-record-key` step uses `${{ secrets.EXAMPLE_RECORDING_KEY }}` directly in the shell script and then writes `echo "defined=true" >> $GITHUB_OUTPUT` and `echo "defined=false" >> $GITHUB_OUTPUT` without applying the required `printf '%s' ... | tr -d '\n\r'` sanitization before the write. The `steps.*.outputs.*` and `needs.*.outputs.*` values echoed in other run: blocks are also written to the terminal without sanitization.

Locations:

- `.github/workflows/example-recording.yml:35`
- `.github/workflows/example-recording.yml:37`
- `.github/workflows/example-custom-ci-build-id.yml:48`
- `.github/workflows/example-custom-ci-build-id.yml:50`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions, script-injection, github-env-injection

**Notes:**

Fixed all 4 finding types across 33 workflow files:

1. unpinned-uses: Pinned all action references to full SHA hashes: actions/checkout@v6 → d23441a48e516b6c34aea4fa41551a30e30af803, actions/setup-node@v6 → 249970729cb0ef3589644e2896645e5dc5ba9c38, pnpm/action-setup@v5 → fc06bc1257f339d1d5d8b3a19a8cae5388b55320, actions/cache@v5 → caa296126883cff596d87d8935842f9db880ef25, actions/upload-artifact@v7 → 043fb46d1a93c77aae656e7c1c64a875d1fc6a0a, actions/download-artifact@v8 → 3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c, cycjimmy/semantic-release-action@v6 → b12c8f6015dc215fe37bc154d4ad456dd3833c90, cypress-io/cypress@develop → b4ad58f5275ea0233bb114cb66c85f41f5ab6a8b, browser-actions/setup-chrome@v2 → 48ad923757ca74d66703209fe939badbdf80f2f4.

2. missing-permissions: Added top-level `permissions: contents: read` to all 33 workflow files. The release job in main.yml gets `contents: write` and `id-token: write` at the job level since it needs to push branches and publish packages.

3. script-injection: Moved all ${{ }} expressions out of run: shell scripts into env: blocks. Fixed in example-recording.yml (EXAMPLE_RECORDING_KEY secret, cypress outcome/resultsUrl outputs), example-custom-ci-build-id.yml (EXAMPLE_RECORDING_KEY secret, uuid and prepare outputs), and main.yml (new_release_major_version output).

4. github-env-injection: Fixed check-record-key steps in example-recording.yml and example-custom-ci-build-id.yml to use printf '%s' ... | tr -d '\n\r' sanitization before writing to $GITHUB_OUTPUT, and moved the secret access to an env: block.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in .github/workflows/main.yml at the 'Push updates to branch for major version' step. Changed the run: command from a YAML single-quoted string (which left ${NEW_RELEASE_MAJOR_VERSION} unquoted in the shell) to a YAML block scalar with proper double-quoting around both the URL and refspec arguments: `git push "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" "HEAD:refs/heads/v${NEW_RELEASE_MAJOR_VERSION}"`. This prevents shell metacharacter injection from a tampered semantic-release action output.

