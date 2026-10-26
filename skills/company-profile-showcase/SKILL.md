---
name: company-profile-showcase
description: "Create a short, shareable showcase video from a company profile website, local project, or preview. Inspect real branding and UI, plan scenes, capture or reuse authentic material, render an MP4 with optional music, and deliver a poster, share copy, reproducible materials, and verification. Use for company website launch videos and portfolio showcases of the website."
---

# Company Profile Showcase

Produce a recognizable, brand-specific showcase of an existing company profile
website, including websites created with comp-ile and projects made elsewhere.
Support local source/previews and visitor-accessible URLs. This first version
focuses on one launch/current-site video; elaborate before/after case studies,
voice-over, and batch variants are outside its built-in workflow.

## Establish the source and production brief

Read [source-and-story.md](references/source-and-story.md) when gathering material
and choosing the angle. Use the user's selected project/URL. Infer the current
directory only if it contains a company website; this skill's source repository
is not itself a company website. Ask for a source if none can be established.

Read available company materials before asking questions. Establish the intended
audience, goal/CTA, language, format, duration, tone, and sound preference. Ask
only for missing decisions that affect the result. An explicit creative brief
takes precedence over defaults. Use company-supported facts and actual UI/assets.

| Setting | Starting point when unspecified |
| --- | --- |
| Narrative | Introduce the company, show the strongest website content, close with a relevant action |
| Duration / fps | About 20 seconds / 30 fps |
| Master format | Landscape 1920x1080; vertical 1080x1920 or square 1080x1080 when requested |
| Tone / language | Professional and consistent with the brand / user's requested language |
| Audio | Optional; record whether silent or music, and any rights/tool dependencies |

Inspect tools before committing to a render method. Do not assume FFmpeg, a
particular browser library, a paid service, or a specific model is installed.
Read [capture-and-render.md](references/capture-and-render.md) for capability
checks and source-versus-URL capture. Report missing capabilities early while
continuing independent planning; do not replace a requested MP4 with a renamed
image sequence or a claim that instructions alone are a rendered video.

Create `showcase-output/` in the chosen project/output directory, or a new
timestamped sibling if it exists. Keep intermediates in its `work/` folder;
preserve earlier exports. Adapt [production-record.md](assets/production-record.md)
to record choices, sources, asset permissions, tools, commands, and pending steps.

## Plan a short, specific story

Write `storyboard.md` with the angle, hook, two or three highlights, closing CTA,
brand treatment, source material, and timed scenes. A useful starting arc is
identity/hook, homepage reveal, services/evidence, one visitor interaction, CTA.
Adapt it to the company; a portfolio or testimonial is optional when absent.

Use the actual logo, typography, colors, imagery, and content. Do not invent
projects, results, testimonials, public availability, or business impact. A local
preview can be showcased without implying it is deployed. Include approved
public company contact details only when intended for this output; exclude
private contacts, customer information, credentials, and internal addresses.

Create `storyboard.json` from [storyboard.example.json](assets/storyboard.example.json).
Use stable scene IDs, positive durations aligned to the selected frame rate,
and settled reading time for on-screen copy. Run
[validate-storyboard.mjs](scripts/validate-storyboard.mjs) with Node.js when
available. Its output derives the dimensions and frame timeline and warns about
short text holds; it does not verify visuals, facts, media rights, or rendering.
If Node is unavailable, check those timing invariants manually and record it.

Proceed after explaining the angle and storyboard unless the user requested
review first or a material dependency needs an answer. Do not require approval
at every production step when the requested scope is already clear.

## Capture, build, and render

Follow [capture-and-render.md](references/capture-and-render.md). Reuse local
source/assets or capture the real site through a browser. Reframe deliberately
for the selected aspect ratio; do not squeeze desktop content into an unreadable
vertical frame. Use genuine interactions and synthetic stand-ins where needed.
Do not send inquiries, trigger real communications, or change production data
to demonstrate the interface. Avoid collecting test activity into production
analytics when a suitable isolated preview/fixture is available.

Use deterministic timing for generated animations. Wait for fonts/images and
lazy content; inspect stills from every scene and between scenes before a full
render. Text must remain settled long enough to read. Avoid overlapping busy
layouts during transitions. Optional music/effects must use permitted material,
fit the brand, and have a controlled mix and intentional ending.

Save actual project-specific scripts and rebuild instructions in `work/`. Render
`showcase.mp4` with a broadly compatible available encoder. Keep one requested
master format per production; requested alternate versions need their own framing
and checks. Do not install dependencies or use paid/external generation outside
the user's authorization; explain the exact need when additional scope is needed.

## Check and deliver

Read [quality-and-delivery.md](references/quality-and-delivery.md) before delivery.
Check decoded output/playback as well as stills. Extract a settled `poster.jpg`
and make the opening frame intentional; if replacing frame zero with the poster,
preserve frame count, duration, and audio synchronization. Platform-selected
thumbnails can vary, so deliver the standalone poster too.

Deliver `showcase.mp4`, `poster.jpg`, `share-copy.txt`, `storyboard.md`,
`storyboard.json`, `production-record.md`, and `verification.json`, plus actual
captures/audio/render scripts in `work/`. The caption should identify the company
or site, its relevant offering/highlight, and an appropriate next step. Match
the tone and public/preview status.

Report accessible files, the creative angle, completed checks, and exact limits.
If encoding, audio, or playback checks are unavailable, distinguish produced
artifacts from pending work. Publication follows the user's requested scope.
For revisions, reuse the production record, preserve the previous export, and
recheck affected scenes, transitions, duration, poster, and audio.

**Done when:** the requested video and companion files exist, authentic content
and permissions are respected, output has been checked to the available level,
rebuild materials are accessible, and unfinished requirements are explicit.
