import { useState, useEffect, useRef } from "react";

const DURATION = 5000;

const PROJECTS = [
  {
    id: 0,
    title: "AI Logic Suggest",
    year: "2024",
    category: "AI · Survey Builder",
    accent: "#F5A623",
    slides: [
      { type: "intro", sub: "Reducing survey logic setup from 45 min to under 5" },
      {
        type: "problem",
        heading: "Logic setup took 45+ minutes for non-technical users",
        decisions: [
          "Natural language over rule-based UI",
          "In-context suggestions, not a separate panel",
          "Progressive disclosure for power users",
        ],
      },
      { type: "wireframe", caption: "Input-to-logic flow exploration" },
      { type: "wireframe", caption: "Suggestion panel — empty / loading / result states" },
      { type: "final", caption: "AI Suggest panel with live rule preview" },
      {
        type: "metrics",
        stats: [
          { v: "60%", l: "Reduction in setup time" },
          { v: "3×", l: "Branching adoption" },
          { v: "4.6/5", l: "Usability score" },
        ],
      },
    ],
  },
  {
    id: 1,
    title: "Tags Coverage Matrix",
    year: "2024",
    category: "Data Viz · Enterprise",
    accent: "#38BDF8",
    slides: [
      { type: "intro", sub: "Tag hygiene at a glance across every survey and question" },
      {
        type: "problem",
        heading: "Zero visibility into which questions were missing tags",
        decisions: [
          "Matrix over list — spatial scanning wins",
          "Progress rings for instant status reads",
          "Inline drawer — no page navigation to edit",
        ],
      },
      { type: "wireframe", caption: "Matrix layout with coverage ring states" },
      { type: "final", caption: "Coverage Matrix with animated progress rings" },
      {
        type: "metrics",
        stats: [
          { v: "80%", l: "Faster tag audits" },
          { v: "2 clicks", l: "To fix any gap" },
          { v: "Zero", l: "Post-launch tickets" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Raise a Dialogue",
    year: "2024",
    category: "Wizard · XM Platform",
    accent: "#A78BFA",
    slides: [
      { type: "intro", sub: "Turning a 7-step ordeal into a 3-phase conversation" },
      {
        type: "problem",
        heading: "7-step wizard causing 40%+ drop-off at step 3",
        decisions: [
          "Collapsed 7 steps into 3 logical phases",
          "Persistent summary panel for orientation",
          "Inline validation — no submit-to-error cycle",
        ],
      },
      { type: "wireframe", caption: "7-step flow vs compressed 3-phase model" },
      { type: "final", caption: "Redesigned wizard with persistent summary sidebar" },
      {
        type: "metrics",
        stats: [
          { v: "42%", l: "Drop-off reduction" },
          { v: "3 phases", l: "Down from 7 steps" },
          { v: "2.1 min", l: "Avg completion time" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Voxco Directory",
    year: "2023",
    category: "Feature Design · SaaS",
    accent: "#34D399",
    slides: [
      { type: "intro", sub: "Derived fields that compute at runtime, not design-time" },
      {
        type: "problem",
        heading: "Analysts needed custom fields but had no dev support",
        decisions: [
          "Formula builder using familiar spreadsheet syntax",
          "Live preview — see result before saving",
          "Scope-aware — fields inherit from parent directory",
        ],
      },
      { type: "wireframe", caption: "Derived field configuration flow" },
      { type: "final", caption: "Formula editor with live preview panel" },
      {
        type: "metrics",
        stats: [
          { v: "0 dev", l: "Support required" },
          { v: "12 min", l: "Avg field setup time" },
          { v: "94%", l: "Task completion rate" },
        ],
      },
    ],
  },
];

const LABEL = { intro: "Overview", problem: "Problem", wireframe: "Wireframe", final: "Final UI", metrics: "Impact" };

function WireframeSVG({ accent }) {
  const uid = "wf" + accent.replace("#", "");
  return (
    <svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <pattern id={uid} width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="760" height="420" fill={`url(#${uid})`} />
      <rect width="760" height="44" fill="rgba(255,255,255,0.04)" />
      <rect x="16" y="13" width="96" height="18" rx="3" fill="rgba(255,255,255,0.09)" />
      <rect x="604" y="13" width="60" height="18" rx="3" fill="rgba(255,255,255,0.05)" />
      <rect x="678" y="13" width="68" height="18" rx="5" fill={accent + "40"} />
      <rect x="0" y="44" width="164" height="376" fill="rgba(255,255,255,0.025)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="12" y={64 + i * 46} width="140" height="28" rx="4"
          fill={i === 2 ? accent + "22" : "rgba(255,255,255,0.04)"} />
      ))}
      <rect x="180" y="60" width="564" height="60" rx="6" fill="rgba(255,255,255,0.04)" />
      <rect x="196" y="75" width="180" height="13" rx="3" fill="rgba(255,255,255,0.09)" />
      <rect x="196" y="96" width="130" height="10" rx="3" fill="rgba(255,255,255,0.055)" />
      <rect x="644" y="70" width="84" height="26" rx="5" fill={accent + "3A"} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={180 + i * 196} y="140" width="180" height="104" rx="6" fill="rgba(255,255,255,0.035)" />
          <rect x={196 + i * 196} y="156" width={56 + i * 10} height="11" rx="3" fill="rgba(255,255,255,0.07)" />
          <rect x={196 + i * 196} y="176" width="96" height="32" rx="4"
            fill={i === 1 ? accent + "18" : "rgba(255,255,255,0.035)"} />
          <rect x={196 + i * 196} y="218" width="68" height="9" rx="3" fill="rgba(255,255,255,0.05)" />
        </g>
      ))}
      <rect x="180" y="264" width="564" height="140" rx="6" fill="rgba(255,255,255,0.035)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="180" y={264 + i * 35} width="564" height="1" fill="rgba(255,255,255,0.04)" />
          <rect x="196" y={272 + i * 35} width={96 + i * 16} height="12" rx="3" fill="rgba(255,255,255,0.065)" />
          <rect x="548" y={270 + i * 35} width="52" height="16" rx="3"
            fill={i === 1 ? accent + "28" : "rgba(255,255,255,0.04)"} />
        </g>
      ))}
    </svg>
  );
}

function FinalUISVG({ accent }) {
  return (
    <svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <rect width="760" height="420" fill="#090910" />
      <rect width="760" height="50" fill="#10101A" />
      <circle cx="26" cy="25" r="10" fill={accent} opacity="0.9" />
      <rect x="48" y="18" width="88" height="14" rx="3" fill="rgba(255,255,255,0.13)" />
      <rect x="446" y="16" width="72" height="18" rx="3" fill="rgba(255,255,255,0.06)" />
      <rect x="530" y="16" width="72" height="18" rx="3" fill="rgba(255,255,255,0.06)" />
      <rect x="624" y="13" width="120" height="24" rx="6" fill={accent} opacity="0.88" />
      <rect x="0" y="50" width="176" height="370" fill="#0C0C14" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="12" y={76 + i * 54} width="152" height="38" rx="6"
            fill={i === 1 ? accent + "1A" : "transparent"}
            stroke={i === 1 ? accent + "35" : "transparent"} strokeWidth="1" />
          <rect x="40" y={88 + i * 54} width={i === 1 ? 84 : 62 + i * 5} height="13" rx="3"
            fill={i === 1 ? accent + "75" : "rgba(255,255,255,0.11)"} />
        </g>
      ))}
      <rect x="192" y="66" width="552" height="50" rx="8" fill="#10101A" />
      <rect x="208" y="79" width="136" height="13" rx="3" fill="rgba(255,255,255,0.13)" />
      <rect x="640" y="75" width="92" height="22" rx="6" fill={accent} opacity="0.82" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={192 + i * 192} y="134" width="176" height="80" rx="8" fill="#10101A" />
          <rect x={208 + i * 192} y="150" width="76" height="11" rx="3" fill="rgba(255,255,255,0.07)" />
          <rect x={208 + i * 192} y="170" width={i === 1 ? 52 : 72} height="26" rx="4"
            fill={accent} opacity={0.42 + i * 0.14} />
          <rect x={208 + i * 192} y="202" width="56" height="8" rx="3" fill="rgba(255,255,255,0.055)" />
        </g>
      ))}
      <rect x="192" y="232" width="360" height="172" rx="8" fill="#10101A" />
      <rect x="208" y="252" width="110" height="13" rx="3" fill="rgba(255,255,255,0.12)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="192" y={278 + i * 31} width="360" height="1" fill="rgba(255,255,255,0.04)" />
          <rect x="208" y={285 + i * 31} width={76 + i * 14} height="12" rx="3" fill="rgba(255,255,255,0.07)" />
          <rect x="496" y={283 + i * 31} width="44" height="16" rx="3"
            fill={i === 1 ? accent + "48" : "rgba(255,255,255,0.05)"} />
        </g>
      ))}
      <rect x="568" y="232" width="176" height="172" rx="8" fill="#10101A"
        stroke={accent + "28"} strokeWidth="1" />
      <rect x="584" y="252" width="110" height="13" rx="3" fill={accent + "60"} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="584" y={282 + i * 36} width={i === 0 ? 144 : 100} height="24" rx="6"
          fill={i === 0 ? accent + "28" : "rgba(255,255,255,0.045)"} />
      ))}
      <rect x="584" y="382" width="148" height="20" rx="6" fill={accent} opacity="0.82" />
    </svg>
  );
}

export default function ProjectShowreel() {
  const [ap, setAp] = useState(0);
  const [as_, setAs] = useState(0);
  const [prog, setProg] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const rafRef = useRef(null);

  const project = PROJECTS[ap];
  const slide = project.slides[as_];
  const accent = project.accent;

  const switchTo = (pi, si) => {
    setAp(pi);
    setAs(si);
    setProg(0);
    setSlideKey((k) => k + 1);
  };

  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    const nSlides = PROJECTS[ap].slides.length;
    const tick = (now) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setProg(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        if (as_ + 1 < nSlides) {
          setAs(as_ + 1);
          setProg(0);
          setSlideKey((k) => k + 1);
        } else {
          const nextAp = (ap + 1) % PROJECTS.length;
          setAp(nextAp);
          setAs(0);
          setProg(0);
          setSlideKey((k) => k + 1);
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [as_, ap, paused]);

  useEffect(() => {
    const handler = (e) => {
      const nSlides = PROJECTS[ap].slides.length;
      if (e.key === "ArrowRight") {
        if (as_ + 1 < nSlides) switchTo(ap, as_ + 1);
        else switchTo((ap + 1) % PROJECTS.length, 0);
      } else if (e.key === "ArrowLeft") {
        if (as_ > 0) switchTo(ap, as_ - 1);
        else {
          const pAp = (ap - 1 + PROJECTS.length) % PROJECTS.length;
          switchTo(pAp, PROJECTS[pAp].slides.length - 1);
        }
      } else if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [ap, as_]);

  const pill = {
    display: "inline-flex", fontSize: 10, letterSpacing: "0.2em",
    textTransform: "uppercase", color: accent, fontWeight: 700,
    fontFamily: "Manrope, sans-serif", background: accent + "18",
    padding: "4px 12px", borderRadius: 20, border: `1px solid ${accent}28`,
  };

  const renderSlide = () => {
    switch (slide.type) {
      case "intro":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "56px 80px" }}>
            <div style={pill}>{project.category}</div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 74, fontWeight: 700, color: "#fff", margin: "28px 0 20px", lineHeight: 1.03, letterSpacing: "-0.025em" }}>
              {project.title}
            </h1>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 19, color: "rgba(255,255,255,0.48)", fontWeight: 300, maxWidth: 520, lineHeight: 1.65, margin: 0 }}>
              {slide.sub}
            </p>
            <div style={{ marginTop: 48, width: 40, height: 1, background: accent, opacity: 0.4 }} />
            <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.22)", letterSpacing: "0.12em", fontFamily: "Manrope, sans-serif" }}>
              {project.year} · Project {ap + 1} of {PROJECTS.length}
            </div>
          </div>
        );

      case "problem":
        return (
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flex: 1, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: accent, fontFamily: "Manrope, sans-serif", fontWeight: 700, marginBottom: 24 }}>
                Problem Space
              </div>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 38, fontWeight: 600, color: "#fff", margin: "0 0 36px", lineHeight: 1.18, letterSpacing: "-0.01em" }}>
                {slide.heading}
              </h2>
              <div style={{ borderLeft: `2px solid ${accent}35`, paddingLeft: 24 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: accent, fontFamily: "Manrope, sans-serif", fontWeight: 700, marginBottom: 18 }}>
                  Key Decisions
                </div>
                {slide.decisions.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                    <span style={{ minWidth: 20, height: 20, borderRadius: "50%", background: accent + "18", border: `1px solid ${accent}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: accent, fontFamily: "Manrope, sans-serif", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.55 }}>
                      {d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: "44%", position: "relative", overflow: "hidden", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
              <WireframeSVG accent={accent} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, #08080D 0%, transparent 40%)` }} />
            </div>
          </div>
        );

      case "wireframe":
        return (
          <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
            {slide.image
              ? <img src={slide.image} alt={slide.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <WireframeSVG accent={accent} />
            }
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,13,0.94) 0%, transparent 52%)" }} />
            <div style={{ position: "absolute", bottom: 36, left: 44 }}>
              <div style={pill}>Wireframe</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.58)", marginTop: 12 }}>
                {slide.caption}
              </div>
            </div>
            {!slide.image && (
              <div style={{ position: "absolute", top: 16, right: 20, fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "Manrope, sans-serif", letterSpacing: "0.12em", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 10 }}>
                Replace with your image via slide.image
              </div>
            )}
          </div>
        );

      case "final":
        return (
          <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
            {slide.image
              ? <img src={slide.image} alt={slide.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <FinalUISVG accent={accent} />
            }
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,13,0.94) 0%, transparent 52%)" }} />
            <div style={{ position: "absolute", bottom: 36, left: 44 }}>
              <div style={pill}>Final UI</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.58)", marginTop: 12 }}>
                {slide.caption}
              </div>
            </div>
            {!slide.image && (
              <div style={{ position: "absolute", top: 16, right: 20, fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "Manrope, sans-serif", letterSpacing: "0.12em", background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 10 }}>
                Replace with your image via slide.image
              </div>
            )}
          </div>
        );

      case "metrics":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "56px 80px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: accent, fontFamily: "Manrope, sans-serif", fontWeight: 700, marginBottom: 64 }}>
              Impact & Outcomes
            </div>
            <div style={{ display: "flex", gap: 72, alignItems: "flex-start", justifyContent: "center" }}>
              {slide.stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center", minWidth: 140 }}>
                  <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 88, fontWeight: 700, color: accent, lineHeight: 1, marginBottom: 16, filter: `drop-shadow(0 0 36px ${accent}45)` }}>
                    {s.v}
                  </div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.42)", fontWeight: 400, maxWidth: 130, margin: "0 auto", lineHeight: 1.6 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#08080D", color: "#fff", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Manrope:wght@300;400;500;600;700&display=swap');
        @keyframes sIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { cursor: pointer; border: none; background: none; color: inherit; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>

      {/* ── Sidebar ── */}
      <div style={{ width: 220, background: "#060609", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "28px 20px 22px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>
            Portfolio
          </div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.88)", fontWeight: 600, marginTop: 6, fontFamily: "Manrope, sans-serif" }}>
            Shoumen Dey
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.24)", marginTop: 3, fontFamily: "Manrope, sans-serif" }}>
            Senior UX Designer
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", paddingTop: 18 }}>
          <div style={{ padding: "0 20px", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", fontFamily: "Manrope, sans-serif", fontWeight: 700, marginBottom: 8 }}>
            Projects
          </div>
          {PROJECTS.map((p, i) => (
            <button key={p.id} onClick={() => switchTo(i, 0)}
              style={{ width: "100%", padding: "11px 20px", textAlign: "left", background: i === ap ? p.accent + "0C" : "transparent", borderLeft: i === ap ? `2px solid ${p.accent}` : "2px solid transparent", transition: "all 0.2s" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: i === ap ? "#fff" : "rgba(255,255,255,0.38)", fontFamily: "Manrope, sans-serif", marginBottom: 2 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 10, color: i === ap ? p.accent + "B0" : "rgba(255,255,255,0.16)", fontFamily: "Manrope, sans-serif" }}>
                {p.category}
              </div>
            </button>
          ))}
        </div>

        <div style={{ padding: "18px 20px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", fontFamily: "Manrope, sans-serif", fontWeight: 700, marginBottom: 12 }}>
            Slides
          </div>
          {project.slides.map((s, i) => (
            <button key={i} onClick={() => switchTo(ap, i)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "5px 0" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: i === as_ ? accent : "rgba(255,255,255,0.25)", flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: i === as_ ? "#fff" : "rgba(255,255,255,0.32)", fontFamily: "Manrope, sans-serif", fontWeight: i === as_ ? 600 : 400, flex: 1 }}>
                {LABEL[s.type]}
              </span>
              {i === as_ && (
                <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 1, maxWidth: 40 }}>
                  <div style={{ height: "100%", background: accent, width: `${prog}%`, transition: "width 0.04s linear", borderRadius: 1 }} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Manrope, sans-serif" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.28)" }}>{project.title}</span>
            <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
            <span style={{ fontSize: 12, color: accent, opacity: 0.85, fontWeight: 600 }}>{LABEL[slide.type]}</span>
            <span style={{ color: "rgba(255,255,255,0.14)" }}>·</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>{as_ + 1} / {project.slides.length}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "Manrope, sans-serif", letterSpacing: "0.08em" }}>
              ← → navigate · space to {paused ? "play" : "pause"}
            </span>
            <button onClick={() => setPaused((p) => !p)}
              style={{ fontSize: 11, color: paused ? accent : "rgba(255,255,255,0.42)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", border: `1px solid ${paused ? accent + "40" : "rgba(255,255,255,0.1)"}`, borderRadius: 20, fontFamily: "Manrope, sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
              {paused ? "▶ Play" : "⏸ Pause"}
            </button>
          </div>
        </div>

        {/* Slide area */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <div key={slideKey} style={{ height: "100%", animation: "sIn 0.38s ease forwards" }}>
            {renderSlide()}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 2, background: "rgba(255,255,255,0.05)", flexShrink: 0 }}>
          <div style={{ height: "100%", background: accent, width: `${prog}%`, transition: "width 0.04s linear" }} />
        </div>
      </div>
    </div>
  );
}
