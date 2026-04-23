# Bundle Manifest — QFT_01_v2 Production

Production: Quantum Field Theory from the Ground Up — Lecture 1  
Created: 2026-04-23  
Status: Written content complete; audio files to be generated (separate pipeline).

---

## This Folder (Claude Design Upload)

Upload this folder to Claude Design. It contains only text files — no binary audio — because
Claude Design rejects audio uploads.

| File | Description |
|------|-------------|
| `PROMPT.md` | Self-contained design brief for Claude Design, covering viewer profile, tone, scene count, deliverable list, and visual design system policy (decouple from v1) |
| `scene_breakdown.md` | Per-scene breakdown for all 20 scenes: concept, animation intent, humor note, and runtime estimate. Five humor beats in scenes 03, 04, 08, 12, 17. |
| `narration_transcript.txt` | Full spoken narration, 20 blocks matching scene numbering, ~8006 words (~44 minutes at 180 wpm). No SSML tags, no stage directions — plain spoken prose. |
| `MANIFEST.md` | This file. |

---

## Sibling Folder — Voice Pipeline (Local Only, Not for Claude Design)

The audio reference and synthesis workflow live in a sibling folder so the upload bundle stays
text-only:

```
/home/gofer/Documents_organise/references/video_project/qft01_v2_voice_pipeline/
├── voice_sample.wav               (45 s, 22050 Hz, mono — reference for tone-color)
└── voice_clone_instructions.md    (OpenVoice V2 + Edge TTS Emma workflows)
```

Run the voice pipeline locally after (or in parallel with) the Claude Design session. It reads
`narration_transcript.txt` from this folder and writes `audio/scene_NN.wav` into the voice
pipeline folder.

---

## Generated Later (Voice Synthesis Step)

Produced by running the workflow in `../qft01_v2_voice_pipeline/voice_clone_instructions.md`.
Files land in the voice pipeline folder, not here.

| File | Description |
|------|-------------|
| `../qft01_v2_voice_pipeline/voice_sample_se.pth` | Tone-color embedding extracted from `voice_sample.wav`. Used as the voice identity for all scene synthesis. |
| `../qft01_v2_voice_pipeline/scene_texts/scene_01.txt` through `scene_20.txt` | Per-scene plain text files split from `narration_transcript.txt` by the `split_scenes.py` helper. |
| `../qft01_v2_voice_pipeline/audio/scene_01.wav` | Synthesized narration for Scene 01 — The Question That Breaks Single-Particle Mechanics |
| `../qft01_v2_voice_pipeline/audio/scene_02.wav` | Scene 02 — What a Field Actually Is |
| `../qft01_v2_voice_pipeline/audio/scene_03.wav` | Scene 03 — Why Relativistic Quantum Mechanics Fails |
| `../qft01_v2_voice_pipeline/audio/scene_04.wav` | Scene 04 — The Conceptual Leap: Fields Are Primary |
| `../qft01_v2_voice_pipeline/audio/scene_05.wav` | Scene 05 — Fields as Operators |
| `../qft01_v2_voice_pipeline/audio/scene_06.wav` | Scene 06 — Quantizing the Free Scalar Field |
| `../qft01_v2_voice_pipeline/audio/scene_07.wav` | Scene 07 — Creation and Annihilation Operators |
| `../qft01_v2_voice_pipeline/audio/scene_08.wav` | Scene 08 — The Vacuum Is Not Nothing |
| `../qft01_v2_voice_pipeline/audio/scene_09.wav` | Scene 09 — The Lagrangian Density and the Action |
| `../qft01_v2_voice_pipeline/audio/scene_10.wav` | Scene 10 — Symmetries and Conservation Laws |
| `../qft01_v2_voice_pipeline/audio/scene_11.wav` | Scene 11 — Interactions: The Field Is Not Free |
| `../qft01_v2_voice_pipeline/audio/scene_12.wav` | Scene 12 — Feynman Diagrams: Cartoons That Compute |
| `../qft01_v2_voice_pipeline/audio/scene_13.wav` | Scene 13 — Vertices and Propagators in Detail |
| `../qft01_v2_voice_pipeline/audio/scene_14.wav` | Scene 14 — Loops and the Need for Renormalization |
| `../qft01_v2_voice_pipeline/audio/scene_15.wav` | Scene 15 — Forces from Field Exchange: Yukawa's Insight |
| `../qft01_v2_voice_pipeline/audio/scene_16.wav` | Scene 16 — Spin, Statistics, and Fermion Fields |
| `../qft01_v2_voice_pipeline/audio/scene_17.wav` | Scene 17 — The Standard Model in One Breath |
| `../qft01_v2_voice_pipeline/audio/scene_18.wav` | Scene 18 — What QFT Does Not Explain |
| `../qft01_v2_voice_pipeline/audio/scene_19.wav` | Scene 19 — Summary: The Five Big Ideas |
| `../qft01_v2_voice_pipeline/audio/scene_20.wav` | Scene 20 — What Is Coming: Interacting Fields and the Path Integral |

---

## Generated Later (Claude Design Step)

The following files will be produced by Claude Design and are not part of either folder yet.

| File | Description |
|------|-------------|
| `video/scene_01.mp4` through `video/scene_20.mp4` | Animated scene videos, no audio track, matching narration block durations |
| `video/title_card.mp4` | Title card intro (~5 seconds) |
| `video/thumbnail_A.png` | First thumbnail concept, high resolution |
| `video/thumbnail_B.png` | Second thumbnail concept, high resolution |
| `video/storyboard_NN.png` | Optional storyboard keyframes, one per scene |

---

## Assembly Order

```
title_card.mp4
scene_01.mp4 + ../qft01_v2_voice_pipeline/audio/scene_01.wav
scene_02.mp4 + ../qft01_v2_voice_pipeline/audio/scene_02.wav
...
scene_20.mp4 + ../qft01_v2_voice_pipeline/audio/scene_20.wav
```
