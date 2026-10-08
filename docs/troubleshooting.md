# Troubleshooting installation and usage

Start with the symptom you see. CLI messages explain failures; keep the full
message and command if you need to report an issue.

## Node, npm, or Git is not found

Check `node --version`, `npm --version`, and `git --version`. Install missing
tools using their official documentation and open a new terminal. The CLI
requires Node.js 20 or later; GitHub installation also requires Git.

## comp-ile is not recognized after installation

Ensure npm installation finished successfully, then open a new terminal.
Check the prefix:

```sh
npm prefix -g
```

Ensure the global npm executable location is available through PATH. Its layout
follows the [npm folder documentation](https://docs.npmjs.com/cli/v11/configuring-npm/folders/).
As an option without global installation:

```sh
npx --yes --package=github:Valerie6048/comp-ile-skills comp-ile --help
```

## PowerShell blocks npm.ps1, npx.ps1, or comp-ile.ps1

Use the corresponding Windows `.cmd` wrapper:

```powershell
npm.cmd install -g github:Valerie6048/comp-ile-skills
comp-ile.cmd init ./website
```

For a one-time run, use `npx.cmd` with the same arguments as npx.

## Fetching from GitHub fails

Check the connection, repository access, Git availability, and requested ref.
This command checks whether Git can read the remote:

```sh
git ls-remote https://github.com/Valerie6048/comp-ile-skills.git
```

If your organization's network requires a proxy or authentication, use its
applicable network and Git configuration. Ref-based installation needs a valid
tag/commit; the version in `package.json` does not automatically create a GitHub tag.

## Incorrect provider or directory

Supported provider names: `codex`, `claude-code`, `antigravity`, and `all`.
Quote directories containing spaces:

```sh
comp-ile init --dir "./company website" --provider claude-code
```

Use either a directory argument or `--dir`; do not supply both.
Without an explicit destination, the CLI uses the terminal's current working directory.

## Destination files differ

The CLI checks conflicts before writing. Review the listed files and save edits
you want to retain. `--force` replaces packaged file contents; additional files
are preserved. Details are in the [update guide](versions-and-updates.md).

## A folder is a symlink/junction, or file access is denied

The CLI rejects symlinks/junctions in provider folder paths and packaged file
destinations. Choose an ordinary project directory or review the link structure
before installing. `--force` does not change this rule. For permission errors,
choose a writable project location and follow the agent environment's permission limits.

## The skill does not appear in the application

Ensure the application has opened the destination project and these files exist:

| Application | Project file |
| --- | --- |
| Codex / Antigravity | `.agents/skills/company-profile-website/SKILL.md` |
| Claude Code | `.claude/skills/company-profile-website/SKILL.md` |

Codex detects changes; restart if the skill still does not appear. Claude Code
provides `/reload-skills` for new skill directories. Antigravity IDE lists skills
under Customizations. Behavior follows the documentation from
[OpenAI](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills), and
[Antigravity](https://antigravity.google/docs/skills).

## The skill is installed, but website code is missing

`comp-ile init` installs skill instructions. Open the agent in the project,
provide a brief, and request a website as shown in the [tutorial](tutorial.md).
Check the agent's response for important missing information or unavailable tools.

## The CLI version and project skill contents seem different

The installed CLI and the project's skill copy are updated separately.
Reinstalling the CLI does not automatically update existing projects. Follow the
[version guide](versions-and-updates.md), then reload the session if needed.

## Information to include in an issue report

Include the OS, agent application, Node/npm/CLI versions, command, provider,
error message, and whether the problem occurs in an empty project. Share only
relevant data; remove passwords, tokens, and private company/client information.
