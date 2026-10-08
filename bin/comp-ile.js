#!/usr/bin/env node

import { runCLI } from '../src/cli.js';

try {
  await runCLI(process.argv.slice(2));
} catch (error) {
  console.error(`comp-ile: ${error.message}`);
  process.exitCode = 1;
}
