import { useState, useRef, useEffect } from "react";

const PROJECTS = [
  {
    num: "01",
    title: "Nexus Design System",
    tag: "Design Infrastructure",
    year: "2024",
    desc: "Token-driven system at scale. 80+ components, dark/light, Figma ↔ code sync.",
    stack: ["React", "TypeScript", "Storybook"],
    color: "#22c55e",
  },
  {
    num: "02",
    title: "Orbit Analytics",
    tag: "Data Visualisation",
    year: "2024",
    desc: "Real-time dashboard. D3 charts, 60fps canvas rendering for million-row datasets.",
    stack: ["D3.js", "WebGL", "Postgres"],
    color: "#22c55e",
  },
  {
    num: "03",
    title: "Flux CMS",
    tag: "Content Platform",
    year: "2023",
    desc: "Headless CMS with live collaborative editor and structured content API.",
    stack: ["Next.js", "tRPC", "Redis"],
    color: "#22c55e",
  },
  {
    num: "04",
    title: "Cipher Auth",
    tag: "Security SDK",
    year: "2023",
    desc: "Passkey-first auth SDK. Drop-in React components and a zero-dep vanilla core.",
    stack: ["WebAuthn", "Hono", "Workers"],
    color: "#22c55e",
  },
  {
    num: "05",
    title: "Pulse Notify",
    tag: "Infrastructure",
    year: "2023",
    desc: "Multi-channel notification infra. Email, SMS, push and webhooks in one API.",
    stack: ["Go", "Kafka", "gRPC"],
    color: "#22c55e",
  },
];

export default function App() {
  const [active, setActive] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const tickerRef = useRef(null);

  const proj = PROJECTS[active];

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 12, y: -x * 12 });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // infinite ticker
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let x = 0;
    const speed = 0.4;
    let raf;
    const tick = () => {
      x -= speed;
      if (x < -el.scrollWidth / 2) x = 0;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }

        .ps { 
         
          min-height: 100vh; 
          font-family: 'Space Mono', monospace;
          padding: 60px 0 80px;
          overflow: hidden;
          position: relative;
        }

        /* noise texture */
        .ps::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
        }

        /* ticker strip */
        .ticker-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,.08);
          border-bottom: 1px solid rgba(255,255,255,.08);
          padding: 10px 0;
          margin-bottom: 64px;
          background: rgba(255,255,255,.02);
        }
        .ticker-inner {
          display: flex;
          white-space: nowrap;
          gap: 0;
          will-change: transform;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 0 32px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: 3px;
          color: rgba(255,255,255,.18);
        }
        .ticker-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: currentColor;
          opacity: .5;
        }

        /* header */
        .ps-head {
          padding: 0 60px;
          margin-bottom: 56px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }
        .ps-label {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
          margin-bottom: 8px;
        }
        .ps-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 9vw, 120px);
          letter-spacing: -1px;
          line-height: .9;
          color: #fff;
          text-transform: uppercase;
        }
        .ps-title span {
          -webkit-text-stroke: 1.5px rgba(255,255,255,.25);
          color: transparent;
        }
        .ps-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          color: rgba(255,255,255,.2);
          text-align: right;
        }

        /* layout */
        .ps-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          padding: 0 60px;
          border-top: 1px solid rgba(255,255,255,.06);
          border-bottom: 1px solid rgba(255,255,255,.06);
          min-height: 520px;
        }
        @media(max-width:800px){ .ps-body{grid-template-columns:1fr;} }

        /* left: project list */
        .ps-list {
          background: #0a0a0a;
          padding: 0;
        }
        .ps-item {
          display: flex;
          align-items: stretch;
          border-bottom: 1px solid rgba(255,255,255,.06);
          cursor: pointer;
          position: relative;
          transition: background .2s;
          overflow: hidden;
        }
        .ps-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--c, #C8FF00);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .3s cubic-bezier(.16,1,.3,1);
          opacity: .05;
        }
        .ps-item.active::before, .ps-item:hover::before { transform: scaleX(1); }

        .ps-item-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255,255,255,.2);
          padding: 24px 20px;
          border-right: 1px solid rgba(255,255,255,.06);
          min-width: 56px;
          display: flex;
          align-items: center;
          transition: color .2s;
        }
        .ps-item.active .ps-item-num { color: var(--c, #C8FF00); }

        .ps-item-body { 
          padding: 22px 24px; 
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ps-item-tag {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,.25);
          transition: color .2s;
        }
        .ps-item.active .ps-item-tag { color: var(--c, #C8FF00); opacity: .7; }

        .ps-item-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: .5px;
          color: rgba(255,255,255,.5);
          transition: color .2s;
          text-transform: uppercase;
        }
        .ps-item.active .ps-item-name, .ps-item:hover .ps-item-name { color: #fff; }

        .ps-item-arrow {
          padding: 24px 20px;
          display: flex;
          align-items: center;
          color: rgba(255,255,255,.1);
          transition: color .3s, transform .3s;
          font-size: 18px;
        }
        .ps-item.active .ps-item-arrow, .ps-item:hover .ps-item-arrow {
          color: var(--c, #C8FF00);
          transform: translateX(4px);
        }

        /* right: detail card */
        .ps-detail {
          background: #0e0e0e;
          padding: 0;
          display: flex;
          flex-direction: column;
          perspective: 1000px;
        }

        .ps-card {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: transform .15s ease;
          transform-style: preserve-3d;
          will-change: transform;
          position: relative;
          overflow: hidden;
        }

        /* spotlight follow */
        .ps-spotlight {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, var(--c) 0%, transparent 70%);
          opacity: .06;
          transform: translate(-50%, -50%);
          transition: opacity .3s;
        }

        .ps-card-big-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 140px;
          line-height: 1;
          letter-spacing: -4px;
          -webkit-text-stroke: 1px rgba(255,255,255,.06);
          color: transparent;
          position: absolute;
          top: -10px;
          right: 24px;
          pointer-events: none;
          user-select: none;
        }

        .ps-card-tag {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--c, #C8FF00);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .ps-card-tag::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--c, #C8FF00);
          opacity: .2;
          max-width: 60px;
        }

        .ps-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 4vw, 52px);
          letter-spacing: -.5px;
          color: #fff;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .ps-card-desc {
          font-size: 14px;
          line-height: 1.9;
          color: rgba(255,255,255,.6);
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          max-width: 380px;
        }

        .ps-card-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          flex: 1;
          align-content: flex-start;
        }
        .ps-card-chip {
          font-size: 12px;
          letter-spacing: 1.5px;
          padding: 5px 12px;
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.6);
          text-transform: uppercase;
          transition: border-color .2s, color .2s;
        }
        .ps-card:hover .ps-card-chip {
          border-color: var(--c, #C8FF00);
          color: var(--c, #C8FF00);
          opacity: .7;
        }

        .ps-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,.06);
          padding-top: 20px;
          position: relative;
          z-index: 1;
        }
        .ps-card-year {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          color: rgba(255,255,255,.2);
        }
        .ps-card-links {
          display: flex;
          gap: 16px;
        }
        .ps-card-link {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
          text-decoration: none;
          padding: 7px 16px;
          border: 1px solid rgba(255,255,255,.1);
          transition: all .2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ps-card-link:hover {
          border-color: var(--c, #C8FF00);
          color: var(--c, #C8FF00);
        }
        .ps-card-link.filled {
          background: var(--c, #C8FF00);
          border-color: var(--c, #C8FF00);
          color: #000;
        }
        .ps-card-link.filled:hover { opacity: .85; }

        /* bottom counter bar */
        .ps-progress {
          padding: 0 60px;
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .ps-prog-bar {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,.06);
          position: relative;
          overflow: hidden;
        }
        .ps-prog-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          background: var(--c, #C8FF00);
          transition: width .4s cubic-bezier(.16,1,.3,1), background .4s;
        }
        .ps-prog-label {
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,.2);
          font-family: 'Bebas Neue', sans-serif;
          min-width: 60px;
        }

        /* entrance anim */
        @keyframes slideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .slide-in { animation: slideIn .4s cubic-bezier(.16,1,.3,1) both; }
      `}</style>

      <div className="ps" style={{ "--c": proj.color }}>
        {/* ticker */}
        <div className="ticker-wrap">
          <div className="ticker-inner" ref={tickerRef}>
            {[...Array(3)]
              .fill(PROJECTS)
              .flat()
              .map((p, i) => (
                <span key={i} className="ticker-item">
                  {p.title}
                  <span className="ticker-dot" />
                  {p.tag}
                  <span className="ticker-dot" />
                </span>
              ))}
          </div>
        </div>

        {/* header */}
        <div className="ps-head">
          <div>
            <p className="ps-label">03 — Selected work</p>
            <h2 className="ps-title">
              Pro<span>jects</span>
            </h2>
          </div>
          <div className="ps-count">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </div>
        </div>

        {/* main body */}
        <div className="ps-body">
          {/* left list */}
          <div className="ps-list">
            {PROJECTS.map((p, i) => (
              <div
                key={p.num}
                className={`ps-item${active === i ? " active" : ""}`}
                style={{ "--c": p.color }}
                onClick={() => setActive(i)}
              >
                <div className="ps-item-num">{p.num}</div>
                <div className="ps-item-body">
                  <div className="ps-item-tag">{p.tag}</div>
                  <div className="ps-item-name">{p.title}</div>
                </div>
                <div className="ps-item-arrow">→</div>
              </div>
            ))}
          </div>

          {/* right detail */}
          <div className="ps-detail">
            <div
              className="ps-card slide-in"
              key={active}
              ref={cardRef}
              style={{
                "--c": proj.color,
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* spotlight */}
              <div
                className="ps-spotlight"
                style={{ left: mousePos.x, top: mousePos.y, "--c": proj.color }}
              />

              <div className="ps-card-big-num">{proj.num}</div>
              <div className="ps-card-tag">{proj.tag}</div>
              <h3 className="ps-card-title text-base">{proj.title}</h3>
              <p className="ps-card-desc text-lg">{proj.desc}</p>
              <div className="ps-card-stack">
                {proj.stack.map((s) => (
                  <span key={s} className="ps-card-chip">
                    {s}
                  </span>
                ))}
              </div>
              <div className="ps-card-footer">
                <span className="ps-card-year">{proj.year}</span>
                <div className="ps-card-links">
                  <a href="#" className="ps-card-link">
                    GitHub ↗
                  </a>
                  <a href="#" className="ps-card-link filled">
                    Live ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* progress bar */}
        {/* <div className="ps-progress">
          <span className="ps-prog-label">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <div className="ps-prog-bar">
            <div
              className="ps-prog-fill"
              style={{
                width: `${((active + 1) / PROJECTS.length) * 100}%`,
                background: proj.color,
              }}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
