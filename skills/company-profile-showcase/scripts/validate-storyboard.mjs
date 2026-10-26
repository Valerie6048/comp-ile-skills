import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const FORMATS = {
  landscape: [1920, 1080],
  vertical: [1080, 1920],
  square: [1080, 1080],
};

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

function framesFor(seconds, fps, label) {
  requireValue(Number.isFinite(seconds) && seconds > 0, `${label} must be a positive finite number.`);
  const frames = seconds * fps;
  requireValue(Number.isSafeInteger(Math.round(frames)) && Math.round(frames) > 0 && Math.abs(frames - Math.round(frames)) < 1e-6,
    `${label} must align to a whole frame at ${fps} fps.`);
  return Math.round(frames);
}

export function validateStoryboard(plan) {
  requireValue(plan && typeof plan === 'object' && !Array.isArray(plan), 'Storyboard must be an object.');
  requireValue(plan.schema_version === 1, 'Use storyboard schema_version 1.');
  requireValue(typeof plan.project_name === 'string' && plan.project_name.trim(), 'Provide a project_name.');
  requireValue(typeof plan.format === 'string' && Object.hasOwn(FORMATS, plan.format), 'Choose landscape, vertical, or square.');
  requireValue(Number.isInteger(plan.fps) && plan.fps > 0 && plan.fps <= 120, 'fps must be an integer from 1 to 120.');
  requireValue(['none', 'music'].includes(plan.audio_mode), 'audio_mode must be none or music.');
  requireValue(Array.isArray(plan.scenes) && plan.scenes.length > 0, 'Provide at least one scene.');
  const expectedFrames = framesFor(plan.duration_seconds, plan.fps, 'duration_seconds');
  const ids = new Set();
  const warnings = [];
  let totalFrames = 0;

  const scenes = plan.scenes.map((scene, index) => {
    const label = `Scene ${index + 1}`;
    requireValue(scene && typeof scene === 'object' && !Array.isArray(scene), `${label} must be an object.`);
    requireValue(typeof scene.id === 'string' && /^[a-z0-9][a-z0-9-]*$/.test(scene.id), `${label} needs a stable lowercase id.`);
    requireValue(!ids.has(scene.id), `Duplicate scene id: ${scene.id}.`);
    ids.add(scene.id);
    requireValue(typeof scene.visual === 'string' && scene.visual.trim(), `${label} needs a visual description.`);
    requireValue(typeof scene.copy === 'string', `${label} copy must be a string (empty is allowed).`);
    const frameCount = framesFor(scene.duration_seconds, plan.fps, `${label} duration_seconds`);
    requireValue(Number.isFinite(scene.settled_seconds) && scene.settled_seconds >= 0 &&
      scene.settled_seconds <= scene.duration_seconds, `${label} settled_seconds must fit inside the scene.`);
    const words = scene.copy.trim() ? scene.copy.trim().split(/\s+/u).length : 0;
    requireValue(words === 0 || scene.settled_seconds > 0, `${label} text requires a positive settled hold.`);
    if (words > 0 && scene.settled_seconds < words * 0.3) {
      warnings.push(`${scene.id}: ${words} words have only ${scene.settled_seconds}s settled reading time; review readability.`);
    }
    const startFrame = totalFrames;
    totalFrames += frameCount;
    requireValue(Number.isSafeInteger(totalFrames), 'Total frame count exceeds a safe integer.');
    return { id: scene.id, start_frame: startFrame, end_frame_exclusive: totalFrames, frame_count: frameCount };
  });

  requireValue(totalFrames === expectedFrames, `Scene total is ${totalFrames} frames; expected ${expectedFrames}.`);
  const [width, height] = FORMATS[plan.format];
  return {
    schema_version: 1,
    project_name: plan.project_name,
    width,
    height,
    fps: plan.fps,
    duration_seconds: totalFrames / plan.fps,
    total_frames: totalFrames,
    audio_mode: plan.audio_mode,
    scenes,
    warnings,
  };
}

if (process.argv[1] && await realpath(process.argv[1]) === await realpath(fileURLToPath(import.meta.url))) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 1 || ['--help', '-h'].includes(args[0])) {
      console.log('Usage: node validate-storyboard.mjs <storyboard.json>');
      if (args.length !== 1) process.exitCode = 1;
    } else {
      const plan = JSON.parse(await readFile(args[0], 'utf8'));
      console.log(JSON.stringify(validateStoryboard(plan), null, 2));
    }
  } catch (error) {
    console.error(`Storyboard validation failed: ${error.message}`);
    process.exitCode = 1;
  }
}
