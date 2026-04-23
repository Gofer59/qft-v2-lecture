# QFT v2 Lecture — Scene Expansion

## Goal
Expand all 20 JSX scenes from ~20-35s storyboard to full narration length (~2-3 min each).
Target: ~48 min animation matching audio in `audio_src` (see checkpoint.json).

## How to expand one scene (for automated resume agent)

1. `git pull origin master`
2. Read `checkpoint.json` — find first scene with `"status": "pending"`
3. Read `narration/scene_NN.txt` — the full narration text for that scene (this is the animation script)
4. Read the current `SceneNN` function in `project/qft-scenes-{a,b,c,d}.jsx`
5. Expand `dur` in the `SCENES` array (in qft-scenes-a.jsx) to `dur_target` from checkpoint.json
6. Rewrite `SceneNN` to animate narration beats across full duration
   - Divide narration into ~6-10 visual beats, each ~15-25s
   - Use primitives from `project/qft-primitives.jsx`
   - Final ~5s: hold last frame (no new motion)
7. Update `checkpoint.json` scene status to `"done"`, add `"commit"` field with the commit hash
8. `git add project/qft-scenes-X.jsx checkpoint.json && git commit -m "feat(scene-NN): expand to <dur>s — <title>" && git push`
9. **Stop — do exactly one scene per session**

## File map
- `project/qft-scenes-a.jsx` — scenes 01–05 (SCENES array lives here too)
- `project/qft-scenes-b.jsx` — scenes 06–10
- `project/qft-scenes-c.jsx` — scenes 11–15
- `project/qft-scenes-d.jsx` — scenes 16–21
- `narration/scene_NN.txt` — narration script per scene
- `checkpoint.json` — progress tracker (source of truth)

## Render pipeline (after all scenes done)
```bash
npm install
node render.mjs          # captures frames/ as JPEG (takes ~2 hours for 48 min @ 25fps)
bash assemble.sh         # muxes video + full audio → QFT_Lecture_1.mp4
```

## Audio files (not in repo — local paths)
Full narration: `/home/gofer/Documents_organise/references/video_project/qft01_v2_voice_pipeline/audio/scene_NN.mp3`
OpenVoice clone: `/home/gofer/Documents_organise/references/video_project/qft01_v2_voice_pipeline/audio_openvoice/scene_NN.wav`
