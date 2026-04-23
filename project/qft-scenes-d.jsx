// qft-scenes-d.jsx — Scenes 17-20

// Scene 17 — Standard Model (SIGNATURE, humor beat)
function Scene17({ start, end }) {
  return (
    <Scene start={start} end={end} label="17">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        // 0-12: build Lagrangian term by term; each term has a full-formatted renderer and a short gloss
        const Sub = ({children}) => <sub style={{fontSize: '0.55em', fontStyle: 'italic'}}>{children}</sub>;
        const Sup = ({children}) => <sup style={{fontSize: '0.55em', fontStyle: 'italic'}}>{children}</sup>;
        const terms = [
          { s: 2,  color: 'var(--accent-yellow)', label: 'gauge field kinetic',
            render: <>−¼ F<Sub>μν</Sub>F<Sup>μν</Sup></>,
            gloss: 'field strength of gauge bosons (γ, g, W, Z)' },
          { s: 5,  color: 'var(--accent-blue)',  label: 'fermion kinetic',
            render: <>+ iψ̄ γ<Sup>μ</Sup>D<Sub>μ</Sub>ψ</>,
            gloss: 'quark & lepton motion; D is the covariant derivative' },
          { s: 8,  color: 'var(--form-inline)',  label: 'Higgs',
            render: <>+ |D<Sub>μ</Sub>H|² − V(H)</>,
            gloss: 'Higgs kinetic + potential; breaks electroweak symmetry' },
          { s: 11, color: 'var(--accent-green)', label: 'Yukawa',
            render: <>+ y ψ̄ H ψ</>,
            gloss: 'Higgs → fermion masses; y is the Yukawa coupling' },
        ];
        const showTable = t > 13;
        const tableT = clamp((t - 13) / 2, 0, 1);
        const showHumor = t > 22;

        // 17 particles: 6 quarks, 6 leptons, 4 gauge bosons, 1 Higgs (gluon counted as 1 species)
        const particles = [
          // quarks (blue)
          {n:'u', t:'q'}, {n:'c', t:'q'}, {n:'t', t:'q'},
          {n:'d', t:'q'}, {n:'s', t:'q'}, {n:'b', t:'q'},
          // leptons (red)
          {n:'e', t:'l'}, {n:'μ', t:'l'}, {n:'τ', t:'l'},
          {n:'νₑ', t:'l'}, {n:'ν_μ', t:'l'}, {n:'ν_τ', t:'l'},
          // gauge bosons (yellow)
          {n:'γ', t:'g'}, {n:'g', t:'g'}, {n:'W', t:'g'}, {n:'Z', t:'g'},
          // higgs (green)
          {n:'H', t:'h'},
        ];
        const colorFor = (tt) => tt === 'q' ? 'var(--accent-blue)' : tt === 'l' ? 'var(--accent-red)' : tt === 'g' ? 'var(--accent-yellow)' : 'var(--form-inline)';

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={17} title={'The Standard Model'} />
            <SceneRefs refs={["schwartz","pdg","higgs64"]} />
            {/* Lagrangian row */}
            {!showHumor && (
              <div style={{
                position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 56, color: 'white',
                opacity: showTable ? 1 - tableT * 0.6 : 1,
                transform: showTable ? `scale(${1 - tableT * 0.25}) translateY(${-tableT * 120}px)` : '',
                transformOrigin: 'center',
              }}>
                <span style={{ color: 'var(--canvas-dim)' }}>ℒ<sub style={{fontSize:'0.55em'}}>SM</sub> = </span>
                {terms.map((term, i) => {
                  const op = t >= term.s ? Math.min(1, (t - term.s) / 0.8) : 0;
                  return (
                    <span key={i} style={{ color: term.color, opacity: op, marginLeft: 16 }}>
                      {term.render}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Gloss under the Lagrangian — explains the most recent term */}
            {!showHumor && !showTable && (() => {
              const active = terms.filter(tm => t >= tm.s).slice(-1)[0];
              if (!active) return null;
              const glossOp = Math.min(1, (t - active.s - 0.8) / 0.6);
              return (
                <div style={{
                  position: 'absolute', top: 370, left: 0, right: 0, textAlign: 'center',
                  opacity: Math.max(0, glossOp),
                }}>
                  <div style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-ui)', fontSize: 22, color: active.color,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{active.label}</div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                    color: 'var(--canvas-dim)', marginTop: 8,
                  }}>{active.gloss}</div>
                </div>
              );
            })()}

            {/* Particle grid */}
            {showTable && !showHumor && (
              <div style={{
                position: 'absolute', top: 420, left: 0, right: 0,
                textAlign: 'center', opacity: tableT,
                fontFamily: 'var(--font-math)', fontStyle: 'italic',
              }}>
                <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(6, 92px)', gap: '14px 16px', padding: '20px' }}>
                  {particles.map((p, i) => {
                    // render _x as subscript
                    const parts = p.n.split('_');
                    const rendered = parts.length === 2
                      ? <>{parts[0]}<sub style={{fontSize: '0.55em', fontStyle: 'italic'}}>{parts[1]}</sub></>
                      : p.n;
                    return (
                      <div key={i} style={{
                        width: 92, height: 92, border: '2px solid ' + colorFor(p.t),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 40, color: colorFor(p.t),
                        background: 'rgba(13,17,23,0.6)', borderRadius: 3,
                        opacity: Math.min(1, (t - 13 - i * 0.15) / 0.5),
                      }}>{rendered}</div>
                    );
                  })}
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontStyle: 'normal', fontSize: 22, color: 'var(--canvas-dim)',
                  marginTop: 30, letterSpacing: '0.2em' }}>
                  17 FUNDAMENTAL PARTICLES
                </div>
              </div>
            )}

            {showHumor && (
              <div style={{
                position: 'absolute', top: 260, left: 160, right: 160, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white',
                opacity: fadeIO(t - 22, duration - 22, 0.6, 0.6), lineHeight: 1.4,
              }}>
                "Seventeen fundamental particles. One equation on one line.
                <div style={{ marginTop: 24, color: 'var(--canvas-dim)', fontSize: 30 }}>
                  And yet it <span style={{color:'var(--accent-red)'}}>somehow does not include gravity</span> —
                </div>
                <div style={{ marginTop: 10, color: 'var(--canvas-dim)', fontSize: 26, fontStyle: 'normal' }}>
                  the most obvious force you interact with every day.
                </div>
                <div style={{ marginTop: 24, fontSize: 24, color: 'var(--canvas-dim)', fontStyle: 'normal' }}>
                  Nobody said the universe had to be convenient."
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 18 — What QFT does not explain
function Scene18({ start, end }) {
  return (
    <Scene start={start} end={end} label="18">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const items = [
          { s: 2,  label: 'Gravity',              color: 'var(--accent-red)' },
          { s: 5,  label: 'Dark matter',          color: 'var(--note-inline)' },
          { s: 8,  label: 'Dark energy',          color: 'var(--note-inline)' },
          { s: 11, label: 'Matter–antimatter',    color: 'var(--accent-yellow)' },
          { s: 14, label: 'Three generations?',   color: 'var(--accent-yellow)' },
        ];
        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={18} title={'Open Questions'} />
            <SceneRefs refs={["pdg","weinberg"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Standard Model "island" */}
              <ellipse cx="960" cy="600" rx="260" ry="160" fill="rgba(91,163,245,0.1)" stroke="var(--accent-blue)" strokeWidth="2" />
              <text x="960" y="595" textAnchor="middle" fill="var(--accent-blue)" fontFamily="var(--font-display)" fontSize="30" fontStyle="italic">Standard Model</text>
              <text x="960" y="630" textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-ui)" fontSize="16">tested to 11 decimal places</text>
            </svg>
            {items.map((it, i) => {
              // fan items around the ellipse with more horizontal spread; push top items down so
              // they clear the caption at top:140
              const angle = -Math.PI / 2 + (i - 2) * 1.1;
              const rx = 540, ry = 320;
              const x = 960 + Math.cos(angle) * rx;
              const y = 600 + Math.sin(angle) * ry;
              const op = t >= it.s ? Math.min(1, (t - it.s) / 0.8) : 0;
              return (
                <div key={i} style={{
                  position: 'absolute', left: x - 110, top: y - 30, width: 220,
                  textAlign: 'center', fontFamily: 'var(--font-display)',
                  fontStyle: 'italic', fontSize: 26, color: it.color, opacity: op,
                }}>
                  <div style={{ fontSize: 40, lineHeight: 1 }}>?</div>
                  <div style={{ marginTop: 4 }}>{it.label}</div>
                </div>
              );
            })}
            <div style={{ position: 'absolute', top: 140, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: 'white' }}>
              A theory is also defined by what it does not explain.
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 19 — Five Big Ideas
function Scene19({ start, end }) {
  return (
    <Scene start={start} end={end} label="19">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const ideas = [
          { s: 1,  n: 1, title: 'Fields are primary',        sub: 'particles are excitations' },
          { s: 4,  n: 2, title: 'Quantize ⇒ ladder of quanta', sub: <>â<sup style={{fontSize:'0.65em'}}>†</sup>(k), â(k), |0⟩</> },
          { s: 7,  n: 3, title: 'Symmetries → conservation', sub: 'Noether' },
          { s: 10, n: 4, title: 'Feynman diagrams compute',  sub: 'vertices, propagators, loops' },
          { s: 13, n: 5, title: 'Renormalization tames ∞',   sub: 'couplings run with energy' },
        ];
        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={19} title={'The Five Big Ideas'} />
            <SceneRefs refs={["zee","ps"]} />
            <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              Consolidating.
            </div>
            <div style={{ position: 'absolute', top: 260, left: 200, right: 200 }}>
              {ideas.map((idea, i) => {
                const op = t >= idea.s ? Math.min(1, (t - idea.s) / 0.8) : 0;
                const slide = (1 - op) * 30;
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'baseline', gap: 40, margin: '22px 0',
                    opacity: op, transform: `translateX(${slide}px)`,
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-math)', fontSize: 80, color: 'var(--accent)',
                      fontStyle: 'italic', width: 80,
                    }}>{idea.n}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38, color: 'white' }}>
                        {idea.title}
                      </div>
                      <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 22, color: 'var(--canvas-dim)', marginTop: 4 }}>
                        {idea.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 20 — What's coming: path integral
function Scene20({ start, end }) {
  return (
    <Scene start={start} end={end} label="20">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const cx = 960, cy = 560;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={20} title={'Coming Next'} />
            <SceneRefs refs={["zee","srednicki"]} />
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
              {/* Multiple branching paths from A to B */}
              {Array.from({length: 20}).map((_, i) => {
                const A = { x: cx - 400, y: cy };
                const B = { x: cx + 400, y: cy };
                const mid = { x: cx, y: cy + (i - 10) * 40 + Math.sin(t * 0.6 + i) * 10 };
                const d = `M ${A.x},${A.y} Q ${mid.x},${mid.y} ${B.x},${B.y}`;
                const isClassical = i === 10;
                const op = isClassical ? 0.95 : 0.22 * Math.min(1, t / 4);
                return <path key={i} d={d} fill="none"
                  stroke={isClassical ? 'var(--accent-yellow)' : 'var(--accent-blue)'}
                  strokeWidth={isClassical ? 3 : 1} opacity={op} />;
              })}
              <circle cx={cx - 400} cy={cy} r="12" fill="var(--accent-green)" />
              <circle cx={cx + 400} cy={cy} r="12" fill="var(--accent-green)" />
              <text x={cx - 400} y={cy - 40} textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">A</text>
              <text x={cx + 400} y={cy - 40} textAnchor="middle" fill="var(--canvas-dim)" fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">B</text>
            </svg>
            <div style={{ position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center',
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42, color: 'white' }}>
              Lecture 2 — The Path Integral.
            </div>
            {t > 5 && (
              <div style={{ position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 48, color: 'var(--form-inline)',
                opacity: fadeIO(t - 5, duration - 5, 0.5, 0.5) }}>
                ∫ 𝒟φ e<sup style={{fontSize:'0.55em', fontStyle:'italic'}}>iS[φ]/ℏ</sup>
              </div>
            )}
            {t > 10 && (
              <div style={{ position: 'absolute', bottom: 180, left: 0, right: 0, textAlign: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28, color: 'var(--canvas-dim)',
                opacity: fadeIO(t - 10, duration - 10, 0.6, 0.6) }}>
                Sum over <span style={{color:'var(--accent-blue)'}}>all possible field configurations</span>.
                The classical path dominates.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 21 — References (end card)
function Scene21({ start, end }) {
  return (
    <Scene start={start} end={end} label="21">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);
        const keys = ['ps','weinberg','schwartz','srednicki','zee','dirac27','noether','yukawa','feynman49','casimir','higgs64','kleinG','pdg'];
        return (
          <div style={{ opacity: fade, padding: '120px 200px', color: 'var(--canvas-text)' }}>
            <div style={{
              fontFamily: 'var(--font-ui)', fontSize: 14,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: 12,
            }}>References</div>
            <div style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 54,
              color: 'white', marginBottom: 48,
            }}>Selected sources &amp; further reading</div>

            <div style={{ columnCount: 2, columnGap: 80, fontFamily: 'var(--font-ui)', fontSize: 20, lineHeight: 1.55 }}>
              {keys.map((k, i) => {
                const op = Math.min(1, Math.max(0, (t - 0.4 - i * 0.15) / 0.6));
                const r = REFS[k];
                return (
                  <div key={k} style={{ breakInside: 'avoid', marginBottom: 18, opacity: op, display: 'flex', gap: 14 }}>
                    <div style={{
                      flex: '0 0 36px', color: 'var(--accent)',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 22,
                    }}>[{i+1}]</div>
                    <div style={{ color: 'var(--canvas-text)' }}>{r.full}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { Scene17, Scene18, Scene19, Scene20, Scene21 });
