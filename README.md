# comp-ile-skills

A skill for creating company profile websites, from business information to
implementation and quality checks.

## Start with the CLI

Requires Node.js 20 or later, npm, and Git for installation from GitHub.
Install the CLI once:

```sh
npm install -g github:Valerie6048/comp-ile-skills
```

Then run it from your website project:

```sh
comp-ile init
```

By default, the command installs all skill files into
`.agents/skills/company-profile-website/` for Codex and Antigravity, and
`.claude/skills/company-profile-website/` for Claude Code.

```sh
comp-ile init ./website --provider claude-code
comp-ile init --dir "./company website" --provider codex,antigravity
comp-ile init --dry-run
comp-ile init --force
```

The target directory can be created automatically. Identical files are skipped.
If any packaged file differs, the command stops before writing; `--force` updates
packaged files while preserving additional user files. The CLI installs the skill;
the agent builds the website using the company brief.

GitHub installation and executable setup use standard
[npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/) and
[`package.json` bin](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#bin)
mechanisms. See [INSTALL.md](INSTALL.md) for usage without global installation
and option details. The package is distributed through GitHub and has not been
published to the npm registry.

## User guides

- [Tutorial: from installation to website review](docs/tutorial.md)
- [Troubleshooting installation and usage](docs/troubleshooting.md)
- [Versions, updates, and local edits](docs/versions-and-updates.md)
- [Sample company brief for practice](examples/ruang-reka-brief.md)
- [Changelog](CHANGELOG.md)

## Available skill

### company-profile-website

Location: [skills/company-profile-website/SKILL.md](skills/company-profile-website/SKILL.md)

Supports new websites, revisions to existing sites, content preparation, and
portfolio improvements. Works across industries and follows the user's language,
brand identity, and project technology.

The main workflow:

1. Understand the company, audience, goals, and available materials.
2. Prepare service content, evidence of work, page structure, and contact paths.
3. Design and implement the requested parts.
4. Check the build, appearance, interactions, basic accessibility, and SEO within scope.
5. Hand over the code/preview, check results, and unfinished work.

The skill contains instructions and references without requiring a framework or
paid service. Code creation requires suitable file/shell tools; visual checks
require a browser/preview. If a tool is unavailable, state which checks were not
performed. Publication follows the user's request and the hosting tools available
in their environment.

Each stage has completion criteria. QA reports brief alignment and technical
quality separately. Create a specification when new or complex work needs a
reference that is not yet available; use continuation notes for lengthy work or
session/provider changes. Small revisions use the existing brief and address the
affected parts directly. Read optional details only when needed.

## Use the skill after installation

The skill uses the Agent Skills format and can be installed in Codex, Claude Code,
and Antigravity. See the [cross-provider installation guide](INSTALL.md) for folder
locations, Windows installation examples, and invocation instructions.

If the skill is available in your Codex environment:

```text
Use $company-profile-website to create my company's website.
Industry: interior design for retail and offices.
Goal: prospective clients understand our services and contact us through WhatsApp.
Use the company information and project photos I have attached.
```

To try it from this repository checkout, ask the agent to read
`skills/company-profile-website/SKILL.md` and the references it needs, then provide
the website request. This repository folder holds the skill source; storing it
here does not automatically install it into your personal skill list.

In Claude Code, use `/company-profile-website`. Antigravity 2.0 and CLI provide
the same slash command; relevant natural-language requests can also trigger the
skill. Details and documentation sources are listed in the installation guide.

The [brief form](skills/company-profile-website/assets/company-brief.md) is optional.
Users can provide information through conversation or existing documents without
completing every field.

## Structure

```text
skills/company-profile-website/
  SKILL.md
  agents/openai.yaml
  assets/company-brief.md
  references/brief-and-content.md
  references/design-and-build.md
  references/project-notes.md
  references/quality-checklist.md
```

`SKILL.md` defines the workflow. References are read only at the stages that need
them. Copy the brief form for each company; do not include private client data
in the shared skill package.

## CLI development

The CLI uses built-in Node.js features without additional dependencies. To try
local changes from a checkout:

```sh
node bin/comp-ile.js init ./test-project
node bin/comp-ile.js --help
npm test
npm pack --dry-run
```

CLI tests cover complete installation, provider selection, target directories,
reinstallation, preservation of user files, conflicts, dry runs, and rejection
of symlink/junction paths within skill locations. Agent behavior testing is
described below.

## Suggested behavior evaluation

In addition to skill structure validation, try these realistic requests before
a broad release:

| Scenario | Expected behavior |
| --- | --- |
| Company with complete information and portfolio | Build to the brief, use available evidence, and check contact paths |
| New company without clients | Explain capabilities without inventing testimonials, numbers, or client projects |
| Brief only says "build a company website" | Ask about identity and industry before writing specific claims |
| Revise the services section in an existing repository | Use an adequate brief directly, preserve the stack, and check changes without requiring a new specification or notes |
| A form is requested but no backend exists | Explain the inactive integration; do not display false submission success |
| Design without publication | Provide the preview/code without installing analytics or deploying independently |
| New website with several services, two languages, and a form | Establish a reference and acceptance criteria if absent; assess brief alignment and technical quality separately |
| Resume another provider's project with existing notes | Read the reference, compare status with the code, and continue without repeating an adequate briefing |

The website checklist is working guidance, not certification of full WCAG
conformance or a guarantee of search engine rankings.
