#!/usr/bin/env bash
# assemble.sh — Mux rendered frames + per-scene audio into final QFT Lecture 1 video
# Prereqs: frames/ directory populated by render.mjs
#          Per-scene audio files in AUDIO_SRC
# Output: QFT_Lecture_1.mp4
set -euo pipefail
export LC_ALL=C LANG=C

ROOT="/home/gofer/Documents_organise/references/video_project/qft01_v2_expand"
AUDIO_SRC="/home/gofer/Documents_organise/references/video_project/qft01_v2_voice_pipeline/audio"
FINAL="$ROOT/QFT_Lecture_1.mp4"
FRAMES="$ROOT/frames"
WORK="$ROOT/.assemble_work"
FPS=25

mkdir -p "$WORK"

echo "==> Step 1: Build silent video from frames"
VIDEO_SILENT="$WORK/video_silent.mp4"
ffmpeg -y -hide_banner -loglevel warning \
  -framerate $FPS \
  -i "$FRAMES/%06d.jpg" \
  -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p \
  "$VIDEO_SILENT"

echo "==> Step 2: Build concatenated audio track"
# Cumulative scene start times (seconds from video start)
# Title card = 6s, then scenes 01-20
# dur values: 01:142 02:201 03:168 04:151 05:146 06:150 07:145 08:144 09:208 10:131
#             11:125 12:146 13:135 14:137 15:132 16:133 17:134 18:132 19:130 20:120
STARTS=(6 148 349 517 668 814 964 1109 1253 1461 1592 1717 1863 1998 2135 2267 2400 2534 2666 2796)

# Build silence clip for title card (6s)
TITLE_SIL="$WORK/title_silence.wav"
ffmpeg -y -hide_banner -loglevel warning \
  -f lavfi -i anullsrc=r=48000:cl=stereo -t 6 \
  "$TITLE_SIL"

# Assemble audio inputs list
AUDIO_INPUTS=("$TITLE_SIL")
for i in {0..19}; do
  n=$(printf "%02d" $((i + 1)))
  f="$AUDIO_SRC/scene_${n}.mp3"
  if [[ ! -f "$f" ]]; then
    echo "WARNING: $f not found — substituting silence"
    dur=${STARTS[$((i+1))]-0}
    prev_start=${STARTS[$i]}
    scene_dur=$((dur - prev_start))
    [[ $scene_dur -le 0 ]] && scene_dur=30
    TMP_SIL="$WORK/silence_${n}.wav"
    ffmpeg -y -hide_banner -loglevel warning \
      -f lavfi -i anullsrc=r=48000:cl=stereo -t $scene_dur \
      "$TMP_SIL"
    AUDIO_INPUTS+=("$TMP_SIL")
  else
    AUDIO_INPUTS+=("$f")
  fi
done

# Build ffmpeg concat for audio
CONCAT_LIST="$WORK/audio_concat.txt"
> "$CONCAT_LIST"
for af in "${AUDIO_INPUTS[@]}"; do
  echo "file '$af'" >> "$CONCAT_LIST"
done

AUDIO_FULL="$WORK/audio_full.wav"
ffmpeg -y -hide_banner -loglevel warning \
  -f concat -safe 0 -i "$CONCAT_LIST" \
  -c:a pcm_s16le -ar 48000 -ac 2 \
  "$AUDIO_FULL"

echo "==> Step 3: Mux video + audio"
ffmpeg -y -hide_banner -loglevel warning \
  -i "$VIDEO_SILENT" \
  -i "$AUDIO_FULL" \
  -c:v copy \
  -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -shortest \
  "$FINAL"

echo "Done: $FINAL"
ffprobe -v error -show_entries format=duration -of default=nw=1 "$FINAL"
