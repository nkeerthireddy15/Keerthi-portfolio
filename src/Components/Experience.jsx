import { useState, useRef, useEffect } from "react";

const EXPERIENCE = [
  {
    tab: "Vercel",
    role: "Senior Frontend Engineer",
    company: "Vercel Inc.",
    date: "Jan 2023 — Present",
    initial: "V",
    color: "#fff",
    items: [
      "Led the redesign of the dashboard onboarding flow, reducing time-to-first-deploy by 38%.",
      "Built a real-time collaboration layer for the visual editor using WebSockets and CRDTs.",
      "Mentored 4 junior engineers across 2 timezones; established code-review standards adopted team-wide.",
      "Architected a component library shared across 6 internal products with zero breaking changes over 14 months.",
    ],
  },
  {
    tab: "Linear",
    role: "Product Engineer",
    company: "Linear (YC S19)",
    date: "Mar 2021 — Dec 2022",
    initial: "L",
    color: "#5E6AD2",
    items: [
      "Owned the roadmap & cycles feature end-to-end — from RFC to GA in 8 weeks.",
      "Reduced JS bundle size by 42% through aggressive code-splitting and tree-shaking.",
      "Collaborated directly with founders on product direction; shipped 3 major features per quarter.",
      "Introduced visual regression testing that cut UI bugs in production by 60%.",
    ],
  },
  {
    tab: "Stripe",
    role: "UI Engineer",
    company: "Stripe",
    date: "Jun 2019 — Feb 2021",
    initial: "S",
    color: "#635BFF",
    items: [
      "Built Stripe's internal design-token pipeline syncing Figma to production CSS in one command.",
      "Contributed to the public Elements SDK — used by 500k+ merchants globally.",
      "Ran bi-weekly design-eng sync rituals that became a template for the wider org.",
      "Improved Lighthouse scores for the marketing site from 62 → 97.",
    ],
  },
  {
    tab: "Freelance",
    role: "Independent Consultant",
    company: "Self-directed",
    date: "Jan 2018 — May 2019",
    initial: "F",
    color: "#F7B731",
    items: [
      "Delivered high-fidelity web products for 12 clients across fintech, health, and e-commerce.",
      "Designed and shipped a SaaS billing product from 0→1 that reached $40k MRR.",
      "Established long-term retainer relationships with 3 clients, contributing to ongoing product roadmaps.",
    ],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const exp = EXPERIENCE[active];

  const select = (i) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Figtree:wght@300;400;500&display=swap');

        .ex-wrap {
          background: #f5f2ee;
          min-height: 100vh;
          padding: 96px 0 120px;
          font-family: 'Figtree', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* big watermark letter */
        .ex-watermark {
          position: absolute;
          top: 40px;
          right: -40px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 340px;
          font-weight: 600;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(0,0,0,.06);
          pointer-events: none;
          user-select: none;
          transition: opacity .6s ease;
          z-index: 0;
        }

        .ex-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 56px;
          position: relative;
          z-index: 1;
        }

        /* header */
        .ex-eyebrow {
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ex-eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: #999;
        }
        .ex-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 300;
          letter-spacing: -2px;
          line-height: 1;
          color: #111;
          margin-bottom: 72px;
        }
        .ex-heading em {
          font-style: italic;
          font-weight: 600;
        }

        /* body grid */
        .ex-body {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 0;
          align-items: start;
        }
        @media(max-width: 720px) { .ex-body { grid-template-columns: 1fr; } }

        /* ── left tabs ── */
        .ex-tabs {
          padding-right: 48px;
          border-right: 1px solid rgba(0,0,0,.1);
          position: sticky;
          top: 80px;
        }

        .ex-tab {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(0,0,0,.07);
          cursor: pointer;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          text-align: left;
          width: 100%;
          position: relative;
          transition: all .25s ease;
        }

        .ex-tab:first-child { border-top: 1px solid rgba(0,0,0,.07); }

        .ex-tab-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 1.5px solid #bbb;
          flex-shrink: 0;
          transition: all .3s ease;
        }
        .ex-tab.active .ex-tab-dot {
          border-color: var(--tc);
          background: var(--tc);
          box-shadow: 0 0 10px var(--tc);
        }

        .ex-tab-info { flex: 1; }
        .ex-tab-company {
          font-size: 13px;
          font-weight: 500;
          color: #333;
          transition: color .25s;
          display: block;
          line-height: 1.2;
        }
        .ex-tab.active .ex-tab-company { color: #111; }

        .ex-tab-date {
          font-size: 10px;
          letter-spacing: 1px;
          color: #aaa;
          display: block;
          margin-top: 3px;
        }

        .ex-tab-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-weight: 300;
          color: #ccc;
          letter-spacing: 1px;
          transition: color .25s;
        }
        .ex-tab.active .ex-tab-num { color: var(--tc); }

        /* active line on right side of tab panel */
        .ex-tab::after {
          content: '';
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 2px;
          height: 70%;
          background: var(--tc, #111);
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .ex-tab.active::after { transform: translateY(-50%) scaleY(1); }

        /* ── right content ── */
        .ex-content {
          padding-left: 64px;
        }

        @keyframes exReveal {
          from { opacity: 0; transform: translateY(20px); clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; transform: translateY(0);   clip-path: inset(0 0 0% 0); }
        }

        .ex-panel {
          animation: exReveal .45s cubic-bezier(.22,1,.36,1) both;
        }

        .ex-role {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 600;
          color: #111;
          letter-spacing: -1px;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .ex-company-label {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--tc, #888);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .ex-date {
          font-size: 11px;
          letter-spacing: 2px;
          color: #aaa;
          margin-bottom: 40px;
        }

        /* divider */
        .ex-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(0,0,0,.12), transparent);
          margin-bottom: 40px;
        }

        /* bullet items */
        .ex-items { display: flex; flex-direction: column; gap: 0; }

        .ex-item {
          display: grid;
          grid-template-columns: 20px 1fr;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(0,0,0,.06);
          opacity: 0;
          animation: exReveal .5s cubic-bezier(.22,1,.36,1) both;
        }

        .ex-item:last-child { border-bottom: none; }

        .ex-item-idx {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          color: #ccc;
          margin-top: 3px;
          font-weight: 300;
        }

        .ex-item-text {
          font-size: 14px;
          line-height: 1.8;
          color: #555;
          font-weight: 300;
        }

        .ex-item-text strong {
          color: #111;
          font-weight: 500;
        }
      `}</style>

      <div className="ex-wrap">
        {/* floating watermark */}
        <div className="ex-watermark" style={{ color: "transparent" }}>
          {exp.initial}
        </div>

        <div className="ex-inner">
          {/* header */}
          <p className="ex-eyebrow">04 — Experience</p>
          <h2 className="ex-heading">
            Where I've <em>worked</em>
          </h2>

          <div className="ex-body">
            {/* tabs */}
            <div className="ex-tabs">
              {EXPERIENCE.map((e, i) => (
                <button
                  key={i}
                  className={`ex-tab${active === i ? " active" : ""}`}
                  style={{ "--tc": e.color }}
                  onClick={() => select(i)}
                >
                  <div className="ex-tab-dot" />
                  <div className="ex-tab-info">
                    <span className="ex-tab-company">{e.tab}</span>
                    <span className="ex-tab-date">{e.date}</span>
                  </div>
                  <span className="ex-tab-num">0{i + 1}</span>
                </button>
              ))}
            </div>

            {/* content */}
            <div className="ex-content">
              <div
                className="ex-panel"
                key={animKey}
                style={{ "--tc": exp.color }}
              >
                <div className="ex-role">{exp.role}</div>
                <div className="ex-company-label">{exp.company}</div>
                <div className="ex-date">{exp.date}</div>
                <div className="ex-divider" />
                <div className="ex-items">
                  {exp.items.map((item, i) => (
                    <div
                      key={i}
                      className="ex-item"
                      style={{ animationDelay: `${0.08 + i * 0.07}s` }}
                    >
                      <span className="ex-item-idx">0{i + 1}</span>
                      <p className="ex-item-text">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
