// qft-scenes.jsx — 20 scene definitions for "The Universe Is Made of Fields"
// Must be loaded AFTER animations.jsx and qft-primitives.jsx

// Timing table — each scene gets a compact animated treatment
// Total duration ~7 min. Signature scenes (02, 06, 12, 14, 17) get extra time.
const SCENES = [
  { n: 1,  title: 'The Question That Breaks Single-Particle Mechanics', dur: 142 }, // expanded for full narration 140.7s
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
// SCENE 02 — What a field is (SIGNATURE)
// ════════════════════════════════════════════════════════════════════════
function Scene02({ start, end }) {
  return (
    <Scene start={start} end={end} label="02">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // Phase 1 (0-8): grid of numbers appears
        // Phase 2 (8-16): grid becomes surface
        // Phase 3 (16-26): 3D undulating surface

        const gridPhase = clamp((t - 0.5) / 3, 0, 1);
        const rippleOn = clamp((t - 4) / 2, 0, 1);
        const toSurface = clamp((t - 9) / 3, 0, 1);
        const to3D = clamp((t - 15) / 3, 0, 1);

        const cols = 12, rows = 7;
        const cellW = 90, cellH = 90;
        const gridW = cols * cellW, gridH = rows * cellH;
        const ox = (1920 - gridW) / 2, oy = 240;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={2} title={'A Field'} />
            <SceneRefs refs={["ps","zee"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Grid of dots with numbers */}
              {to3D < 1 && Array.from({ length: rows }, (_, j) => Array.from({ length: cols }, (_, i) => {
                const x = ox + i * cellW + cellW / 2;
                const y = oy + j * cellH + cellH / 2;
                const phi = Math.sin((i * 0.6 + j * 0.4) - t * 1.5) * rippleOn;
                const val = (phi * 0.5 + 0.5);
                const showNum = gridPhase > (i + j) / (cols + rows) && toSurface < 0.4;
                const r = 3 + val * 6;
                const dotOp = Math.min(1, gridPhase * 3 - (i + j) / (cols + rows) * 2) * (1 - toSurface * 0.4);
                return (
                  <g key={`${i}-${j}`} opacity={Math.max(0, dotOp)}>
                    <circle cx={x} cy={y} r={r}
                      fill="var(--accent-blue)" opacity={0.3 + 0.6 * val} />
                    {showNum && (
                      <text x={x} y={y - 14} textAnchor="middle" fontSize="12" fill="var(--canvas-dim)"
                        fontFamily="var(--font-math)" opacity="0.7">
                        {phi.toFixed(2)}
                      </text>
                    )}
                  </g>
                );
              }))}

              {/* Continuous surface (Phase 2) — one ribbon per row */}
              {toSurface > 0 && to3D < 1 && Array.from({ length: rows }, (_, j) => {
                const y = oy + j * cellH + cellH / 2;
                let d = '';
                for (let i = 0; i <= 60; i++) {
                  const px = ox + (i / 60) * gridW;
                  const phi = Math.sin((i * 0.15 + j * 0.4) - t * 1.5);
                  d += (i === 0 ? 'M' : 'L') + px + ',' + (y - phi * 14 * toSurface) + ' ';
                }
                return <path key={'r'+j} d={d} fill="none" stroke="var(--accent-blue)"
                  strokeWidth="1.5" opacity={toSurface * 0.5 * (1 - to3D * 0.4)} />;
              })}
            </svg>

            {/* 3D mesh view */}
            {to3D > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: to3D }}>
                <FieldMesh3D baseY={620} layers={22} amp={120} color="var(--accent-blue)" perspective={0.6} peaks={[]} />
              </svg>
            )}

            {/* Labels */}
            {t > 2 && t < 10 && (
              <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 44, color: 'white',
                opacity: fadeIO(t - 2, 8, 0.6, 0.6) }}>
                A <span style={{ color: 'var(--accent-blue)' }}>field</span> — a value at every point in space.
              </div>
            )}
            {t > 10 && t < 15.5 && (
              <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 44, color: 'white',
                opacity: fadeIO(t - 10, 5.5, 0.6, 0.6) }}>
                The values form a continuous surface.
              </div>
            )}
            {t > 16.5 && (
              <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 44, color: 'white',
                opacity: fadeIO(t - 16.5, duration - 16.5, 0.6, 0.6) }}>
                <span style={{ color: 'var(--form-inline)' }}>φ(x, t)</span> — a rule at every point in spacetime.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 03 — Relativistic QM fails (humor beat)
// ════════════════════════════════════════════════════════════════════════
function Scene03({ start, end }) {
  return (
    <Scene start={start} end={end} label="03">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // Phase A 0-8: parabola morphs into hyperbola
        // Phase B 8-15: hyperbola branches
        // Phase C 15-22: Dirac sea + aside
        const morph = clamp((t - 1) / 5, 0, 1);
        const showHyperbola = t > 6;
        const showSea = t > 13;
        const showAside = t > 17;

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

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={3} title={'Relativistic QM Fails'} />
            <SceneRefs refs={["kleinG","ps","zee"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* axes */}
              <line x1={cx - W/2} y1={cy} x2={cx + W/2} y2={cy} stroke="var(--canvas-dim)" strokeWidth="1" />
              <line x1={cx} y1={cy - H} x2={cx} y2={cy + H} stroke="var(--canvas-dim)" strokeWidth="1" />
              <text x={cx + W/2 + 14} y={cy + 6} fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">p</text>
              <text x={cx - 28} y={cy - H + 8} fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">E</text>

              {/* positive branch */}
              <path d={pts()} fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
              {/* negative branch */}
              {showHyperbola && (
                <path d={negPts()} fill="none" stroke="var(--accent-red)" strokeWidth="3"
                  opacity={clamp((t - 6) / 2, 0, 1)} strokeDasharray={clamp((t - 6) / 2, 0, 1) < 1 ? '6 8' : '0'} />
              )}
              {/* labels on branches */}
              {t > 8 && (
                <>
                  <text x={cx + W/2 - 40} y={cy - H + 80} fill="var(--accent-blue)" fontSize="18" fontFamily="var(--font-ui)">E &gt; 0</text>
                  <text x={cx + W/2 - 60} y={cy + H - 60} fill="var(--accent-red)" fontSize="18" fontFamily="var(--font-ui)">E &lt; 0 ?!</text>
                </>
              )}
            </svg>

            {/* Equations */}
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 46, color: 'white' }}>
              {morph < 0.5 ? (
                <span style={{ opacity: 1 - morph * 2 }}>E = p²/2m</span>
              ) : (
                <span style={{ opacity: (morph - 0.5) * 2 }}>
                  E² = p² + <span style={{ color: 'var(--form-inline)' }}>m²</span>
                </span>
              )}
            </div>

            {/* Dirac sea */}
            {showSea && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: clamp((t - 13) / 1.5, 0, 1) }}>
                <g transform={`translate(${cx - 300}, ${cy + 140})`}>
                  <text x="0" y="-20" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="20">Dirac's sea</text>
                  {Array.from({length: 8}).map((_, i) => {
                    const y = i * 34;
                    const hole = (i === 3 && t > 16);
                    return (
                      <g key={i}>
                        <line x1="0" y1={y} x2="600" y2={y} stroke="var(--canvas-dim)" strokeWidth="1" strokeDasharray="3 3" />
                        {Array.from({length: 12}).map((_, k) => (
                          <circle key={k} cx={25 + k * 50} cy={y} r="6"
                            fill={(hole && k === 6) ? 'none' : 'var(--accent-blue)'}
                            stroke={(hole && k === 6) ? 'var(--accent-red)' : 'none'}
                            strokeWidth="2" opacity="0.7" />
                        ))}
                      </g>
                    );
                  })}
                  {t > 16 && (
                    <text x="330" y="105" fill="var(--accent-red)" fontSize="15" fontFamily="var(--font-ui)">hole = positron</text>
                  )}
                </g>
              </svg>
            )}

            {/* Dry aside */}
            {showAside && (
              <div style={{
                position: 'absolute', left: 120, right: 120, bottom: 120,
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--canvas-text)',
                opacity: fadeIO(t - 17, duration - 17, 0.6, 0.6),
                textAlign: 'center', lineHeight: 1.4,
              }}>
                <span style={{ color: 'var(--note-inline)' }}>"The entire infinite negative-energy vacuum is just… fine, actually."</span>
                <div style={{ fontSize: 18, color: 'var(--canvas-dim)', marginTop: 14, fontStyle: 'normal' }}>
                  — Every physicist since has been mildly annoyed.
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// ════════════════════════════════════════════════════════════════════════
// SCENE 04 — Fields are primary (humor beat)
// ════════════════════════════════════════════════════════════════════════
function Scene04({ start, end }) {
  return (
    <Scene start={start} end={end} label="04">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // 0-4: calm field
        // 4-9: ripple rises — "electron"
        // 9-13: second ripple — "positron"
        // 13-17: collide & annihilate
        // 17-22: humor beat
        const epeakT = clamp((t - 3.5) / 1.5, 0, 1);
        const ppeakT = clamp((t - 8.5) / 1.5, 0, 1);
        const collideT = t > 13 ? (t - 13) / 2 : 0;
        const ePos = 700 - collideT * 200;
        const pPos = 1220 + collideT * 200;
        const bothGone = t > 15 ? clamp((t - 15) / 1.5, 0, 1) : 0;

        const peaks = [];
        if (t > 2.5 && t < 15.5) peaks.push({ x: ePos, amp: epeakT * (1 - bothGone), sigma: 80, freq: 7 });
        if (t > 7.5 && t < 15.5) peaks.push({ x: pPos, amp: ppeakT * (1 - bothGone), sigma: 80, freq: 7, phase: Math.PI });

        const showHumor = t > 17;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={4} title={'Fields Are Primary'} />
            <SceneRefs refs={["dirac27","weinberg"]} />

            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <FieldMesh3D baseY={640} layers={16} amp={110} color="var(--accent-blue)" peaks={peaks} perspective={0.55} />

              {/* annihilation: brief soft flash, no starburst */}
              {t > 14.5 && t < 15.3 && (
                <circle cx="960" cy="640" r={40 + (t - 14.5) * 160}
                  fill="var(--accent-yellow)"
                  opacity={Math.max(0, 0.35 - (t - 14.5) * 0.5)} />
              )}
            </svg>

            {/* labels */}
            {t > 4 && t < 13 && (
              <div style={{
                position: 'absolute', left: ePos - 50, top: 500,
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24,
                color: 'var(--accent-blue)', opacity: fadeIO(t - 4, 9, 0.5, 1),
                textAlign: 'center',
              }}>
                <span style={{ color: 'var(--accent-yellow)' }}>e⁻</span>
                <div style={{ fontSize: 16, color: 'var(--canvas-dim)' }}>a ripple</div>
              </div>
            )}
            {t > 9 && t < 13 && (
              <div style={{
                position: 'absolute', left: pPos - 50, top: 500,
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24,
                color: 'var(--accent-red)', opacity: fadeIO(t - 9, 4, 0.5, 1),
                textAlign: 'center',
              }}>
                <span style={{ color: 'var(--accent-red)' }}>e⁺</span>
                <div style={{ fontSize: 16, color: 'var(--canvas-dim)' }}>conjugate mode</div>
              </div>
            )}

            {t < 17 && (
              <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white', opacity: fadeIO(t, 17, 0.6, 0.6) }}>
                The electron is not a dot. It is an <span style={{ color: 'var(--accent-blue)' }}>excitation of the electron field</span>.
              </div>
            )}

            {showHumor && (
              <div style={{
                position: 'absolute', left: 200, right: 200, top: 300,
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38, color: 'var(--canvas-text)',
                textAlign: 'center', opacity: fadeIO(t - 17, duration - 17, 0.7, 0.6),
              }}>
                <div>"The electron isn't a dot.</div>
                <div style={{ marginTop: 8 }}>It's a <span style={{ color: 'var(--accent-blue)' }}>jiggle</span> in a field that fills the entire universe."</div>
                <div style={{ fontSize: 22, color: 'var(--canvas-dim)', marginTop: 30, fontStyle: 'normal' }}>
                  Whether that's comforting probably depends on your caffeine level.
                </div>
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
