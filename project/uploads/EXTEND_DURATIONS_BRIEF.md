# Brief for Claude Design — Extend Scene Durations to Fit Narration

## Problem

The current 7:52 build has scenes sized ~18-28 s each. Narration audio (Emma
synth, fixed; do not modify the text) runs ~20.6 s longer than the visual total.
Fix by **extending each over-running scene's duration** so audio fits. Keep all
existing animation content; just hold the final frame (or gently loop the
ambient motion) for the extra seconds. Do not add new teaching beats.

## Target: update the `SCENES` array in `project/qft-scenes-a.jsx`

Replace the existing `SCENES` array (lines ~6-28) with the one below. New
durations are `ceil(audio_duration) + ~0.5 s buffer`. Scenes where audio is
under the current visual budget are left unchanged so we do not bloat the video
unnecessarily.

```javascript
const SCENES = [
  { n: 1,  title: 'The Question That Breaks Single-Particle Mechanics', dur: 24 }, // was 22, audio 23.4
  { n: 2,  title: 'What a Field Actually Is',                           dur: 28 }, // unchanged, audio 22.7
  { n: 3,  title: 'Why Relativistic QM Fails',                          dur: 25 }, // was 22, audio 24.3
  { n: 4,  title: 'Fields Are Primary',                                 dur: 22 }, // unchanged, audio 21.1
  { n: 5,  title: 'Fields as Operators',                                dur: 20 }, // unchanged, audio 18.2
  { n: 6,  title: 'Quantizing the Free Scalar Field',                   dur: 29 }, // was 28, audio 28.1
  { n: 7,  title: 'Creation and Annihilation Operators',                dur: 20 }, // unchanged, audio 17.9
  { n: 8,  title: 'The Vacuum Is Not Nothing',                          dur: 23 }, // was 22, audio 22.2
  { n: 9,  title: 'The Lagrangian Density and the Action',              dur: 21 }, // was 20, audio 20.4
  { n: 10, title: 'Symmetries and Conservation Laws',                   dur: 23 }, // was 20, audio 21.9
  { n: 11, title: 'Interactions: The Field Is Not Free',                dur: 24 }, // was 20, audio 22.9
  { n: 12, title: 'Feynman Diagrams: Cartoons That Compute',            dur: 31 }, // was 28, audio 30.0
  { n: 13, title: 'Vertices and Propagators in Detail',                 dur: 21 }, // was 20, audio 20.5
  { n: 14, title: 'Loops and the Need for Renormalization',             dur: 35 }, // was 28, audio 34.5
  { n: 15, title: 'Forces from Field Exchange',                         dur: 24 }, // was 22, audio 23.4
  { n: 16, title: 'Spin, Statistics, and Fermion Fields',               dur: 25 }, // was 20, audio 23.7
  { n: 17, title: 'The Standard Model in One Breath',                   dur: 33 }, // was 28, audio 31.6
  { n: 18, title: 'What QFT Does Not Explain',                          dur: 21 }, // was 20, audio 20.9
  { n: 19, title: 'The Five Big Ideas',                                 dur: 25 }, // was 22, audio 24.7
  { n: 20, title: 'What Is Coming: The Path Integral',                  dur: 19 }, // was 18, audio 18.3
  { n: 21, title: 'References',                                         dur: 14 }, // unchanged
];
```

New main-content total: 493 s (was 450 s). Full video with title + refs: ~**8:35** (was 7:52).

## What should happen during the extra seconds

For each scene, the extra 1-7 s should be **quiet**, not new motion:

- **Hold the final frame** for scenes 01, 03, 06, 08, 09, 10, 11, 12, 13, 15, 18, 19, 20 (extension is 1-3 s — a short hold reads naturally as "let the viewer finish reading / let the point land").
- **Scene 14 (+7 s)**: longer extension. Keep the final "renormalized → finite" beat on screen; optionally let the `k` dot in the loop keep rotating slowly. No new equation or label.
- **Scene 16 (+5 s) and Scene 17 (+5 s)**: mid-length extension. In Scene 16, let the fermion/boson pairing visualization hold. In Scene 17, let the particle grid rest after completion — the humor beat wording is already the last thing on screen, let it breathe.

Within any scene function, extending the timing is typically free — the `fadeIO(t, duration, ...)` calls already use `duration`, which now arrives as the new larger value. The `clamp` phase gates stay fixed in seconds from the scene start, so nothing before the final hold is disturbed.

## Do not touch

- Scene content, wording, humor beats, captions.
- Timing of individual phases within any scene (the `clamp((t - a) / b, 0, 1)` lines).
- Colors, fonts, layout.
- Tweaks panel, title card, references card.
- React component architecture.

The only change is the `dur` numbers in the `SCENES` array. Everything downstream (`SCENE_BOUNDS`, `TOTAL_DUR`, caption list, scene counter) recomputes automatically.

## Verification after the change

1. Build the HTML and scrub to the end of the timeline — total should land at ~8:35.
2. For each over-running scene, pause at the end and confirm the final frame is steady (no motion that should have stopped earlier) — the hold is intended.
3. Signature scenes 02, 06, 12, 14, 17 remain the visually richest moments, just with slightly longer tails.

## Audio files waiting to mux in

`qft01_v2_voice_pipeline/audio_short/scene_01.mp3 … scene_20.mp3` — Edge-TTS
Emma Multilingual Neural, per-scene mp3. Final muxing happens outside Claude
Design after the re-timed video renders.
