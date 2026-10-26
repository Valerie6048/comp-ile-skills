# comp-ile-skills

Skills for creating company profile websites, setting up and maintaining
GA4 and Microsoft Clarity, reliably receiving website inquiries, and producing
company website showcase videos.

## Start with the CLI

Requires Node.js 20 or later and npm.
Install the CLI once:

```sh
npm install -g @niinya/comp-ile
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
comp-ile init ./website --skill website-analytics
comp-ile init ./website --skill website-inquiries
comp-ile init ./website --skill company-profile-showcase
comp-ile init ./website --skill all --provider codex
comp-ile init --dir "./company website" --provider codex,antigravity
comp-ile init --dry-run
comp-ile init --force
```

Use `--skill website-analytics` for analytics, `--skill website-inquiries` for
inquiry forms, `--skill company-profile-showcase` for video production, or
`--skill all` for all four skills. Omitting `--skill` keeps
the company-profile-only default. Installing skill instructions does not
activate integrations or create service accounts.

The target directory can be created automatically. Identical files are skipped.
If any packaged file differs, the command stops before writing; `--force` updates
packaged files while preserving additional user files. The CLI installs the skill;
the agent builds the website using the company brief.

For a one-time run without global installation:

```sh
npx @niinya/comp-ile init
```

Installation and executable setup use standard
[npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/) and
[`package.json` bin](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#bin)
mechanisms. See [INSTALL.md](INSTALL.md) for usage without global installation
and option details. The npm package is [@niinya/comp-ile](https://www.npmjs.com/package/@niinya/comp-ile).
GitHub source installation is also available and requires Git:
`npm install -g github:Valerie6048/comp-ile-skills`.

## User guides

- [Tutorial: from installation to website review](docs/tutorial.md)
- [Troubleshooting installation and usage](docs/troubleshooting.md)
- [Versions, updates, and local edits](docs/versions-and-updates.md)
- [Sample company brief for practice](examples/ruang-reka-brief.md)
- [Changelog](CHANGELOG.md)
- [Maintainer guide: publishing to npm](docs/npm-release.md)
- [Showcase implementation plan and full roadmap](docs/plans/company-profile-showcase.md)

## Available skills

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

### website-analytics

Location: [skills/website-analytics/SKILL.md](skills/website-analytics/SKILL.md)

Supports **new setup**, **audit/repair**, and **maintenance** for GA4, Microsoft
Clarity, or both. Guides clients who have no accounts through identity selection,
account/property/stream or project creation, company administrator access, and
maintainer invitations. Continues through a tracking plan, installation, consent,
masking, verification, and handover. Works independently of the company profile
skill and preserves an existing site's stack.

Account operations use the tools and authorized access available. The user
handles login credentials, verification codes, and recovery details. When direct
account access is unavailable, the skill guides the missing steps and reports
what is pending. It distinguishes installed code, browser transmission, and
confirmed receipt in the provider dashboard.

Maintenance covers tracking repairs, changes to forms/routes/domains, access
management, and consent/masking updates. Recurring monitoring requires an
explicit request and available scheduling tools; the skill itself does not run
background checks. A [configuration record](skills/website-analytics/assets/analytics-record.md)
keeps ownership, resource IDs, tracking decisions, evidence, and maintenance notes
in the client's project.

Example request after installing the analytics skill:

```text
Use $website-analytics to set up GA4 and Microsoft Clarity for our website.
We do not have analytics accounts yet. Guide our company administrator through
creation and give our maintainer suitable access. Measure WhatsApp contact
intent and successfully received inquiry forms. Use our existing consent manager.
```

### website-inquiries

Location: [skills/website-inquiries/SKILL.md](skills/website-inquiries/SKILL.md)

Supports new inquiry/quotation forms, repairs, and maintenance. Covers server
validation, layered antispam protection, durable inquiry storage, internal email
notifications, optional visitor acknowledgments, and recovery from failed sends.
Guides company-owned email and antispam account setup, sender-domain verification,
access, and configuration when the client starts without those services.

Works with suitable existing services and stacks; Resend and Turnstile are
documented examples rather than requirements. Keeps accepted inquiries available
when email fails, prevents duplicate submissions/sends, and distinguishes inquiry
acceptance from email delivery. Plain WhatsApp links remain part of the company
profile skill. CRM and WhatsApp automation are included only when requested.

The [inquiry configuration record](skills/website-inquiries/assets/inquiries-record.md)
captures resource ownership, field rules, staff access, notification recovery,
verification, and maintenance. Live email checks use explicitly designated test
recipients; installing the skill does not send email or create background jobs.

```text
Use $website-inquiries to build a quotation form on our existing website.
We do not have an email sending service or antispam setup yet. Guide our company
administrator through setup. Store accepted inquiries, notify our designated
sales mailbox, and provide a way to retry failed notifications without duplicates.
```

### company-profile-showcase

Location: [skills/company-profile-showcase/SKILL.md](skills/company-profile-showcase/SKILL.md)

Creates a short launch/current-site showcase from a local company website,
preview, or accessible URL. Reuses real branding and UI, plans scenes, captures
safe interactions, and guides rendering with tools available in the environment.
Works with comp-ile-built and existing external projects. V1 produces one master
format per production, normally around 20 seconds at 30 fps, with optional music.

Delivers MP4, poster, caption, storyboard, production record, verification, and
actual project-specific rebuild materials. A dependency-free Node.js helper
validates storyboard frame timing and warns about short reading holds. It is not
a bundled video encoder: media production requires suitable capture/render tools,
and unavailable capabilities are reported as unfinished work.

```text
Use $company-profile-showcase to make a 20-second landscape showcase of our
local company website. Use its real UI, fonts, logo, and portfolio imagery.
Keep the tone professional, deliver a poster and caption, and describe it as
a preview because we have not deployed yet. Produce a silent master.
```

The [implementation plan](docs/plans/company-profile-showcase.md) records V1
scope and future work: redesign/case-study modes, multiple formats/languages,
voice-over/subtitles, reproducible scene revisions, and optional distribution.
These roadmap capabilities are not all implemented in V1.

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
skills/website-analytics/
  SKILL.md
  agents/openai.yaml
  assets/analytics-record.md
  references/account-and-access.md
  references/ga4.md
  references/clarity.md
  references/maintenance-and-verification.md
skills/website-inquiries/
  SKILL.md
  agents/openai.yaml
  assets/inquiries-record.md
  references/account-and-email.md
  references/submission-and-spam.md
  references/verification-and-maintenance.md
skills/company-profile-showcase/
  SKILL.md
  agents/openai.yaml
  assets/production-record.md
  assets/storyboard.example.json
  references/source-and-story.md
  references/capture-and-render.md
  references/quality-and-delivery.md
  scripts/validate-storyboard.mjs
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
skill selection and conflicts across skills,
reinstallation, preservation of user files, conflicts, dry runs, and rejection
of symlink/junction paths within skill locations. Agent behavior testing is
described below.

Storyboard tests also check timeline/frame alignment, reading-time warnings,
format dimensions, and execution of the helper after skill installation.

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
| Analytics requested with no accounts | Guide identity/resource creation, keep company admin access, and distinguish completed steps from owner actions pending |
| Existing GA4 installed through GTM and site code | Identify duplicate collection and preserve the intended property and installation path |
| WhatsApp click and failed inquiry submission | Treat the click as intent and do not emit a confirmed lead for the failed submission |
| Analytics denied or withdrawn | Verify storage and network behavior against the agreed collection policy for each provider |
| Clarity maintainer only has Member access | Explain the Admin dependency for project/masking changes and progress independent work |
| Maintenance without dashboard access | Inspect available code/browser evidence and report provider receipt as unverified |
| Inquiry setup without email/antispam accounts | Guide company-controlled service setup and DNS verification; record missing access without claiming successful sending |
| Inquiry saved but email provider unavailable | Preserve the accepted inquiry, show truthful receipt, and provide recoverable notification status |
| Double submission or lost response | Store one matching inquiry and avoid duplicate notification intents/sends |
| Reused CAPTCHA token or invalid server verification | Reject new submissions; support safe matching retries without bypassing bot checks for new requests |
| Visitor acknowledgment requested | Use a fixed receipt template and recipient limits; prevent arbitrary-content email relay |
| Showcase from a local preview | Use the real UI/assets and accurate preview wording; no public launch claim |
| URL-only showcase with lazy content | Capture rendered visitor states and inspect scene/transition frames |
| Showcase tools cannot encode MP4 | Deliver actual available materials and state that the requested video is unfinished |
| Showcase contains private form/customer data | Use safe synthetic fixtures and exclude private content from video and copy |

The website checklist is working guidance, not certification of full WCAG
conformance or a guarantee of search engine rankings.
