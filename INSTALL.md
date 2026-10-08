# Cross-provider installation

Keep one source in `skills/company-profile-website/`. The `comp-ile init` CLI
installs all packaged skill files, including `references/` and `assets/`, into
the location read by the target application. Relative instruction links keep working.

## Install the CLI from GitHub

Requires Node.js 20 or later, npm, and Git to fetch the package from GitHub:

```sh
npm install -g github:Valerie6048/comp-ile-skills
comp-ile init
```

The `init` command uses the current working directory. For another destination:

```sh
comp-ile init ./website
comp-ile init --dir "./company website"
```

Missing directories are created automatically. By default, all three providers
are supported through two locations: Codex and Antigravity share `.agents/skills/`,
while Claude Code uses `.claude/skills/`.

For a one-time run without global installation:

```sh
npx --yes --package=github:Valerie6048/comp-ile-skills comp-ile init ./website
```

GitHub fetching uses [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/),
the command name uses [`bin`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#bin),
and temporary package execution uses [npm exec/npx](https://docs.npmjs.com/cli/v11/commands/npm-exec/).
This package has not been published to the npm registry; use the GitHub source
in the command.

## CLI options

| Option | Behavior |
| --- | --- |
| `init [directory]` | Install into this directory; defaults to the working directory |
| `--dir <directory>` | Alternative destination argument; use only one form |
| `--provider <name>` | `all` (default), `codex`, `claude-code`, or `antigravity` |
| `--provider codex,claude-code` | Select multiple providers; the option can also be repeated |
| `--dry-run` | Check destinations and display the plan without writing |
| `--force` | Update differing packaged files while preserving additional files |
| `--help` / `--version` | CLI help or version |

```sh
comp-ile init --provider claude-code
comp-ile init ./website --provider codex,antigravity
comp-ile init ./website --dry-run
comp-ile init ./website --force
```

Rerunning does not rewrite identical files. Conflicts are checked at every
destination before copying begins. If a packaged file differs, the command fails
with a conflict list; review it and use `--force` to replace those files. This option
does not delete additional files. Provider paths or packaged file destinations
that are symlinks/junctions, and file/directory type conflicts, are still rejected
with `--force` so copying follows the intended project destination.

To update the skill source, reinstall the CLI from GitHub, inspect the plan with
`comp-ile init --dry-run`, then use `--force` if you intend to replace differing
files. Version selection and preservation of local edits are explained in the
[update guide](docs/versions-and-updates.md).

On Windows, if PowerShell blocks npm's `.ps1` wrappers, use `npm.cmd`, `npx.cmd`,
or `comp-ile.cmd` for the corresponding command.

## Package format

The core format follows [Agent Skills](https://agentskills.io/specification):
`SKILL.md` with `name` and `description` frontmatter, followed by Markdown instructions.
The main workflow does not rely on Claude-specific execution syntax, the author's
machine paths, or provider-specific tool names.

`agents/openai.yaml` is optional metadata for OpenAI environments. The workflow
does not depend on it; other providers can keep the folder in the package or
exclude it. There is no need to convert this metadata into instructions for
other providers.

## Installation locations

Documentation checked on October 7, 2026. `~` means the user's home directory,
such as `C:\Users\username` on Windows. This table covers local applications;
cloud environments have their own discovery mechanisms.

| Application | For one project | For all user projects |
| --- | --- | --- |
| Codex | `<project>/.agents/skills/company-profile-website/` | `~/.agents/skills/company-profile-website/` |
| Claude Code | `<project>/.claude/skills/company-profile-website/` | `~/.claude/skills/company-profile-website/` |
| Antigravity 2.0 / IDE | `<project>/.agents/skills/company-profile-website/` | `~/.gemini/config/skills/company-profile-website/` |
| Antigravity CLI | `<project>/.agents/skills/company-profile-website/` | `~/.gemini/antigravity-cli/skills/company-profile-website/` |

Locations and discovery behavior follow the official documentation from
[OpenAI](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills), and
[Antigravity](https://antigravity.google/docs/skills).
Antigravity also documents some legacy paths; use the current paths in the table
for new installations. Check older application versions against their own documentation.

The CLI currently installs project-scoped skills on Windows, macOS, and Linux.
Global locations in the table are provided for manual personal skill installation;
installing the CLI globally and installing a skill globally are different choices.
Avoid installing the same skill globally and within a project unless you need
the provider's precedence or duplication behavior.

## Invocation and checks

| Application | Explicit invocation |
| --- | --- |
| Codex | `Use $company-profile-website to create my company's website.` |
| Claude Code | `/company-profile-website` followed by the brief |
| Antigravity 2.0 / CLI | `/company-profile-website` followed by the brief |

Invocation follows the guides from
[OpenAI](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills), and
[Antigravity](https://antigravity.google/docs/skills).
The skill description also helps automatic selection when the user's request is relevant.

After copying, check the skill list or command menu in the target application.
If the skill is not detected, start a new session or reload as appropriate, and
ensure the correct folder is open and `SKILL.md` is directly inside the skill
folder. Codex documentation suggests restarting if a new skill does not appear.
In Claude Code, `/reload-skills` can load new skill directories. Antigravity IDE
provides the active list through the Customizations menu.

Try the same company brief and materials in each application. Check whether the
agent reads references, asks for important missing information, follows the
project stack, and avoids invented business evidence. Continue through
implementation and QA when testing complete website creation.

A shared package format supports portable instructions. Results and execution
capabilities still depend on the model, browser/shell tools, permissions, and
environment. If a browser or hosting is unavailable, the agent must report what
remains unverified or cannot be performed.

## Sharing and updates

Share the repository or an archive containing the entire
`company-profile-website/` folder. Users install it according to the table.
Plugin packaging may be added for distribution through a specific application's
plugin system; each application's manifest should be handled separately from
the core skill.

This repository provides the CLI and skill source. Tests verify package copying
and command behavior in temporary projects. Agent behavior in Codex, Claude Code,
and Antigravity requires separate checks.

For your first practice project, follow the [tutorial](docs/tutorial.md).
If commands or the skill are not detected, use
[troubleshooting](docs/troubleshooting.md).
