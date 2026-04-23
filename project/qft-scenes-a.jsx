// qft-scenes.jsx — 20 scene definitions for "The Universe Is Made of Fields"
// Must be loaded AFTER animations.jsx and qft-primitives.jsx

// Timing table — each scene gets a compact animated treatment
// Total duration ~7 min. Signature scenes (02, 06, 12, 14, 17) get extra time.
const SCENES = [
  { n: 1,  title: 'The Question That Breaks Single-Particle Mechanics', dur: 142 }, // expanded for full narration 140.7s
  { n: 2,  title: 'What a Field Actually Is',                           dur: 201 }, // expanded for full narration 199.6s
  { n: 3,  title: 'Why Relativistic QM Fails',                          dur: 168 }, // expanded for full narration 166.5s
  { n: 4,  title: 'Fields Are Primary',                                 dur: 151 }, // expanded for full narration 149.5s
  { n: 5,  title: 'Fields as Operators',                                dur: 146 }, // expanded for full narration 144.6s
  { n: 6,  title: 'Quantizing the Free Scalar Field',                   dur: 150 }, // expanded for full narration 148.5s
  { n: 7,  title: 'Creation and Annihilation Operators',                dur: 145 }, // expanded for full narration 143.4s
  { n: 8,  title: 'The Vacuum Is Not Nothing',                          dur: 144 }, // expanded for full narration 142.7s
  { n: 9,  title: 'The Lagrangian Density and the Action',              dur: 208 }, // expanded for full narration 206.7s
  { n: 10, title: 'Symmetries and Conservation Laws',                   dur: 131 }, // expanded for full narration 130.0s
  { n: 11, title: 'Interactions: The Field Is Not Free',                dur: 125 }, // expanded for full narration 123.7s
  { n: 12, title: 'Feynman Diagrams: Cartoons That Compute',            dur: 146 }, // expanded for full narration 144.3s
  { n: 13, title: 'Vertices and Propagators in Detail',                 dur: 135 }, // expanded for full narration 134.0s
  { n: 14, title: 'Loops and the Need for Renormalization',             dur: 137 }, // expanded for full narration 135.4s
  { n: 15, title: 'Forces from Field Exchange',                         dur: 24 }, // was 22, audio 23.4
  { n: 16, title: 'Spin, Statistics, and Fermion Fields',               dur: 25 }, // was 20, audio 23.7
  { n: 17, title: 'The Standard Model in One Breath',                   dur: 33 }, // was 28, audio 31.6
  { n: 18, title: 'What QFT Does Not Explain',                          dur: 21 }, // was 20, audio 20.9
  { n: 19, title: 'The Five Big Ideas',                                 dur: 25 }, // was 22, audio 24.7
  { n: 20, title: 'What Is Coming: The Path Integral',                  dur: 19 }, // was 18, audio 18.3
  { n: 21, title: 'References',                                         dur: 14 }, // unchanged
];

// Compute absolute start/end for each scene
let _t = 6; // title card 6s
const SCENE_BOUNDS = SCENES.map(s => {
  const start = _t, end = _t + s.dur;
  _t = end;
  return { ...s, start, end };
});
const TITLE_END = 6;
const TOTAL_DUR = _t + 2; // pad

// ════════════════════════════════════════════════════════════════════════
// TITLE CARD (0 - 6s)
// ════════════════════════════════════════════════════════════════════════
function TitleCard() {
  return (
    <Sprite start={0} end={TITLE_END}>
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = t < 0.8 ? t / 0.8 : t > duration - 0.8 ? (duration - t) / 0.8 : 1;
        // vertex lines grow
        const lineLen = Math.min(1, t / 1.5);
        const cx = 960, cy = 480;
        return (
          <div style={{ position: 'absolute', inset: 0, background: 'var(--canvas-bg)', opacity: fade }}>
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* gentle field background */}
              {(() => {
                const rings = [];
                for (let i = 0; i < 6; i++) {
                  rings.push(<circle key={i} cx={cx} cy={cy} r={50 + i * 40 + Math.sin(t * 1.2 + i) * 6}
                    fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity={0.08 + 0.04 * Math.sin(t + i)} />);
                }
                return rings;
              })()}
              {/* Feynman vertex */}
              <g>
                <line x1={cx} y1={cy} x2={cx - 100 * lineLen} y2={cy - 100 * lineLen} stroke="var(--accent)" strokeWidth="2.5" />
                <line x1={cx} y1={cy} x2={cx + 100 * lineLen} y2={cy - 100 * lineLen} stroke="var(--accent)" strokeWidth="2.5" />
                <line x1={cx} y1={cy} x2={cx} y2={cy + 110 * lineLen} stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 6" />
                <circle cx={cx} cy={cy} r={7} fill="var(--accent)" opacity={Math.min(1, t * 2)} />
              </g>
            </svg>
            <div style={{
              position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 72, color: 'white',
              letterSpacing: '0.005em', opacity: Math.min(1, Math.max(0, (t - 0.8) / 0.8)),
            }}>
              Quantum Field Theory from the Ground Up
            </div>
            <div style={{
              position: 'absolute', top: 750, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--accent)',
              opacity: Math.min(1, Math.max(0, (t - 1.5) / 0.8)),
            }}>
              Lecture 1 — The Universe Is Made of Fields
            </div>
            <div style={{
              position: 'absolute', top: 1010, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--canvas-dim)',
              letterSpacing: '0.3em', textTransform: 'uppercase',
              opacity: Math.min(1, Math.max(0, (t - 2.5) / 1)),
            }}>
              Physics Study Reference
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 01 — the pillars collide (expanded to 142s / 10 beats)
// Beat 1  (0–12)    1925 title, "two extraordinary theories"
// Beat 2  (12–28)   Left pillar rises: Quantum Mechanics
// Beat 3  (28–44)   Right pillar rises: Special Relativity
// Beat 4  (44–58)   Both tested; zoom into atom
// Beat 5  (58–72)   Fast electron, must obey both
// Beat 6  (72–88)   Collision, crack, question mark, caption
// Beat 7  (88–104)  Asymmetry ∂ₜ vs ∇²
// Beat 8  (104–118) Negative P, negative E, KG & Dirac attempts
// Beat 9  (118–130) The 1920s-30s physicists
// Beat 10 (130–142) Resolution tease → final hold
// ════════════════════════════════════════════════════════════════════════
function Scene01({ start, end }) {
  return (
    <Scene start={start} end={end} label="01">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const cx = 960, cy = 540;

        // ── Beat gates (appear ramps) ─────────────────────────────
        const b1Title  = clamp((t - 1) / 1.2, 0, 1);
        const b1Sub    = clamp((t - 2.5) / 1.0, 0, 1);
        const b1Shrink = clamp((t - 8.5) / 1.5, 0, 1);  // 1925 shrinks to corner

        const b2Pillar = clamp((t - 12) / 1.2, 0, 1);   // QM pillar rises
        const b2Wave   = clamp((t - 14) / 1.0, 0, 1);

        const b3Pillar = clamp((t - 28) / 1.2, 0, 1);   // SR pillar rises
        const b3Cone   = clamp((t - 30.5) / 1.0, 0, 1);

        const b4Check1 = clamp((t - 44.5) / 0.5, 0, 1);
        const b4Check2 = clamp((t - 45.5) / 0.5, 0, 1);
        const b4Strip  = clamp((t - 46.5) / 0.8, 0, 1) * clamp((52 - t) / 1.5, 0, 1);
        const b4Atom   = clamp((t - 52) / 3, 0, 1);     // atom scales in

        const b5Fast   = clamp((t - 58) / 3, 0, 1);     // electron speeds up
        const b5Vel    = clamp((t - 60) / 1.0, 0, 1);
        const b5ArrL   = clamp((t - 63) / 1.0, 0, 1);
        const b5ArrR   = clamp((t - 66) / 1.0, 0, 1);
        const b5Tag    = clamp((t - 69) / 1.0, 0, 1);

        const b6AtomOut = clamp((t - 72) / 1.5, 0, 1);  // atom fades
        const b6Push    = clamp((t - 73.5) / 3.5, 0, 1); // pillars slam in
        const b6Flash   = t > 77 && t < 77.8 ? (1 - (t - 77) / 0.8) : 0;
        const b6Crack   = clamp((t - 77) / 1.2, 0, 1);
        const b6Q       = clamp((t - 78.5) / 1.5, 0, 1);
        const b6Cap     = clamp((t - 80) / 1.5, 0, 1);

        const b7Clear   = clamp((t - 88) / 1.5, 0, 1);  // center clears for equation
        const b7Apart   = clamp((t - 88.5) / 2.5, 0, 1); // pillars slide back
        const b7Eq      = clamp((t - 91) / 0.5, 0, 1);
        const b7Dt      = clamp((t - 96) / 0.8, 0, 1);
        const b7Dx      = clamp((t - 97) / 0.8, 0, 1);
        const b7SR      = clamp((t - 99) / 0.8, 0, 1);
        const b7Neq     = clamp((t - 101.5) / 0.8, 0, 1);

        const b8Fade    = clamp((t - 104) / 1.5, 0, 1);
        const b8KG      = clamp((t - 105.5) / 1.0, 0, 1);
        const b8Dirac   = clamp((t - 107.5) / 1.0, 0, 1);
        const b8X1      = clamp((t - 110) / 0.6, 0, 1);
        const b8X2      = clamp((t - 111) / 0.6, 0, 1);
        const b8NegP    = clamp((t - 112) / 0.8, 0, 1);
        const b8NegE    = clamp((t - 114) / 0.8, 0, 1);
        const b8Note    = clamp((t - 116) / 1.0, 0, 1);

        const b9Fade    = clamp((t - 118) / 1.0, 0, 1);
        const b9Names   = [119.0, 119.6, 120.2, 120.8, 121.4, 122.0];
        const b9Under   = clamp((t - 124) / 1.2, 0, 1);
        const b9Cap     = clamp((t - 126) / 1.0, 0, 1);
        const b9Tag     = clamp((t - 128.5) / 1.0, 0, 1);

        const b10Fade   = clamp((t - 130) / 1.0, 0, 1);  // name row fades
        const b10Diss   = clamp((t - 130) / 3, 0, 1);    // pillars dissolve
        const b10Field  = clamp((t - 133.5) / 1.0, 0, 1);
        const b10Cap    = clamp((t - 135) / 1.0, 0, 1);

        // ── Pillar horizontal positions (collide at 77, apart at 91) ──
        const leftBase = 480, rightBase = 1440;
        const meetL = 780, meetR = 1140;
        const leftX = leftBase + (meetL - leftBase) * b6Push - (meetL - leftBase) * b7Apart;
        const rightX = rightBase + (meetR - rightBase) * b6Push - (meetR - rightBase) * b7Apart;

        // Pillar visibility / opacity through the scene
        const leftOp  = b2Pillar * (1 - 0.6 * b8Fade) * (1 - 0.75 * b9Fade) * (1 - b10Diss);
        const rightOp = b3Pillar * (1 - 0.6 * b8Fade) * (1 - 0.75 * b9Fade) * (1 - b10Diss);

        // Atom / electron position + orbit speed
        const atomScale = b4Atom * (1 - b6AtomOut);
        const orbitPeriod = 1.2 - 0.85 * b5Fast;    // 1.2 → 0.35
        const orbitAng = (t / Math.max(orbitPeriod, 0.1)) * 2 * Math.PI;
        const eAtomX = cx + Math.cos(orbitAng) * 90;
        const eAtomY = cy + Math.sin(orbitAng) * 32;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={1} title={'The Question'} />
            <SceneRefs refs={["ps","zee"]} />

            {/* ── Ambient field background (persists) ───────────── */}
            <FieldBackground accent="#5ba3f5" amplitude={0.28 - 0.15 * b10Field} speed={0.12} />

            {/* ── BEAT 1: "1925" title → shrinks to corner stamp ── */}
            {b1Title > 0 && (
              <div style={{
                position: 'absolute',
                left: (1 - b1Shrink) * 960 + b1Shrink * 400 - 90,
                top:  (1 - b1Shrink) * 380 + b1Shrink * 120,
                fontFamily: 'var(--font-display)',
                fontSize: 180 - 110 * b1Shrink,
                color: 'var(--canvas-text)',
                opacity: b1Title * (0.4 + 0.6 * (1 - b1Shrink * 0.6)),
                letterSpacing: '0.02em',
              }}>1925</div>
            )}
            {b1Sub > 0 && t < 11 && (
              <div style={{
                position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 56, color: 'var(--canvas-dim)',
                opacity: b1Sub * clamp((11 - t) / 2, 0, 1),
              }}>Two extraordinary theories.</div>
            )}

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* ── LEFT PILLAR: QM wavefunction ─────────────────── */}
              {leftOp > 0 && (
                <g transform={`translate(${leftX - 120}, ${cy - 180})`} opacity={leftOp}>
                  <rect x="0" y="0" width="240" height="360" fill="rgba(91,163,245,0.06)"
                        stroke="var(--accent-blue)" strokeWidth="2" rx="4" />
                  <text x="120" y="-30" textAnchor="middle" fill="var(--accent-blue)"
                        fontFamily="var(--font-display)" fontStyle="italic" fontSize="30">Quantum Mechanics</text>
                  {b2Wave > 0 && (() => {
                    let d = 'M 0,180 ';
                    for (let i = 0; i <= 120; i++) {
                      const x = i * 2;
                      const env = Math.exp(-Math.pow((x - 120) / 60, 2));
                      const w = Math.sin(x * 0.35 - t * 4) * 60 * env;
                      d += `L ${x},${180 - w} `;
                    }
                    return <path d={d} fill="none" stroke="var(--accent-blue)"
                                 strokeWidth="2.5" opacity={b2Wave} />;
                  })()}
                </g>
              )}

              {/* ── RIGHT PILLAR: Minkowski diagram ──────────────── */}
              {rightOp > 0 && (
                <g transform={`translate(${rightX - 120}, ${cy - 180})`} opacity={rightOp}>
                  <rect x="0" y="0" width="240" height="360" fill="rgba(255,209,102,0.06)"
                        stroke="var(--accent-yellow)" strokeWidth="2" rx="4" />
                  <text x="120" y="-30" textAnchor="middle" fill="var(--accent-yellow)"
                        fontFamily="var(--font-display)" fontStyle="italic" fontSize="30">Special Relativity</text>
                  <line x1="120" y1="340" x2="120" y2="20"  stroke="var(--canvas-dim)" strokeWidth="1" />
                  <line x1="0"   y1="180" x2="240" y2="180" stroke="var(--canvas-dim)" strokeWidth="1" />
                  {b3Cone > 0 && (
                    <g opacity={b3Cone}>
                      <line x1="120" y1="180" x2="20"  y2="30"  stroke="var(--accent-yellow)" strokeWidth="2" />
                      <line x1="120" y1="180" x2="220" y2="30"  stroke="var(--accent-yellow)" strokeWidth="2" />
                      <line x1="120" y1="180" x2="20"  y2="330" stroke="var(--accent-yellow)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      <line x1="120" y1="180" x2="220" y2="330" stroke="var(--accent-yellow)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                      <circle cx="120" cy="180" r={3 + Math.sin(t * 3) * 1} fill="var(--accent-yellow)" />
                    </g>
                  )}
                  <text x="22"  y="22"  fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">ct</text>
                  <text x="230" y="175" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">x</text>
                </g>
              )}

              {/* ── BEAT 4: check badges on both pillars ────────── */}
              {b4Check1 > 0 && t < 52 && (
                <g transform={`translate(${leftX + 120}, ${cy - 200})`}
                   opacity={b4Check1 * clamp((52 - t) / 1.5, 0, 1)}>
                  <circle r="26" fill="var(--accent-green)" />
                  <path d="M -10,0 L -3,8 L 11,-8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
              )}
              {b4Check2 > 0 && t < 52 && (
                <g transform={`translate(${rightX - 120}, ${cy - 200})`}
                   opacity={b4Check2 * clamp((52 - t) / 1.5, 0, 1)}>
                  <circle r="26" fill="var(--accent-green)" />
                  <path d="M -10,0 L -3,8 L 11,-8" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
              )}

              {/* ── BEAT 4-5: orbiting atom ─────────────────────── */}
              {atomScale > 0 && (
                <g transform={`translate(${cx}, ${cy}) scale(${0.3 + 0.7 * atomScale})`} opacity={atomScale}>
                  <ellipse cx="0" cy="0" rx="90" ry="32" fill="none"
                           stroke="var(--canvas-dim)" strokeWidth="1" opacity="0.5" />
                  <circle cx="0" cy="0" r="12" fill="var(--accent-red)" />
                  <circle cx={Math.cos(orbitAng) * 90} cy={Math.sin(orbitAng) * 32}
                          r="6" fill="var(--accent-blue)" />
                  {/* trail when fast */}
                  {b5Fast > 0.3 && (() => {
                    const pts = [];
                    for (let k = 1; k <= 10; k++) {
                      const a = orbitAng - k * 0.15;
                      pts.push(`${Math.cos(a) * 90},${Math.sin(a) * 32}`);
                    }
                    return <polyline points={pts.join(' ')} fill="none"
                      stroke="var(--accent-blue)" strokeWidth="2" opacity={b5Fast * 0.5} />;
                  })()}
                </g>
              )}

              {/* ── BEAT 5: dual arrows atom → both pillars ─────── */}
              {b5ArrL > 0 && t < 72 && (
                <path d={`M ${cx - 60},${cy} Q ${cx - 180},${cy - 40} ${leftX + 140},${cy - 100}`}
                      fill="none" stroke="var(--accent-blue)" strokeWidth="3"
                      opacity={b5ArrL * (1 - b6AtomOut)} markerEnd="url(#arrBlue)" />
              )}
              {b5ArrR > 0 && t < 72 && (
                <path d={`M ${cx + 60},${cy} Q ${cx + 180},${cy - 40} ${rightX - 140},${cy - 100}`}
                      fill="none" stroke="var(--accent-yellow)" strokeWidth="3"
                      opacity={b5ArrR * (1 - b6AtomOut)} markerEnd="url(#arrYellow)" />
              )}
              <defs>
                <marker id="arrBlue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-blue)" />
                </marker>
                <marker id="arrYellow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-yellow)" />
                </marker>
              </defs>

              {/* ── BEAT 6: collision flash ─────────────────────── */}
              {b6Flash > 0 && (
                <circle cx={cx} cy={cy} r={220 * (1 - b6Flash)}
                        fill="var(--canvas-text)" opacity={0.7 * b6Flash} />
              )}

              {/* ── BEAT 6-10: crack (persists, variable α) ─────── */}
              {b6Crack > 0 && (() => {
                const paths = [];
                const crackOp = b6Crack * (
                  t < 104 ? 1
                  : t < 130 ? 0.3
                  : t < 137 ? 0.3 + 0.3 * ((t - 130) / 7)
                  : 0.6
                );
                for (let i = 0; i < 5; i++) {
                  const pts = ['M ' + cx + ',' + cy];
                  let px = cx, py = cy;
                  const a = -Math.PI/2 + (i - 2) * 0.35;
                  const len = 240 * b6Crack;
                  for (let j = 1; j <= 6; j++) {
                    const r = (len / 6) * j;
                    const jitter = Math.sin(j * 2 + i) * 18;
                    px = cx + Math.cos(a) * r + Math.cos(a + Math.PI/2) * jitter;
                    py = cy + Math.sin(a) * r + Math.sin(a + Math.PI/2) * jitter;
                    pts.push('L ' + px.toFixed(0) + ',' + py.toFixed(0));
                  }
                  paths.push(<path key={i} d={pts.join(' ')} stroke="var(--accent-red)"
                    strokeWidth="2" fill="none" opacity={crackOp * (0.6 + 0.3 * Math.sin(t * 10 + i))} />);
                }
                return paths;
              })()}

              {/* ── BEAT 10: pillar dissolution particles ───────── */}
              {b10Diss > 0 && (() => {
                const parts = [];
                for (let i = 0; i < 20; i++) {
                  const sign = i < 10 ? -1 : 1;
                  const k = i % 10;
                  const color = sign < 0 ? 'var(--accent-blue)' : 'var(--accent-yellow)';
                  const px = (sign < 0 ? leftX : rightX) + sign * 20 * k * b10Diss + Math.sin(k + i) * 30;
                  const py = cy - 150 + k * 30 - 30 * b10Diss;
                  parts.push(<circle key={i} cx={px} cy={py} r={3 + (k % 3)}
                    fill={color} opacity={(1 - b10Diss) * 0.9} />);
                }
                return parts;
              })()}
            </svg>

            {/* ── BEAT 2: QM bullets + Schrödinger eq ─────────── */}
            {t >= 16.5 && t < 28 && (
              <div style={{ position: 'absolute', left: leftX - 170, top: cy + 100,
                    width: 340, fontFamily: 'var(--font-ui)', fontSize: 22, lineHeight: 1.6,
                    color: 'var(--accent-blue)', opacity: fadeIO(t - 16.5, 11.5, 0.4, 0.4) }}>
                <div style={{ opacity: clamp((t - 16.5) / 1, 0, 1) }}>• Atomic spectra</div>
                <div style={{ opacity: clamp((t - 19) / 1, 0, 1) }}>• Photoelectric effect</div>
                <div style={{ opacity: clamp((t - 21.5) / 1, 0, 1) }}>• Stability of atoms</div>
                <div style={{ marginTop: 14, fontFamily: 'var(--font-math)', fontStyle: 'italic',
                     color: 'var(--form-inline)', fontSize: 24,
                     opacity: clamp((t - 24.5) / 1, 0, 1) }}>
                  iℏ ∂ψ/∂t = Ĥψ
                </div>
              </div>
            )}

            {/* ── BEAT 3: SR bullets + interval eq ────────────── */}
            {t >= 32.5 && t < 44 && (
              <div style={{ position: 'absolute', left: rightX - 170, top: cy + 100,
                    width: 340, fontFamily: 'var(--font-ui)', fontSize: 22, lineHeight: 1.6,
                    color: 'var(--accent-yellow)', opacity: fadeIO(t - 32.5, 11.5, 0.4, 0.4) }}>
                <div style={{ opacity: clamp((t - 32.5) / 1, 0, 1) }}>• Space–time mixing</div>
                <div style={{ opacity: clamp((t - 35) / 1, 0, 1) }}>• E &amp; M unified</div>
                <div style={{ opacity: clamp((t - 37.5) / 1, 0, 1) }}>• c is absolute</div>
                <div style={{ marginTop: 14, fontFamily: 'var(--font-math)', fontStyle: 'italic',
                     color: 'var(--form-inline)', fontSize: 24,
                     opacity: clamp((t - 40.5) / 1, 0, 1) }}>
                  ds² = −c²dt² + dx²
                </div>
              </div>
            )}

            {/* ── BEAT 4: "both survived" strip ───────────────── */}
            {b4Strip > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 940, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b4Strip }}>
                Both survived every experimental test.
              </div>
            )}

            {/* ── BEAT 5: velocity readout + must-obey tag ────── */}
            {b5Vel > 0 && t < 72 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--accent-red)', opacity: b5Vel * (1 - b6AtomOut) }}>
                v ≈ 0.6 c
              </div>
            )}
            {b5Tag > 0 && t < 72 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 780, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                    color: 'var(--note-inline)', opacity: b5Tag * (1 - b6AtomOut) }}>
                must obey both.
              </div>
            )}

            {/* ── BEAT 6: question mark ─────────────────────── */}
            {b6Q > 0 && t < 88 && (
              <div style={{ position: 'absolute', left: cx - 60, top: cy - 150,
                    fontFamily: 'var(--font-display)', fontSize: 180,
                    color: 'var(--accent-red)',
                    opacity: b6Q * (1 - clamp((t - 86) / 2, 0, 1)),
                    transform: `scale(${0.5 + 0.7 * b6Q - 0.2 * Math.max(0, b6Q - 1)})`,
                    transformOrigin: 'center',
                    textShadow: '0 0 40px var(--accent-red)',
                    fontStyle: 'italic',
                  }}>?</div>
            )}

            {/* ── BEAT 6: bottom caption ─────────────────────── */}
            {b6Cap > 0 && t < 88 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'white', opacity: b6Cap * (1 - clamp((t - 86) / 2, 0, 1)) }}>
                Two successful theories. One deep incompatibility.
              </div>
            )}

            {/* ── BEAT 7: Schrödinger asymmetry ──────────────── */}
            {b7Eq > 0 && t < 104 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 56,
                    color: 'var(--canvas-text)',
                    opacity: b7Eq * (1 - b8Fade) }}>
                <span style={{ color: 'var(--form-inline)' }}>iℏ </span>
                <span style={{ color: 'var(--accent-blue)',
                              borderBottom: b7Dt > 0 ? '3px solid var(--accent-blue)' : 'none',
                              opacity: clamp((t - 92) / 0.8, 0, 1) }}>∂ψ/∂t</span>
                <span style={{ opacity: clamp((t - 93) / 0.8, 0, 1) }}> = −ℏ²/2m </span>
                <span style={{ color: 'var(--accent-yellow)',
                              borderBottom: b7Dx > 0 ? '3px solid var(--accent-yellow)' : 'none',
                              opacity: clamp((t - 94) / 0.8, 0, 1) }}>∇²ψ</span>
                <span style={{ opacity: clamp((t - 95) / 0.8, 0, 1) }}> + Vψ</span>
              </div>
            )}
            {b7Dt > 0 && t < 104 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                    fontFamily: 'var(--font-ui)', fontSize: 22, color: 'var(--accent-blue)',
                    opacity: b7Dt * (1 - b8Fade) }}>
                1 time derivative
              </div>
            )}
            {b7Dx > 0 && t < 104 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 490, textAlign: 'center',
                    fontFamily: 'var(--font-ui)', fontSize: 22, color: 'var(--accent-yellow)',
                    opacity: b7Dx * (1 - b8Fade) }}>
                2 spatial derivatives
              </div>
            )}
            {b7SR > 0 && t < 104 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                    color: 'var(--canvas-text)', opacity: b7SR * (1 - b8Fade) }}>
                Relativity treats t and x on equal footing.
              </div>
            )}
            {b7Neq > 0 && t < 104 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontSize: 96, color: 'var(--accent-red)',
                    opacity: b7Neq * (1 - b8Fade) * (0.7 + 0.3 * Math.sin(t * 4)) }}>
                ≠
              </div>
            )}

            {/* ── BEAT 8: Klein-Gordon & Dirac attempts ──────── */}
            {b8KG > 0 && t < 118 && (
              <div style={{ position: 'absolute', left: 360, top: 420, width: 500,
                    opacity: b8KG * (1 - b9Fade),
                    fontFamily: 'var(--font-ui)' }}>
                <div style={{ background: '#825000', color: 'white', padding: '10px 20px',
                      fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)' }}>Klein–Gordon</div>
                <div style={{ background: '#2d1a00', padding: '22px',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic',
                      fontSize: 32, textAlign: 'center', color: 'var(--canvas-text)' }}>
                  (∂² + m²) φ = 0
                </div>
              </div>
            )}
            {b8Dirac > 0 && t < 118 && (
              <div style={{ position: 'absolute', left: 1060, top: 420, width: 500,
                    opacity: b8Dirac * (1 - b9Fade),
                    fontFamily: 'var(--font-ui)' }}>
                <div style={{ background: '#825000', color: 'white', padding: '10px 20px',
                      fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)' }}>Dirac attempt</div>
                <div style={{ background: '#2d1a00', padding: '22px',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic',
                      fontSize: 32, textAlign: 'center', color: 'var(--canvas-text)' }}>
                  (iγ<sup>μ</sup>∂<sub>μ</sub> − m) ψ = 0
                </div>
              </div>
            )}
            {/* Red X stamps */}
            {b8X1 > 0 && t < 118 && (
              <div style={{ position: 'absolute', left: 580, top: 560, width: 60, height: 60,
                    fontFamily: 'var(--font-display)', fontSize: 72, color: 'var(--accent-red)',
                    opacity: b8X1 * (1 - b9Fade),
                    transform: `rotate(-18deg) scale(${0.7 + 0.3 * b8X1})`,
                    textShadow: '0 0 16px var(--accent-red)' }}>✕</div>
            )}
            {b8X2 > 0 && t < 118 && (
              <div style={{ position: 'absolute', left: 1280, top: 560, width: 60, height: 60,
                    fontFamily: 'var(--font-display)', fontSize: 72, color: 'var(--accent-red)',
                    opacity: b8X2 * (1 - b9Fade),
                    transform: `rotate(14deg) scale(${0.7 + 0.3 * b8X2})`,
                    textShadow: '0 0 16px var(--accent-red)' }}>✕</div>
            )}
            {(b8NegP > 0 || b8NegE > 0) && t < 118 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 34,
                    color: 'var(--accent-red)', opacity: (1 - b9Fade) }}>
                <div style={{ opacity: b8NegP }}>P(x) &lt; 0</div>
                <div style={{ opacity: b8NegE, marginTop: 8 }}>E &lt; 0</div>
              </div>
            )}
            {b8Note > 0 && t < 118 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 160, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                    color: 'var(--note-inline)', opacity: b8Note * (1 - b9Fade) }}>
                Structurally wrong — not small glitches.
              </div>
            )}

            {/* ── BEAT 9: physicist name plates ──────────────── */}
            {t >= 118.5 && t < 130 && (() => {
              const names = ['Dirac','Klein','Gordon','Pauli','Heisenberg','Jordan'];
              const xs = [460, 660, 860, 1060, 1260, 1460];
              const exitFade = 1 - b10Fade;
              return (
                <div style={{ position: 'absolute', inset: 0 }}>
                  {names.map((nm, i) => {
                    const ap = clamp((t - b9Names[i]) / 0.8, 0, 1);
                    return (
                      <div key={nm} style={{
                        position: 'absolute', left: xs[i] - 90, top: 480 + (1 - ap) * 30,
                        width: 180, padding: '16px 10px',
                        border: '1px solid var(--canvas-dim)', borderRadius: 4,
                        textAlign: 'center',
                        fontFamily: 'var(--font-display)', fontSize: 26,
                        color: 'var(--canvas-text)', opacity: ap * exitFade,
                        background: 'rgba(13,17,23,0.55)',
                      }}>{nm}</div>
                    );
                  })}
                  {b9Under > 0 && (
                    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      <line x1={380} y1={580} x2={380 + 1180 * b9Under} y2={580}
                            stroke="var(--accent-red)" strokeWidth="4" opacity={exitFade * 0.85} />
                    </svg>
                  )}
                  {b9Cap > 0 && (
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center',
                          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34,
                          color: 'var(--accent-blue)', opacity: b9Cap * exitFade }}>
                      Abandon the single-particle framework.
                    </div>
                  )}
                  {b9Tag > 0 && (
                    <div style={{ position: 'absolute', left: 0, right: 0, top: 710, textAlign: 'center',
                          fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                          color: 'var(--accent-red)', opacity: b9Tag * exitFade }}>
                      The fix was radical.
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── BEAT 10: FIELD word + resolution caption ───── */}
            {b10Field > 0 && (
              <div style={{
                position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: 140 * (0.6 + 0.4 * b10Field),
                color: 'var(--accent-green)',
                opacity: b10Field,
                letterSpacing: '0.12em',
                textShadow: '0 0 36px rgba(61,240,192,0.45)',
              }}>FIELD</div>
            )}
            {b10Cap > 0 && (
              <div style={{
                position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                color: 'var(--canvas-text)', opacity: b10Cap,
              }}>
                Give up single particles. Replace with a quantum field.
              </div>
            )}

            {/* ── FINAL HOLD (137–142): echo ? + crack over FIELD ── */}
            {t >= 137 && (
              <div style={{ position: 'absolute', left: cx - 60, top: cy - 150,
                    fontFamily: 'var(--font-display)', fontSize: 180,
                    color: 'var(--accent-red)', opacity: 0.55 * clamp((t - 137) / 1.2, 0, 1),
                    fontStyle: 'italic',
                    textShadow: '0 0 40px var(--accent-red)' }}>?</div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 02 — What a field is (SIGNATURE, expanded to 201s / 10 beats)
// Beat 1  (0–14)     Title + "field appears in many contexts"
// Beat 2  (14–38)    Definition: value at every point (grid of dots + numbers)
// Beat 3  (38–66)    Temperature field (scalar) — heatmap room
// Beat 4  (66–92)    Wind velocity (vector field) — arrows at every point
// Beat 5  (92–118)   Dynamics: diffusion, Navier-Stokes, equations of motion
// Beat 6  (118–140)  Classical EM — tensor field, 6 components, Maxwell
// Beat 7  (140–160)  Field exists independently of matter (ambient)
// Beat 8  (160–180)  The quantum leap — classical = number, quantum = operator
// Beat 9  (180–195)  Field types → spin: scalar/vector/tensor/spinor → 0/1/2/½
// Beat 10 (195–201)  Final hold — 3D mesh settles, "next: why single-particle fails"
// ════════════════════════════════════════════════════════════════════════
function Scene02({ start, end }) {
  return (
    <Scene start={start} end={end} label="02">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        // ── Beat gates ─────────────────────────────────────────────
        const b1In       = clamp((t - 1) / 1.5, 0, 1);
        const b1Out      = clamp((t - 12.5) / 1.5, 0, 1);
        const b1Alpha    = b1In * (1 - b1Out);

        const b2In       = clamp((t - 14) / 1.5, 0, 1);
        const b2Grid     = clamp((t - 15) / 4, 0, 1);
        const b2Numbers  = clamp((t - 18) / 2, 0, 1) * clamp((36 - t) / 1.5, 0, 1);
        const b2Out      = clamp((t - 36) / 1.5, 0, 1);
        const b2Alpha    = b2In * (1 - b2Out);

        const b3In       = clamp((t - 38) / 1.5, 0, 1);
        const b3Out      = clamp((t - 64) / 1.5, 0, 1);
        const b3Alpha    = b3In * (1 - b3Out);
        const b3Scalar   = clamp((t - 52) / 1.5, 0, 1) * (1 - b3Out);

        const b4In       = clamp((t - 66) / 1.5, 0, 1);
        const b4Out      = clamp((t - 90) / 1.5, 0, 1);
        const b4Alpha    = b4In * (1 - b4Out);
        const b4Vector   = clamp((t - 80) / 1.5, 0, 1) * (1 - b4Out);

        const b5In       = clamp((t - 92) / 1.5, 0, 1);
        const b5Out      = clamp((t - 116) / 1.5, 0, 1);
        const b5Alpha    = b5In * (1 - b5Out);
        const b5Eq1      = clamp((t - 96) / 1.2, 0, 1) * (1 - b5Out);
        const b5Eq2      = clamp((t - 103) / 1.2, 0, 1) * (1 - b5Out);
        const b5Eq3      = clamp((t - 110) / 1.2, 0, 1) * (1 - b5Out);

        const b6In       = clamp((t - 118) / 1.5, 0, 1);
        const b6Out      = clamp((t - 138) / 1.5, 0, 1);
        const b6Alpha    = b6In * (1 - b6Out);
        const b6Tensor   = clamp((t - 124) / 2, 0, 1) * (1 - b6Out);
        const b6Maxwell  = clamp((t - 132) / 1.5, 0, 1) * (1 - b6Out);

        const b7In       = clamp((t - 140) / 1.5, 0, 1);
        const b7Out      = clamp((t - 158) / 1.5, 0, 1);
        const b7Alpha    = b7In * (1 - b7Out);

        const b8In       = clamp((t - 160) / 1.5, 0, 1);
        const b8Out      = clamp((t - 178) / 1.5, 0, 1);
        const b8Alpha    = b8In * (1 - b8Out);
        const b8LHS      = clamp((t - 164) / 1.5, 0, 1) * (1 - b8Out);
        const b8RHS      = clamp((t - 170) / 1.5, 0, 1) * (1 - b8Out);

        const b9In       = clamp((t - 180) / 1.5, 0, 1);
        const b9Out      = clamp((t - 194) / 1.2, 0, 1);
        const b9Alpha    = b9In * (1 - b9Out);
        const b9Rows     = [181.5, 183.5, 185.5, 187.5];

        const b10In      = clamp((t - 195) / 1.2, 0, 1);
        const finalHold  = t >= 196;

        // Master 3D mesh visibility — shown as a "settled" reference in b7+ and final
        const meshOp = b7Alpha * 0.35 + b8Alpha * 0.25 + b9Alpha * 0.2 + b10In * 0.55;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={2} title={'A Field'} />
            <SceneRefs refs={["ps","zee"]} />

            {/* Persistent ambient field (very subtle) */}
            <FieldBackground accent="#5ba3f5" amplitude={0.22} speed={0.10} />

            {/* ── BEAT 1: Title ─────────────────────────────────── */}
            {b1Alpha > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 84, color: 'var(--canvas-text)',
                      opacity: b1Alpha, letterSpacing: '0.01em' }}>
                  What a Field <span style={{ color: 'var(--accent-blue)' }}>Actually</span> Is
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-dim)', opacity: b1Alpha * clamp((t - 3) / 1, 0, 1) }}>
                  A word used loosely — let's be precise.
                </div>
              </>
            )}

            {/* ── BEAT 2: Grid of dots with numbers ─────────────── */}
            {b2Alpha > 0 && (() => {
              const cols = 12, rows = 7;
              const cellW = 90, cellH = 90;
              const gridW = cols * cellW;
              const ox = (1920 - gridW) / 2, oy = 260;
              const cells = [];
              for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols; i++) {
                  const x = ox + i * cellW + cellW / 2;
                  const y = oy + j * cellH + cellH / 2;
                  const phi = Math.sin((i * 0.6 + j * 0.4) - t * 1.0);
                  const val = phi * 0.5 + 0.5;
                  const dotOp = clamp(b2Grid * 3 - (i + j) / (cols + rows) * 2, 0, 1);
                  const r = 3 + val * 6;
                  cells.push(
                    <g key={`${i}-${j}`} opacity={dotOp * b2Alpha}>
                      <circle cx={x} cy={y} r={r} fill="var(--accent-blue)" opacity={0.3 + 0.6 * val} />
                      {b2Numbers > 0 && (
                        <text x={x} y={y - 14} textAnchor="middle" fontSize="12"
                              fill="var(--canvas-dim)" fontFamily="var(--font-math)"
                              opacity={b2Numbers * 0.7}>{phi.toFixed(2)}</text>
                      )}
                    </g>
                  );
                }
              }
              return (
                <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                  {cells}
                </svg>
              );
            })()}
            {b2Alpha > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b2Alpha }}>
                A <span style={{ color: 'var(--accent-blue)' }}>value</span> at every point in space.
              </div>
            )}
            {b2Alpha > 0 && t > 28 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                    color: 'var(--note-inline)', opacity: b2Alpha * clamp((t - 28) / 1.5, 0, 1) }}>
                That is all.
              </div>
            )}

            {/* ── BEAT 3: Temperature (scalar) field — heatmap room ── */}
            {b3Alpha > 0 && (() => {
              const cols = 16, rows = 10;
              const cellW = 70, cellH = 60;
              const gridW = cols * cellW, gridH = rows * cellH;
              const ox = (1920 - gridW) / 2, oy = 280;
              const rects = [];
              for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols; i++) {
                  // hot zone near (0.3, 0.6), cold near (0.75, 0.3)
                  const fx = i / (cols - 1), fy = j / (rows - 1);
                  const hot = Math.exp(-((fx - 0.3) ** 2 + (fy - 0.6) ** 2) / 0.12);
                  const cold = Math.exp(-((fx - 0.75) ** 2 + (fy - 0.3) ** 2) / 0.1);
                  const T = 20 + 15 * hot - 8 * cold + Math.sin(t * 0.4 + i * 0.3 + j * 0.2) * 1.5;
                  const norm = clamp((T - 10) / 30, 0, 1);
                  // red-to-blue gradient
                  const r = Math.round(60 + 195 * norm);
                  const bC = Math.round(200 * (1 - norm) + 50);
                  const color = `rgb(${r}, ${60 + 80 * (1 - Math.abs(norm - 0.5) * 2)}, ${bC})`;
                  rects.push(
                    <rect key={`${i}-${j}`} x={ox + i * cellW} y={oy + j * cellH}
                          width={cellW - 2} height={cellH - 2}
                          fill={color} opacity={0.55 * b3Alpha} />
                  );
                }
              }
              return (
                <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                  <rect x={ox - 10} y={oy - 10} width={gridW + 20} height={gridH + 20}
                        fill="none" stroke="var(--canvas-dim)" strokeWidth="1" opacity={b3Alpha * 0.4} />
                  {rects}
                </svg>
              );
            })()}
            {b3Alpha > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b3Alpha }}>
                <span style={{ color: 'var(--accent-red)' }}>Temperature</span> field —
                one number per point.
              </div>
            )}
            {b3Scalar > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 34,
                    color: 'var(--form-inline)', opacity: b3Scalar }}>
                T(x, y, z) — scalar field
              </div>
            )}

            {/* ── BEAT 4: Wind velocity (vector field) ─────────── */}
            {b4Alpha > 0 && (() => {
              const cols = 12, rows = 8;
              const cellW = 120, cellH = 90;
              const gridW = cols * cellW, gridH = rows * cellH;
              const ox = (1920 - gridW) / 2, oy = 280;
              const arrows = [];
              for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols; i++) {
                  const x = ox + i * cellW + cellW / 2;
                  const y = oy + j * cellH + cellH / 2;
                  // swirling vector field
                  const fx = (i - cols/2) / cols, fy = (j - rows/2) / rows;
                  const ang = Math.atan2(fy, fx + 0.01) + Math.PI/2 + t * 0.25 + Math.sin(fx * 3) * 0.3;
                  const mag = 20 + 12 * Math.sin(t * 0.5 + i * 0.4 + j * 0.3);
                  const ex = x + Math.cos(ang) * mag;
                  const ey = y + Math.sin(ang) * mag;
                  arrows.push(
                    <g key={`${i}-${j}`} opacity={b4Alpha * 0.7}>
                      <line x1={x} y1={y} x2={ex} y2={ey}
                            stroke="var(--accent-green)" strokeWidth="2" />
                      <circle cx={x} cy={y} r="2" fill="var(--accent-green)" />
                    </g>
                  );
                }
              }
              return (
                <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                  {arrows}
                </svg>
              );
            })()}
            {b4Alpha > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b4Alpha }}>
                <span style={{ color: 'var(--accent-green)' }}>Wind velocity</span> —
                a vector at every point.
              </div>
            )}
            {b4Vector > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 34,
                    color: 'var(--form-inline)', opacity: b4Vector }}>
                v(x, t) = (v<sub>x</sub>, v<sub>y</sub>, v<sub>z</sub>) — vector field
              </div>
            )}

            {/* ── BEAT 5: Dynamics — three equations of motion ─── */}
            {b5Alpha > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b5Alpha }}>
                Classical fields have <span style={{ color: 'var(--accent-yellow)' }}>dynamics</span>.
              </div>
            )}
            {b5Eq1 > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--accent-red)', opacity: b5Eq1 }}>
                ∂T/∂t = α ∇²T
                <div style={{ fontSize: 22, color: 'var(--canvas-dim)', marginTop: 8, fontStyle: 'normal' }}>
                  diffusion (temperature)
                </div>
              </div>
            )}
            {b5Eq2 > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-green)', opacity: b5Eq2 }}>
                ρ (∂v/∂t + v·∇v) = −∇p + μ∇²v
                <div style={{ fontSize: 22, color: 'var(--canvas-dim)', marginTop: 8, fontStyle: 'normal' }}>
                  Navier–Stokes (velocity)
                </div>
              </div>
            )}
            {b5Eq3 > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-blue)', opacity: b5Eq3 }}>
                ∂<sub>μ</sub>F<sup>μν</sup> = J<sup>ν</sup>
                <div style={{ fontSize: 22, color: 'var(--canvas-dim)', marginTop: 8, fontStyle: 'normal' }}>
                  Maxwell (electromagnetism)
                </div>
              </div>
            )}

            {/* ── BEAT 6: EM tensor field + Maxwell's equations ── */}
            {b6Alpha > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b6Alpha }}>
                <span style={{ color: 'var(--accent-blue)' }}>Electromagnetism</span> —
                a <span style={{ color: 'var(--form-inline)' }}>tensor</span> at every point.
              </div>
            )}
            {b6Tensor > 0 && (() => {
              // 4x4 matrix representing F^{μν}
              const entries = [
                [' 0 ', '−Eₓ', '−Eᵧ', '−E_z'],
                [' Eₓ', ' 0 ', '−B_z', ' Bᵧ'],
                [' Eᵧ', ' B_z', ' 0 ', '−Bₓ'],
                [' E_z', '−Bᵧ', ' Bₓ', ' 0 '],
              ];
              return (
                <div style={{ position: 'absolute', left: 560, top: 300, opacity: b6Tensor,
                      fontFamily: 'var(--font-math)', fontStyle: 'italic',
                      fontSize: 30, color: 'var(--canvas-text)' }}>
                  <span style={{ fontSize: 36, color: 'var(--form-inline)' }}>F<sup>μν</sup> = </span>
                  <span style={{ display: 'inline-block', verticalAlign: 'middle',
                        borderLeft: '2px solid var(--canvas-text)',
                        borderRight: '2px solid var(--canvas-text)',
                        padding: '12px 18px', marginLeft: 18 }}>
                    <table style={{ borderCollapse: 'collapse' }}>
                      <tbody>
                        {entries.map((row, i) => (
                          <tr key={i}>
                            {row.map((e, j) => (
                              <td key={j} style={{ padding: '4px 18px', textAlign: 'center' }}>{e}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </span>
                  <div style={{ fontSize: 22, color: 'var(--canvas-dim)', fontStyle: 'normal',
                        marginTop: 18, textAlign: 'center' }}>
                    6 independent components at every spacetime point
                  </div>
                </div>
              );
            })()}
            {b6Maxwell > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--form-inline)', opacity: b6Maxwell }}>
                ∇·E = ρ/ε₀  ·  ∇·B = 0  ·  ∇×E = −∂B/∂t  ·  ∇×B = μ₀J + μ₀ε₀ ∂E/∂t
              </div>
            )}

            {/* ── BEAT 7: Independence from matter ─────────────── */}
            {meshOp > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: meshOp }}>
                <FieldMesh3D baseY={620} layers={22} amp={120} color="var(--accent-blue)" perspective={0.6} peaks={[]} />
              </svg>
            )}
            {b7Alpha > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 48,
                      color: 'var(--canvas-text)', opacity: b7Alpha }}>
                  The field <span style={{ color: 'var(--accent-blue)' }}>exists at every point</span>,
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 290, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 48,
                      color: 'var(--canvas-text)',
                      opacity: b7Alpha * clamp((t - 146) / 1.5, 0, 1) }}>
                  whether or not matter is there.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34,
                      color: 'var(--note-inline)',
                      opacity: b7Alpha * clamp((t - 152) / 1.5, 0, 1) }}>
                  The field is the fundamental thing.
                </div>
              </>
            )}

            {/* ── BEAT 8: Quantum leap — classical vs quantum ──── */}
            {b8Alpha > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--canvas-text)', opacity: b8Alpha }}>
                The <span style={{ color: 'var(--accent-green)' }}>conceptual leap</span> —
              </div>
            )}
            {b8LHS > 0 && (
              <div style={{ position: 'absolute', left: 260, top: 400, width: 580, textAlign: 'center',
                    opacity: b8LHS }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 22, color: 'var(--canvas-dim)',
                      letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
                  Classical field
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 68,
                      color: 'var(--accent-blue)' }}>
                  φ(x) ∈ ℝ
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-text)', marginTop: 20 }}>
                  a number at each point
                </div>
              </div>
            )}
            {b8RHS > 0 && (
              <div style={{ position: 'absolute', left: 1080, top: 400, width: 580, textAlign: 'center',
                    opacity: b8RHS }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 22, color: 'var(--canvas-dim)',
                      letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
                  Quantum field
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 68,
                      color: 'var(--accent-green)' }}>
                  φ̂(x) — operator
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-text)', marginTop: 20 }}>
                  an operator at each point
                </div>
              </div>
            )}
            {b8LHS > 0 && b8RHS > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 530, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontSize: 72, color: 'var(--accent-yellow)',
                    opacity: Math.min(b8LHS, b8RHS) }}>
                ⟶
              </div>
            )}
            {b8RHS > 0.6 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                    color: 'var(--note-inline)',
                    opacity: clamp((t - 174) / 1.5, 0, 1) * (1 - b8Out) }}>
                Operators fluctuate — even at lowest energy.
              </div>
            )}

            {/* ── BEAT 9: Field types → particle spins ──────── */}
            {b9Alpha > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b9Alpha }}>
                Field type determines <span style={{ color: 'var(--accent-yellow)' }}>particle spin</span>.
              </div>
            )}
            {b9Alpha > 0 && (() => {
              const rows = [
                { k: 0, label: 'Scalar',  eq: 'φ(x)',        spin: 'spin 0',   color: 'var(--accent-blue)' },
                { k: 1, label: 'Vector',  eq: 'Aᵘ(x)',       spin: 'spin 1',   color: 'var(--accent-yellow)' },
                { k: 2, label: 'Tensor',  eq: 'gᵘᵛ(x)',      spin: 'spin 2',   color: 'var(--accent-green)' },
                { k: 3, label: 'Spinor',  eq: 'ψₐ(x)',       spin: 'spin ½',   color: 'var(--accent-red)' },
              ];
              return rows.map((r) => {
                const ap = clamp((t - b9Rows[r.k]) / 0.8, 0, 1) * (1 - b9Out);
                return (
                  <div key={r.k} style={{
                    position: 'absolute', left: 240, right: 240, top: 240 + r.k * 130,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    opacity: ap, fontFamily: 'var(--font-display)', fontSize: 34,
                    padding: '18px 32px',
                    borderBottom: '1px solid rgba(130,150,180,0.2)',
                  }}>
                    <span style={{ color: r.color, flex: '0 0 220px' }}>{r.label}</span>
                    <span style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic',
                          color: 'var(--form-inline)', flex: '0 0 200px', textAlign: 'center' }}>
                      {r.eq}
                    </span>
                    <span style={{ color: 'var(--canvas-dim)', flex: '0 0 40px', textAlign: 'center' }}>→</span>
                    <span style={{ color: r.color, flex: '0 0 200px', textAlign: 'right',
                          fontStyle: 'italic' }}>{r.spin}</span>
                  </div>
                );
              });
            })()}

            {/* ── BEAT 10: Final hold ─────────────────────────── */}
            {b10In > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--canvas-text)', opacity: b10In }}>
                <span style={{ color: 'var(--form-inline)' }}>φ(x, t)</span> — a rule at every point in spacetime.
              </div>
            )}
            {finalHold && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 120, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--canvas-dim)', opacity: clamp((t - 196) / 1, 0, 1) }}>
                Next — why the single-particle picture fails.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 03 — Relativistic QM fails (expanded to 168s / 10 beats)
// Beat 1  (0–15)    Title + "the natural attempt"
// Beat 2  (15–35)   Non-rel: E = p²/2m → operator promotion → Schrödinger
// Beat 3  (35–55)   Relativistic energy: E² = p² + m²
// Beat 4  (55–75)   Klein-Gordon derived, parabola → hyperbola morph
// Beat 5  (75–95)   Lorentz-invariant BUT ± branches, E < 0 warning
// Beat 6  (95–115)  Catastrophe — particles cascade, stability collapses
// Beat 7  (115–135) Dirac's trick: linear equation, spin + magnetic moment
// Beat 8  (135–155) Dirac sea — filled negative-energy states, hole = positron
// Beat 9  (155–163) Humor aside on the infinite sea
// Beat 10 (163–168) "Run out of road" + final hold
// ════════════════════════════════════════════════════════════════════════
function Scene03({ start, end }) {
  return (
    <Scene start={start} end={end} label="03">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // ── Beat gates ─────────────────────────────────────────
        const b1In   = clamp((t - 1) / 1.2, 0, 1);
        const b1Out  = clamp((t - 13) / 2, 0, 1);
        const b1A    = b1In * (1 - b1Out);

        const b2In   = clamp((t - 16) / 1.5, 0, 1);
        const b2Eq   = clamp((t - 20) / 1.0, 0, 1);
        const b2Arr  = clamp((t - 24) / 1.0, 0, 1);
        const b2Schr = clamp((t - 28) / 1.0, 0, 1);
        const b2Out  = clamp((t - 34) / 1.5, 0, 1);
        const b2A    = b2In * (1 - b2Out);

        const b3In   = clamp((t - 36) / 1.5, 0, 1);
        const b3Eq   = clamp((t - 40) / 1.0, 0, 1);
        const b3Nat  = clamp((t - 46) / 1.0, 0, 1);
        const b3Out  = clamp((t - 54) / 1.2, 0, 1);
        const b3A    = b3In * (1 - b3Out);

        const b4In   = clamp((t - 56) / 1.2, 0, 1);
        const b4Out  = clamp((t - 74) / 1.2, 0, 1);
        const b4A    = b4In * (1 - b4Out);

        const b5In   = clamp((t - 76) / 1.5, 0, 1);
        const b5Warn = clamp((t - 82) / 1.2, 0, 1);
        const b5Out  = clamp((t - 94) / 1.5, 0, 1);
        const b5A    = b5In * (1 - b5Out);

        const b6In    = clamp((t - 96) / 1.5, 0, 1);
        const b6Ladder = clamp((t - 100) / 1.5, 0, 1);
        const b6Flash = t > 108 && t < 110 ? 1 - (t - 108) / 2 : 0;
        const b6Cap   = clamp((t - 110) / 1.2, 0, 1);
        const b6Out   = clamp((t - 114) / 1.2, 0, 1);
        const b6A     = b6In * (1 - b6Out);

        const b7In   = clamp((t - 116) / 1.5, 0, 1);
        const b7Eq   = clamp((t - 120) / 1.0, 0, 1);
        const b7Spin = clamp((t - 126) / 1.0, 0, 1);
        const b7Mag  = clamp((t - 130) / 1.0, 0, 1);
        const b7Out  = clamp((t - 134) / 1.2, 0, 1);
        const b7A    = b7In * (1 - b7Out);

        const b8In   = clamp((t - 136) / 1.5, 0, 1);
        const b8Hole = clamp((t - 146) / 1.2, 0, 1);
        const b8Out  = clamp((t - 154) / 1.2, 0, 1);
        const b8A    = b8In * (1 - b8Out);

        const b9A    = clamp((t - 156) / 1.2, 0, 1) * (1 - clamp((t - 162) / 1.2, 0, 1));

        const b10A   = clamp((t - 163) / 1, 0, 1);

        // Legacy reused motifs
        const morph  = clamp((t - 57) / 10, 0, 1);
        const showHyperbola = b5A > 0 || b4A > 0.5;
        const showSea = b8A > 0;
        const showAside = b9A > 0;

        const cx = 960, cy = 500;
        const W = 600, H = 360;
        // dispersion curve samplers
        const pts = (m) => {
          // E = sqrt(p^2 + m^2); non-relativistic: p^2/(2m)
          let d = '';
          for (let i = 0; i <= 80; i++) {
            const p = -1 + (i / 80) * 2;
            // interp between non-rel (parabola) and rel (hyperbola)
            const eNR = p * p * 0.8;
            const eR = Math.sqrt(p * p + 0.25);
            const e = eNR * (1 - morph) + eR * morph;
            d += (i === 0 ? 'M' : 'L') + (cx - W/2 + (i/80) * W) + ',' + (cy - e * 200) + ' ';
          }
          return d;
        };
        const negPts = () => {
          let d = '';
          for (let i = 0; i <= 80; i++) {
            const p = -1 + (i / 80) * 2;
            const e = -Math.sqrt(p * p + 0.25);
            d += (i === 0 ? 'M' : 'L') + (cx - W/2 + (i/80) * W) + ',' + (cy - e * 200) + ' ';
          }
          return d;
        };

        // Dispersion curve visibility controlled by b4/b5
        const dispOp = (b4A + b5A * 0.8 + b6A * 0.25 + b7A * 0.15 + b8A * 0.1 + b10A * 0.2);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={3} title={'Relativistic QM Fails'} />
            <SceneRefs refs={["kleinG","ps","zee"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.2} speed={0.1} />

            {/* ── BEAT 1: Title card ─────────────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 68, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  The <span style={{ color: 'var(--accent-blue)' }}>natural attempt</span>
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 490, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-dim)', opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Make quantum mechanics relativistic.
                </div>
              </>
            )}

            {/* ── BEAT 2: Non-rel energy → Schrödinger ──────────── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                Start from the non-relativistic energy relation.
              </div>
            )}
            {b2Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 280, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 52,
                    color: 'var(--accent-blue)', opacity: b2Eq * b2A }}>
                E = p²/2m
              </div>
            )}
            {b2Arr > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                    opacity: b2Arr * b2A }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 22,
                      color: 'var(--canvas-dim)', letterSpacing: '0.15em' }}>
                  PROMOTE TO OPERATORS
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--form-inline)', marginTop: 16 }}>
                  E ⟶ iℏ ∂/∂t &nbsp;·&nbsp; p ⟶ −iℏ ∇
                </div>
              </div>
            )}
            {b2Schr > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 52,
                    color: 'var(--accent-green)', opacity: b2Schr * b2A,
                    textShadow: '0 0 20px rgba(61,240,192,0.4)' }}>
                iℏ ∂ψ/∂t = −(ℏ²/2m) ∇² ψ
                <div style={{ fontSize: 20, color: 'var(--canvas-dim)', marginTop: 14,
                      fontStyle: 'normal', letterSpacing: '0.15em' }}>
                  SCHRÖDINGER
                </div>
              </div>
            )}

            {/* ── BEAT 3: Relativistic energy ─────────────────── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 160, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                In special relativity, energy obeys a different relation.
              </div>
            )}
            {b3Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 58,
                    color: 'var(--accent-yellow)', opacity: b3Eq * b3A,
                    textShadow: '0 0 20px rgba(255,209,102,0.3)' }}>
                E² = p²c² + m²c⁴
              </div>
            )}
            {b3Nat > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center',
                    fontFamily: 'var(--font-ui)', fontSize: 24, color: 'var(--canvas-dim)',
                    opacity: b3Nat * b3A, letterSpacing: '0.15em' }}>
                IN NATURAL UNITS (ℏ = c = 1)
              </div>
            )}
            {b3Nat > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 56,
                    color: 'var(--form-inline)', opacity: b3Nat * b3A }}>
                E² = p² + m²
              </div>
            )}

            {/* ── BEAT 4: Dispersion plot with morph + KG equation ── */}
            {dispOp > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0,
                    opacity: Math.min(1, dispOp) }}>
                {/* axes */}
                <line x1={cx - W/2} y1={cy} x2={cx + W/2} y2={cy}
                      stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1={cx} y1={cy - H} x2={cx} y2={cy + H}
                      stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x={cx + W/2 + 14} y={cy + 6} fill="var(--canvas-dim)"
                      fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">p</text>
                <text x={cx - 28} y={cy - H + 8} fill="var(--canvas-dim)"
                      fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">E</text>
                {/* positive branch */}
                <path d={pts()} fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
                {/* negative branch */}
                {showHyperbola && (
                  <path d={negPts()} fill="none" stroke="var(--accent-red)" strokeWidth="3"
                    opacity={Math.min(1, b5A + 0.4 * b4A)}
                    strokeDasharray={b5A < 1 ? '6 8' : '0'} />
                )}
                {b5A > 0 && (
                  <>
                    <text x={cx + W/2 - 40} y={cy - H + 80} fill="var(--accent-blue)"
                          fontSize="18" fontFamily="var(--font-ui)" opacity={b5A}>E &gt; 0</text>
                    <text x={cx + W/2 - 60} y={cy + H - 60} fill="var(--accent-red)"
                          fontSize="18" fontFamily="var(--font-ui)" opacity={b5A}>E &lt; 0  ?!</text>
                  </>
                )}
              </svg>
            )}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                Same operator promotion ⟶ <span style={{ color: 'var(--accent-yellow)' }}>Klein–Gordon</span>.
              </div>
            )}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--form-inline)', opacity: b4A * clamp((t - 62) / 1.5, 0, 1) }}>
                (∂<sub>t</sub>² − ∇² + m²) φ = 0
              </div>
            )}

            {/* ── BEAT 5: Lorentz-invariant but ± branches ──────── */}
            {b5A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b5A }}>
                Lorentz-invariant —
                <span style={{ color: 'var(--accent-red)' }}> but energies come in ± pairs.</span>
              </div>
            )}
            {b5Warn > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                    color: 'var(--accent-red)', opacity: b5Warn * b5A,
                    textShadow: '0 0 16px rgba(255,107,107,0.5)' }}>
                E = ± √(p² + m²)
              </div>
            )}

            {/* ── BEAT 6: Cascade catastrophe ──────────────────── */}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b6A }}>
                A particle could <span style={{ color: 'var(--accent-red)' }}>cascade downward</span> —
                radiating forever.
              </div>
            )}
            {b6Ladder > 0 && (() => {
              // Energy ladder plunging down
              const rungs = [];
              for (let k = 0; k < 10; k++) {
                const y = 300 + k * 50;
                const ap = clamp(b6Ladder * 10 - k * 0.7, 0, 1);
                const Eval = -0.2 - k * 0.5;
                rungs.push(
                  <g key={k} opacity={ap * b6A}>
                    <line x1={700} y1={y} x2={1220} y2={y}
                          stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
                    <text x={1240} y={y + 5} fill="var(--accent-red)" fontSize="18"
                          fontFamily="var(--font-math)" fontStyle="italic">E = {Eval.toFixed(1)}</text>
                    {k < 9 && (
                      <path d={`M 960 ${y + 6} L 960 ${y + 44} M 950 ${y + 34} L 960 ${y + 44} L 970 ${y + 34}`}
                            stroke="var(--accent-red)" strokeWidth="2" fill="none"
                            opacity={clamp(b6Ladder * 10 - k * 0.8, 0, 1)} />
                    )}
                  </g>
                );
              }
              return (
                <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                  {rungs}
                </svg>
              );
            })()}
            {b6Flash > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                <circle cx="960" cy="540" r={200 + 200 * (1 - b6Flash)}
                        fill="var(--accent-red)" opacity={b6Flash * 0.3} />
              </svg>
            )}
            {b6Cap > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34,
                    color: 'var(--accent-red)', opacity: b6Cap * b6A }}>
                Nothing would be stable. No hydrogen atom.
              </div>
            )}

            {/* ── BEAT 7: Dirac's trick — linear equation ───────── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                <span style={{ color: 'var(--accent-yellow)' }}>Dirac's trick</span> — stay linear in time and space.
              </div>
            )}
            {b7Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 330, textAlign: 'center',
                    opacity: b7Eq * b7A }}>
                <div style={{ background: '#1e50a0', color: 'white', display: 'inline-block',
                      padding: '10px 28px', fontSize: 24, fontFamily: 'var(--font-display)',
                      fontWeight: 700 }}>
                  Dirac equation
                </div>
                <div style={{ background: '#0c1c3c', display: 'inline-block',
                      padding: '24px 40px', fontFamily: 'var(--font-math)', fontStyle: 'italic',
                      fontSize: 42, color: 'var(--canvas-text)', marginLeft: -4 }}>
                  (iγ<sup>μ</sup> ∂<sub>μ</sub> − m) ψ = 0
                </div>
              </div>
            )}
            {b7Spin > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                    color: 'var(--accent-green)', opacity: b7Spin * b7A }}>
                ✓ predicts spin-½ automatically
              </div>
            )}
            {b7Mag > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 600, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                    color: 'var(--accent-green)', opacity: b7Mag * b7A }}>
                ✓ correct magnetic moment (g ≈ 2)
              </div>
            )}
            {b7Mag > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                    color: 'var(--accent-red)', opacity: clamp((t - 132) / 1.2, 0, 1) * b7A }}>
                …but the negative energies are still there.
              </div>
            )}

            {/* ── BEAT 8: Dirac sea ───────────────────────────── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b8A }}>
                <span style={{ color: 'var(--accent-yellow)' }}>Dirac's audacious fix</span> —
                fill the entire negative-energy sea.
              </div>
            )}
            {b8A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b8A }}>
                <g transform={`translate(${cx - 300}, 340)`}>
                  <text x="0" y="-18" fill="var(--accent-red)" fontFamily="var(--font-ui)"
                        fontSize="20" letterSpacing="0.2em">DIRAC SEA (E &lt; 0)</text>
                  {Array.from({ length: 8 }).map((_, i) => {
                    const y = i * 34;
                    const hole = (i === 3 && b8Hole > 0);
                    return (
                      <g key={i}>
                        <line x1="0" y1={y} x2="600" y2={y}
                              stroke="var(--canvas-dim)" strokeWidth="1" strokeDasharray="3 3" />
                        {Array.from({ length: 12 }).map((_, k) => (
                          <circle key={k} cx={25 + k * 50} cy={y} r="7"
                            fill={(hole && k === 6) ? 'none' : 'var(--accent-blue)'}
                            stroke={(hole && k === 6) ? 'var(--accent-red)' : 'none'}
                            strokeWidth="2.5" opacity="0.75" />
                        ))}
                      </g>
                    );
                  })}
                </g>
              </svg>
            )}
            {b8Hole > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 620, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--accent-red)', opacity: b8Hole * b8A }}>
                A hole in the sea ≡ positron (+e, opposite charge)
              </div>
            )}

            {/* ── BEAT 9: Humor aside ─────────────────────────── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 120, right: 120, top: 400,
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', textAlign: 'center', opacity: b9A, lineHeight: 1.45 }}>
                <span style={{ color: 'var(--note-inline)' }}>
                  "The entire infinite negative-energy vacuum is just… fine, actually."
                </span>
                <div style={{ fontSize: 22, color: 'var(--canvas-dim)',
                      marginTop: 24, fontStyle: 'normal' }}>
                  — Every physicist since has been mildly annoyed.
                </div>
              </div>
            )}

            {/* ── BEAT 10: Final — "run out of road" ──────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--accent-red)', opacity: b10A,
                    textShadow: '0 0 30px rgba(255,107,107,0.4)' }}>
                The single-particle approach has run out of road.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 04 — Fields are primary (expanded to 151s / 10 beats)
// Beat 1  (0–12)    Title + "the resolution, stated plainly"
// Beat 2  (12–30)   Don't start with particles; start with fields
// Beat 3  (30–48)   Electron field in lowest-energy state — vacuum
// Beat 4  (48–68)   Disturb the field → electron excitation rises
// Beat 5  (68–86)   Positron = conjugate excitation of same field
// Beat 6  (86–106)  Annihilation: field returns to vacuum + photons
// Beat 7  (106–122) Pair creation from high-energy photon
// Beat 8  (122–138) Humor beat — "jiggle in a field"
// Beat 9  (138–148) Every species has its field
// Beat 10 (148–151) Final hold — "universe is a collection of fields"
// ════════════════════════════════════════════════════════════════════════
function Scene04({ start, end }) {
  return (
    <Scene start={start} end={end} label="04">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        // ── Beat gates ─────────────────────────────────────────
        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));

        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 28) / 1.5, 0, 1));
        const b2Line1 = clamp((t - 15) / 1.0, 0, 1);
        const b2Line2 = clamp((t - 21) / 1.0, 0, 1);

        const b3A = clamp((t - 30) / 1.5, 0, 1) * (1 - clamp((t - 46) / 1.5, 0, 1));
        const b3Cap = clamp((t - 36) / 1.2, 0, 1);

        const b4A = clamp((t - 48) / 1.5, 0, 1) * (1 - clamp((t - 66) / 1.5, 0, 1));
        const b4Rise = clamp((t - 52) / 3, 0, 1);
        const b4Props = clamp((t - 60) / 1.5, 0, 1);

        const b5A = clamp((t - 68) / 1.5, 0, 1) * (1 - clamp((t - 84) / 1.5, 0, 1));
        const b5Rise = clamp((t - 72) / 3, 0, 1);

        const b6A = clamp((t - 86) / 1.5, 0, 1) * (1 - clamp((t - 104) / 1.5, 0, 1));
        const b6Converge = clamp((t - 90) / 3, 0, 1);
        const b6Flash = t > 94 && t < 95.5 ? 1 - (t - 94) / 1.5 : 0;
        const b6Photons = clamp((t - 95) / 2, 0, 1);
        const b6Caption = clamp((t - 99) / 1.2, 0, 1);

        const b7A = clamp((t - 106) / 1.5, 0, 1) * (1 - clamp((t - 120) / 1.5, 0, 1));
        const b7Photon = clamp((t - 108) / 2, 0, 1);
        const b7Hit = t > 112 && t < 113 ? 1 - (t - 112) : 0;
        const b7Pair = clamp((t - 112.5) / 2, 0, 1);

        const b8A = clamp((t - 122) / 1.5, 0, 1) * (1 - clamp((t - 137) / 1.5, 0, 1));

        const b9A = clamp((t - 138) / 1.2, 0, 1) * (1 - clamp((t - 147) / 1.2, 0, 1));
        const b9Fields = [139.2, 140.4, 141.6, 142.8, 144.0, 145.2];

        const b10A = clamp((t - 147) / 1, 0, 1);

        // ── Ripple positions for beats 4-6 ─────────────────────
        // Beat 4 rise: electron alone at 700
        // Beat 5 rise: positron joins at 1220
        // Beat 6 converge: both slide toward center and annihilate
        const eBaseX = 700, pBaseX = 1220;
        const eX = eBaseX + (960 - eBaseX) * b6Converge;
        const pX = pBaseX + (960 - pBaseX) * b6Converge;

        const peaks = [];
        if (b4Rise > 0 && b6Flash < 0.3) {
          const amp = b4A * b4Rise + b5A * b4Rise * 0.7 + b6A * b4Rise * (1 - b6Flash);
          if (amp > 0) peaks.push({ x: eX, amp, sigma: 80, freq: 7 });
        }
        if (b5Rise > 0 && b6Flash < 0.3) {
          const amp = b5A * b5Rise + b6A * b5Rise * (1 - b6Flash);
          if (amp > 0) peaks.push({ x: pX, amp, sigma: 80, freq: 7, phase: Math.PI });
        }
        // Beat 7: pair creation — both peaks emerge from center
        if (b7Pair > 0) {
          const spread = 260 * b7Pair;
          peaks.push({ x: 960 - spread, amp: b7Pair * b7A, sigma: 70, freq: 7 });
          peaks.push({ x: 960 + spread, amp: b7Pair * b7A, sigma: 70, freq: 7, phase: Math.PI });
        }

        // Mesh always visible; brighter during excitations, calmer during vacuum
        const meshOp = 0.35 + 0.55 * (b3A * 0.6 + b4A + b5A + b6A + b7A + b8A * 0.3 + b9A * 0.3 + b10A);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={4} title={'Fields Are Primary'} />
            <SceneRefs refs={["dirac27","weinberg"]} />

            {/* Always-on 3D field mesh (shared motif across beats) */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0,
                  opacity: Math.min(1, meshOp) }}>
              <FieldMesh3D baseY={640} layers={16} amp={110}
                color="var(--accent-blue)" peaks={peaks} perspective={0.55} />
            </svg>

            {/* ── BEAT 1: Title ─────────────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 68, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  The resolution, stated <span style={{ color: 'var(--accent-green)' }}>plainly</span>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 490, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34,
                      color: 'var(--canvas-dim)', opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Fields come first; particles are what fields do.
                </div>
              </>
            )}

            {/* ── BEAT 2: Don't start with particles ──────────── */}
            {b2A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 280, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--accent-red)', opacity: b2Line1 * b2A,
                      textDecoration: 'line-through' }}>
                  Particles → make them relativistic
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 48,
                      color: 'var(--accent-green)', opacity: b2Line2 * b2A }}>
                  ✓ Fields → let particles <em>emerge</em>
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--note-inline)',
                      opacity: b2A * clamp((t - 24) / 1.2, 0, 1) }}>
                  The substrate — not the particle — is fundamental.
                </div>
              </>
            )}

            {/* ── BEAT 3: Electron field in vacuum ────────────── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                The <span style={{ color: 'var(--accent-blue)' }}>electron field</span> fills all space.
              </div>
            )}
            {b3Cap > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                    color: 'var(--canvas-dim)', opacity: b3Cap * b3A }}>
                Lowest energy state = <span style={{ color: 'var(--accent-green)' }}>vacuum</span> — no excitations.
              </div>
            )}
            {b3A > 0 && t > 42 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                    color: 'var(--note-inline)', opacity: clamp((t - 42) / 1.2, 0, 1) * b3A }}>
                The field is still there — quietly fluctuating.
              </div>
            )}

            {/* ── BEAT 4: Disturb the field → electron ──────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                Disturb it. A single excitation appears.
              </div>
            )}
            {b4Rise > 0.3 && b4A > 0 && (
              <div style={{ position: 'absolute', left: eX - 60, top: 460,
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--accent-yellow)', opacity: b4A }}>
                e⁻
              </div>
            )}
            {b4Props > 0 && b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-ui)', fontSize: 26, color: 'var(--canvas-dim)',
                    opacity: b4Props * b4A, letterSpacing: '0.12em' }}>
                mass m<sub>e</sub> &nbsp;·&nbsp; charge −e &nbsp;·&nbsp; spin ½
              </div>
            )}

            {/* ── BEAT 5: Positron = conjugate excitation ────── */}
            {b5A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b5A }}>
                The <span style={{ color: 'var(--accent-red)' }}>positron</span> — a conjugate excitation of the <em>same</em> field.
              </div>
            )}
            {b5Rise > 0.3 && b5A > 0 && (
              <>
                <div style={{ position: 'absolute', left: eX - 60, top: 460,
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--accent-yellow)', opacity: b5A }}>
                  e⁻
                </div>
                <div style={{ position: 'absolute', left: pX - 60, top: 460,
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--accent-red)', opacity: b5A * b5Rise }}>
                  e⁺
                </div>
              </>
            )}
            {b5A > 0 && t > 78 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--note-inline)', opacity: clamp((t - 78) / 1.2, 0, 1) * b5A }}>
                No infinite sea. No filled vacuum. Just the field.
              </div>
            )}

            {/* ── BEAT 6: Annihilation + photons ─────────────── */}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b6A }}>
                They meet — the excitations <span style={{ color: 'var(--accent-yellow)' }}>annihilate</span>.
              </div>
            )}
            {b6Flash > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                <circle cx={960} cy={640} r={80 + 240 * (1 - b6Flash)}
                        fill="var(--accent-yellow)" opacity={0.6 * b6Flash} />
              </svg>
            )}
            {b6Photons > 0 && (() => {
              const out = b6Photons;
              // Two γ photons flying apart
              return (
                <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                  {[-1, 1].map(s => {
                    const x = 960 + s * 400 * out;
                    const y = 640 - 60 * out;
                    return (
                      <g key={s} opacity={out * b6A}>
                        {(() => {
                          // wavy line representing photon
                          let d = 'M ' + (960 + s * 40) + ',' + 640;
                          for (let i = 1; i <= 20; i++) {
                            const fx = (960 + s * 40) + (x - 960 - s * 40) * (i / 20);
                            const fy = 640 + Math.sin(i * 0.8) * 10;
                            d += ` L ${fx.toFixed(1)},${fy.toFixed(1)}`;
                          }
                          return <path d={d} stroke="var(--accent-yellow)" strokeWidth="2.5" fill="none" />;
                        })()}
                        <text x={x + s * 15} y={y} fill="var(--accent-yellow)"
                              fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">γ</text>
                      </g>
                    );
                  })}
                </svg>
              );
            })()}
            {b6Caption > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                    color: 'var(--accent-green)', opacity: b6Caption * b6A }}>
                Field returns to vacuum. Energy → photons.
              </div>
            )}

            {/* ── BEAT 7: Pair creation from photon ──────────── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                Run it in reverse — <span style={{ color: 'var(--accent-yellow)' }}>pair creation</span>.
              </div>
            )}
            {b7Photon > 0 && b7A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                {(() => {
                  // incoming photon from left
                  const progress = clamp((t - 108) / 4, 0, 1);
                  const x0 = 200, x1 = 960;
                  const cur = x0 + (x1 - x0) * progress;
                  let d = `M ${x0},640`;
                  for (let i = 1; i <= 30; i++) {
                    const fx = x0 + (cur - x0) * (i / 30);
                    const fy = 640 + Math.sin(i * 0.6) * 12;
                    d += ` L ${fx.toFixed(1)},${fy.toFixed(1)}`;
                  }
                  return (
                    <g opacity={b7A}>
                      <path d={d} stroke="var(--accent-yellow)" strokeWidth="3" fill="none" />
                      <text x={x0 + 20} y={620} fill="var(--accent-yellow)"
                            fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">γ</text>
                    </g>
                  );
                })()}
              </svg>
            )}
            {b7Hit > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
                <circle cx={960} cy={640} r={100 + 160 * (1 - b7Hit)}
                        fill="var(--accent-yellow)" opacity={0.55 * b7Hit} />
              </svg>
            )}
            {b7Pair > 0 && b7A > 0 && (
              <>
                <div style={{ position: 'absolute', left: (960 - 260 * b7Pair) - 55, top: 460,
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--accent-yellow)', opacity: b7A }}>
                  e⁻
                </div>
                <div style={{ position: 'absolute', left: (960 + 260 * b7Pair) - 55, top: 460,
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--accent-red)', opacity: b7A }}>
                  e⁺
                </div>
              </>
            )}
            {b7A > 0 && t > 117 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                    color: 'var(--note-inline)', opacity: clamp((t - 117) / 1.2, 0, 1) * b7A }}>
                Particle number was never fundamental.
              </div>
            )}

            {/* ── BEAT 8: Humor — "jiggle" ──────────────────── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 200, right: 200, top: 320,
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--canvas-text)', textAlign: 'center', opacity: b8A, lineHeight: 1.4 }}>
                "The electron isn't a dot.
                <div style={{ marginTop: 14 }}>
                  It's a <span style={{ color: 'var(--accent-blue)' }}>jiggle</span> in a field that fills the entire universe."
                </div>
                <div style={{ fontSize: 24, color: 'var(--canvas-dim)',
                      marginTop: 40, fontStyle: 'normal' }}>
                  Whether that's comforting probably depends on your caffeine level.
                </div>
              </div>
            )}

            {/* ── BEAT 9: Every species has its field ─────────── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b9A }}>
                Every species of particle has its own field.
              </div>
            )}
            {b9A > 0 && (() => {
              const fields = [
                { name: 'electron', color: 'var(--accent-blue)' },
                { name: 'muon',     color: 'var(--accent-yellow)' },
                { name: 'quark',    color: 'var(--accent-green)' },
                { name: 'Higgs',    color: 'var(--note-inline)' },
                { name: 'photon',   color: 'var(--accent-red)' },
                { name: '…',        color: 'var(--canvas-dim)' },
              ];
              return fields.map((f, i) => {
                const ap = clamp((t - b9Fields[i]) / 0.6, 0, 1) * b9A;
                const col = i % 3;
                const row = Math.floor(i / 3);
                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: 280 + col * 460, top: 300 + row * 170,
                    width: 420, padding: '20px 24px',
                    border: `1px solid ${f.color}`,
                    borderRadius: 4, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                    color: f.color, opacity: ap, background: 'rgba(13,17,23,0.4)',
                  }}>
                    {f.name} field
                  </div>
                );
              });
            })()}

            {/* ── BEAT 10: Final hold ─────────────────────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--canvas-text)', opacity: b10A,
                    textShadow: '0 0 24px rgba(91,163,245,0.4)' }}>
                The universe is a <span style={{ color: 'var(--accent-blue)' }}>collection of fields</span>.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { SCENES, SCENE_BOUNDS, TITLE_END, TOTAL_DUR,
  TitleCard, Scene01, Scene02, Scene03, Scene04 });
