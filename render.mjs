#!/usr/bin/env node
// render.mjs — Playwright-based frame capture for QFT v2 lecture animation
// Renders the HTML animation to JPEG frames at 25fps
// Output: frames/NNNNNN.jpg (zero-padded 6-digit frame numbers)
// Usage: node render.mjs [--scene N] [--fps 25] [--quality 85]

import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse CLI args
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : def;
};
const sceneFilter = getArg('--scene', null);
const FPS = parseInt(getArg('--fps', '25'));
const QUALITY = parseInt(getArg('--quality', '85'));
const WIDTH = 1920;
const HEIGHT = 1080;

const HTML_PATH = path.join(__dirname, 'project', 'QFT Lecture 1.html');
const FRAMES_DIR = path.join(__dirname, 'frames');

async function main() {
  await fs.mkdir(FRAMES_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const fileUrl = `file://${HTML_PATH}`;
  console.log(`Loading: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Get total duration from the page
  const totalDur = await page.evaluate(() => {
    return typeof TOTAL_DUR !== 'undefined' ? TOTAL_DUR : 2900;
  });
  console.log(`Total duration: ${totalDur}s at ${FPS}fps = ${Math.ceil(totalDur * FPS)} frames`);

  const totalFrames = Math.ceil(totalDur * FPS);
  let frameIdx = 0;

  for (let f = 0; f < totalFrames; f++) {
    const t = f / FPS;

    // Set animation time via global setter
    await page.evaluate((time) => {
      if (typeof setAnimTime === 'function') setAnimTime(time);
      else if (typeof window.__setTime === 'function') window.__setTime(time);
    }, t);

    const frameName = String(f).padStart(6, '0') + '.jpg';
    const framePath = path.join(FRAMES_DIR, frameName);
    await page.screenshot({
      path: framePath,
      type: 'jpeg',
      quality: QUALITY,
      fullPage: false,
    });

    if (f % (FPS * 10) === 0) {
      const pct = ((f / totalFrames) * 100).toFixed(1);
      console.log(`  ${pct}% — t=${t.toFixed(1)}s frame ${f}/${totalFrames}`);
    }
  }

  await browser.close();
  console.log(`Done. ${totalFrames} frames written to ${FRAMES_DIR}`);
}

main().catch(err => { console.error(err); process.exit(1); });
