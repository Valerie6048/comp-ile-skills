# Company Profile Showcase implementation plan

Created: October 25, 2026. Scope agreed in the comp-ile skill design discussion.
Status: V1 skill and installer implemented and automatically checked. Real video
production evaluation remains pending; later phases are planned capabilities.

## Product outcome

Create a brand-specific, short video from a company profile website, with a
poster, share copy, production notes, and reproducible render materials. Accept
websites built with comp-ile and websites built elsewhere. Support both local
projects/previews and accessible website URLs, including projects not deployed.

Keep the website and verified company materials as the visual and factual source.
Use the company's actual logo, typography, imagery, UI, and suitable interactions.
Do not require fabricated product screens, business results, or testimonials.
Keep truthful distinctions between a preview, implemented site, and public launch.

The full skill covers a production lifecycle: creative brief, material audit,
story, visual/audio production, adaptations, QA, delivery, revision, and updates.
Load optional guidance only when needed so a simple video remains simple to make.

## Decisions already made

- Skill name: `company-profile-showcase`; independently usable from other skills.
- The user chooses the source; comp-ile authorship is not a prerequisite.
- Local source uses authentic components/styles/assets where practical. A URL
  without source uses visitor-view browser capture and permitted local assets.
- Aim for recognizable, readable footage rather than generic promotional cards.
- Default starting point: around 20 seconds, 30 fps, professional brand-led tone.
  Landscape, vertical, and square are available; choose the requested output.
- Audio is optional. Preserve an explicit silent-video request. For music,
  use original/generated audio or material with known permitted use.
- No fixed model, framework, video library, paid service, or universal encoder
  dependency. Inspect the actual environment before selecting a render path.
- Work continues after a reviewable storyboard unless the user requested a
  concept review or a material decision/access dependency remains unanswered.
- Rendering does not imply authorization to publish, send messages, or change
  the website. Normal authorized task steps do not require repeated permission.
- Build instructions independently for this package, using brag-slim as design
  inspiration; no dependency on a separately installed brag skill or model handoff.

## Complete product scope

| Area | Full capability | Evidence of completion |
| --- | --- | --- |
| Creative brief | Goal, audience, language, tone, channel, CTA, duration, formats, sound preference | Production record contains explicit choices or documented assumptions |
| Material audit | Inspect source/site, brand, content, routes, assets, publication permissions, private data | Source inventory maps every scene and claim to usable material |
| Story | Select angle, hook, highlights, copy, timing, storyboard, and closing action | A stranger can identify the company, offering, and next step |
| Visual production | Real UI, interactions, desktop/mobile framing, camera motion, typography, transitions | Scene and transition stills are readable and faithful to the brand |
| Audio | Music, effects, optional voice-over, mix, synchronization, rights | Audio assets/provenance are recorded and final playback is checked |
| Adaptations | Landscape/vertical/square, short cutdowns, languages, captions/subtitles | Each requested variant is re-composed and independently checked |
| Delivery | Video, poster, copy, optional subtitles, storyboard, scripts, configuration, QA evidence | Files are accessible and rebuild steps are documented |
| Revision | Change copy, scene, project selection, tone, format, or timing | Existing work is reused and affected output is rechecked |
| Maintenance | Refresh for new services, portfolio, domain, branding, or website redesign | Source changes and affected scenes are recorded; previous exports remain recoverable |

### Narrative modes

1. **Website launch:** introduce the company and its new website; show the
   strongest content and visitor path. A local preview uses preview wording.
2. **Redesign showcase:** compare available before/after material, matching
   viewports and interactions. Explain observable improvements; do not invent
   conversion, traffic, or revenue gains. If the old version is missing, request
   that material or propose a current-site showcase.
3. **Service or portfolio highlight:** focus on one offering/project, supported
   evidence, and the relevant contact action. Portfolio publication permissions
   and attribution still apply.
4. **Project case study:** show the client's need, design/implementation choices,
   and delivered experience for a builder's portfolio. Distinguish a demonstrable
   implementation outcome from unmeasured business impact.

### Audience and copy

The company-facing promotion and the builder's portfolio can need different
angles. Confirm the intended audience before writing copy. Keep text specific
to the business; use public company contacts only when intended for the output.
Mask private/customer data and avoid displaying internal URLs or admin panels.
Translation is editorial adaptation: reading time, line breaks, and CTA need
checking for each language, not only string replacement.

### Revision and long-term production record

Record source locations, route/viewport, asset provenance, permissions,
storyboard/configuration version, scene IDs, timing, audio provenance, render
command/environment, and output verification. Store project-specific materials
in that project's output folder, outside this shared skill source.

Later revisions should identify changed inputs and affected scenes, preserve the
last accepted export, and rebuild the affected sequence where tooling permits.
Changes to timing, fonts, sound, or transitions can affect adjacent scenes and
require broader checks. Scene-level revisions must not claim incremental render
support until a real renderer can reproduce the result.

## V1 implementation boundary

V1 provides instructions and lightweight reusable resources for an agent to
produce a complete website showcase using available tools. It is not a bundled
universal renderer or a background production service.

Included in this implementation:

- Local project/preview and visitor-accessible URL inputs.
- A launch/current-site showcase with brand-led tone and focused highlights.
- One requested master aspect ratio per production: landscape 1920x1080,
  vertical 1080x1920, or square 1080x1080, normally 30 fps and about 20 seconds.
- Source/brand inspection, concise brief, storyboard and production record.
- Authentic UI capture/reuse, safe simulated interactions, and optional music.
- Tool discovery, frame/asset readiness, rendering guidance, and reusable scripts
  created for the actual project inside its output folder.
- A dependency-free storyboard validator for scene timing, frame alignment,
  unique scene IDs, dimensions, and reading-time warnings.
- MP4, settled poster, share copy, storyboard/configuration, reproduction notes,
  and explicit verification evidence/limits.
- Installer selection, source documentation, structural checks, and installer
  tests. No actual client video is implied by installing the skill.

Deferred product commitments:

- Dedicated before/after and builder case-study procedures.
- Automated production of multiple output formats or languages in one run.
- A maintained cross-project render engine and automated source-change detection.
- Voice-over, timed subtitle export, reusable audio mastering, and media libraries.
- Automated incremental scene rendering, campaign variants, and scheduled refreshes.
- Publishing connectors, uploads, scheduling, or campaign analytics integrations.

V1 can follow a user's reasonable creative direction, but these deferred
capabilities are not advertised as implemented production modes.

## Technical structure

```text
skills/company-profile-showcase/
  SKILL.md
  agents/openai.yaml
  references/source-and-story.md
  references/capture-and-render.md
  references/quality-and-delivery.md
  assets/production-record.md
  assets/storyboard.example.json
  scripts/validate-storyboard.mjs
```

Keep shared purpose and mode boundaries in `SKILL.md`. Load references at the
relevant step. The production record and storyboard are copied/adapted into the
client output. The validator reads JSON and prints a derived timeline; it does
not capture a site, render video, or certify factual/visual/audio quality.

Generated production folder:

```text
showcase-output[-timestamp]/
  showcase.mp4
  poster.jpg
  share-copy.txt
  storyboard.md
  storyboard.json
  production-record.md
  verification.json
  work/                         captures, audio, scripts, stills, rebuild notes
```

Do not link installed instructions to this repository-only roadmap. Future
implementation work starts from this plan and the current skill source.

## Phased implementation and acceptance

### Phase 1: usable single-output showcase

- [x] Create the V1 skill, references, templates, and timing validator.
- [x] Register CLI selection; `--skill all` includes showcase while bare `init`
  continues installing only company profile.
- [x] Check installation, provider combinations, conflicts, dry runs, force,
  preservation of custom files, and repeated installs for the new skill.
- [x] Check validator against valid and invalid frame/timeline inputs.
- [x] Validate skill structure, local links, metadata, and package inclusion.
- [x] Document the current scope, usage, and deferred capabilities.

Implementation evidence, October 25, 2026:

- `npm test`: 31 passed, including 24 installer tests and 7 storyboard tests.
  Installed helper execution is checked from both provider destination folders.
- Skill Creator's structure validator passed for `company-profile-showcase`.
- Nine local instruction/resource links and UI metadata were checked.
- `npm pack --dry-run` includes all eight showcase skill files and this plan.
- Installer dry run lists all four packaged skills; `git diff --check` passed.
- No client video was rendered or published during this implementation. The
  evaluations below remain necessary to establish production behavior.

Production readiness evaluation before a broad release (separate from installer
and schema validation):

- [ ] Produce a local-project showcase with real UI; inspect scene/transition
  stills, playback/seeks, technical metadata, poster, and audio if requested.
- [ ] Produce a URL-only showcase with dynamic/lazy content and safe interactions.
- [ ] Exercise one vertical master and long/localized text for actual readability.
- [ ] Exercise missing render tools and verify a truthful partial handoff without
  a fake MP4 or an unsupported claim of completion.

### Phase 2: narrative modes

- [ ] Add targeted guidance for redesign, service/portfolio focus, and case study.
- [ ] Extend the brief/record with narrative mode, before/after sources, audience,
  evidence, and claim attribution.
- [ ] Evaluate real prompts for all four modes, including missing old-site assets
  and an unmeasured outcome. Keep modes in references rather than expanding every run.

### Phase 3: adaptations and narration

- [ ] Add a variant manifest and re-composition rules for each aspect ratio.
- [ ] Add cutdowns and language variants with independent copy/timing review.
- [ ] Add optional voice-over and timed subtitle export; confirm voice/media rights
  and selected provider/cost before using an external service.
- [ ] Check every variant's dimensions, framing, captions, poster, audio, and CTA.

### Phase 4: reproducible revisions and maintenance

- [ ] Version the storyboard/production manifest and define backward-compatible
  migrations before changing the V1 JSON contract.
- [ ] Establish stable source/asset/scene IDs, change tracking, and preserved exports.
- [ ] Add reusable renderer helpers only after repeated project evidence justifies
  the abstraction; support capability discovery and truthful fallback behavior.
- [ ] Implement scene replacement and dependency-aware rebuild; verify adjacent
  transitions, total duration, audio, and final playback after updates.
- [ ] Evaluate a request that updates one project and exports a new format without
  losing the existing accepted output.

### Phase 5: optional distribution workflow

- [ ] Define channel-specific packages and publication metadata from actual needs.
- [ ] Add authorized publishing/scheduling only where suitable connectors exist.
- [ ] Add campaign links/measurement only when requested; coordinate with analytics
  without making another skill or account mandatory.
- [ ] Record destination, approval/publication status, and returned evidence.

## Risks and handling

| Risk | Handling |
| --- | --- |
| Environment cannot encode/mux MP4 or audio | Preflight capabilities early; choose an available path or hand over actual intermediate artifacts and the specific missing capability |
| Live site capture loses animations/content | Exercise visitor rendering and lazy states; wait for assets and inspect captures |
| Reconstructed UI loses the brand | Prefer actual source/capture; document unavoidable illustration and avoid fabricated screens |
| Capture triggers a real inquiry or recording | Use isolated fixtures/preview and safe actions; avoid unauthorized sends and production tracking pollution |
| Font/image loading or time-based animation drifts | Set a deterministic timeline, wait for readiness, and inspect settled/transition frames |
| Poster/video colors differ | Inspect decoded frames and encoder color/range metadata; apply pipeline-specific fixes and recheck |
| Audio rights, clipping, or drift | Use permitted/original material, record provenance, check mix and full synchronization |
| A future model claims roadmap capabilities are shipped | Keep implemented scope, deferred work, and validation status explicit in this document |

## Continuation instructions

1. Read this plan, the current skill, and working-tree changes before continuing.
2. Choose the next incomplete phase or a concrete user request; do not implement
   the entire roadmap automatically.
3. Update status/checklists with actual evidence. Keep unperformed media checks
   pending and distinguish installer validation from real production evaluation.
4. Preserve previous user work; publishing/tagging/npm release follows its own scope.
