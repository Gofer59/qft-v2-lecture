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
// Scene 13 — Propagators & Vertices in Detail (expanded to 135s / 10 beats)
// Beat 1  (0–12)    Title: propagators and vertices
// Beat 2  (12–30)   Scalar propagator 1/(k²-m²), on-shell condition
// Beat 3  (30–48)   Off-shell = virtual particles (internal)
// Beat 4  (48–62)   +iε prescription → causal structure
// Beat 5  (62–80)   Fermion propagator (k̸ + m)/(k²-m²)
// Beat 6  (80–95)   Photon propagator -ig_μν/k²
// Beat 7  (95–115)  QED vertex -ieγ^μ with three lines meeting
// Beat 8  (115–125) Every EM process built from copies of this vertex
// Beat 9  (125–132) Amplitude recipe: sum diagrams, integrate, square
// Beat 10 (132–135) Final hold
function Scene13({ start, end }) {
  return (
    <Scene start={start} end={end} label="13">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));
        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 28) / 1.5, 0, 1));
        const b2Eq = clamp((t - 17) / 1.5, 0, 1);
        const b2Shell = clamp((t - 23) / 1.5, 0, 1);

        const b3A = clamp((t - 30) / 1.5, 0, 1) * (1 - clamp((t - 46) / 1.5, 0, 1));
        const b3Virt = clamp((t - 36) / 1.5, 0, 1);

        const b4A = clamp((t - 48) / 1.5, 0, 1) * (1 - clamp((t - 60) / 1.5, 0, 1));
        const b4Eps = clamp((t - 52) / 1.5, 0, 1);

        const b5A = clamp((t - 62) / 1.5, 0, 1) * (1 - clamp((t - 78) / 1.5, 0, 1));
        const b6A = clamp((t - 80) / 1.5, 0, 1) * (1 - clamp((t - 93) / 1.5, 0, 1));

        const b7A = clamp((t - 95) / 1.5, 0, 1) * (1 - clamp((t - 113) / 1.5, 0, 1));
        const b7Vert = clamp((t - 100) / 2, 0, 1);

        const b8A = clamp((t - 115) / 1.5, 0, 1) * (1 - clamp((t - 123) / 1.5, 0, 1));

        const b9A = clamp((t - 125) / 1.2, 0, 1) * (1 - clamp((t - 131) / 1.2, 0, 1));
        const b10A = clamp((t - 131) / 1, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={13} title={'Propagator & Vertex'} />
            <SceneRefs refs={["ps","schwartz"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.15} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 58, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  <span style={{ color: 'var(--accent-blue)' }}>Propagators</span>
                  &nbsp;&amp;&nbsp;
                  <span style={{ color: 'var(--accent-yellow)' }}>vertices</span>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Two building blocks. Everything else is assembly.
                </div>
              </>
            )}

            {/* ── BEAT 2: Scalar propagator ─────────────── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                Scalar propagator — the amplitude to travel from x to y.
              </div>
            )}
            {b2Eq > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 56,
                    color: 'var(--form-inline)', opacity: b2Eq * b2A,
                    textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                D(k) = i / (k² − m²)
              </div>
            )}
            {b2Shell > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 520, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--canvas-dim)', opacity: b2Shell * b2A }}>
                Denominator vanishes when k² = m² — the mass shell.
              </div>
            )}

            {/* ── BEAT 3: Off-shell = virtual ────────────── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                Internal lines can be <span style={{ color: 'var(--accent-yellow)' }}>off-shell</span> — virtual.
              </div>
            )}
            {b3Virt > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                    opacity: b3Virt * b3A }}>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--accent-green)' }}>
                  real: k² = m²
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--accent-red)', marginTop: 24 }}>
                  virtual: k² ≠ m²
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                      color: 'var(--canvas-dim)', marginTop: 26 }}>
                  Not observable — but they contribute.
                </div>
              </div>
            )}

            {/* ── BEAT 4: +iε prescription ─────────────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                Add <span style={{ color: 'var(--accent-yellow)' }}>+ iε</span> for causality.
              </div>
            )}
            {b4Eps > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 48,
                      color: 'var(--form-inline)', opacity: b4Eps * b4A }}>
                  D(k) = i / (k² − m² + iε)
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 530, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b4Eps * b4A }}>
                  Particles forward in time, antiparticles backward.
                </div>
              </>
            )}

            {/* ── BEAT 5: Fermion propagator ─────────── */}
            {b5A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b5A }}>
                  <span style={{ color: 'var(--accent-red)' }}>Fermion</span> propagator —
                  4×4 in spinor space.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 52,
                      color: 'var(--accent-red)',
                      opacity: b5A * clamp((t - 66) / 1.5, 0, 1),
                      textShadow: '0 0 24px rgba(255,107,107,0.3)' }}>
                  S<sub>F</sub>(k) = i (k̸ + m) / (k² − m² + iε)
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24,
                      color: 'var(--canvas-dim)',
                      opacity: b5A * clamp((t - 71) / 1.5, 0, 1) }}>
                  k̸ = γ<sup>μ</sup>k<sub>μ</sub>
                </div>
              </>
            )}

            {/* ── BEAT 6: Photon propagator ──────────── */}
            {b6A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b6A }}>
                  <span style={{ color: 'var(--accent-yellow)' }}>Photon</span> propagator — massless, Lorentz-tensor.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 52,
                      color: 'var(--accent-yellow)',
                      opacity: b6A * clamp((t - 84) / 1.5, 0, 1),
                      textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                  D<sub>μν</sub>(k) = −i g<sub>μν</sub> / k²
                </div>
              </>
            )}

            {/* ── BEAT 7: QED vertex ────────────────── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                <span style={{ color: 'var(--accent-yellow)' }}>QED vertex</span> —
                three lines, one factor.
              </div>
            )}
            {b7Vert > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b7Vert * b7A }}>
                <g transform="translate(960, 620)">
                  <line x1="-220" y1="-180" x2="0" y2="0"
                        stroke="var(--accent-blue)" strokeWidth="3" markerEnd="url(#arr-13)" />
                  <line x1="0" y1="0" x2="-220" y2="180"
                        stroke="var(--accent-blue)" strokeWidth="3" />
                  {(() => {
                    let d = '';
                    for (let i = 0; i <= 30; i++) {
                      const x = (i / 30) * 240;
                      const y = Math.sin(i * 0.7) * 10;
                      d += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                    }
                    return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" />;
                  })()}
                  <circle cx="0" cy="0" r="10" fill="var(--accent-yellow)" />
                  <text x="-240" y="-180" fill="var(--accent-blue)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">e⁻</text>
                  <text x="-240" y="198" fill="var(--accent-red)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">e⁺</text>
                  <text x="250" y="4" fill="var(--accent-yellow)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">γ</text>
                  <text x="0" y="-30" textAnchor="middle" fill="var(--accent-yellow)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="30">−i e γ<sup>μ</sup></text>
                </g>
                <defs>
                  <marker id="arr-13" viewBox="0 0 10 10" refX="5" refY="5"
                          markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 z" fill="var(--accent-blue)" />
                  </marker>
                </defs>
              </svg>
            )}

            {/* ── BEAT 8: Everything from this vertex ───── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--accent-green)', opacity: b8A,
                    textShadow: '0 0 20px rgba(61,240,192,0.35)' }}>
                Every electromagnetic process — multiple copies of this vertex.
              </div>
            )}

            {/* ── BEAT 9: Amplitude recipe ───────────── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                    fontFamily: 'var(--font-ui)', fontSize: 22, color: 'var(--canvas-dim)',
                    letterSpacing: '0.15em', lineHeight: 2, opacity: b9A }}>
                <div>DRAW ALL RELEVANT DIAGRAMS</div>
                <div>TRANSLATE EACH PIECE</div>
                <div>INTEGRATE OVER INTERNAL MOMENTA</div>
                <div>SUM · SQUARE · PROBABILITY</div>
              </div>
            )}

            {/* ── BEAT 10: Final hold ─────────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-yellow)', opacity: b10A }}>
                Two pieces. All of QED.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 14 — Loops & renormalization (SIGNATURE)
// Scene 14 — Loops and Renormalization (SIGNATURE, expanded to 137s / 10 beats)
// Beat 1  (0–12)    Title + higher orders needed for precision
// Beat 2  (12–32)   Loop diagram — closed path on internal lines
// Beat 3  (32–50)   Free loop momentum k — integrate 0→∞
// Beat 4  (50–68)   UV divergence ∫d⁴k → ∞
// Beat 5  (68–82)   Not a sign theory is wrong — bare ≠ physical
// Beat 6  (82–100)  Introduce UV cutoff Λ, compute, identify divergences
// Beat 7  (100–118) Renormalize: redefine m, e, φ absorbing ∞
// Beat 8  (118–128) Physical quantities finite and unambiguous
// Beat 9  (128–134) SM is renormalizable; gravity is not (hard problem)
// Beat 10 (134–137) Final hold
function Scene14({ start, end }) {
  return (
    <Scene start={start} end={end} label="14">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));

        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 30) / 1.5, 0, 1));
        const b2Build = clamp((t - 16) / 4, 0, 1);

        const b3A = clamp((t - 32) / 1.5, 0, 1) * (1 - clamp((t - 48) / 1.5, 0, 1));
        const b3Int = clamp((t - 38) / 1.5, 0, 1);

        const b4A = clamp((t - 50) / 1.5, 0, 1) * (1 - clamp((t - 66) / 1.5, 0, 1));
        const b4Diverge = clamp((t - 56) / 1.5, 0, 1);

        const b5A = clamp((t - 68) / 1.5, 0, 1) * (1 - clamp((t - 80) / 1.5, 0, 1));

        const b6A = clamp((t - 82) / 1.5, 0, 1) * (1 - clamp((t - 98) / 1.5, 0, 1));
        const b6Cutoff = clamp((t - 88) / 1.5, 0, 1);

        const b7A = clamp((t - 100) / 1.5, 0, 1) * (1 - clamp((t - 116) / 1.5, 0, 1));
        const b7Redef = clamp((t - 106) / 2, 0, 1);

        const b8A = clamp((t - 118) / 1.5, 0, 1) * (1 - clamp((t - 126) / 1.5, 0, 1));

        const b9A = clamp((t - 128) / 1.5, 0, 1) * (1 - clamp((t - 133) / 1.2, 0, 1));

        const b10A = clamp((t - 134) / 1, 0, 1);

        const cx = 720, cy = 560;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={14} title={'Loops & Renormalization'} />
            <SceneRefs refs={["ps","schwartz"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.15} speed={0.08} />

            {/* ── BEAT 1: Title ───────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 58, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  <span style={{ color: 'var(--accent-red)' }}>Loops</span>
                  &nbsp;and&nbsp;
                  <span style={{ color: 'var(--accent-green)' }}>renormalization</span>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Higher-order diagrams — higher precision — new problems.
                </div>
              </>
            )}

            {/* ── BEAT 2: Loop diagram build ──────────── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                A <span style={{ color: 'var(--accent-blue)' }}>loop</span> — a closed path on internal lines.
              </div>
            )}
            {b2Build > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b2Build * b2A }}>
                <g>
                  <line x1={cx - 300} y1={cy} x2={cx - 100} y2={cy}
                        stroke="var(--accent-yellow)" strokeWidth="2.5" strokeDasharray="6 5" />
                  <line x1={cx + 100} y1={cy} x2={cx + 300} y2={cy}
                        stroke="var(--accent-yellow)" strokeWidth="2.5" strokeDasharray="6 5" />
                  <circle cx={cx} cy={cy} r={100} fill="none"
                          stroke="var(--accent-blue)" strokeWidth="3"
                          strokeDasharray={`${b2Build * 628} 628`}
                          transform={`rotate(-90 ${cx} ${cy})`} />
                  <circle cx={cx - 100} cy={cy} r="7" fill="var(--accent-yellow)" />
                  <circle cx={cx + 100} cy={cy} r="7" fill="var(--accent-yellow)" />
                </g>
              </svg>
            )}

            {/* ── BEAT 3: Loop momentum k, integrate ──── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                The loop carries <span style={{ color: 'var(--accent-red)' }}>any momentum k</span> — integrate.
              </div>
            )}
            {b3A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b3A }}>
                <g>
                  <line x1={cx - 300} y1={cy} x2={cx - 100} y2={cy}
                        stroke="var(--accent-yellow)" strokeWidth="2.5" strokeDasharray="6 5" />
                  <line x1={cx + 100} y1={cy} x2={cx + 300} y2={cy}
                        stroke="var(--accent-yellow)" strokeWidth="2.5" strokeDasharray="6 5" />
                  <circle cx={cx} cy={cy} r={100} fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
                  <circle cx={cx - 100} cy={cy} r="7" fill="var(--accent-yellow)" />
                  <circle cx={cx + 100} cy={cy} r="7" fill="var(--accent-yellow)" />
                  {/* Circulating red dot */}
                  {(() => {
                    const a = -Math.PI / 2 + (t - 32) * 2;
                    return <circle cx={cx + Math.cos(a) * 100} cy={cy + Math.sin(a) * 100}
                      r="8" fill="var(--accent-red)" />;
                  })()}
                  <text x={cx} y={cy - 120} textAnchor="middle" fill="var(--accent-red)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">k</text>
                </g>
              </svg>
            )}
            {b3Int > 0 && (
              <div style={{ position: 'absolute', left: 1260, top: 420,
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--canvas-text)', opacity: b3Int * b3A }}>
                ∫ d⁴k / (k² − m²)²
              </div>
            )}

            {/* ── BEAT 4: UV divergence ─────────────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                As k → ∞, the integrand doesn't fall fast enough.
              </div>
            )}
            {b4Diverge > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                      color: 'var(--canvas-text)', opacity: b4Diverge * b4A }}>
                  ∫<sup>∞</sup> d⁴k / (k² − m²)²
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 490, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontSize: 80,
                      color: 'var(--accent-red)', opacity: b4Diverge * b4A,
                      textShadow: '0 0 24px rgba(255,107,107,0.5)' }}>
                  → ∞
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--accent-red)', opacity: b4Diverge * b4A }}>
                  Ultraviolet divergence — short-distance infinity.
                </div>
              </>
            )}

            {/* ── BEAT 5: Not a sign theory is wrong ──── */}
            {b5A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--canvas-text)', opacity: b5A }}>
                  The theory is not wrong —
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 450, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--accent-yellow)', opacity: b5A }}>
                  the Lagrangian parameters (<span style={{ fontFamily: 'var(--font-math)' }}>m, e</span>)
                  are <em>bare</em>, not physical.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b5A }}>
                  They're formal starting labels — what you measure is different.
                </div>
              </>
            )}

            {/* ── BEAT 6: Introduce UV cutoff Λ ─────── */}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b6A }}>
                Introduce a UV cutoff <span style={{ color: 'var(--accent-yellow)' }}>Λ</span>.
              </div>
            )}
            {b6Cutoff > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--form-inline)', opacity: b6Cutoff * b6A }}>
                ∫<sub>|k| &lt; Λ</sub> d⁴k / (k² − m²)² &nbsp;~ log Λ
              </div>
            )}
            {b6Cutoff > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--canvas-dim)', opacity: b6Cutoff * b6A }}>
                Finite for each Λ — but divergent as Λ → ∞.
              </div>
            )}

            {/* ── BEAT 7: Renormalize ───────────────── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                <span style={{ color: 'var(--accent-green)' }}>Absorb</span> the divergence into a redefinition.
              </div>
            )}
            {b7Redef > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                    opacity: b7Redef * b7A }}>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--accent-yellow)' }}>
                  m<sub>bare</sub> = m<sub>phys</sub> + δm(Λ)
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--accent-yellow)', marginTop: 22 }}>
                  e<sub>bare</sub> = e<sub>phys</sub> + δe(Λ)
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--accent-yellow)', marginTop: 22 }}>
                  φ = Z<sub>φ</sub><sup>½</sup> φ<sub>ren</sub>
                </div>
              </div>
            )}

            {/* ── BEAT 8: Physical finite ──────────── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--accent-green)', opacity: b8A,
                    textShadow: '0 0 24px rgba(61,240,192,0.4)' }}>
                Physical values are finite, unambiguous, measured.
              </div>
            )}

            {/* ── BEAT 9: SM renorm, gravity not ────── */}
            {b9A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 160, top: 420, width: 640, textAlign: 'center',
                      padding: '26px 32px', border: '2px solid var(--accent-green)', borderRadius: 4,
                      opacity: b9A, background: 'rgba(13,17,23,0.4)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                        fontSize: 34, color: 'var(--accent-green)' }}>Standard Model</div>
                  <div style={{ fontSize: 26, color: 'var(--canvas-dim)', marginTop: 14,
                        fontFamily: 'var(--font-display)' }}>renormalizable ✓</div>
                </div>
                <div style={{ position: 'absolute', left: 1120, top: 420, width: 640, textAlign: 'center',
                      padding: '26px 32px', border: '2px solid var(--accent-red)', borderRadius: 4,
                      opacity: b9A, background: 'rgba(13,17,23,0.4)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                        fontSize: 34, color: 'var(--accent-red)' }}>Quantum Gravity</div>
                  <div style={{ fontSize: 26, color: 'var(--canvas-dim)', marginTop: 14,
                        fontFamily: 'var(--font-display)' }}>non-renormalizable ✕</div>
                </div>
              </>
            )}

            {/* ── BEAT 10: Final hold ─────────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-green)', opacity: b10A }}>
                Infinities absorbed &nbsp;⟹&nbsp; <span style={{ color: 'var(--accent-yellow)' }}>finite predictions</span>.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 15 — Yukawa
// Scene 15 — Forces from Field Exchange (expanded to 132s / 10 beats)
// Beat 1  (0–12)    Title + "forces = particle exchange"
// Beat 2  (12–30)   Yukawa diagram — two fermions exchange scalar
// Beat 3  (30–46)   Yukawa potential V = -g²m e^{-mr}/(4πr)
// Beat 4  (46–64)   Heavy exchange → short range (plot)
// Beat 5  (64–80)   Light/massless → infinite range
// Beat 6  (80–95)   1935 Yukawa predicts pion — nuclear force
// Beat 7  (95–108)  Electromagnetism: massless photon, 1/r
// Beat 8  (108–122) Gravity: graviton, 1/r — but non-renormalizable
// Beat 9  (122–130) "All forces are exchange" summary
// Beat 10 (130–132) Final hold
function Scene15({ start, end }) {
  return (
    <Scene start={start} end={end} label="15">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));

        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 28) / 1.5, 0, 1));
        const b2Diag = clamp((t - 16) / 3, 0, 1);

        const b3A = clamp((t - 30) / 1.5, 0, 1) * (1 - clamp((t - 44) / 1.5, 0, 1));
        const b3V = clamp((t - 35) / 1.5, 0, 1);

        const b4A = clamp((t - 46) / 1.5, 0, 1) * (1 - clamp((t - 62) / 1.5, 0, 1));
        const b5A = clamp((t - 64) / 1.5, 0, 1) * (1 - clamp((t - 78) / 1.5, 0, 1));

        const b6A = clamp((t - 80) / 1.5, 0, 1) * (1 - clamp((t - 93) / 1.5, 0, 1));
        const b6Pred = clamp((t - 85) / 1.5, 0, 1);

        const b7A = clamp((t - 95) / 1.5, 0, 1) * (1 - clamp((t - 106) / 1.5, 0, 1));
        const b8A = clamp((t - 108) / 1.5, 0, 1) * (1 - clamp((t - 120) / 1.5, 0, 1));
        const b9A = clamp((t - 122) / 1.5, 0, 1) * (1 - clamp((t - 129) / 1, 0, 1));
        const b10A = clamp((t - 129) / 1, 0, 1);

        // mass value controlled by which beat we're in
        const mass = b4A > 0.3 ? 1.6
                  : b5A > 0.3 ? 0.0
                  : b7A > 0.3 ? 0.0
                  : b8A > 0.3 ? 0.0
                  : 0.8;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={15} title={'Force from Exchange'} />
            <SceneRefs refs={["yukawa","zee"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.15} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 60, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  Forces = <span style={{ color: 'var(--accent-yellow)' }}>particle exchange</span>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Attraction, repulsion, binding — all one mechanism.
                </div>
              </>
            )}

            {/* ── BEAT 2: Yukawa diagram ─────────────── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                Two fermions exchange a scalar — <span style={{ color: 'var(--accent-yellow)' }}>Yukawa coupling</span>.
              </div>
            )}
            {b2Diag > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b2Diag * b2A }}>
                <g transform="translate(960, 580)">
                  <line x1="-300" y1="-140" x2="300" y2="-140"
                        stroke="var(--accent-blue)" strokeWidth="3" />
                  <circle cx="-280" cy="-140" r="20" fill="var(--accent-blue)" />
                  <circle cx="280" cy="-140" r="20" fill="var(--accent-blue)" />
                  <line x1="-300" y1="140" x2="300" y2="140"
                        stroke="var(--accent-blue)" strokeWidth="3" />
                  <circle cx="-280" cy="140" r="20" fill="var(--accent-blue)" />
                  <circle cx="280" cy="140" r="20" fill="var(--accent-blue)" />
                  <circle cx="0" cy="-140" r="6" fill="var(--accent-yellow)" />
                  <circle cx="0" cy="140" r="6" fill="var(--accent-yellow)" />
                  {(() => {
                    let d = '';
                    for (let i = 0; i <= 40; i++) {
                      const y = -140 + (i / 40) * 280;
                      const x = Math.sin(i * 0.8 + t * 4) * 14;
                      d += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
                    }
                    return <path d={d} fill="none" stroke="var(--accent-yellow)" strokeWidth="2.5" />;
                  })()}
                  <text x="40" y="6" fill="var(--accent-yellow)"
                        fontFamily="var(--font-math)" fontStyle="italic" fontSize="26">scalar, mass m</text>
                </g>
              </svg>
            )}

            {/* ── BEAT 3: Yukawa potential ───────────── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                Take the non-relativistic limit — the <span style={{ color: 'var(--accent-green)' }}>Yukawa potential</span>.
              </div>
            )}
            {b3V > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 56,
                    color: 'var(--form-inline)', opacity: b3V * b3A,
                    textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                V(r) = − g² m e<sup>−mr</sup> / (4π r)
              </div>
            )}
            {b3V > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--canvas-dim)', opacity: b3V * b3A }}>
                Range = 1 / m — heavier mediator ⟹ shorter range.
              </div>
            )}

            {/* ── BEAT 4-5-7-8: Potential plot with varying mass ── */}
            {(b4A > 0 || b5A > 0 || b7A > 0 || b8A > 0) && (() => {
              const op = Math.max(b4A, b5A, b7A, b8A);
              return (
                <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: op }}>
                  <g transform="translate(960, 680)">
                    <line x1="-400" y1="0" x2="400" y2="0" stroke="var(--canvas-dim)" strokeWidth="1" />
                    <line x1="-400" y1="0" x2="-400" y2="-300" stroke="var(--canvas-dim)" strokeWidth="1" />
                    <text x="420" y="8" fill="var(--canvas-dim)"
                          fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">r</text>
                    <text x="-420" y="-310" fill="var(--canvas-dim)"
                          fontFamily="var(--font-math)" fontStyle="italic" fontSize="22">V(r)</text>
                    {(() => {
                      let d = '';
                      for (let i = 1; i <= 100; i++) {
                        const r = (i / 100) * 4;
                        const V = -Math.exp(-mass * r) / r;
                        const x = -400 + (r / 4) * 800;
                        const y = Math.max(-280, V * 80);
                        d += (i === 1 ? 'M' : 'L') + x + ',' + y + ' ';
                      }
                      return <path d={d} fill="none" stroke="var(--accent-green)" strokeWidth="3" />;
                    })()}
                  </g>
                </svg>
              );
            })()}

            {/* ── BEAT 4: Heavy → short range ─────────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                Heavy exchange → <span style={{ color: 'var(--accent-red)' }}>short range</span>.
              </div>
            )}
            {/* ── BEAT 5: Massless → 1/r ───────────── */}
            {b5A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b5A }}>
                Massless exchange → <span style={{ color: 'var(--accent-blue)' }}>1/r infinite range</span>.
              </div>
            )}

            {/* ── BEAT 6: Yukawa predicts pion (1935) ── */}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 260, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b6A }}>
                <span style={{ color: 'var(--accent-yellow)' }}>1935</span> —
                Yukawa predicts the <span style={{ color: 'var(--accent-green)' }}>pion</span>.
              </div>
            )}
            {b6Pred > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center',
                    opacity: b6Pred * b6A }}>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)' }}>
                  range ≈ 1 fm &nbsp;⟹&nbsp; m ≈ 140 MeV
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', marginTop: 24 }}>
                  Discovered 1947. Confirmed.
                </div>
              </div>
            )}

            {/* ── BEAT 7: EM / photon ───────────────── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                Electromagnetism — the mediator is the <span style={{ color: 'var(--accent-yellow)' }}>photon</span>.
              </div>
            )}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--form-inline)', opacity: b7A }}>
                m<sub>γ</sub> = 0 &nbsp;⟹&nbsp; V ∼ −1/r &nbsp;(Coulomb)
              </div>
            )}

            {/* ── BEAT 8: Gravity / graviton ───────── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b8A }}>
                Gravity — the <span style={{ color: 'var(--note-inline)' }}>graviton</span> (spin 2, massless).
              </div>
            )}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--form-inline)', opacity: b8A }}>
                V ∼ −1/r &nbsp;(Newton)
              </div>
            )}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 160, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                    color: 'var(--accent-red)', opacity: b8A }}>
                — but non-renormalizable: no short-distance quantum theory.
              </div>
            )}

            {/* ── BEAT 9: Summary ───────────────── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-green)', opacity: b9A,
                    textShadow: '0 0 20px rgba(61,240,192,0.35)' }}>
                Every force = exchange of a quantum.
              </div>
            )}

            {/* ── BEAT 10: Final hold ──────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--form-inline)', opacity: b10A }}>
                V(r) = −g²m e<sup>−mr</sup>/(4πr)
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 16 — Spin, Statistics, Fermion Fields (expanded to 133s / 10 beats)
// Beat 1  (0–12)    Title + "universe has particles with spin"
// Beat 2  (12–28)   Spin-0 scalar, spin-1 photon, spin-½ electron, spin-2 graviton
// Beat 3  (28–46)   Dirac spinor ψ — 4 components
// Beat 4  (46–60)   Dirac Lagrangian ℒ = ψ̄(iγ^μ∂_μ − m)ψ
// Beat 5  (60–76)   Vector field A_μ, ℒ = -¼F_μν F^μν
// Beat 6  (76–92)   Bosonic statistics: [a,a†] commute, bosons share
// Beat 7  (92–110)  Fermionic statistics: {a,a†} anticommute, Pauli
// Beat 8  (110–122) Side-by-side ladders comparison
// Beat 9  (122–130) Spin-statistics theorem
// Beat 10 (130–133) Final hold
function Scene16({ start, end }) {
  return (
    <Scene start={start} end={end} label="16">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));

        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 26) / 1.5, 0, 1));
        const b2Rows = [14, 17, 20, 23];

        const b3A = clamp((t - 28) / 1.5, 0, 1) * (1 - clamp((t - 44) / 1.5, 0, 1));
        const b3Comp = clamp((t - 33) / 2, 0, 1);

        const b4A = clamp((t - 46) / 1.5, 0, 1) * (1 - clamp((t - 58) / 1.5, 0, 1));
        const b5A = clamp((t - 60) / 1.5, 0, 1) * (1 - clamp((t - 74) / 1.5, 0, 1));

        const b6A = clamp((t - 76) / 1.5, 0, 1) * (1 - clamp((t - 90) / 1.5, 0, 1));
        const b6Count = Math.min(5, Math.floor((t - 78) / 2));

        const b7A = clamp((t - 92) / 1.5, 0, 1) * (1 - clamp((t - 108) / 1.5, 0, 1));
        const b7Pauli = clamp((t - 100) / 1.5, 0, 1);

        const b8A = clamp((t - 110) / 1.5, 0, 1) * (1 - clamp((t - 120) / 1.5, 0, 1));

        const b9A = clamp((t - 122) / 1.5, 0, 1) * (1 - clamp((t - 129) / 1, 0, 1));

        const b10A = clamp((t - 129) / 1, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={16} title={'Spin & Statistics'} />
            <SceneRefs refs={["weinberg","srednicki"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.15} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 62, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  Spin, statistics, and fermion fields.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  The field type determines the particle type.
                </div>
              </>
            )}

            {/* ── BEAT 2: Particle spins table ─────── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                Different spins → different field types.
              </div>
            )}
            {b2A > 0 && (() => {
              const rows = [
                { label: 'Higgs',   spin: 'spin 0',   color: 'var(--accent-blue)' },
                { label: 'photon',  spin: 'spin 1',   color: 'var(--accent-yellow)' },
                { label: 'electron',spin: 'spin ½',   color: 'var(--accent-red)' },
                { label: 'graviton',spin: 'spin 2',   color: 'var(--note-inline)' },
              ];
              return rows.map((r, i) => {
                const ap = clamp((t - b2Rows[i]) / 1.0, 0, 1) * b2A;
                return (
                  <div key={i} style={{
                    position: 'absolute', left: 400, right: 400, top: 280 + i * 80,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 32px', border: `1.5px solid ${r.color}`, borderRadius: 4,
                    opacity: ap, background: 'rgba(13,17,23,0.4)',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                  }}>
                    <span style={{ color: r.color, flex: '0 0 300px' }}>{r.label}</span>
                    <span style={{ color: 'var(--canvas-dim)' }}>→</span>
                    <span style={{ color: r.color, flex: '0 0 200px', textAlign: 'right' }}>{r.spin}</span>
                  </div>
                );
              });
            })()}

            {/* ── BEAT 3: Dirac spinor 4 components ── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                For spin ½ — a <span style={{ color: 'var(--accent-red)' }}>Dirac spinor</span>.
              </div>
            )}
            {b3Comp > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 48,
                    color: 'var(--accent-red)', opacity: b3Comp * b3A }}>
                ψ(x) =
                <span style={{ display: 'inline-block', borderLeft: '2px solid var(--canvas-text)',
                      borderRight: '2px solid var(--canvas-text)',
                      padding: '12px 22px', marginLeft: 18 }}>
                  <div>ψ₁</div>
                  <div>ψ₂</div>
                  <div>ψ₃</div>
                  <div>ψ₄</div>
                </span>
              </div>
            )}
            {b3Comp > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                    color: 'var(--canvas-dim)', opacity: b3Comp * b3A }}>
                Four components mix under Lorentz boosts and rotations.
              </div>
            )}

            {/* ── BEAT 4: Dirac Lagrangian ─────────── */}
            {b4A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b4A }}>
                  Dirac Lagrangian —
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 430, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 52,
                      color: 'var(--form-inline)', opacity: b4A,
                      textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                  ℒ = ψ̄ ( i γ<sup>μ</sup> ∂<sub>μ</sub> − m ) ψ
                </div>
              </>
            )}

            {/* ── BEAT 5: Vector field A_μ / Maxwell ── */}
            {b5A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b5A }}>
                  For spin 1 — a vector field A<sub>μ</sub>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 430, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 52,
                      color: 'var(--accent-yellow)', opacity: b5A,
                      textShadow: '0 0 24px rgba(255,209,102,0.3)' }}>
                  ℒ = − ¼ F<sub>μν</sub> F<sup>μν</sup>
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 540, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b5A }}>
                  F<sub>μν</sub> = ∂<sub>μ</sub>A<sub>ν</sub> − ∂<sub>ν</sub>A<sub>μ</sub>
                </div>
              </>
            )}

            {/* ── BEAT 6: Bosons share modes ──────── */}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b6A }}>
                <span style={{ color: 'var(--accent-blue)' }}>Bosons</span> — creation operators commute.
              </div>
            )}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 280, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--form-inline)', opacity: b6A }}>
                [ a<sub>k</sub>, a<sup>†</sup><sub>k'</sub> ] = δ(k − k′)
              </div>
            )}
            {b6A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b6A }}>
                <g transform="translate(960, 720)">
                  <line x1="-240" y1="0" x2="240" y2="0"
                        stroke="var(--accent-blue)" strokeWidth="2.5" />
                  {Array.from({ length: Math.max(0, b6Count) }).map((_, j) => (
                    <circle key={j} cx={-180 + j * 70} cy={-20} r="14" fill="var(--accent-blue)" />
                  ))}
                </g>
              </svg>
            )}
            {b6A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: 'var(--canvas-dim)', opacity: b6A }}>
                Many bosons share a mode — the physics of lasers.
              </div>
            )}

            {/* ── BEAT 7: Fermions anticommute, Pauli ── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b7A }}>
                <span style={{ color: 'var(--accent-red)' }}>Fermions</span> — creation operators anticommute.
              </div>
            )}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 280, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 42,
                    color: 'var(--form-inline)', opacity: b7A }}>
                {'{ a'}<sub>k</sub>, a<sup>†</sup><sub>k'</sub> {'} = δ(k − k′)'}
              </div>
            )}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--accent-red)', opacity: b7A }}>
                a<sup>†</sup><sub>k</sub> a<sup>†</sup><sub>k</sub> |0⟩ = 0
              </div>
            )}
            {b7Pauli > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                    color: 'var(--accent-green)', opacity: b7Pauli * b7A,
                    textShadow: '0 0 20px rgba(61,240,192,0.3)' }}>
                Pauli exclusion principle — built in.
              </div>
            )}

            {/* ── BEAT 8: Side-by-side ladders ───── */}
            {b8A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b8A }}>
                {/* Boson stack */}
                <g transform="translate(620, 620)">
                  <text x="0" y="-280" textAnchor="middle" fill="var(--accent-blue)"
                        fontFamily="var(--font-ui)" fontSize="26" fontWeight="700"
                        letterSpacing="0.15em">BOSONS</text>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <g key={i}>
                      <line x1="-120" y1={160 - i * 60} x2="120" y2={160 - i * 60}
                            stroke="var(--accent-blue)" strokeWidth="2" />
                      {Array.from({ length: i + 1 }).map((_, j) => (
                        <circle key={j} cx={-90 + j * 35} cy={160 - i * 60 - 10} r="9" fill="var(--accent-blue)" />
                      ))}
                    </g>
                  ))}
                </g>
                {/* Fermion stack */}
                <g transform="translate(1300, 620)">
                  <text x="0" y="-280" textAnchor="middle" fill="var(--accent-red)"
                        fontFamily="var(--font-ui)" fontSize="26" fontWeight="700"
                        letterSpacing="0.15em">FERMIONS</text>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <g key={i}>
                      <line x1="-120" y1={160 - i * 60} x2="120" y2={160 - i * 60}
                            stroke="var(--accent-red)" strokeWidth="2" />
                      {i > 0 && (
                        <circle cx={0} cy={160 - i * 60 - 10} r="9" fill="var(--accent-red)" />
                      )}
                    </g>
                  ))}
                </g>
              </svg>
            )}

            {/* ── BEAT 9: Spin-statistics theorem ─── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-yellow)', opacity: b9A,
                    textShadow: '0 0 20px rgba(255,209,102,0.35)' }}>
                Integer spin ⟹ boson &nbsp;·&nbsp; half-integer ⟹ fermion.
                <div style={{ fontSize: 24, color: 'var(--canvas-dim)',
                      marginTop: 22, fontStyle: 'normal' }}>
                  A theorem — from Lorentz invariance &amp; causality.
                </div>
              </div>
            )}

            {/* ── BEAT 10: Final hold ───────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-yellow)', opacity: b10A }}>
                Spin ⟺ statistics.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

Object.assign(window, { Scene11, Scene12, Scene13, Scene14, Scene15, Scene16 });
