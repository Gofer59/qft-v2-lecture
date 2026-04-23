// qft-scenes-c.jsx — Scenes 11-16

// Scene 11 — Interactions (expanded to 125s / 10 beats)
// Beat 1  (0–12)    Title + free theory solvable, nothing happens
// Beat 2  (12–28)   Free field: particles pass through (animation)
// Beat 3  (28–46)   Real physics needs interactions
// Beat 4  (46–62)   φ⁴ interaction: −(λ/4!)φ⁴
// Beat 5  (62–76)   Particles scatter — animation
// Beat 6  (76–90)   QED interaction: g ψ̄ γ^μ ψ A_μ
// Beat 7  (90–104)  Electron-photon vertex
// Beat 8  (104–115) One term generates all of electromagnetism
// Beat 9  (115–122) Locality: everything at one point
// Beat 10 (122–125) Final hold
function Scene11({ start, end }) {
  return (
    <Scene start={start} end={end} label="11">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));
        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 26) / 1.5, 0, 1));
        const b3A = clamp((t - 28) / 1.5, 0, 1) * (1 - clamp((t - 44) / 1.5, 0, 1));
        const b4A = clamp((t - 46) / 1.5, 0, 1) * (1 - clamp((t - 60) / 1.5, 0, 1));
        const b4Eq = clamp((t - 50) / 1.5, 0, 1);

        const b5A = clamp((t - 62) / 1.5, 0, 1) * (1 - clamp((t - 74) / 1.5, 0, 1));

        const b6A = clamp((t - 76) / 1.5, 0, 1) * (1 - clamp((t - 88) / 1.5, 0, 1));
        const b6Eq = clamp((t - 80) / 1.5, 0, 1);

        const b7A = clamp((t - 90) / 1.5, 0, 1) * (1 - clamp((t - 102) / 1.5, 0, 1));

        const b8A = clamp((t - 104) / 1.5, 0, 1) * (1 - clamp((t - 113) / 1.5, 0, 1));

        const b9A = clamp((t - 115) / 1.5, 0, 1) * (1 - clamp((t - 121) / 1.2, 0, 1));

        const b10A = clamp((t - 122) / 1, 0, 1);

        // Free-pass animation (beat 2) — progress 0..1
        const freeProg = clamp((t - 14) / 12, 0, 1);
        // Scatter animation (beat 5)
        const scatProg = clamp((t - 63) / 10, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={11} title={'Interactions'} />
            <SceneRefs refs={["ps","schwartz"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.18} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 60, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  The field is <span style={{ color: 'var(--accent-red)' }}>not free</span>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  A free theory is solvable — and boring.
                </div>
              </>
            )}

            {/* ── BEAT 2: Free — particles pass through ── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                <span style={{ color: 'var(--accent-blue)' }}>Free field</span> — particles pass through.
              </div>
            )}
            {b2A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b2A }}>
                <line x1="100" y1="540" x2="1820" y2="540"
                      stroke="var(--canvas-dim)" strokeWidth="0.8" strokeDasharray="3 6" />
                <circle cx={200 + freeProg * 1520} cy="540" r="22" fill="var(--accent-blue)" opacity="0.85" />
                <circle cx={1720 - freeProg * 1520} cy="540" r="22" fill="var(--accent-green)" opacity="0.85" />
              </svg>
            )}

            {/* ── BEAT 3: Real physics requires interaction ── */}
            {b3A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--canvas-text)', opacity: b3A }}>
                  Real physics requires <span style={{ color: 'var(--accent-yellow)' }}>interactions</span>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)',
                      opacity: b3A * clamp((t - 32) / 1.5, 0, 1) }}>
                  Additional Lagrangian terms coupling field modes — or different fields.
                </div>
              </>
            )}

            {/* ── BEAT 4: φ⁴ interaction ─────────────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                Simplest — the <span style={{ color: 'var(--accent-red)' }}>φ⁴</span> term.
              </div>
            )}
            {b4Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 56,
                    color: 'var(--form-inline)', opacity: b4Eq * b4A,
                    textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                ℒ<sub>int</sub> = − (λ / 4!) φ⁴
              </div>
            )}
            {b4Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                    color: 'var(--canvas-dim)', opacity: b4Eq * b4A }}>
                Four field values at the same spacetime point → modes couple.
              </div>
            )}

            {/* ── BEAT 5: Particles scatter ────────────── */}
            {b5A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b5A }}>
                Now they <span style={{ color: 'var(--accent-yellow)' }}>scatter</span>.
              </div>
            )}
            {b5A > 0 && (() => {
              const scatter = scatProg < 0.5 ? 0 : (scatProg - 0.5) * 2;
              const ang = 0.6 * scatter;
              const mx = 200 + scatProg * 1520;
              const my = 540 - Math.sin(ang) * 280 * scatter;
              const nx = 1720 - scatProg * 1520;
              const ny = 540 + Math.sin(ang) * 280 * scatter;
              return (
                <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b5A }}>
                  <line x1="100" y1="540" x2="1820" y2="540"
                        stroke="var(--canvas-dim)" strokeWidth="0.8" strokeDasharray="3 6" />
                  <circle cx={mx} cy={my} r="22" fill="var(--accent-blue)" opacity="0.9" />
                  <circle cx={nx} cy={ny} r="22" fill="var(--accent-green)" opacity="0.9" />
                  {scatProg > 0.45 && scatProg < 0.55 && (
                    <circle cx="960" cy="540"
                            r={60 * (1 - Math.abs(scatProg - 0.5) * 20)}
                            fill="var(--accent-yellow)" opacity="0.45" />
                  )}
                </svg>
              );
            })()}

            {/* ── BEAT 6: QED interaction term ───────── */}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b6A }}>
                For <span style={{ color: 'var(--accent-blue)' }}>electromagnetism</span> — couple electron and photon fields.
              </div>
            )}
            {b6Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 56,
                    color: 'var(--form-inline)', opacity: b6Eq * b6A,
                    textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                ℒ<sub>QED,int</sub> = e &nbsp; ψ̄ &nbsp; γ<sup>μ</sup> &nbsp; ψ &nbsp; A<sub>μ</sub>
              </div>
            )}
            {b6Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24,
                    color: 'var(--canvas-dim)', opacity: b6Eq * b6A }}>
                electron (ψ), positron (ψ̄), photon (A<sub>μ</sub>) meeting at one point.
              </div>
            )}

            {/* ── BEAT 7: Electron-photon vertex diagram ── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                The QED vertex — the whole of electromagnetism in one picture.
              </div>
            )}
            {b7A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b7A }}>
                <g transform="translate(960, 580)">
                  {/* incoming electron */}
                  <line x1="-220" y1="-150" x2="0" y2="0" stroke="var(--accent-blue)" strokeWidth="3"
                        markerEnd="url(#arr-11-B)" />
                  <text x="-240" y="-160" fill="var(--accent-blue)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">e⁻</text>
                  {/* outgoing electron */}
                  <line x1="0" y1="0" x2="220" y2="-150" stroke="var(--accent-blue)" strokeWidth="3"
                        markerEnd="url(#arr-11-B)" />
                  <text x="230" y="-160" fill="var(--accent-blue)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">e⁻</text>
                  {/* photon (wavy) */}
                  {(() => {
                    let d = 'M 0,0';
                    for (let i = 1; i <= 22; i++) {
                      const x = i * 10;
                      const y = 6 * i + Math.sin(i * 0.9) * 12;
                      d += ` L ${x},${y}`;
                    }
                    return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" />;
                  })()}
                  <text x="240" y="180" fill="var(--accent-yellow)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">γ</text>
                  {/* vertex */}
                  <circle cx="0" cy="0" r="10" fill="var(--accent-yellow)" />
                </g>
                <defs>
                  <marker id="arr-11-B" viewBox="0 0 10 10" refX="5" refY="5"
                          markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-blue)" />
                  </marker>
                </defs>
              </svg>
            )}

            {/* ── BEAT 8: One term generates everything ── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b8A }}>
                One term. Every electromagnetic phenomenon.
              </div>
            )}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440,
                    fontFamily: 'var(--font-ui)', fontSize: 24, color: 'var(--canvas-dim)',
                    textAlign: 'center', lineHeight: 1.8, opacity: b8A,
                    letterSpacing: '0.12em' }}>
                <div>ATOMIC STRUCTURE &nbsp;·&nbsp; PHOTON ABSORPTION</div>
                <div>COMPTON SCATTERING &nbsp;·&nbsp; ELECTRON REPULSION</div>
                <div>PHOTOELECTRIC EFFECT &nbsp;·&nbsp; ANTENNAS &nbsp;·&nbsp; CHEMISTRY</div>
              </div>
            )}

            {/* ── BEAT 9: Locality ───────────────────── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--accent-green)', opacity: b9A,
                    textShadow: '0 0 20px rgba(61,240,192,0.3)' }}>
                Everything happens at <span style={{ color: 'var(--accent-yellow)' }}>a single point</span>.
              </div>
            )}

            {/* ── BEAT 10: Final hold ───────────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--form-inline)', opacity: b10A }}>
                ℒ<sub>int</sub> = e &nbsp; ψ̄ γ<sup>μ</sup> ψ &nbsp; A<sub>μ</sub>
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 12 — Feynman diagrams (SIGNATURE, humor beat)
// Scene 12 — Feynman Diagrams (SIGNATURE, expanded to 146s / 10 beats)
// Beat 1  (0–12)    Title + "computing is hard"
// Beat 2  (12–30)   Perturbation theory — power series in coupling
// Beat 3  (30–50)   Each term ≡ a Feynman diagram
// Beat 4  (50–68)   External lines — wavefunctions of in/out particles
// Beat 5  (68–86)   Internal lines — propagators, 1/(k²−m²)
// Beat 6  (86–102)  Vertices — coupling constant + momentum conservation
// Beat 7  (102–120) QED vertex (one diagram)
// Beat 8  (120–132) Electron-photon exchange → Coulomb
// Beat 9  (132–142) Humor aside on Feynman
// Beat 10 (142–146) Final hold
function Scene12({ start, end }) {
  return (
    <Scene start={start} end={end} label="12">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));

        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 28) / 1.5, 0, 1));
        const b2Series = clamp((t - 18) / 2, 0, 1);

        const b3A = clamp((t - 30) / 1.5, 0, 1) * (1 - clamp((t - 48) / 1.5, 0, 1));

        const b4A = clamp((t - 50) / 1.5, 0, 1) * (1 - clamp((t - 66) / 1.5, 0, 1));
        const b4Lines = clamp((t - 54) / 2, 0, 1);

        const b5A = clamp((t - 68) / 1.5, 0, 1) * (1 - clamp((t - 84) / 1.5, 0, 1));
        const b5Prop = clamp((t - 74) / 1.5, 0, 1);

        const b6A = clamp((t - 86) / 1.5, 0, 1) * (1 - clamp((t - 100) / 1.5, 0, 1));
        const b6Eq = clamp((t - 90) / 1.2, 0, 1);

        const b7A = clamp((t - 102) / 1.5, 0, 1) * (1 - clamp((t - 118) / 1.5, 0, 1));
        const b7Vert = clamp((t - 105) / 2, 0, 1);

        const b8A = clamp((t - 120) / 1.5, 0, 1) * (1 - clamp((t - 130) / 1.5, 0, 1));
        const b8Ex = clamp((t - 122) / 2, 0, 1);

        const b9A = clamp((t - 132) / 1.5, 0, 1) * (1 - clamp((t - 141) / 1, 0, 1));

        const b10A = clamp((t - 141) / 1, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={12} title={'Feynman Diagrams'} />
            <SceneRefs refs={["feynman49","ps"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.16} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 60, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  <span style={{ color: 'var(--accent-yellow)' }}>Feynman diagrams</span>
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Cartoons that compute.
                </div>
              </>
            )}

            {/* ── BEAT 2: Perturbation theory series ──────── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                When the coupling is small — expand as a <span style={{ color: 'var(--accent-yellow)' }}>power series</span>.
              </div>
            )}
            {b2Series > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--form-inline)', opacity: b2Series * b2A }}>
                𝒜 = 𝒜₀ + λ·𝒜₁ + λ²·𝒜₂ + λ³·𝒜₃ + &nbsp;⋯
              </div>
            )}
            {b2Series > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--canvas-dim)', opacity: b2Series * b2A }}>
                Each order = number of interaction vertices.
              </div>
            )}

            {/* ── BEAT 3: Each term ≡ a diagram ─────────── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                Each term is a <span style={{ color: 'var(--accent-green)' }}>Feynman diagram</span> — a compressed integral.
              </div>
            )}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 30,
                    color: 'var(--canvas-dim)', opacity: b3A }}>
                picture &nbsp;⟶&nbsp; factors &nbsp;⟶&nbsp; ∫ d⁴k &nbsp;⟶&nbsp; amplitude
              </div>
            )}

            {/* ── BEAT 4: External lines ────────────────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                <span style={{ color: 'var(--accent-blue)' }}>External lines</span> — in/out particles.
              </div>
            )}
            {b4Lines > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b4Lines * b4A }}>
                {/* electron incoming */}
                <line x1="400" y1="540" x2="720" y2="540"
                      stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#arr-12)" />
                <text x="400" y="510" fill="var(--accent-blue)"
                      fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">e⁻ in</text>
                {/* positron outgoing (arrow backward) */}
                <line x1="1200" y1="540" x2="880" y2="540"
                      stroke="var(--accent-red)" strokeWidth="3" markerEnd="url(#arr-12-R)" />
                <text x="1170" y="510" fill="var(--accent-red)"
                      fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">e⁺ out</text>
                {/* photon wavy */}
                {(() => {
                  let d = 'M 1400,540';
                  for (let i = 1; i <= 20; i++) {
                    const x = 1400 + i * 15;
                    const y = 540 + Math.sin(i * 0.8) * 14;
                    d += ` L ${x},${y}`;
                  }
                  return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" />;
                })()}
                <text x="1420" y="510" fill="var(--accent-yellow)"
                      fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">γ</text>
                <defs>
                  <marker id="arr-12" viewBox="0 0 10 10" refX="5" refY="5"
                          markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-blue)" />
                  </marker>
                  <marker id="arr-12-R" viewBox="0 0 10 10" refX="5" refY="5"
                          markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-red)" />
                  </marker>
                </defs>
              </svg>
            )}

            {/* ── BEAT 5: Internal lines = propagators ──── */}
            {b5A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b5A }}>
                <span style={{ color: 'var(--accent-green)' }}>Internal lines</span> — propagators.
              </div>
            )}
            {b5Prop > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 52,
                    color: 'var(--form-inline)', opacity: b5Prop * b5A,
                    textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                D(k) = i / (k² − m²)
              </div>
            )}
            {b5Prop > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--canvas-dim)', opacity: b5Prop * b5A }}>
                Amplitude to travel from x to y with momentum k.
              </div>
            )}

            {/* ── BEAT 6: Vertices + coupling + conservation ── */}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b6A }}>
                <span style={{ color: 'var(--accent-yellow)' }}>Vertices</span> — coupling + momentum conservation.
              </div>
            )}
            {b6Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 400,
                    textAlign: 'center', opacity: b6Eq * b6A }}>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic',
                      fontSize: 44, color: 'var(--form-inline)' }}>
                  factor = −i λ (or e, g)
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic',
                      fontSize: 36, color: 'var(--canvas-dim)', marginTop: 22 }}>
                  k<sub>in</sub> = k<sub>out</sub>
                </div>
              </div>
            )}

            {/* ── BEAT 7: Single QED vertex diagram ───── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                The single QED vertex.
              </div>
            )}
            {b7Vert > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b7Vert * b7A }}>
                <g transform="translate(960, 580)">
                  <line x1="-260" y1="-180" x2="0" y2="0"
                        stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#arr-12v)" />
                  <line x1="0" y1="0" x2="260" y2="-180"
                        stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#arr-12v)" />
                  {(() => {
                    let d = 'M 0,0';
                    for (let i = 1; i <= 22; i++) {
                      const x = i * 10;
                      const y = 6 * i + Math.sin(i * 0.9) * 12;
                      d += ` L ${x},${y}`;
                    }
                    return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" />;
                  })()}
                  <circle cx="0" cy="0" r="10" fill="var(--accent-yellow)" />
                  <text x="0" y="-30" textAnchor="middle" fill="var(--accent-yellow)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">−i e γ<sup>μ</sup></text>
                </g>
                <defs>
                  <marker id="arr-12v" viewBox="0 0 10 10" refX="5" refY="5"
                          markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-blue)" />
                  </marker>
                </defs>
              </svg>
            )}

            {/* ── BEAT 8: Exchange → Coulomb ──────────── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b8A }}>
                Two vertices + internal photon = <span style={{ color: 'var(--accent-green)' }}>Coulomb force</span>.
              </div>
            )}
            {b8Ex > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b8Ex * b8A }}>
                {(() => {
                  const cxP = 960, cyP = 580;
                  const x1 = cxP - 150, x2 = cxP + 150;
                  const y1 = cyP - 110, y2 = cyP + 110;
                  return (
                    <>
                      <line x1={x1 - 260} y1={y1 - 120} x2={x1} y2={y1}
                            stroke="var(--accent-blue)" strokeWidth="3" />
                      <line x1={x1} y1={y1} x2={x2} y2={y1}
                            stroke="var(--accent-blue)" strokeWidth="3" />
                      <line x1={x2} y1={y1} x2={x2 + 260} y2={y1 - 120}
                            stroke="var(--accent-blue)" strokeWidth="3" />
                      <line x1={x1 - 260} y1={y2 + 120} x2={x1} y2={y2}
                            stroke="var(--accent-blue)" strokeWidth="3" />
                      <line x1={x1} y1={y2} x2={x2} y2={y2}
                            stroke="var(--accent-blue)" strokeWidth="3" />
                      <line x1={x2} y1={y2} x2={x2 + 260} y2={y2 + 120}
                            stroke="var(--accent-blue)" strokeWidth="3" />
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
                      <circle cx={(x1 + x2) / 2} cy={y1} r="8" fill="var(--accent-yellow)" />
                      <circle cx={(x1 + x2) / 2} cy={y2} r="8" fill="var(--accent-yellow)" />
                    </>
                  );
                })()}
              </svg>
            )}

            {/* ── BEAT 9: Humor ──────────────────── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 160, right: 160, top: 340,
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', textAlign: 'center', opacity: b9A, lineHeight: 1.4 }}>
                "Each diagram does the work of an integral that would take pages to write out.
                <div style={{ color: 'var(--canvas-dim)', fontSize: 24, marginTop: 26,
                      fontStyle: 'normal' }}>
                  Generations of physicists are quietly grateful they didn't have to grade Feynman's homework."
                </div>
              </div>
            )}

            {/* ── BEAT 10: Final hold ─────────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--accent-yellow)', opacity: b10A,
                    textShadow: '0 0 24px rgba(255,209,102,0.4)' }}>
                Picture &nbsp;=&nbsp; integral &nbsp;=&nbsp; amplitude.
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
