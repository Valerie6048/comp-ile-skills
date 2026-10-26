# Capture and rendering

## Capability discovery

Check actual tools and runtime paths: browser/capture control, project server,
image generation/compositing libraries already present, video encoder/muxer,
audio generation/encoding when requested, and output decoding/playback tools.
Node.js can run the packaged timing validator; it is not itself a video renderer.
Do not hardcode author-specific paths, ports, frameworks, or model requirements.

Choose an available route: a browser timeline with a working encoding/muxing
path, or captured frames/video assembled with available media tools. An installed
browser is not proof that every codec or MP4 muxer is available. A tool such as
FFmpeg is useful when present, but not a universal prerequisite. Confirm the
selected path can produce a small valid export before an expensive full render.

If essential tooling is missing, prepare the brief, storyboard, assets, and
reviewable stills that can actually be produced. State the missing capability
and needed next step. Installations or external paid services follow the user's
authorization and environment permissions; do not silently add subscriptions.
Do not report video completion if only the plan or frames exist.

## Output organization and timeline

Use a fresh `showcase-output/` or timestamped sibling; all intermediate captures,
audio stems, scene previews, scripts, and encoder logs stay in its `work/`.
Keep the working website unchanged where possible. Use a dedicated local render
entrypoint/fixture rather than altering the production homepage for filming.

Adapt [storyboard.example.json](../assets/storyboard.example.json) and run:

```sh
node <installed-skill>/scripts/validate-storyboard.mjs <output>/storyboard.json
```

The script prints dimensions, cumulative frame offsets, total frames, and text
hold warnings. Capture its JSON output in `work/` if useful. Fix invalid timing;
review warnings against actual scene stills. This only validates a timeline.
Use `<output>` and `<installed-skill>` as the actual local paths, not literal
placeholder directories.

For scripted animation, make scene state a function of timeline time/frame.
Seek explicitly for stills; avoid accumulating wall-clock sleeps or random drift.
Wait for fonts/images and relevant page readiness before capturing. Isolate
unrelated background animation if it prevents reproducible frames. When using
ES modules on Windows, import filesystem packages through valid file URLs.

## Capture, composition, and safe interactions

Frame the actual company UI with enough detail to be recognizable. Capture
responsive mobile UI for vertical output or compose readable focused crops;
do not shrink the entire desktop page until text becomes texture. Keep logos
and the closing CTA within the visible composition and intended channel margins.

Use actual states such as opening navigation, viewing a project, changing a
portfolio filter, or scrolling to a service. Where a form must appear, use safe
fixtures and synthetic data; do not submit to production or generate real email,
WhatsApp messages, calls, purchases, or staff notifications. Do not expose admin
UI, analytics IDs/secrets, customer names, private contacts, or internal URLs.

Inspect one settled frame per scene plus entry/exit and mid-transition frames
at output resolution. Fix clipping, low contrast, loading artifacts, hidden lazy
content, missing images, and unreadable copy before the full render. Fade/dip or
stagger busy scenes rather than overlaying two dense pages indiscriminately.

## Sound and encoding

If music is requested, use original/synthesized audio or permitted supplied
material and record provenance. Match the brand, scene rhythm, and cut timing.
Use gentle effects where helpful; avoid clipping, sharp repeated transients,
abrupt endings, and audio continuing after the picture ends. Respect a silent
request. Voice-over and subtitle production are planned extensions to this version.

Prefer an available broadly compatible MP4 path, commonly H.264 video and AAC
audio when audio is present. Verify the actual codec/container, dimensions,
frame rate, duration, and audio stream rather than assuming an `.mp4` suffix
proves compatibility. Preserve the chosen color/range through the render and
encode stages; inspect decoded frames if poster colors shift. Apply encoder-
specific metadata fixes only after inspecting the actual pipeline.

Save actual build/render/verification commands and dependencies in
`work/README.md`. Record which steps require access to the original source;
do not claim an export is reproducible if essential code/assets are absent.
Use [quality-and-delivery.md](quality-and-delivery.md) for final checks.
