# Quality checks and delivery

## Review the actual media

| Check | Evidence |
| --- | --- |
| Brand and content | Actual logo/fonts/colors/UI and supported claims; accurate preview/live status |
| Scene composition | Settled stills for every scene, readable copy, intentional framing, no cropped CTA |
| Transitions | Entry, exit, and mid-transition stills without overlap, loading flashes, or blank gaps |
| Technical export | Actual MP4/container/codec, expected dimensions/fps/frame count and duration |
| Playback | Decode/play the full clip and seek near the start, scene boundaries, and end where tools allow |
| Audio, if included | Stream present, acceptable levels, no clipping, synchronization, clean start/end |
| Privacy and permissions | No private/customer data or unauthorized material in frames, copy, or shared notes |
| Poster | A settled readable frame, correct dimensions, and colors reasonably consistent with decoded video |
| Reproduction | Actual scripts, assets, commands, and environment requirements in output work folder |

The storyboard validator cannot replace these checks. Use available probe,
decoder, and playback tools. Record exact checks performed; do not claim zero
dropped frames, exact duration, complete playback, audio quality, or codec support
without evidence. A successful render process is not a completed media review.

A useful poster is a strong settled frame with the main identity readable.
If using it as frame zero, replace rather than prepend a frame so the frame
count and sound timing remain correct. Confirm the new first decoded frame;
lossy encoding can cause small image differences. If a visible color shift
appears, inspect color/range metadata and recheck rather than masking the problem
with a different poster. Thumbnail selection remains platform-dependent.

## Verification record

Write `verification.json` with actual observed values and statuses. Include
output filenames, date, dimensions, fps, duration/frame count when known, codecs,
audio presence, reviewed still/playback/seek points, and visual/audio findings.
Use explicit pending/unverified statuses or null values for unavailable checks.
Keep tool output/logs in `work/`; avoid private data in shared evidence.

Report planned settings separately from observed export values. For a silent
video, absent audio is intentional, not a failed check. When music was requested
but could not be produced or muxed, report the missing audio as unfinished.
Fix actionable findings within scope and preserve earlier exported versions.

## Delivery and revision

Deliver the actual MP4, poster, one to three sentences of share copy, storyboard
Markdown/JSON, production record, verification record, and work folder. Caption
copy must match the company's offering, tone, and CTA without invented outcomes
or a public URL that has not been verified. Supply an accessible video preview
or file link and companion files using the host environment's supported format.

Summarize the creative angle, produced files, checks, and exact limitations.
If video output is missing, call the result partial and identify the next step;
do not substitute a still image or rename a non-MP4 file as the requested video.
Never imply the clip or website has been published based on local rendering.

For a revision, read the existing record and storyboard, identify affected scene
IDs/assets/copy, preserve the previous export, and save the revised configuration.
Recheck transitions on both sides, text holds, total duration, poster, and sound.
Only reuse partial render caches when the actual render workflow supports them;
this version does not promise automated incremental rendering or source watching.
