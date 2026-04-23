// qft-scenes-b.jsx — Scenes 5-10
// Loaded after animations.jsx, qft-primitives.jsx, qft-scenes-a.jsx

// Scene 05 — Fields as Operators
function Scene05({ start, end }) {
  return (
    <Scene start={start} end={end} label="05">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const morphT = clamp((t - 2) / 4, 0, 1);
        const fockT = clamp((t - 10) / 3, 0, 1);
        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={5} title={'Fields as Operators'} />
            <SceneRefs refs={["ps","weinberg"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* line of points */}
              {Array.from({length: 9}).map((_, i) => {
                const x = 260 + i * 140;
                const y = 420;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="var(--accent-blue)" opacity="0.8" />
                    {/* classical number morphing into operator symbol */}
                    <text x={x} y={y - 30} textAnchor="middle" fill="white"
                      fontFamily="var(--font-math)" fontSize="26" fontStyle="italic"
                      opacity={1 - morphT}>
                      {(Math.sin(i * 0.8 + t) * 0.8).toFixed(2)}
                    </text>
                    <text x={x} y={y - 30} textAnchor="middle" fill="var(--form-inline)"
                      fontFamily="var(--font-math)" fontSize="32" fontStyle="italic"
                      opacity={morphT}>
                      φ̂
                    </text>
                  </g>
                );
              })}
              <line x1="240" y1="420" x2="1480" y2="420" stroke="var(--canvas-dim)" strokeWidth="0.8" strokeDasharray="3 4" />
              <text x="1500" y="426" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">x</text>
            </svg>
            {/* Fock space ladder */}
            {fockT > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: fockT }}>
                <g transform="translate(1280, 540)">
                  {['|3⟩','|2⟩','|1⟩','|0⟩'].map((label, i) => (
                    <g key={i}>
                      <line x1="-80" y1={i * 70} x2="80" y2={i * 70} stroke="var(--accent-green)" strokeWidth="2" />
                      <text x="110" y={i * 70 + 8} fill="var(--accent-green)" fontFamily="var(--font-math)" fontSize="24" fontStyle="italic">{label}</text>
                    </g>
                  ))}
                  <text x="-50" y="-50" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="18">Fock space</text>
                </g>
              </svg>
            )}
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              {t < 8 ? 'A classical number at each point…' : 'becomes an operator at each point.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 06 — Quantizing the scalar field (SIGNATURE)
function Scene06({ start, end }) {
  return (
    <Scene start={start} end={end} label="06">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // 0-6: field → Fourier modes
        // 6-14: each mode → harmonic oscillator
        // 14-26: array of oscillators with ladder levels
        const decompose = clamp((t - 1) / 4, 0, 1);
        const toOsc = clamp((t - 7) / 3, 0, 1);
        const showRungs = clamp((t - 14) / 2, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={6} title={'Quantizing the Scalar Field'} />
            <SceneRefs refs={["ps","srednicki"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Top: original wave being decomposed */}
              {decompose < 1 && (() => {
                let d = 'M 200,280 ';
                for (let i = 0; i <= 200; i++) {
                  const x = 200 + (i / 200) * 1520;
                  const y = 280 - (Math.sin(i * 0.08 - t * 2) * 40 + Math.sin(i * 0.22 + t * 3) * 20 + Math.sin(i * 0.4 - t) * 12);
                  d += 'L ' + x + ',' + y + ' ';
                }
                return <path d={d} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" opacity={1 - decompose * 0.5} />;
              })()}

              {/* Fourier modes laid out */}
              {decompose > 0.3 && [0.08, 0.22, 0.4].map((freq, mi) => {
                const y0 = 500 + mi * 160;
                let d = 'M 200,' + y0 + ' ';
                for (let i = 0; i <= 160; i++) {
                  const x = 200 + (i / 160) * (toOsc < 0.9 ? 1520 : 300);
                  const sign = mi % 2 === 0 ? 1 : -1;
                  const y = y0 - Math.sin(i * freq - t * (2 + mi)) * 30 * decompose;
                  d += 'L ' + x + ',' + y + ' ';
                }
                return <path key={mi} d={d} fill="none" stroke="var(--accent-blue)" strokeWidth="2"
                  opacity={decompose * (1 - toOsc * 0.4)} />;
              })}

              {/* Oscillators — parabolic potentials with energy levels */}
              {toOsc > 0 && [0, 1, 2].map((mi) => {
                const cx = 700 + mi * 300;
                const cy = 620;
                let d = '';
                for (let i = -60; i <= 60; i++) {
                  const px = cx + i * 2;
                  const py = cy - 0.035 * i * i;
                  d += (i === -60 ? 'M ' : 'L ') + px + ',' + py + ' ';
                }
                return (
                  <g key={mi} opacity={toOsc}>
                    <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2" />
                    {/* energy levels */}
                    {showRungs > 0 && [0, 1, 2, 3].map(n => {
                      const ey = cy - 15 - n * 22;
                      const halfW = Math.sqrt((cy - ey) / 0.035);
                      return (
                        <g key={n} opacity={showRungs}>
                          <line x1={cx - halfW} y1={ey} x2={cx + halfW} y2={ey}
                            stroke="var(--accent-green)" strokeWidth="1.5" />
                          <text x={cx + halfW + 8} y={ey + 4} fill="var(--accent-green)"
                            fontFamily="var(--font-math)" fontSize="14">{n}</text>
                        </g>
                      );
                    })}
                    <text x={cx} y={cy + 60} textAnchor="middle" fill="var(--canvas-dim)"
                      fontFamily="var(--font-math)" fontSize="18" fontStyle="italic">
                      k{mi === 0 ? '₁' : mi === 1 ? '₂' : '₃'}
                    </text>
                  </g>
                );
              })}

              {/* dots for "more modes" */}
              {toOsc > 0.8 && (
                <text x="1680" y="630" fill="var(--canvas-dim)" fontSize="36" opacity={toOsc}>⋯</text>
              )}
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              {t < 5 ? <>The field <span style={{color:'var(--accent-blue)'}}>φ(x)</span> = sum of Fourier modes</> :
               t < 13 ? 'Each mode is a harmonic oscillator' :
               <>Its quanta are <span style={{color:'var(--accent-green)'}}>particles</span> of momentum k</>}
            </div>

            {/* Lagrangian at bottom */}
            {t > 4 && (
              <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 32, color: 'var(--form-inline)',
                opacity: fadeIO(t - 4, duration - 4, 0.5, 0.6) }}>
                ℒ = ½ (∂<sub>μ</sub>φ)² − ½ m²φ²
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 07 — Creation / annihilation
function Scene07({ start, end }) {
  return (
    <Scene start={start} end={end} label="07">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // ladder with arrows
        const cx = 960, cy = 600;
        const pulseUp = Math.sin(t * 2) > 0;
        const rung = Math.max(0, Math.min(3, Math.floor(t / 3) % 4));

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={7} title={'Creation & Annihilation'} />
            <SceneRefs refs={["dirac27","ps"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Three ladders for different momenta */}
              {[0, 1, 2].map(mi => {
                const x = 600 + mi * 360;
                return (
                  <g key={mi}>
                    {[0, 1, 2, 3].map(n => (
                      <g key={n}>
                        <line x1={x - 100} y1={cy - n * 90} x2={x + 100} y2={cy - n * 90}
                          stroke={mi === 0 && n === rung ? 'var(--accent-yellow)' : 'var(--accent-blue)'}
                          strokeWidth="2" />
                        <text x={x + 120} y={cy - n * 90 + 6} fill="var(--canvas-text)"
                          fontFamily="var(--font-math)" fontSize="22" fontStyle="italic">|{n}⟩</text>
                      </g>
                    ))}
                    <text x={x} y={cy + 60} textAnchor="middle" fill="var(--canvas-dim)"
                      fontFamily="var(--font-math)" fontSize="20" fontStyle="italic">
                      k{['₁','₂','₃'][mi]}
                    </text>
                    {/* arrows on first ladder */}
                    {mi === 0 && (
                      <>
                        <line x1={x - 140} y1={cy - rung * 90} x2={x - 140} y2={cy - (rung + 1) * 90}
                          stroke="var(--accent-green)" strokeWidth="2" markerEnd="url(#arr-up)" />
                        <text x={x - 180} y={cy - rung * 90 - 45} fill="var(--accent-green)"
                          fontFamily="var(--font-math)" fontSize="22" fontStyle="italic">a<tspan fontSize="14" dy="-10">†</tspan></text>
                        <line x1={x + 150} y1={cy - rung * 90} x2={x + 150} y2={cy - Math.max(0, rung - 1) * 90}
                          stroke="var(--accent-red)" strokeWidth="2" markerEnd="url(#arr-up)" />
                        <text x={x + 160} y={cy - rung * 90 + 45} fill="var(--accent-red)"
                          fontFamily="var(--font-math)" fontSize="22" fontStyle="italic">â</text>
                      </>
                    )}
                  </g>
                );
              })}
              <defs>
                <marker id="arr-up" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
                </marker>
              </defs>
            </svg>
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              â<sup style={{fontSize: '0.65em', verticalAlign: 'super'}}>†</sup>(k) adds a quantum. â(k) removes one.
            </div>
            {t > 12 && (
              <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 34, color: 'var(--form-inline)',
                opacity: fadeIO(t - 12, duration - 12, 0.5, 0.5) }}>
                [â(k), â<sup style={{fontSize: '0.65em', verticalAlign: 'super'}}>†</sup>(k′)] = δ(k − k′)
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 08 — Vacuum (humor beat + Casimir)
function Scene08({ start, end }) {
  return (
    <Scene start={start} end={end} label="08">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const showHumor = t < 5;
        const showCasimir = t > 11;
        const plateT = clamp((t - 12) / 5, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={8} title={'The Vacuum'} />
            <SceneRefs refs={["casimir","zee"]} />

            {/* background fluctuations */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {Array.from({length: 60}).map((_, i) => {
                const x = (i * 71) % 1920;
                const y = 260 + ((i * 131) % 600);
                const r = 3 + Math.abs(Math.sin(t * 2 + i)) * 6;
                const op = 0.15 + 0.4 * Math.abs(Math.sin(t * 1.3 + i * 0.7));
                return <circle key={i} cx={x} cy={y} r={r} fill="var(--accent-blue)" opacity={op} />;
              })}
              <FieldSurface y={500} amp={24} color="var(--accent-blue)" stroke={1.2} />
              <FieldSurface y={580} amp={18} color="var(--accent-blue)" stroke={1.2} phase={1.3} />
            </svg>

            {showHumor && (
              <div style={{ position: 'absolute', top: 220, left: 160, right: 160,
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white',
                textAlign: 'center', opacity: fadeIO(t, 5, 0.5, 0.6) }}>
                "The vacuum is doing more work than your average grad student.
                <div style={{ color: 'var(--canvas-dim)', fontSize: 26, marginTop: 18, fontStyle: 'normal' }}>
                  It fluctuates, exerts forces, contributes infinite energy — and doesn't even get co-authorship."
                </div>
              </div>
            )}

            {t > 5 && t < 11 && (
              <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white',
                opacity: fadeIO(t - 5, 6, 0.5, 0.5) }}>
                ⟨0|φ̂|0⟩ = 0, but <span style={{ color: 'var(--form-inline)' }}>⟨0|φ̂²|0⟩ ≠ 0</span>.
              </div>
            )}

            {/* Casimir plates */}
            {showCasimir && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: plateT }}>
                <g transform="translate(960, 540)">
                  {/* plates */}
                  <rect x={-250 + plateT * 60} y="-180" width="12" height="360" fill="var(--canvas-text)" />
                  <rect x={250 - plateT * 60 - 12} y="-180" width="12" height="360" fill="var(--canvas-text)" />
                  {/* fewer waves between */}
                  {Array.from({length: 3}).map((_, i) => {
                    let d = '';
                    for (let k = 0; k <= 60; k++) {
                      const x = -180 + plateT * 60 + (k / 60) * (360 - plateT * 120);
                      const y = -100 + i * 80 + Math.sin(k * 0.5 - t * 3) * 10;
                      d += (k === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                    }
                    return <path key={i} d={d} fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" opacity="0.8" />;
                  })}
                  {/* outside waves — more dense */}
                  {Array.from({length: 8}).map((_, i) => {
                    const side = i % 2 === 0 ? -1 : 1;
                    let d = '';
                    const x0 = side * (280 - plateT * 60);
                    for (let k = 0; k <= 40; k++) {
                      const x = x0 + side * k * 10;
                      const y = -160 + (Math.floor(i/2)) * 80 + Math.sin(k * 0.8 - t * 4 + i) * 8;
                      d += (k === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                    }
                    return <path key={i} d={d} fill="none" stroke="var(--accent-blue)" strokeWidth="1" opacity="0.5" />;
                  })}
                  {/* pressure arrows */}
                  <line x1="-200" y1="200" x2="-160" y2="200" stroke="var(--accent-yellow)" strokeWidth="3" markerEnd="url(#arrR)" />
                  <line x1="200" y1="200" x2="160" y2="200" stroke="var(--accent-yellow)" strokeWidth="3" markerEnd="url(#arrL)" />
                  <text x="0" y="220" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-ui)" fontSize="20">Casimir force</text>
                </g>
                <defs>
                  <marker id="arrR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-yellow)" /></marker>
                  <marker id="arrL" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-yellow)" /></marker>
                </defs>
              </svg>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 09 — Lagrangian density & action
function Scene09({ start, end }) {
  return (
    <Scene start={start} end={end} label="09">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // 4D box → integrate → Euler-Lagrange
        const cubeT = clamp((t - 1) / 3, 0, 1);
        const eqT = clamp((t - 9) / 2, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={9} title={'Lagrangian Density'} />
            <SceneRefs refs={["ps","srednicki"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* 3D box */}
              <g transform="translate(520, 560)" opacity={cubeT}>
                {/* isometric box */}
                {(() => {
                  const s = 200;
                  const d = 120;
                  const front = `M 0,0 L ${s},0 L ${s},${s} L 0,${s} Z`;
                  const top = `M 0,0 L ${d},-${d*0.6} L ${s+d},-${d*0.6} L ${s},0 Z`;
                  const right = `M ${s},0 L ${s+d},-${d*0.6} L ${s+d},${s - d*0.6} L ${s},${s} Z`;
                  return (
                    <>
                      <path d={front} fill="var(--navy-dark)" stroke="var(--accent-blue)" strokeWidth="1.5" opacity="0.6" />
                      <path d={top} fill="var(--navy-dark)" stroke="var(--accent-blue)" strokeWidth="1.5" opacity="0.8" />
                      <path d={right} fill="var(--navy-dark)" stroke="var(--accent-blue)" strokeWidth="1.5" opacity="0.5" />
                      {/* dots inside — Lagrangian density points */}
                      {Array.from({length: 40}).map((_, i) => {
                        const px = (i * 37) % s;
                        const py = (i * 67) % s;
                        return <circle key={i} cx={px} cy={py} r="2" fill="var(--form-inline)" opacity={0.4 + 0.3 * Math.sin(t * 2 + i)} />;
                      })}
                      <text x={s/2 - 20} y={s + 40} fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">spacetime volume</text>
                      <text x="-12" y={-d*0.6 - 10} fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">t</text>
                    </>
                  );
                })()}
              </g>
              {/* integral arrow */}
              {t > 5 && (
                <g transform="translate(940, 620)" opacity={fadeIO(t - 5, duration - 5, 0.5, 0.5)}>
                  <line x1="0" y1="0" x2="120" y2="0" stroke="var(--accent-yellow)" strokeWidth="2" markerEnd="url(#arr-right)" />
                  <text x="60" y="-20" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontSize="28">∫ d⁴x</text>
                </g>
              )}
            </svg>
            <defs>
              <marker id="arr-right" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-yellow)" /></marker>
            </defs>

            {/* action equation */}
            {t > 7 && (
              <div style={{ position: 'absolute', top: 450, left: 1170,
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40, color: 'white',
                opacity: fadeIO(t - 7, duration - 7, 0.6, 0.5) }}>
                S = ∫ ℒ d⁴x
              </div>
            )}
            {/* Euler-Lagrange */}
            {t > 11 && (
              <div style={{ position: 'absolute', top: 560, left: 1160,
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 30,
                color: 'var(--form-inline)', opacity: eqT }}>
                δS = 0 ⟹ <span style={{ color: 'var(--accent-green)' }}>(□ + m²)φ = 0</span>
              </div>
            )}

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {t < 11 ? 'Integrate ℒ over spacetime.' : 'Extremize. Get the field equations.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 10 — Symmetries & Noether
function Scene10({ start, end }) {
  return (
    <Scene start={start} end={end} label="10">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const rotT = Math.min(t * 0.4, 100);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={10} title={'Noether'} />
            <SceneRefs refs={["noether","ps"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* complex-plane circle */}
              <g transform="translate(640, 560)">
                <circle cx="0" cy="0" r="180" fill="none" stroke="var(--canvas-dim)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="-220" y1="0" x2="220" y2="0" stroke="var(--canvas-dim)" strokeWidth="0.8" />
                <line x1="0" y1="-220" x2="0" y2="220" stroke="var(--canvas-dim)" strokeWidth="0.8" />
                <text x="230" y="6" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">Re φ</text>
                <text x="8" y="-220" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">Im φ</text>
                {/* rotating vector = phi */}
                <g transform={`rotate(${rotT * 18})`}>
                  <line x1="0" y1="0" x2="180" y2="0" stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#arrR10)" />
                  <circle cx="180" cy="0" r="8" fill="var(--accent-blue)" />
                </g>
                <text x="0" y="260" textAnchor="middle" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="24">φ → e<tspan baselineShift="super" fontSize="16">iα</tspan>φ</text>
              </g>
              {/* conserved charge value */}
              <g transform="translate(1280, 560)">
                <rect x="-140" y="-80" width="280" height="160" fill="none" stroke="var(--accent-green)" strokeWidth="2" />
                <text x="0" y="-40" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="18">conserved charge</text>
                <text x="0" y="15" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="48">Q</text>
                <text x="0" y="55" textAnchor="middle" fill="var(--accent-green)" fontFamily="var(--font-math)" fontSize="26">= const</text>
              </g>
              <defs>
                <marker id="arrR10" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-blue)" /></marker>
              </defs>
            </svg>
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              {t < 10 ? 'A continuous symmetry…' : '…gives a conserved current.'}
            </div>
            {t > 12 && (
              <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 30, color: 'var(--form-inline)',
                opacity: fadeIO(t - 12, duration - 12, 0.5, 0.5) }}>
                ∂<sub>μ</sub>J<sup>μ</sup> = 0
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { Scene05, Scene06, Scene07, Scene08, Scene09, Scene10 });
