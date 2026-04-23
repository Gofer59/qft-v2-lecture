// qft-scenes-d.jsx — Scenes 17-20

// Scene 17 — Standard Model (SIGNATURE, expanded to 134s / 10 beats)
// Beat 1  (0–12)    Title + "everything built comes together"
// Beat 2  (12–28)   Gauge group SU(3) × SU(2) × U(1)
// Beat 3  (28–48)   SM Lagrangian terms build up
// Beat 4  (48–66)   SU(3) color — QCD, gluons self-interact → confinement
// Beat 5  (66–84)   SU(2)×U(1) electroweak unification
// Beat 6  (84–98)   Higgs mechanism — VEV breaks electroweak symmetry
// Beat 7  (98–112)  17 particles grid
// Beat 8  (112–120) Humor — "no gravity, nobody said the universe…"
// Beat 9  (120–128) Precision: electron g-2 to 11 digits
// Beat 10 (128–134) Final hold
function Scene17({ start, end }) {
  return (
    <Scene start={start} end={end} label="17">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));

        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 26) / 1.5, 0, 1));

        const b3A = clamp((t - 28) / 1.5, 0, 1) * (1 - clamp((t - 46) / 1.5, 0, 1));
        const termStarts = [30, 34, 38, 42];

        const b4A = clamp((t - 48) / 1.5, 0, 1) * (1 - clamp((t - 64) / 1.5, 0, 1));
        const b5A = clamp((t - 66) / 1.5, 0, 1) * (1 - clamp((t - 82) / 1.5, 0, 1));

        const b6A = clamp((t - 84) / 1.5, 0, 1) * (1 - clamp((t - 96) / 1.5, 0, 1));

        const b7A = clamp((t - 98) / 1.5, 0, 1) * (1 - clamp((t - 110) / 1.5, 0, 1));

        const b8A = clamp((t - 112) / 1.5, 0, 1) * (1 - clamp((t - 119) / 1.5, 0, 1));

        const b9A = clamp((t - 120) / 1.5, 0, 1) * (1 - clamp((t - 127) / 1, 0, 1));

        const b10A = clamp((t - 127) / 1, 0, 1);

        const Sub = ({ children }) => <sub style={{ fontSize: '0.55em', fontStyle: 'italic' }}>{children}</sub>;
        const Sup = ({ children }) => <sup style={{ fontSize: '0.55em', fontStyle: 'italic' }}>{children}</sup>;

        const terms = [
          { s: 0, color: 'var(--accent-yellow)', label: 'gauge field kinetic',
            render: <>−¼ F<Sub>μν</Sub>F<Sup>μν</Sup></> },
          { s: 1, color: 'var(--accent-blue)',   label: 'fermion kinetic',
            render: <>+ iψ̄ γ<Sup>μ</Sup>D<Sub>μ</Sub>ψ</> },
          { s: 2, color: 'var(--form-inline)',   label: 'Higgs',
            render: <>+ |D<Sub>μ</Sub>H|² − V(H)</> },
          { s: 3, color: 'var(--accent-green)',  label: 'Yukawa',
            render: <>+ y ψ̄ H ψ</> },
        ];
        const particles = [
          {n:'u', t:'q'}, {n:'c', t:'q'}, {n:'t', t:'q'},
          {n:'d', t:'q'}, {n:'s', t:'q'}, {n:'b', t:'q'},
          {n:'e', t:'l'}, {n:'μ', t:'l'}, {n:'τ', t:'l'},
          {n:'νₑ', t:'l'}, {n:'ν_μ', t:'l'}, {n:'ν_τ', t:'l'},
          {n:'γ', t:'g'}, {n:'g', t:'g'}, {n:'W', t:'g'}, {n:'Z', t:'g'},
          {n:'H', t:'h'},
        ];
        const colorFor = (tt) => tt === 'q' ? 'var(--accent-blue)'
                                : tt === 'l' ? 'var(--accent-red)'
                                : tt === 'g' ? 'var(--accent-yellow)'
                                : 'var(--form-inline)';

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={17} title={'The Standard Model'} />
            <SceneRefs refs={["schwartz","pdg","higgs64"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.15} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 58, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  <span style={{ color: 'var(--accent-yellow)' }}>Standard Model</span>
                  — in one breath.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Everything we built — in one Lagrangian.
                </div>
              </>
            )}

            {/* ── BEAT 2: Gauge group ──────────────── */}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b2A }}>
                The gauge symmetry —
              </div>
            )}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 72,
                    color: 'var(--accent-yellow)', opacity: b2A,
                    textShadow: '0 0 30px rgba(255,209,102,0.4)' }}>
                SU(3)<sub>c</sub> × SU(2)<sub>L</sub> × U(1)<sub>Y</sub>
              </div>
            )}
            {b2A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-ui)', fontSize: 22,
                    color: 'var(--canvas-dim)', opacity: b2A, letterSpacing: '0.18em' }}>
                STRONG &nbsp;·&nbsp; WEAK &nbsp;·&nbsp; HYPERCHARGE
              </div>
            )}

            {/* ── BEAT 3: SM Lagrangian building up ── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                One Lagrangian, term by term —
              </div>
            )}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                <span style={{ color: 'var(--canvas-dim)' }}>ℒ<sub style={{ fontSize: '0.55em' }}>SM</sub> = </span>
                {terms.map((term, i) => {
                  const ap = clamp((t - termStarts[i]) / 1.2, 0, 1);
                  return (
                    <span key={i} style={{ color: term.color, opacity: ap, marginLeft: 18 }}>
                      {term.render}
                    </span>
                  );
                })}
              </div>
            )}
            {b3A > 0 && (() => {
              const active = terms.filter((_, i) => t >= termStarts[i]).slice(-1)[0];
              const idx = terms.findIndex(tr => tr === active);
              if (!active) return null;
              return (
                <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center',
                      opacity: b3A }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 22,
                        letterSpacing: '0.15em', color: active.color, textTransform: 'uppercase' }}>
                    {active.label}
                  </div>
                </div>
              );
            })()}

            {/* ── BEAT 4: SU(3) / QCD / gluons ──────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                <span style={{ color: 'var(--accent-red)' }}>SU(3)</span> — quantum chromodynamics.
              </div>
            )}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 340,
                    textAlign: 'center', opacity: b4A }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      fontSize: 32, color: 'var(--canvas-text)' }}>
                  quarks carry <span style={{ color: 'var(--accent-red)' }}>color</span> — 3 varieties
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      fontSize: 32, color: 'var(--canvas-text)', marginTop: 20 }}>
                  8 <span style={{ color: 'var(--accent-yellow)' }}>gluons</span> — massless, self-interacting
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      fontSize: 32, color: 'var(--accent-red)', marginTop: 20,
                      textShadow: '0 0 16px rgba(255,107,107,0.3)' }}>
                  ⟹ <em>confinement</em>: no free quarks
                </div>
              </div>
            )}

            {/* ── BEAT 5: Electroweak ─────────────── */}
            {b5A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b5A }}>
                <span style={{ color: 'var(--accent-blue)' }}>SU(2) × U(1)</span> — electroweak unification.
              </div>
            )}
            {b5A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 340,
                    textAlign: 'center', opacity: b5A }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      fontSize: 32, color: 'var(--canvas-text)' }}>
                  Below 100 GeV: two forces
                </div>
                <div style={{ fontFamily: 'var(--font-math)', fontStyle: 'italic',
                      fontSize: 36, color: 'var(--accent-yellow)', marginTop: 20 }}>
                  γ &nbsp;(EM)  &nbsp;·&nbsp;  W, Z &nbsp;(weak)
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      fontSize: 32, color: 'var(--canvas-text)', marginTop: 20 }}>
                  Above 100 GeV: one unified interaction.
                </div>
              </div>
            )}

            {/* ── BEAT 6: Higgs mechanism ─────────── */}
            {b6A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b6A }}>
                  The <span style={{ color: 'var(--form-inline)' }}>Higgs mechanism</span> —
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                      color: 'var(--form-inline)', opacity: b6A,
                      textShadow: '0 0 20px rgba(255,209,102,0.3)' }}>
                  ⟨0|H|0⟩ = v ≠ 0
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                      color: 'var(--canvas-dim)', opacity: b6A }}>
                  Spontaneously breaks electroweak symmetry.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 580, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b6A }}>
                  W and Z acquire mass — weak force becomes short-range.
                </div>
              </>
            )}

            {/* ── BEAT 7: 17 particles grid ───────── */}
            {b7A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b7A }}>
                  The entire particle content.
                </div>
                <div style={{ position: 'absolute', top: 280, left: 0, right: 0,
                      textAlign: 'center', opacity: b7A,
                      fontFamily: 'var(--font-math)', fontStyle: 'italic' }}>
                  <div style={{ display: 'inline-grid',
                        gridTemplateColumns: 'repeat(6, 92px)',
                        gap: '14px 16px', padding: '20px' }}>
                    {particles.map((p, i) => {
                      const parts = p.n.split('_');
                      const rendered = parts.length === 2
                        ? <>{parts[0]}<sub style={{ fontSize: '0.55em', fontStyle: 'italic' }}>{parts[1]}</sub></>
                        : p.n;
                      const ap = clamp((t - 100 - i * 0.15) / 0.4, 0, 1) * b7A;
                      return (
                        <div key={i} style={{
                          width: 92, height: 92, border: '2px solid ' + colorFor(p.t),
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 38, color: colorFor(p.t),
                          background: 'rgba(13,17,23,0.6)', borderRadius: 3,
                          opacity: ap,
                        }}>{rendered}</div>
                      );
                    })}
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontStyle: 'normal', fontSize: 22,
                        color: 'var(--canvas-dim)', marginTop: 30, letterSpacing: '0.2em' }}>
                    17 FUNDAMENTAL PARTICLES
                  </div>
                </div>
              </>
            )}

            {/* ── BEAT 8: Humor — no gravity ───────── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', top: 320, left: 160, right: 160, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b8A, lineHeight: 1.45 }}>
                "Seventeen fundamental particles. One equation on one line.
                <div style={{ marginTop: 22, color: 'var(--canvas-dim)', fontSize: 30 }}>
                  And yet it <span style={{ color: 'var(--accent-red)' }}>doesn't include gravity</span> —
                </div>
                <div style={{ marginTop: 10, color: 'var(--canvas-dim)', fontSize: 24,
                      fontStyle: 'normal' }}>
                  the most obvious force you experience every day.
                </div>
                <div style={{ marginTop: 22, fontSize: 24, color: 'var(--canvas-dim)',
                      fontStyle: 'normal' }}>
                  Nobody said the universe had to be convenient."
                </div>
              </div>
            )}

            {/* ── BEAT 9: Precision ─────────────── */}
            {b9A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 200, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b9A }}>
                  Precision beyond any other theory —
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 350, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--accent-green)', opacity: b9A,
                      textShadow: '0 0 20px rgba(61,240,192,0.3)' }}>
                  g<sub>e</sub> / 2 calculated to 11 digits.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--accent-green)', opacity: b9A }}>
                  g<sub>e</sub> / 2 measured to 11 digits.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 550, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--accent-yellow)', opacity: b9A,
                      textShadow: '0 0 16px rgba(255,209,102,0.3)' }}>
                  Every digit agrees.
                </div>
              </>
            )}

            {/* ── BEAT 10: Final hold ─────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 48,
                    color: 'var(--accent-yellow)', opacity: b10A,
                    textShadow: '0 0 24px rgba(255,209,102,0.35)' }}>
                SU(3) × SU(2) × U(1) + Higgs
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 18 — What QFT does not explain
// Scene 18 — What QFT Does Not Explain (expanded to 132s / 10 beats)
// Beat 1  (0–12)    Title + SM is not the final answer
// Beat 2  (12–32)   Gravity — GR classical, QG non-renormalizable
// Beat 3  (32–50)   Dark matter — 27% of universe, no SM particle
// Beat 4  (50–70)   Dark energy — vacuum energy discrepancy
// Beat 5  (70–86)   Matter/antimatter asymmetry
// Beat 6  (86–100)  Three generations — why 3?
// Beat 7  (100–116) "Open questions island" visualization
// Beat 8  (116–124) Effective field theory — SM still works at low E
// Beat 9  (124–130) "Until experiment shows otherwise"
// Beat 10 (130–132) Final hold
function Scene18({ start, end }) {
  return (
    <Scene start={start} end={end} label="18">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 11) / 1.2, 0, 1));
        const b2A = clamp((t - 13) / 1.5, 0, 1) * (1 - clamp((t - 30) / 1.5, 0, 1));
        const b2NonRenorm = clamp((t - 22) / 1.5, 0, 1);
        const b3A = clamp((t - 32) / 1.5, 0, 1) * (1 - clamp((t - 48) / 1.5, 0, 1));
        const b3Pct = clamp((t - 38) / 2, 0, 1);
        const b4A = clamp((t - 50) / 1.5, 0, 1) * (1 - clamp((t - 68) / 1.5, 0, 1));
        const b4Pct = clamp((t - 56) / 2, 0, 1);
        const b4Disc = clamp((t - 62) / 1.5, 0, 1);
        const b5A = clamp((t - 70) / 1.5, 0, 1) * (1 - clamp((t - 84) / 1.5, 0, 1));
        const b6A = clamp((t - 86) / 1.5, 0, 1) * (1 - clamp((t - 98) / 1.5, 0, 1));

        const b7A = clamp((t - 100) / 1.5, 0, 1) * (1 - clamp((t - 114) / 1.5, 0, 1));
        const b7Items = [101, 103, 105, 107, 109];

        const b8A = clamp((t - 116) / 1.5, 0, 1) * (1 - clamp((t - 122) / 1.5, 0, 1));

        const b9A = clamp((t - 124) / 1.2, 0, 1) * (1 - clamp((t - 129) / 1, 0, 1));

        const b10A = clamp((t - 129) / 1, 0, 1);

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={18} title={'Open Questions'} />
            <SceneRefs refs={["pdg","weinberg"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.15} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  What the Standard Model <span style={{ color: 'var(--accent-red)' }}>does not</span> explain.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  The limitations matter as much as the successes.
                </div>
              </>
            )}

            {/* ── BEAT 2: Gravity ─────────────── */}
            {b2A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--canvas-text)', opacity: b2A }}>
                  <span style={{ color: 'var(--accent-red)' }}>Gravity</span> is absent.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30,
                      color: 'var(--canvas-text)', opacity: b2A }}>
                  General relativity works extraordinarily well at large scales.
                </div>
              </>
            )}
            {b2NonRenorm > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34,
                    color: 'var(--accent-red)', opacity: b2NonRenorm * b2A,
                    textShadow: '0 0 16px rgba(255,107,107,0.3)' }}>
                Quantize it — non-renormalizable.
              </div>
            )}
            {b2NonRenorm > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                    color: 'var(--canvas-dim)', opacity: b2NonRenorm * b2A }}>
                String theory, loop quantum gravity, others — none complete.
              </div>
            )}

            {/* ── BEAT 3: Dark matter ─────────── */}
            {b3A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b3A }}>
                <span style={{ color: 'var(--note-inline)' }}>Dark matter</span>.
              </div>
            )}
            {b3Pct > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 96,
                      color: 'var(--note-inline)', opacity: b3Pct * b3A,
                      textShadow: '0 0 24px rgba(181,137,232,0.4)' }}>
                  ~27%
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b3Pct * b3A }}>
                  of the universe's energy content.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-text)', opacity: b3Pct * b3A }}>
                  Gravitates, no light, not any SM particle.
                </div>
              </>
            )}

            {/* ── BEAT 4: Dark energy ─────────── */}
            {b4A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--canvas-text)', opacity: b4A }}>
                <span style={{ color: 'var(--note-inline)' }}>Dark energy</span> — accelerated expansion.
              </div>
            )}
            {b4Pct > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                    fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 96,
                    color: 'var(--note-inline)', opacity: b4Pct * b4A,
                    textShadow: '0 0 24px rgba(181,137,232,0.4)' }}>
                ~68%
              </div>
            )}
            {b4Disc > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-text)', opacity: b4Disc * b4A }}>
                  QFT predicts vacuum energy ∼10<sup>120</sup>× observed value.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                      color: 'var(--accent-red)', opacity: b4Disc * b4A }}>
                  — the worst prediction in physics.
                </div>
              </>
            )}

            {/* ── BEAT 5: Matter–antimatter ─── */}
            {b5A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--canvas-text)', opacity: b5A }}>
                  <span style={{ color: 'var(--accent-yellow)' }}>Matter–antimatter</span> asymmetry.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 44,
                      color: 'var(--canvas-text)', opacity: b5A }}>
                  matter ≫ antimatter
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b5A }}>
                  SM CP-violation — not enough.
                </div>
              </>
            )}

            {/* ── BEAT 6: Three generations ─── */}
            {b6A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--canvas-text)', opacity: b6A }}>
                  Why <span style={{ color: 'var(--accent-yellow)' }}>three generations</span>?
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 36,
                      color: 'var(--canvas-text)', opacity: b6A }}>
                  (e, ν<sub>e</sub>, u, d) &nbsp;·&nbsp;
                  (μ, ν<sub>μ</sub>, c, s) &nbsp;·&nbsp;
                  (τ, ν<sub>τ</sub>, t, b)
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 500, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b6A }}>
                  No deep reason known.
                </div>
              </>
            )}

            {/* ── BEAT 7: SM island + orbiting questions ── */}
            {b7A > 0 && (
              <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, opacity: b7A }}>
                <ellipse cx="960" cy="600" rx="260" ry="160"
                         fill="rgba(91,163,245,0.1)"
                         stroke="var(--accent-blue)" strokeWidth="2" />
                <text x="960" y="595" textAnchor="middle" fill="var(--accent-blue)"
                      fontFamily="var(--font-display)" fontSize="30" fontStyle="italic">
                  Standard Model
                </text>
                <text x="960" y="630" textAnchor="middle" fill="var(--canvas-dim)"
                      fontFamily="var(--font-ui)" fontSize="16">
                  tested to 11 digits
                </text>
              </svg>
            )}
            {b7A > 0 && (() => {
              const items = [
                { label: 'Gravity',           color: 'var(--accent-red)' },
                { label: 'Dark matter',       color: 'var(--note-inline)' },
                { label: 'Dark energy',       color: 'var(--note-inline)' },
                { label: 'Matter–antimatter', color: 'var(--accent-yellow)' },
                { label: '3 generations',     color: 'var(--accent-yellow)' },
              ];
              return items.map((it, i) => {
                const angle = -Math.PI / 2 + (i - 2) * 1.1;
                const x = 960 + Math.cos(angle) * 540;
                const y = 600 + Math.sin(angle) * 320;
                const ap = clamp((t - b7Items[i]) / 1.0, 0, 1) * b7A;
                return (
                  <div key={i} style={{
                    position: 'absolute', left: x - 110, top: y - 30, width: 220,
                    textAlign: 'center', fontFamily: 'var(--font-display)',
                    fontStyle: 'italic', fontSize: 26, color: it.color, opacity: ap,
                  }}>
                    <div style={{ fontSize: 40, lineHeight: 1 }}>?</div>
                    <div style={{ marginTop: 4 }}>{it.label}</div>
                  </div>
                );
              });
            })()}

            {/* ── BEAT 8: EFT — low-E still works ─── */}
            {b8A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 280, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                      color: 'var(--canvas-text)', opacity: b8A }}>
                  <span style={{ color: 'var(--accent-green)' }}>Effective field theory</span> saves us.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)', opacity: b8A }}>
                  Unknown high-energy physics decouples at low energies.
                </div>
              </>
            )}

            {/* ── BEAT 9: Until experiment ──── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36,
                    color: 'var(--canvas-text)', opacity: b9A }}>
                The SM stands — until experiment shows otherwise.
              </div>
            )}

            {/* ── BEAT 10: Final hold ──────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--accent-yellow)', opacity: b10A }}>
                A theory is also its open questions.
              </div>
            )}
          </div>
        );
      }}
    </Scene>
  );
}

// Scene 19 — The Five Big Ideas (expanded to 130s / 10 beats)
// Beat 1  (0–10)    Title + "let's consolidate"
// Beat 2  (10–32)   Idea 1: Fields are primary
// Beat 3  (32–52)   Idea 2: Particles = quantized excitations, a/a†, |0⟩
// Beat 4  (52–72)   Idea 3: Symmetries govern dynamics, Noether
// Beat 5  (72–92)   Idea 4: Feynman diagrams compute — vertices, propagators, loops
// Beat 6  (92–110)  Idea 5: Renormalization — couplings run with energy
// Beat 7  (110–118) All five together — "conceptual core"
// Beat 8  (118–124) Brief list of what extends this
// Beat 9  (124–128) Everything on top elaborates this foundation
// Beat 10 (128–130) Final hold
function Scene19({ start, end }) {
  return (
    <Scene start={start} end={end} label="19">
      {({ localTime, duration }) => {
        const t = localTime;
        const fade = fadeIO(t, duration);

        const b1A = clamp((t - 1) / 1.2, 0, 1) * (1 - clamp((t - 9) / 1.2, 0, 1));
        const ideas = [
          { start: 10, end: 30, n: 1, title: 'Fields are primary',
            sub: 'particles are excitations',
            detail: 'Every species = underlying quantum field.',
            color: 'var(--accent-blue)' },
          { start: 32, end: 50, n: 2, title: 'Quantize ⟹ ladder of quanta',
            sub: <>a<sup style={{ fontSize: '0.65em' }}>†</sup>(k), a(k), |0⟩</>,
            detail: 'Harmonic oscillator per mode. Creation from vacuum.',
            color: 'var(--accent-green)' },
          { start: 52, end: 70, n: 3, title: 'Symmetries → conservation',
            sub: 'Noether',
            detail: 'Gauge invariance fixes the interactions.',
            color: 'var(--accent-yellow)' },
          { start: 72, end: 90, n: 4, title: 'Feynman diagrams compute',
            sub: 'vertices, propagators, loops',
            detail: 'Cartoons = integrals = amplitudes.',
            color: 'var(--form-inline)' },
          { start: 92, end: 108, n: 5, title: 'Renormalization tames ∞',
            sub: 'couplings run with energy',
            detail: 'Physical parameters are finite after absorption.',
            color: 'var(--accent-red)' },
        ];
        const b7A = clamp((t - 110) / 1.5, 0, 1) * (1 - clamp((t - 117) / 1.2, 0, 1));
        const b8A = clamp((t - 118) / 1.2, 0, 1) * (1 - clamp((t - 123) / 1, 0, 1));
        const b9A = clamp((t - 124) / 1.2, 0, 1) * (1 - clamp((t - 127.5) / 1, 0, 1));
        const b10A = clamp((t - 127.5) / 1, 0, 1);

        // Current spotlighted idea
        const activeIdx = ideas.findIndex(i => t >= i.start && t < i.end);
        const spotlight = activeIdx >= 0 ? ideas[activeIdx] : null;

        return (
          <div style={{ opacity: fade }}>
            <SceneLabel n={19} title={'The Five Big Ideas'} />
            <SceneRefs refs={["zee","ps"]} />
            <FieldBackground accent="#5ba3f5" amplitude={0.16} speed={0.08} />

            {/* ── BEAT 1: Title ─────────────── */}
            {b1A > 0 && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 58, color: 'var(--canvas-text)',
                      opacity: b1A }}>
                  <span style={{ color: 'var(--accent-yellow)' }}>Five big ideas</span>.
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 470, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 32,
                      color: 'var(--canvas-dim)',
                      opacity: b1A * clamp((t - 3) / 1.2, 0, 1) }}>
                  Stepping back.
                </div>
              </>
            )}

            {/* ── BEATS 2-6: Spotlighted ideas ─────── */}
            {spotlight && (
              <>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center',
                      fontFamily: 'var(--font-ui)', fontSize: 28,
                      color: 'var(--canvas-dim)', letterSpacing: '0.2em' }}>
                  IDEA {spotlight.n} &nbsp;/&nbsp; 5
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 280, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontSize: 160,
                      color: spotlight.color, opacity: 0.35,
                      lineHeight: 1 }}>
                  {spotlight.n}
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 460, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 54,
                      color: 'var(--canvas-text)' }}>
                  {spotlight.title}
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center',
                      fontFamily: 'var(--font-math)', fontStyle: 'italic', fontSize: 32,
                      color: spotlight.color }}>
                  {spotlight.sub}
                </div>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 140, textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                      color: 'var(--canvas-dim)',
                      opacity: clamp((t - spotlight.start - 3) / 1.5, 0, 1) }}>
                  {spotlight.detail}
                </div>
              </>
            )}

            {/* ── BEAT 7: All five together ─────── */}
            {b7A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 200,
                    textAlign: 'center', opacity: b7A }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                      color: 'var(--canvas-text)', marginBottom: 32 }}>
                  The conceptual core of QFT.
                </div>
                {ideas.map((idea, i) => (
                  <div key={i} style={{
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 28,
                    color: idea.color, margin: '10px 0',
                  }}>
                    {idea.n}. {idea.title}
                  </div>
                ))}
              </div>
            )}

            {/* ── BEAT 8: Extensions ─────────── */}
            {b8A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 340,
                    textAlign: 'center', opacity: b8A }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 34,
                      color: 'var(--canvas-text)', marginBottom: 24 }}>
                  Everything else is elaboration —
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26,
                      color: 'var(--canvas-dim)', lineHeight: 1.8 }}>
                  gauge theories · spontaneous symmetry breaking<br/>
                  path integral · anomalies · asymptotic freedom
                </div>
              </div>
            )}

            {/* ── BEAT 9: Foundation ─────────── */}
            {b9A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 38,
                    color: 'var(--accent-green)', opacity: b9A,
                    textShadow: '0 0 20px rgba(61,240,192,0.35)' }}>
                Five ideas — one foundation.
              </div>
            )}

            {/* ── BEAT 10: Final hold ────────── */}
            {b10A > 0 && (
              <div style={{ position: 'absolute', left: 0, right: 0, top: 440, textAlign: 'center',
                    fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40,
                    color: 'var(--accent-yellow)', opacity: b10A }}>
                Fields · Quanta · Symmetry · Diagrams · ∞
              </div>
            )}
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
