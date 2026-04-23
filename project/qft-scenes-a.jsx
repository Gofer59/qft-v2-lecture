// qft-scenes.jsx — 20 scene definitions for "The Universe Is Made of Fields"
// Must be loaded AFTER animations.jsx and qft-primitives.jsx

// Timing table — each scene gets a compact animated treatment
// Total duration ~7 min. Signature scenes (02, 06, 12, 14, 17) get extra time.
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
// SCENE 01 — the pillars collide
// ════════════════════════════════════════════════════════════════════════
function Scene01({ start, end }) {
  return (
    <Scene start={start} end={end} label="01">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // pillars approach 0..6s, collide at 6-10, crack 10-16, question 16-22
        const approach = clamp((t - 1) / 6, 0, 1);
        const gap = 400 * (1 - approach);
        const cx = 960, cy = 540;
        const collided = t > 7;
        const crackT = clamp((t - 7) / 3, 0, 1);
        const qmark = clamp((t - 13) / 2, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={1} title={'The Question'} />
            <SceneRefs refs={["ps","zee"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* LEFT PILLAR — QM wavefunction */}
              <g transform={`translate(${cx - gap/2 - 240}, ${cy - 180})`}>
                <text x="120" y="-30" textAnchor="middle" fill="var(--accent-blue)" fontFamily="var(--font-display)" fontStyle="italic" fontSize="28">Quantum Mechanics</text>
                {(() => {
                  let d = 'M 0,180 ';
                  for (let i = 0; i <= 120; i++) {
                    const x = i * 2;
                    const env = Math.exp(-Math.pow((x - 120) / 60, 2));
                    const w = Math.sin(x * 0.35 - t * 4) * 60 * env;
                    d += `L ${x},${180 - w} `;
                  }
                  return <path d={d} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" />;
                })()}
                <rect x="0" y="340" width="240" height="2" fill="var(--canvas-dim)" />
              </g>

              {/* RIGHT PILLAR — spacetime diagram */}
              <g transform={`translate(${cx + gap/2}, ${cy - 180})`}>
                <text x="120" y="-30" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-display)" fontStyle="italic" fontSize="28">Special Relativity</text>
                <line x1="120" y1="340" x2="120" y2="20" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="0" y1="180" x2="240" y2="180" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="120" y1="180" x2="20" y2="30" stroke="var(--accent-yellow)" strokeWidth="2" />
                <line x1="120" y1="180" x2="220" y2="30" stroke="var(--accent-yellow)" strokeWidth="2" />
                <line x1="120" y1="180" x2="20" y2="330" stroke="var(--accent-yellow)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <line x1="120" y1="180" x2="220" y2="330" stroke="var(--accent-yellow)" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <text x="22" y="22" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">ct</text>
                <text x="230" y="175" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">x</text>
              </g>

              {/* Crack */}
              {collided && (() => {
                const paths = [];
                for (let i = 0; i < 5; i++) {
                  const angle = -Math.PI/2 + (i - 2) * 0.3;
                  const len = 240 * crackT;
                  const segs = [];
                  let x = cx, y = cy;
                  segs.push(`M ${x},${y}`);
                  for (let j = 0; j < 6; j++) {
                    x += Math.cos(angle + (Math.random() - 0.5) * 0.6) * (len / 6);
                    y += Math.sin(angle + (Math.random() - 0.5) * 0.6) * (len / 6);
                    if (Math.hypot(x - cx, y - cy) > len) break;
                  }
                  // deterministic zigzag instead
                  const pts = ['M ' + cx + ',' + cy];
                  let px = cx, py = cy;
                  const a = -Math.PI/2 + (i - 2) * 0.35;
                  for (let j = 1; j <= 6; j++) {
                    const r = (len / 6) * j;
                    const jitter = Math.sin(j * 2 + i) * 18;
                    px = cx + Math.cos(a) * r + Math.cos(a + Math.PI/2) * jitter;
                    py = cy + Math.sin(a) * r + Math.sin(a + Math.PI/2) * jitter;
                    pts.push('L ' + px.toFixed(0) + ',' + py.toFixed(0));
                  }
                  paths.push(<path key={i} d={pts.join(' ')} stroke="var(--accent-red)" strokeWidth="2" fill="none" opacity={0.6 + 0.3 * Math.sin(t * 10 + i)} />);
                }
                return paths;
              })()}
              {/* flash on collision */}
              {t > 6.8 && t < 7.6 && (
                <circle cx={cx} cy={cy} r={100 * (t - 6.8)} fill="var(--accent-red)" opacity={Math.max(0, 0.5 - (t - 6.8))} />
              )}
            </svg>

            {/* Question mark */}
            {qmark > 0 && (
              <div style={{
                position: 'absolute', left: cx - 60, top: cy - 90,
                fontFamily: 'var(--font-display)', fontSize: 180, color: 'var(--accent-red)',
                opacity: qmark, transform: `scale(${0.5 + 0.5 * qmark})`, transformOrigin: 'center',
                textShadow: '0 0 40px var(--accent-red)',
                fontStyle: 'italic',
              }}>?</div>
            )}

            {/* Caption at bottom */}
            {t > 16 && (
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                color: 'white', opacity: Math.min(1, (t - 16) / 1),
              }}>
                Two successful theories. One deep incompatibility.
              </div>
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
