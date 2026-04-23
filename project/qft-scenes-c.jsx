// qft-scenes-c.jsx — Scenes 11-16

// Scene 11 — Interactions
function Scene11({ start, end }) {
  return (
    <Scene start={start} end={end} label="11">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // wave packets cross: first no interaction, then scatter
        const phase = t < 9 ? 'free' : 'interact';
        const progress = phase === 'free' ? (t % 8) / 8 : ((t - 9) % 8) / 8;
        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={11} title={'Interactions'} />
            <SceneRefs refs={["ps","schwartz"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              <line x1="100" y1="540" x2="1820" y2="540" stroke="var(--canvas-dim)" strokeWidth="0.8" strokeDasharray="3 6" />
              {(() => {
                const x1 = 200 + progress * 1520;
                const x2 = 1720 - progress * 1520;
                if (phase === 'free') {
                  return (
                    <>
                      <circle cx={x1} cy="540" r="22" fill="var(--accent-blue)" opacity="0.8" />
                      <circle cx={x2} cy="540" r="22" fill="var(--accent-green)" opacity="0.8" />
                    </>
                  );
                } else {
                  // scatter at center
                  const scatter = progress < 0.5 ? 0 : (progress - 0.5) * 2;
                  const ang = 0.6 * scatter;
                  const mx = 200 + progress * 1520;
                  const my = 540 - Math.sin(ang) * 280 * scatter;
                  const nx = 1720 - progress * 1520;
                  const ny = 540 + Math.sin(ang) * 280 * scatter;
                  return (
                    <>
                      <circle cx={mx} cy={my} r="22" fill="var(--accent-blue)" opacity="0.9" />
                      <circle cx={nx} cy={ny} r="22" fill="var(--accent-green)" opacity="0.9" />
                      {progress > 0.45 && progress < 0.55 && (
                        <circle cx="960" cy="540" r={60 * (1 - Math.abs(progress - 0.5) * 20)} fill="var(--accent-yellow)" opacity="0.4" />
                      )}
                    </>
                  );
                }
              })()}
            </svg>
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              {phase === 'free' ? 'Free field: particles pass through.' : 'Add λ φ⁴ — they scatter.'}
            </div>
            {t > 14 && (
              <div style={{ position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 34, color: 'var(--form-inline)',
                opacity: fadeIO(t - 14, duration - 14, 0.5, 0.5) }}>
                ℒ<sub>int</sub> = −(λ/4!) φ⁴
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 12 — Feynman diagrams (SIGNATURE, humor beat)
function Scene12({ start, end }) {
  return (
    <Scene start={start} end={end} label="12">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const showIn = t > 1;
        const showVertex = t > 4;
        const showOut = t > 6;
        const showExchange = t > 11;
        const showHumor = t > 22;
        const cx = 700, cy = 560;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={12} title={'Feynman Diagrams'} />
            <SceneRefs refs={["feynman49","ps"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* First diagram: simple vertex */}
              {showIn && (() => {
                const inT = clamp((t - 1) / 1.5, 0, 1);
                const outT = clamp((t - 6) / 1.5, 0, 1);
                return (
                  <g opacity={showExchange ? Math.max(0, 1 - (t - 11) / 2) : 1}>
                    <line x1={cx - 260} y1={cy - 180} x2={cx - (1 - inT) * 260 - inT * 0} y2={cy - (1 - inT) * 180}
                      stroke="var(--accent-blue)" strokeWidth="3" />
                    <line x1={cx - 260} y1={cy + 180} x2={cx - (1 - inT) * 260} y2={cy + (1 - inT) * 180}
                      stroke="var(--accent-blue)" strokeWidth="3" />
                    {showVertex && <circle cx={cx} cy={cy} r={10} fill="var(--accent-yellow)" />}
                    {showOut && (
                      <>
                        <line x1={cx} y1={cy} x2={cx + outT * 260} y2={cy - outT * 180}
                          stroke="var(--accent-blue)" strokeWidth="3" />
                        <line x1={cx} y1={cy} x2={cx + outT * 260} y2={cy + outT * 180}
                          stroke="var(--accent-blue)" strokeWidth="3" />
                      </>
                    )}
                    {showVertex && (
                      <text x={cx} y={cy - 22} textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">−iλ</text>
                    )}
                  </g>
                );
              })()}

              {/* Exchange diagram: two vertices + internal photon */}
              {showExchange && (() => {
                const exT = clamp((t - 12) / 2, 0, 1);
                const humorFade = showHumor ? Math.max(0.15, 1 - (t - 22) / 1.5) : 1;
                const x1 = cx + 110, x2 = cx + 410, y1 = cy - 120, y2 = cy + 120;
                return (
                  <g opacity={exT * humorFade}>
                    <line x1={x1 - 220} y1={y1 - 120} x2={x1} y2={y1} stroke="var(--accent-blue)" strokeWidth="3" />
                    <line x1={x1} y1={y1} x2={x2} y2={y1 + 0} stroke="var(--accent-blue)" strokeWidth="3" />
                    <line x1={x2} y1={y1} x2={x2 + 220} y2={y1 - 120} stroke="var(--accent-blue)" strokeWidth="3" />

                    <line x1={x1 - 220} y1={y2 + 120} x2={x1} y2={y2} stroke="var(--accent-blue)" strokeWidth="3" />
                    <line x1={x1} y1={y2} x2={x2} y2={y2} stroke="var(--accent-blue)" strokeWidth="3" />
                    <line x1={x2} y1={y2} x2={x2 + 220} y2={y2 + 120} stroke="var(--accent-blue)" strokeWidth="3" />

                    {/* wavy photon */}
                    {(() => {
                      let d = '';
                      const mx = (x1 + x2) / 2;
                      for (let i = 0; i <= 40; i++) {
                        const yy = y1 + (i / 40) * (y2 - y1);
                        const xx = mx + Math.sin(i * 0.7) * 12;
                        d += (i === 0 ? 'M' : 'L') + xx + ',' + yy + ' ';
                      }
                      return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" strokeDasharray="6 5" />;
                    })()}
                    <circle cx={(x1+x2)/2} cy={y1} r="8" fill="var(--accent-yellow)" />
                    <circle cx={(x1+x2)/2} cy={y2} r="8" fill="var(--accent-yellow)" />
                    <text x={(x1+x2)/2} y={y1 - 18} textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">vertex</text>
                    <text x={(x1+x2)/2} y={y2 + 30} textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="18">vertex</text>
                    <text x={(x1+x2)/2 + 20} y={(y1+y2)/2} fill="var(--accent-yellow)" fontFamily="var(--font-ui)" fontSize="18">photon (propagator)</text>
                  </g>
                );
              })()}
            </svg>

            {!showHumor && (
              <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
                {showExchange ? 'Two vertices, one propagator — the Coulomb force.' :
                 showVertex ? 'A vertex carries a factor of the coupling.' :
                 'External lines enter the diagram.'}
              </div>
            )}

            {showHumor && (
              <div style={{ position: 'absolute', top: 180, left: 160, right: 160,
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36, color: 'white',
                textAlign: 'center', opacity: fadeIO(t - 22, duration - 22, 0.5, 0.5) }}>
                "Each diagram does the work of an integral that would take pages to write out.
                <div style={{ color: 'var(--canvas-dim)', fontSize: 24, marginTop: 22, fontStyle: 'normal' }}>
                  Generations of physicists are quietly grateful they didn't have to grade Feynman's homework."
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 13 — Propagators & vertex in detail
function Scene13({ start, end }) {
  return (
    <Scene start={start} end={end} label="13">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={13} title={'Propagator & Vertex'} />
            <SceneRefs refs={["ps","schwartz"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Left panel: propagator */}
              <g transform="translate(480, 580)">
                <line x1="-200" y1="0" x2="200" y2="0" stroke="var(--accent-blue)" strokeWidth="3" />
                <polygon points="-10,-6 10,0 -10,6" fill="var(--accent-blue)" transform="translate(-80, 0)" />
                <text x="0" y="-30" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">k →</text>
                <text x="0" y="100" textAnchor="middle" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="40">
                  i / (k² − m² + iε)
                </text>
                <text x="0" y="-150" textAnchor="middle" fill="var(--accent-blue)" fontFamily="var(--font-ui)" fontSize="20">propagator</text>
              </g>

              {/* Right panel: QED vertex */}
              {t > 6 && (() => {
                const op = fadeIO(t - 6, duration - 6, 0.5, 0.5);
                return (
                  <g transform="translate(1400, 580)" opacity={op}>
                    <line x1="-160" y1="-160" x2="0" y2="0" stroke="var(--accent-blue)" strokeWidth="3" />
                    <line x1="0" y1="0" x2="-160" y2="160" stroke="var(--accent-blue)" strokeWidth="3" />
                    {/* wavy photon */}
                    {(() => {
                      let d = '';
                      for (let i = 0; i <= 30; i++) {
                        const x = (i / 30) * 200;
                        const y = Math.sin(i * 0.7) * 10;
                        d += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                      }
                      return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" />;
                    })()}
                    <circle cx="0" cy="0" r="9" fill="var(--accent-yellow)" />
                    <text x="-190" y="-160" fill="var(--accent-blue)" fontFamily="var(--font-math)" fontSize="18">e⁻</text>
                    <text x="-190" y="180" fill="var(--accent-red)" fontFamily="var(--font-math)" fontSize="18">e⁺</text>
                    <text x="210" y="5" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontSize="18">γ</text>
                    <text x="0" y="220" textAnchor="middle" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">−ieγ<tspan baselineShift="super" fontSize="16">μ</tspan></text>
                    <text x="0" y="-150" textAnchor="middle" fill="var(--accent-yellow)" fontFamily="var(--font-ui)" fontSize="20">QED vertex</text>
                  </g>
                );
              })()}
            </svg>
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              Two building blocks. Everything else is assembly.
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 14 — Loops & renormalization (SIGNATURE)
function Scene14({ start, end }) {
  return (
    <Scene start={start} end={end} label="14">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // 0-6: build one-loop diagram
        // 6-14: k flowing around loop, integral diverges
        // 14-22: counterterm cancels, finite result
        const buildT = clamp((t - 1) / 4, 0, 1);
        const divergeT = clamp((t - 8) / 4, 0, 1);
        const renormT = clamp((t - 16) / 4, 0, 1);
        const cx = 720, cy = 560;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={14} title={'Loops & Renormalization'} />
            <SceneRefs refs={["ps","schwartz"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Diagram */}
              <g>
                <line x1={cx - 300} y1={cy} x2={cx - 100} y2={cy} stroke="var(--accent-yellow)" strokeWidth="2.5" strokeDasharray="6 5" opacity={buildT} />
                <line x1={cx + 100} y1={cy} x2={cx + 300} y2={cy} stroke="var(--accent-yellow)" strokeWidth="2.5" strokeDasharray="6 5" opacity={buildT} />
                {/* loop circle */}
                <circle cx={cx} cy={cy} r={100} fill="none" stroke="var(--accent-blue)" strokeWidth="3"
                  strokeDasharray={`${buildT * 628} 628`} transform={`rotate(-90 ${cx} ${cy})`} />
                <circle cx={cx - 100} cy={cy} r="7" fill="var(--accent-yellow)" opacity={buildT} />
                <circle cx={cx + 100} cy={cy} r="7" fill="var(--accent-yellow)" opacity={buildT} />

                {/* circulating momentum k */}
                {t > 6 && (() => {
                  const a = -Math.PI / 2 + (t - 6) * 2;
                  const x = cx + Math.cos(a) * 100;
                  const y = cy + Math.sin(a) * 100;
                  return <circle cx={x} cy={y} r="8" fill="var(--accent-red)" />;
                })()}
                {t > 7 && (
                  <text x={cx} y={cy - 120} textAnchor="middle" fill="var(--accent-red)"
                    fontFamily="var(--font-math)" fontStyle="italic" fontSize="24">k (any value)</text>
                )}
              </g>

              {/* integral expression on right */}
              {t > 9 && (() => {
                const op = clamp((t - 9) / 1, 0, 1);
                const divergingOp = divergeT;
                return (
                  <g transform="translate(1260, 500)" opacity={op}>
                    <text x="0" y="0" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="36">
                      ∫ d⁴k / (k² − m²)²
                    </text>
                    {divergingOp > 0.3 && (
                      <>
                        <text x="0" y="60" fill="var(--accent-red)" fontFamily="var(--font-math)" fontSize="36" opacity={divergingOp}>
                          → <tspan fontStyle="italic">∞</tspan>
                        </text>
                        <text x="0" y="110" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="18" opacity={divergingOp}>
                          ultraviolet divergence
                        </text>
                      </>
                    )}
                  </g>
                );
              })()}

              {/* Renormalization: counterterm */}
              {t > 15 && (
                <g transform="translate(1260, 700)" opacity={renormT}>
                  <text x="0" y="0" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">
                    + δm² counterterm
                  </text>
                  <text x="0" y="60" fill="var(--accent-green)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="32">
                    ⟹ finite
                  </text>
                </g>
              )}
            </svg>

            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              {t < 8 ? 'A loop introduces a free momentum to integrate over.' :
               t < 15 ? 'The integral diverges at high k.' :
               'Absorb the infinity into a redefined parameter.'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 15 — Yukawa
function Scene15({ start, end }) {
  return (
    <Scene start={start} end={end} label="15">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // morph mass from heavy → zero
        const mass = t < 12 ? Math.max(0.5, 2 - (t - 4) * 0.2) : Math.max(0, 0.5 - (t - 12) * 0.08);
        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={15} title={'Force from Exchange'} />
            <SceneRefs refs={["yukawa","zee"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* exchange diagram on left: two horizontal fermions, wavy boson between */}
              <g transform="translate(560, 560)">
                {/* top fermion: incoming → vertex → outgoing */}
                <line x1="-260" y1="-120" x2="260" y2="-120" stroke="var(--accent-blue)" strokeWidth="3" />
                <circle cx="-240" cy="-120" r="22" fill="var(--accent-blue)" />
                <circle cx="240" cy="-120" r="22" fill="var(--accent-blue)" />
                {/* bottom fermion */}
                <line x1="-260" y1="120" x2="260" y2="120" stroke="var(--accent-blue)" strokeWidth="3" />
                <circle cx="-240" cy="120" r="22" fill="var(--accent-blue)" />
                <circle cx="240" cy="120" r="22" fill="var(--accent-blue)" />
                {/* vertex dots */}
                <circle cx="0" cy="-120" r="6" fill="var(--accent-yellow)" />
                <circle cx="0" cy="120" r="6" fill="var(--accent-yellow)" />
                {/* wavy exchanged boson — VERTICAL between the two vertices */}
                {(() => {
                  let d = '';
                  for (let i = 0; i <= 40; i++) {
                    const y = -120 + (i / 40) * 240;
                    const x = Math.sin(i * 0.8 + t * 4) * 14;
                    d += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" />;
                })()}
                <text x="40" y="6" fill="var(--accent-yellow)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">
                  mass = {mass.toFixed(2)}
                </text>
              </g>
              {/* potential plot on right */}
              <g transform="translate(1340, 660)">
                <line x1="0" y1="0" x2="400" y2="0" stroke="var(--canvas-dim)" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="-300" stroke="var(--canvas-dim)" strokeWidth="1" />
                <text x="420" y="8" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">r</text>
                <text x="-20" y="-310" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">V(r)</text>
                {(() => {
                  let d = '';
                  for (let i = 1; i <= 100; i++) {
                    const r = (i / 100) * 4;
                    const V = -Math.exp(-mass * r) / r;
                    const x = (r / 4) * 400;
                    const y = Math.max(-280, V * 80);
                    d += (i === 1 ? 'M' : 'L') + x + ',' + y + ' ';
                  }
                  return <path d={d} fill="none" stroke="var(--accent-green)" strokeWidth="3" />;
                })()}
                <text x="200" y="-260" textAnchor="middle" fill="white" fontFamily="var(--font-math)" fontStyle="italic" fontSize="24">
                  V ~ −e<tspan baselineShift="super" fontSize="14">−mr</tspan>/r
                </text>
              </g>
            </svg>
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              {mass > 0.2 ? 'Heavy exchange → short range (Yukawa).' : 'Massless exchange → 1/r (Coulomb).'}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 16 — Spin & statistics
function Scene16({ start, end }) {
  return (
    <Scene start={start} end={end} label="16">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const blockCount = Math.min(5, Math.floor(t / 2));
        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={16} title={'Spin & Statistics'} />
            <SceneRefs refs={["weinberg","srednicki"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Left: boson ladder */}
              <g transform="translate(620, 560)">
                <text x="0" y="-260" textAnchor="middle" fill="var(--accent-blue)" fontFamily="var(--font-ui)" fontSize="24" fontWeight="700">BOSONS</text>
                <text x="0" y="-230" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="16">[a, a†] = 1</text>
                {Array.from({length: 6}).map((_, i) => (
                  <g key={i}>
                    <line x1="-100" y1={180 - i * 60} x2="100" y2={180 - i * 60} stroke="var(--accent-blue)" strokeWidth="2" />
                    {Array.from({length: Math.min(i, blockCount)}).map((_, j) => (
                      <circle key={j} cx={-60 + j * 30} cy={180 - i * 60 - 8} r="8" fill="var(--accent-blue)" />
                    ))}
                  </g>
                ))}
              </g>
              {/* Right: fermion ladder */}
              <g transform="translate(1320, 560)">
                <text x="0" y="-260" textAnchor="middle" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="24" fontWeight="700">FERMIONS</text>
                <text x="0" y="-230" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="16">{"{a, a†} = 1"}</text>
                {[0, 1].map(i => (
                  <g key={i}>
                    <line x1="-100" y1={180 - i * 60} x2="100" y2={180 - i * 60} stroke="var(--accent-red)" strokeWidth="2" />
                    {i === 1 && t > 6 && <circle cx={0} cy={180 - i * 60 - 8} r="8" fill="var(--accent-red)" />}
                  </g>
                ))}
                {t > 10 && (
                  <g opacity={fadeIO(t - 10, duration - 10, 0.5, 0.5)}>
                    <text x="0" y="-100" textAnchor="middle" fill="var(--accent-red)" fontFamily="var(--font-ui)" fontSize="18">Pauli: at most one.</text>
                  </g>
                )}
              </g>
            </svg>
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              Spin-statistics: integer spin ⇒ bosons, half-integer ⇒ fermions.
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { Scene11, Scene12, Scene13, Scene14, Scene15, Scene16 });
