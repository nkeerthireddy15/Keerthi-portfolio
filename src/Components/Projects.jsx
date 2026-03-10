import { useState, useRef, useEffect } from "react";
import sharoff from "../assets/ss-p.png";
import osi from "../assets/osi-p.png";
import grabit from "../assets/grabit-p.png";
import axio from "../assets/axio-p.png";
import skibo from "../assets/skibboo-p.png";

const PROJECTS = [
  {
    num: "01",
    title: "Skibboo",
    tag: "Skibboo - Discover & Plan the Perfect Playdate for Kids and Teens!",
    year: "2024",
    desc: "Skibboo is India’s first parent-first kids playdate app that helps you discover, plan, and join safe neighborhood playdates and studydates combining kids’ social growth with academic value, all in one trusted community.",
    stack: ["ReactNative", "Node.js", "tailwind CSS", "javascript", "MongoDb"],
    color: "#22c55e",
    live: "https://play.google.com/store/apps/details?id=com.skibboo&hl=en_IN",
    img: skibo,
  },
  {
    num: "02",
    title: "Axios Stat",
    tag: "Bharat ka bandage",
    year: "2026",
    desc: "Axio Biosolutions is a global medical technology company delivering advanced hemostatic wound care solutions for emergency, surgical, and trauma care.",
    stack: ["React.Js", "javascript", "Tailwind CSS", "Node.Js", "MongoDb"],
    color: "#22c55e",
    live: "https://axiobio.com/",
    img: axio,
  },
  {
    num: "03",
    title: "Grabit Customer",
    tag: "",
    year: "2024",
    desc: "Welcome to GrabIt, the ultimate app for ordering a variety of products and getting them delivered straight to your door! Whether it’s groceries, essentials, or anything in between, we ensure a fast and reliable delivery experience.",
    stack: ["ReactNative", "Node.js", "tailwind CSS", "javascript", "MongoDb"],
    color: "#22c55e",
    live: "https://play.google.com/store/apps/details?id=com.grabitcustomer",
    img: grabit,
  },
  {
    num: "04",
    title: "OSI India",
    tag: "",
    year: "2024",
    desc: "A non-profit professional association promoting evidence-based implantology practices calibrated to international standards.",
    stack: ["React.Js", "javascript", "Tailwind CSS", "Node.Js", "MongoDb"],
    color: "#22c55e",
    live: "https://osindia.org/",
    img: osi,
  },
  {
    num: "05",
    title: "Sharoff Steel",
    tag: "Future Of Construction",
    year: "2023",
    desc: "A responsive corporate website built to showcase Sharoff Steel’s products, services, and company profile with a clean design and smooth user experience.",
    stack: ["React.Js", "javascript", "Tailwind CSS", "Node.Js", "MongoDb"],
    color: "#22c55e",
    live: "https://sharoffsteel.com/",
    img: sharoff,
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
          max-width: 580px;
        }
.ps-card-image{
width:100%;
height:220px;
border-radius:6px;
overflow:hidden;
margin-bottom:24px;
border:1px solid rgba(255,255,255,.08);
box-shadow:0 20px 60px rgba(0,0,0,.4);
}

.ps-card-image img{
width:100%;
height:100%;
object-fit:cover;
transition:transform .6s;
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
          display:inline-flex;
width:fit-content;
          padding: 7px 16px;
          border: 1px solid rgba(255,255,255,.1);
          transition: all .2s;
          
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
              <div className="flex items-center justify-between">
                <h3 className="ps-card-title text-base">{proj.title}</h3>

                <a
                  href={proj.live}
                  target="_blank"
                  className="ps-card-link filled"
                >
                  Live ↗
                </a>
              </div>
              <p className="ps-card-desc text-lg">{proj.desc}</p>

              <div className="ps-card-image">
                <img src={proj.img} alt={proj.title} />
              </div>
              <div className="ps-card-stack">
                {proj.stack.map((s) => (
                  <span key={s} className="ps-card-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
