// qft-primitives.jsx — shared primitives for the QFT lecture animation
// Must be loaded AFTER animations.jsx (which provides Stage/Sprite/Easing/etc)

// ────────────────────────────────────────────────────────────────
// Scene wrapper: handles scene boundaries, provides localized time
// ────────────────────────────────────────────────────────────────
function Scene({ start, end, label, children }) {
  return (
    <Sprite start={start} end={end}>
      {(ctx) => (
        <div data-scene={label} style={{ position: 'absolute', inset: 0 }}>
          {typeof children === 'function' ? children(ctx) : children}
        </div>
      )}
    </Sprite>
  );
}

// Master reference list — canonical QFT & primary sources.
// Each ref has a short marker (e.g. "PS ch.2") used in citation chips.
const REFS = {
  ps:       { marker: 'Peskin & Schroeder 1995',  full: 'M. E. Peskin & D. V. Schroeder, An Introduction to Quantum Field Theory, Addison-Wesley, 1995' },
  weinberg: { marker: 'Weinberg QTF I–III',        full: 'S. Weinberg, The Quantum Theory of Fields, Vols. I–III, Cambridge, 1995–2000' },
  schwartz: { marker: 'Schwartz 2014',             full: 'M. D. Schwartz, Quantum Field Theory and the Standard Model, Cambridge, 2014' },
  srednicki:{ marker: 'Srednicki 2007',            full: 'M. Srednicki, Quantum Field Theory, Cambridge, 2007' },
  zee:      { marker: 'Zee "Nutshell" 2010',       full: 'A. Zee, Quantum Field Theory in a Nutshell, 2nd ed., Princeton, 2010' },
  dirac27:  { marker: 'Dirac 1927',                full: 'P. A. M. Dirac, "The Quantum Theory of the Emission and Absorption of Radiation," Proc. Roy. Soc. A 114, 243 (1927)' },
  noether:  { marker: 'Noether 1918',              full: 'E. Noether, "Invariante Variationsprobleme," Nachr. Ges. Wiss. Göttingen, 235 (1918)' },
  yukawa:   { marker: 'Yukawa 1935',               full: 'H. Yukawa, "On the Interaction of Elementary Particles," Proc. Phys.-Math. Soc. Japan 17, 48 (1935)' },
  feynman49:{ marker: 'Feynman 1949',              full: 'R. P. Feynman, "Space-Time Approach to Quantum Electrodynamics," Phys. Rev. 76, 769 (1949)' },
  casimir:  { marker: 'Casimir 1948',              full: 'H. B. G. Casimir, "On the Attraction Between Two Perfectly Conducting Plates," Proc. Kon. Ned. Akad. Wetensch. 51, 793 (1948)' },
  higgs64:  { marker: 'Higgs 1964',                full: 'P. W. Higgs, "Broken Symmetries and the Masses of Gauge Bosons," Phys. Rev. Lett. 13, 508 (1964)' },
  pdg:      { marker: 'PDG 2024',                  full: 'Particle Data Group, R. L. Workman et al., Prog. Theor. Exp. Phys. 2024, 083C01' },
  kleinG:   { marker: 'Klein 1929 / Sauter 1931',  full: 'O. Klein, Z. Physik 53, 157 (1929); F. Sauter, Z. Physik 73, 547 (1931) — the "Klein paradox"' },
};

// Citation chips, bottom-right. Takes an array of ref keys (e.g. ['ps','zee']).
// Appears after a short delay so it doesn't pull focus.
function SceneRefs({ refs, delay = 1.5 }) {
  const ctx = useSprite();
  if (!refs || !refs.length) return null;
  const op = ctx.localTime < delay ? 0
           : ctx.localTime > ctx.duration - 0.4 ? Math.max(0, (ctx.duration - ctx.localTime) / 0.4)
           : Math.min(1, (ctx.localTime - delay) / 0.6);
  return (
    <div style={{
      position: 'absolute', left: 72, bottom: 36,
      display: 'flex', alignItems: 'baseline', gap: 16,
      fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--canvas-dim)',
      letterSpacing: '0.08em', opacity: op * 0.85, pointerEvents: 'none',
      maxWidth: 1300,
    }}>
      <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.7 }}>
        sources
      </span>
      {refs.map((k, i) => {
        const r = REFS[k];
        if (!r) return null;
        return (
          <React.Fragment key={k}>
            {i > 0 && <span style={{ opacity: 0.4 }}>·</span>}
            <span style={{ fontStyle: 'italic' }}>{r.marker}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Scene title in top-left — small, subtle index label
function SceneLabel({ n, title }) {
  const ctx = useSprite();
  const fade = ctx.localTime < 0.5
    ? ctx.localTime / 0.5
    : ctx.localTime > ctx.duration - 0.6
    ? Math.max(0, (ctx.duration - ctx.localTime) / 0.6)
    : 1;
  return (
    <div style={{
      position: 'absolute', top: 48, left: 72,
      fontFamily: 'var(--font-ui)', color: 'var(--canvas-dim)',
      fontSize: 18, letterSpacing: '0.25em', textTransform: 'uppercase',
      opacity: fade * 0.8,
      display: 'flex', alignItems: 'baseline', gap: 18,
    }}>
      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
        {String(n).padStart(2, '0')}
      </span>
      <span>{title}</span>
    </div>
  );
}

// Fade helpers for entry/exit based on localTime within a sprite
function fadeIO(localTime, duration, inDur = 0.6, outDur = 0.6) {
  if (localTime < inDur) return clamp(localTime / inDur, 0, 1);
  if (localTime > duration - outDur) return clamp((duration - localTime) / outDur, 0, 1);
  return 1;
}

// A gently drifting background "field" — gradient dots
function FieldBackground({ accent, amplitude = 0.4, speed = 0.12 }) {
  const t = useTime();
  const cols = 22, rows = 12;
  const dots = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = 80 + (i / (cols - 1)) * (1920 - 160);
      const y = 80 + (j / (rows - 1)) * (1080 - 160);
      const wave = Math.sin((i * 0.5 + j * 0.3) + t * speed * 2 * Math.PI);
      const op = 0.08 + 0.18 * amplitude * (wave * 0.5 + 0.5);
      const r = 2.4 + 1.2 * amplitude * (wave * 0.5 + 0.5);
      dots.push(<circle key={i + '-' + j} cx={x} cy={y} r={r} fill={accent || '#5ba3f5'} opacity={op} />);
    }
  }
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
      {dots}
    </svg>
  );
}

// Animated ripple on a horizontal surface — the field excitation motif
function FieldSurface({ x = 0, y = 540, width = 1920, color, peaks = [], amp = 30, phase = 0, stroke = 2 }) {
  // peaks: [{ x: absolute x, amp: height mult, sigma: px }]
  const t = useTime();
  const N = 200;
  let d = '';
  for (let i = 0; i <= N; i++) {
    const px = x + (i / N) * width;
    // baseline noise
    let py = y + Math.sin((px * 0.01) + t * 1.2 + phase) * amp * 0.25;
    // add localized peaks
    for (const p of peaks) {
      const dx = px - p.x;
      const g = Math.exp(-(dx * dx) / (2 * p.sigma * p.sigma));
      py += Math.sin(t * (p.freq || 6) + (p.phase || 0)) * amp * p.amp * g;
    }
    d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
  }
  return <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />;
}

// A 3D-ish field surface drawn as stacked horizontal wave lines (parallax)
function FieldMesh3D({ baseY = 540, layers = 18, amp = 60, color, peaks = [], perspective = 0.55 }) {
  const t = useTime();
  const lines = [];
  for (let k = 0; k < layers; k++) {
    const depth = k / (layers - 1); // 0 far, 1 near
    const y = baseY + (depth - 0.5) * 600;
    const scale = 0.5 + depth * 0.6;
    const alpha = 0.12 + depth * 0.55;
    const N = 140;
    let d = '';
    for (let i = 0; i <= N; i++) {
      const px = 0 + (i / N) * 1920;
      let offY = Math.sin((px * 0.008) + t * 0.9 + k * 0.4) * amp * 0.3 * scale;
      for (const p of peaks) {
        const dx = px - p.x;
        const g = Math.exp(-(dx * dx) / (2 * p.sigma * p.sigma));
        offY += Math.sin(t * (p.freq || 5) + k * 0.25) * amp * p.amp * g * scale;
      }
      // perspective compression
      const py = y - offY * (1 - perspective * (1 - depth));
      d += (i === 0 ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' ';
    }
    lines.push(<path key={k} d={d} fill="none" stroke={color} strokeWidth={1 + depth * 0.8} opacity={alpha} />);
  }
  return <g>{lines}</g>;
}

// An animated equation that morphs term-by-term
// segments: [{ text, appear: time-in-scene, color? }]
function Equation({ x, y, size = 48, segments, anchor = 'center' }) {
  const ctx = useSprite();
  const t = ctx.localTime;
  const align = anchor === 'center' ? 'center' : anchor === 'right' ? 'right' : 'left';
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: anchor === 'center' ? 'translateX(-50%)' : anchor === 'right' ? 'translateX(-100%)' : '',
      fontFamily: 'var(--font-math)',
      fontStyle: 'italic',
      fontSize: size,
      color: 'var(--canvas-text)',
      whiteSpace: 'pre',
      textAlign: align,
      letterSpacing: '0.01em',
    }}>
      {segments.map((s, i) => {
        const op = t >= s.appear ? Math.min(1, (t - s.appear) / 0.5) : 0;
        return <span key={i} style={{
          opacity: op,
          color: s.color || 'inherit',
          transition: 'none',
          display: 'inline',
        }}>{s.text}</span>;
      })}
    </div>
  );
}

// Box with Beamer-style header
function Block({ x, y, w = 800, variant = 'def', title, children, appear = 0 }) {
  const ctx = useSprite();
  const t = ctx.localTime;
  const op = t >= appear ? Math.min(1, (t - appear) / 0.5) : 0;
  const ty = (1 - op) * 12;
  const colors = {
    def: { hdr: '#1e50a0', body: '#0c1c3c' },
    form: { hdr: '#825000', body: '#2d1a00' },
    ex: { hdr: '#006464', body: '#002022' },
    note: { hdr: '#502a87', body: '#1a0c32' },
  }[variant] || {};
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w,
      opacity: op, transform: `translateY(${ty}px)`,
      borderRadius: 2, overflow: 'hidden',
      fontFamily: 'var(--font-ui)',
    }}>
      <div style={{ background: colors.hdr, color: 'white', padding: '10px 20px', fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{title}</div>
      <div style={{ background: colors.body, color: 'var(--canvas-text)', padding: '18px 22px', fontSize: 22, lineHeight: 1.45 }}>{children}</div>
    </div>
  );
}

// Caption overlay — shows current narration line at bottom
function CaptionOverlay({ captions, enabled }) {
  const t = useTime();
  if (!enabled) return null;
  let current = null;
  for (const c of captions) {
    if (t >= c.start && t < c.end) { current = c; break; }
  }
  const opacity = current ? 1 : 0;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 40,
      textAlign: 'center',
      fontFamily: 'var(--font-ui)', fontSize: 22,
      color: 'white', opacity,
      transition: 'opacity 0.3s',
      pointerEvents: 'none',
      padding: '0 140px',
      textShadow: '0 2px 8px rgba(0,0,0,0.8)',
    }}>
      <div style={{
        display: 'inline-block',
        background: 'rgba(13,17,23,0.75)',
        padding: '12px 24px',
        borderRadius: 6,
        maxWidth: 1400,
        lineHeight: 1.4,
        border: '1px solid rgba(100,160,255,0.18)',
      }}>
        {current?.text || ''}
      </div>
    </div>
  );
}

// Safe-area guides overlay (disabled by default)
function SafeAreaGuides({ enabled }) {
  if (!enabled) return null;
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <rect x="60" y="60" width="1800" height="960" fill="none" stroke="var(--canvas-dim)" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
    </svg>
  );
}

// Narration-sync caption strip at TOP (optional, smaller than overlay)
// Scene counter (bottom-right)
function SceneCounter({ scenes }) {
  const t = useTime();
  let idx = 0;
  for (let i = 0; i < scenes.length; i++) {
    if (t >= scenes[i].start && t < scenes[i].end) { idx = i; break; }
    if (t >= scenes[i].end) idx = i;
  }
  return (
    <div style={{
      position: 'absolute', right: 48, bottom: 36,
      fontFamily: 'var(--font-ui)',
      color: 'var(--canvas-dim)',
      fontSize: 16, letterSpacing: '0.2em', opacity: 0.55,
    }}>
      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
        {String(idx + 1).padStart(2, '0')}
      </span>
      <span style={{ margin: '0 10px' }}>/</span>
      <span>{String(scenes.length).padStart(2, '0')}</span>
    </div>
  );
}

// Corner sigil (top-right)
function SeriesSigil() {
  return (
    <div style={{
      position: 'absolute', top: 48, right: 72, display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: 'var(--font-ui)', color: 'var(--canvas-dim)',
      fontSize: 14, letterSpacing: '0.25em', textTransform: 'uppercase',
      opacity: 0.6,
    }}>
      <span>QFT · Lecture 1</span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3.5" fill="var(--accent)" />
        <line x1="12" y1="12" x2="3" y2="4" stroke="var(--accent)" strokeWidth="1.6" />
        <line x1="12" y1="12" x2="21" y2="4" stroke="var(--accent)" strokeWidth="1.6" />
        <line x1="12" y1="12" x2="12" y2="22" stroke="var(--accent)" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

// timecode label for data-screen-label sync
function TimecodeTagger() {
  const t = useTime();
  React.useEffect(() => {
    const sec = Math.floor(t);
    const root = document.querySelector('[data-screen-label-root]');
    if (root) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      root.setAttribute('data-screen-label', `t=${m}:${String(s).padStart(2, '0')}`);
    }
  }, [Math.floor(t)]);
  return null;
}

Object.assign(window, {
  Scene, SceneLabel, SceneRefs, REFS, fadeIO,
  FieldBackground, FieldSurface, FieldMesh3D,
  Equation, Block, CaptionOverlay, SafeAreaGuides,
  SceneCounter, SeriesSigil, TimecodeTagger,
});
