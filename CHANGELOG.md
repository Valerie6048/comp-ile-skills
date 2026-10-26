# Changelog

## 0.2.1 - 2026-10-26

- Fix storyboard helper CLI detection through symlinked paths on macOS.
- Add a regression test for symlinked helper invocation.

## 0.2.0 - 2026-10-26

- Company profile showcase V1 skill for authentic website launch/current-site
  videos, optional music, storyboard, poster/caption, reproduction, and media QA.
- Dependency-free storyboard timing validator, helper/installer tests, and
  `--skill company-profile-showcase` selection, also included in `--skill all`.
- Full showcase implementation roadmap covering narrative modes, adaptations,
  narration/subtitles, scene revisions, maintenance, and optional distribution.
- Website inquiries skill covering email/antispam account onboarding, sender
  verification, form validation and abuse controls, durable lead storage,
  notifications, optional acknowledgments, failure recovery, and maintenance.
- `--skill website-inquiries` selection and inclusion in `--skill all`.
- Website analytics skill covering GA4 and Microsoft Clarity onboarding from
  account creation, company ownership and maintainer access, tracking plans,
  consent/masking, installation, verification, repairs, and maintenance records.
- CLI skill selection with `--skill website-analytics`, comma-separated or
  repeated selections, and `--skill all`; the default remains company profile.
- Conflict checks across all selected skills and providers before copying.
- Public npm registry configuration, package discovery metadata, a test gate
  before publication, and a maintainer release guide.
- MIT license for the CLI, skill, and included documentation.
- Demo company tutorial covering installation through website review.
- Troubleshooting guide for the CLI and skill discovery in agent applications.
- Guide to versions, project updates, and handling local edits.
- Documentation and the practice brief included in the npm package.
- English documentation, skill instructions, metadata, examples, and CLI messages.

## Initial snapshot 0.1.0

Available on GitHub through commit
[`de83f52`](https://github.com/Valerie6048/comp-ile-skills/commit/de83f52413247abe4786f3cdd16a35dbbb28e1c7)
on October 8, 2026. This is a commit snapshot; no release tag was created for it.

- Company profile website skill covering briefs, content, implementation, and QA.
- Stage completion criteria and separate brief/technical assessments.
- Specifications and project notes used as needed.
- `comp-ile init` CLI for Codex, Claude Code, and Antigravity.
- Directory/provider selection, dry runs, and conflict handling with force.
- CLI tests and a Windows, macOS, and Linux test workflow.
