# Tutorial: build your first company profile website

This tutorial uses the fictional company **Ruang Reka Demo**, an interior design
studio for retail and offices. Use it for local practice. The example content is
a tutorial scenario, not a portfolio or evidence of real company experience.

The intended result is a one-page website that explains services, shows labeled
conceptual examples, and includes a contact layout. Real contact details are
unavailable, so submission controls remain inactive in this exercise.

## 1. Check your tools

Open a terminal and check:

```sh
node --version
npm --version
git --version
```

The CLI requires Node.js 20 or later. npm and Git are used for installation from
GitHub. Your chosen agent application must be able to read and edit the project;
a preview/browser helps with visual checks. If a command fails, see
[troubleshooting](troubleshooting.md).

## 2. Install the CLI and skill

```sh
npm install -g github:Valerie6048/comp-ile-skills
comp-ile --version
comp-ile init ./website-demo
```

`init` creates the destination directory if needed and installs the skill.
By default, the result includes:

```text
website-demo/
  .agents/skills/company-profile-website/
  .claude/skills/company-profile-website/
```

Codex and Antigravity use the first folder; Claude Code uses the second.
For one provider, add `--provider codex`, `--provider antigravity`, or
`--provider claude-code`. This command prepares the skill instructions;
the agent creates the website code in a later step.

Options without global installation and folder details are in
[INSTALL.md](../INSTALL.md). On Windows, use `.cmd` wrappers if PowerShell
blocks `.ps1`.

## 3. Open the project and prepare the brief

Open `website-demo` in your chosen agent application. If using a terminal,
enter the folder before starting the agent session:

```sh
cd website-demo
```

Open the [sample brief](../examples/ruang-reka-brief.md), then paste its content
into the conversation or save it in the project as `brief.md`. For your own
company, use the
[brief form](../skills/company-profile-website/assets/company-brief.md)
and replace the example information with supported facts.

## 4. Ask the agent to build the website

In Codex, start with:

```text
Use $company-profile-website to build a website based on the Ruang Reka Demo
brief I provided. Create a local, one-page preview in English. Use the
simplest technology that fits the project.
Label conceptual projects as examples. Contact details are unavailable;
show a contact layout with a clear explanation and no fictitious destinations.
Provide run instructions and QA results. Publication is outside this exercise.
```

In Claude Code or Antigravity 2.0/CLI, start with
`/company-profile-website`, then provide the same brief and request.
Invocation follows the documentation from
[OpenAI](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills), and
[Antigravity](https://antigravity.google/docs/skills).

The agent reads existing materials, asks about important gaps, and works on
content and code. For this simple example, the brief is a sufficient reference.
Additional specifications are needed only when the scope calls for them.

## 5. Run the preview and review the result

Use the preview command provided by the agent; it depends on the project's
technology. Open the resulting URL or file. Check both assessments:

| Brief alignment | Technical quality |
| --- | --- |
| Industry and audience are clear | Content is readable on mobile and desktop |
| Three services explain their scope and deliverables | Navigation and menus work |
| Conceptual projects are labeled | Controls work with the keyboard |
| No invented clients, testimonials, or numbers | Build/project checks pass when available |
| Inactive contact channels are explained accurately | Metadata matches the content; no fictitious domain |

When using real company data later, add confirmed contacts and check link
destinations. A practice website with inactive contacts does not yet meet
the client inquiry goal of a production site.

## 6. Request a specific revision

```text
Use the same skill. Improve the services section so visitors understand
the difference between interior design, 3D visualization, and implementation support.
Keep the existing structure and technology. Check the affected parts and report
brief alignment and technical quality.
```

Small revisions use the existing reference. Running `comp-ile init` again does
not request website revisions; it installs or updates skill files.

## 7. Continue in another session if needed

If switching providers or stopping work that needs to resume, ask the agent
to record decisions, status, check results, and next steps in project notes.
In the next session, provide the notes' location and ask the agent to compare
them with the current code. A final summary is enough for a completed exercise.

To update the skill or preserve your edits, read the
[versions and updates guide](versions-and-updates.md).
