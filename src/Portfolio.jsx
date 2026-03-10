import { useState, useEffect, useRef } from "react";
import Projects from "./Components/Projects";

/* ═══════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap');

  :root {

  --accent: #22c55e;
  --accent-soft: rgba(34,197,94,0.15);
  --accent-glow: rgba(34,197,94,0.35);

  --bg: #0b0b0f;
  --surface: #13131a;
  --surface-2: #1a1a22;

  --border: rgba(255,255,255,0.08);

  --heading: #ffffff;
  --text: #d4d4dc;
  --muted: #9a9aa5;

}

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  {
      background: var(--bg); color: #e0e0ee;
      font-family: 'DM Mono', monospace;
      overflow-x: hidden; cursor: none;
    }
h1,h2,h3 {
  letter-spacing:-0.02em;
}
  .section-title {
  font-weight:700;
  line-height:1.1;
}
.project-glow {
  transition: transform .3s ease, box-shadow .3s ease;
}

.project-glow:hover {
  transform: translateY(-6px);
  box-shadow:
    0 12px 40px rgba(0,0,0,0.45),
    0 0 0 1px rgba(34,197,94,0.15),
    0 0 30px rgba(34,197,94,0.12);
}

   #p-cursor {
  width:10px;
  height:10px;
  background:var(--accent);
  border-radius:50%;
  position:fixed;
  pointer-events:none;
  z-index:9999;
  transform:translate(-50%,-50%);
  mix-blend-mode:difference;
  transition:transform .15s ease;
}
    #p-cursor-ring {
      width:36px; height:36px; border:1px solid rgba(0,229,200,.4); border-radius:50%;
      position:fixed; pointer-events:none; z-index:9998;
      transform:translate(-50%,-50%); transition:width .25s, height .25s;
    }

    .p-grid-bg {
      position:fixed; inset:0; pointer-events:none; z-index:0;
      background-image:
        linear-gradient(rgba(0,229,200,.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,229,200,.022) 1px, transparent 1px);
      background-size:60px 60px;
    }

    .p-orb-1 {
      position:fixed; width:600px; height:600px; background:var(--accent);
      border-radius:50%; filter:blur(130px); opacity:.09;
      top:-200px; right:-200px; pointer-events:none; z-index:0;
      animation:orbF1 20s ease-in-out infinite;
    }
    .p-orb-2 {
      position:fixed; width:500px; height:500px; background:var(--accent2);
      border-radius:50%; filter:blur(130px); opacity:.09;
      bottom:-150px; left:-150px; pointer-events:none; z-index:0;
      animation:orbF2 25s ease-in-out infinite;
    }
      .hero-light {
  position:absolute;
  width:800px;
  height:800px;
  background: radial-gradient(circle at center,
    rgba(34,197,94,0.25),
    transparent 70%);
  filter: blur(120px);
  top:-250px;
  left:-250px;
  pointer-events:none;
  z-index:0;
}
    @keyframes orbF1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-55px,55px)} }
    @keyframes orbF2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(55px,-40px)} }

    /* Font helpers */
    .font-syne    { font-family:'Syne',sans-serif !important; }
    .font-dm-mono { font-family:'DM Mono',monospace !important; }
    .font-serif-i { font-family:'Instrument Serif',serif !important; font-style:italic !important; }

    /* Keyframes */
    @keyframes slideUp  { from{transform:translateY(110%);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes pulseD   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }
    @keyframes mScroll  { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    /* Hero line animation */
    .p-hl      { display:block; overflow:hidden; }
    .p-hl span { display:block; animation:slideUp .85s cubic-bezier(.16,1,.3,1) both; }
    .p-hl:nth-child(1) span { animation-delay:.05s; }
    .p-hl:nth-child(2) span { animation-delay:.20s; }
    .p-hl:nth-child(3) span { animation-delay:.35s; }

    .p-f1 { animation:fadeInUp .9s .55s both; }
    .p-f2 { animation:fadeInUp .9s .72s both; }
    .p-f3 { animation:fadeInUp .9s .90s both; }
    .p-f4 { animation:fadeInUp .9s .28s both; }

    .p-tcursor { display:inline-block;width:2px;height:14px;background:var(--accent);vertical-align:middle;animation:blink 1s infinite; }
    .p-pdot    { width:7px;height:7px;flex-shrink:0;background:var(--accent);border-radius:50%;animation:pulseD 2s ease-in-out infinite; }
    .p-mtrack  { display:flex;gap:56px;white-space:nowrap;width:max-content;animation:mScroll 28s linear infinite; }

    /* Scroll reveal */
.p-rv {
  opacity:0;
  transform:translateY(40px) scale(.98);
  transition:
    opacity .9s cubic-bezier(.16,1,.3,1),
    transform .9s cubic-bezier(.16,1,.3,1);
}

.p-rv.vis {
  opacity:1;
  transform:translateY(0) scale(1);
}    .p-rv.vis { opacity:1;transform:translateY(0); }
    .p-rv-d2  { transition-delay:.2s; }

    /* Nav underline */
    .p-nl        { position:relative; }
    .p-nl::after { content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--accent);transition:width .3s; }
    .p-nl:hover::after,.p-nl.act::after { width:100%; }

    /* Project card top bar */
    .p-pc         { position:relative; overflow:hidden; }
    .p-pc::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),transparent);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.16,1,.3,1); }
    .p-pc:hover::before { transform:scaleX(1); }

    /* About card */
    .p-ac       { transition:border-color .2s, transform .2s !important; }
    .p-ac:hover { transform:translateX(8px) !important; border-color:rgba(0,229,200,.35) !important; }

    /* Skill tag */
    .p-st       { transition:border-color .2s,color .2s,background .2s; }
    .p-st:hover { border-color:rgba(0,229,200,.5) !important;color:var(--accent) !important;background:rgba(0,229,200,.06) !important; }

    /* Social link */
    .p-sl       { transition:border-color .2s,background .2s,color .2s !important; }
    .p-sl:hover { border-color:rgba(0,229,200,.4) !important;background:rgba(0,229,200,.03) !important;color:var(--accent) !important; }
    .p-sarr     { transition:transform .2s,color .2s; }
    .p-sl:hover .p-sarr { transform:translate(4px,-4px); color:var(--accent); }

    /* Syntax colors */
    .ck  { color:#ff6b9d; }
    .cfn { color:#79b8ff; }
    .cs  { color:#9ecbff; }
    .ccl { color:var(--accent); }
    .cp  { color:#b392f0; }
    .cc  { color:var(--muted); font-style:italic; }
    .cn  { color:var(--accent2); }

    /* Input focus */
    .p-inp:focus { outline:none; border-color:var(--accent) !important; }

    /* ── Experience tabs — fixed: no border shorthand conflict ── */
    .exp-tab {
      background: transparent;
      border-top: none;
      border-right: none;
      border-bottom: none;
      border-left: 2px solid var(--border);
      color: var(--muted);
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: .5px;
      padding: 14px 20px;
      text-align: left;
      white-space: nowrap;
      cursor: pointer;
      transition: background .2s, border-left-color .2s, color .2s;
      width: 100%;
      flex-shrink: 0;
      display: block;
    }
    .exp-tab:hover  { color:#e0e0ee; border-left-color:rgba(0,229,200,.35); }
    .exp-tab.active { color:var(--accent); border-left-color:var(--accent); background:rgba(0,229,200,.05); }

    @media(max-width:768px){
      .p-hide-mobile { display:none !important; }
      .p-nav-links   { display:none !important; }
      .exp-tab {
        border-left: none;
        border-bottom: 2px solid var(--border);
        width: auto;
      }
      .exp-tab.active { border-bottom-color:var(--accent); background:transparent; }
    }
  `}</style>
);

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const MARQUEE_ITEMS = [
  "MongoDB",
  "Express.js",
  "React",
  "Node.js",
  "Tailwind CSS",
  "REST APIs",
  "JWT Auth",
  "Redux",
  "Docker",
  "Git",
  "TypeScript",
  "Next.js",
];

const SKILLS = [
  {
    label: "Frontend",
    tags: [
      ["React.js", 1],
      ["Tailwind CSS", 1],
      ["HTML5 / CSS3", 0],
      ["Redux Toolkit", 0],
      ["React Router", 0],
      ["React Query", 0],
      ["Framer Motion", 0],
      ["Vite", 0],
      ["Next.js", 0],
    ],
  },
  {
    label: "Backend",
    tags: [
      ["Node.js", 1],
      ["Express.js", 1],
      ["REST APIs", 0],
      ["GraphQL", 0],
      ["JWT Auth", 0],
      ["WebSockets", 0],
      ["Bcrypt", 0],
      ["Multer", 0],
      ["Middlewares", 0],
    ],
  },
  {
    label: "Database",
    tags: [
      ["MongoDB", 1],
      ["Mongoose", 1],
      ["Aggregation", 0],
      ["Indexing", 0],
      ["PostgreSQL", 0],
      ["Redis", 0],
      ["Firebase", 0],
      ["Cloudinary", 0],
    ],
  },
  {
    label: "Tools & DevOps",
    tags: [
      ["Git / GitHub", 1],
      ["Docker", 0],
      ["AWS S3", 0],
      ["Vercel", 0],
      ["Render", 0],
      ["Postman", 0],
      ["VS Code", 0],
      ["Linux CLI", 0],
      ["CI/CD", 0],
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    featured: true,
    icon: "{ }",
    title: "E-Commerce Platform",
    desc: "Full-stack marketplace with product listings, cart, Stripe payment integration, admin dashboard, and real-time order tracking. Built with MERN stack, deployed on AWS.",
    stack: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Tailwind"],
  },
  {
    num: "02",
    featured: false,
    icon: "◈",
    title: "Real-Time Chat App",
    desc: "WebSocket-powered messaging with rooms, file sharing, and online presence indicators.",
    stack: ["Socket.io", "React", "Express", "MongoDB"],
  },
  {
    num: "03",
    featured: false,
    icon: "▦",
    title: "Task Management SaaS",
    desc: "Collaborative kanban boards, drag-and-drop, team workspaces and analytics dashboard.",
    stack: ["React", "DnD Kit", "Node", "JWT"],
  },
  {
    num: "04",
    featured: false,
    icon: "⬡",
    title: "Blog CMS Platform",
    desc: "Full-featured content platform with rich text editor, image uploads, and SEO optimisation.",
    stack: ["Next.js", "MongoDB", "Cloudinary", "MDX"],
  },
  {
    num: "05",
    featured: false,
    icon: "⊛",
    title: "Dev Job Board",
    desc: "Job listing platform with filters, bookmarks, email alerts, and recruiter dashboards.",
    stack: ["React", "Express", "Nodemailer", "Redis"],
  },
];

const EXPERIENCE = [
  {
    tab: "Adze Studio",
    role: "Full-Stack Developer",
    company: "Adze Studio",
    date: "Jan 2024 — Present · Full-time",
    items: [
      "Designed modular backend APIs and optimized MongoDB queries using indexes and aggregations, reducing response time by 40%.",
      "Implemented location-based outlet filtering (like Swiggy/Zomato), increasing order accuracy for users.",
      "Built real-time delivery tracking with Google Maps + Directions API.",
      "Integrated Stripe, Paypal and Razorpay payments, saved cards",
      "uilt a 60-second order acceptance timer with preserved state, reducing false order timeouts by 100%.",
      "mplemented advanced FCM push notifications with auto navigation.",
      "Improved Core Web Vitals (LCP, FCP, TBT), boosting site performance by 30% and SEO ranking visibility.",
      "Integrated WhatsApp (Commbirds API) for OTP and messaging.",
      "anaged website deployments on DigitalOcean using NGINX, PM2, and streamlined CI/CD pipelines.",
    ],
  },
];

/* ═══════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════ */
const useReveal = (ref) => {
  useEffect(() => {
    if (!ref?.current) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("vis"),
        ),
      { threshold: 0.08 },
    );
    ref.current.querySelectorAll(".p-rv").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const go = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ═══════════════════════════════════════════════
   CURSOR
═══════════════════════════════════════════════ */
const Cursor = () => {
  const cRef = useRef(null);
  const rRef = useRef(null);
  const pos = useRef({ cx: 0, cy: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current.cx = e.clientX;
      pos.current.cy = e.clientY;
      if (cRef.current) {
        cRef.current.style.left = e.clientX + "px";
        cRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", onMove);
    let raf;
    const loop = () => {
      const p = pos.current;
      p.rx += (p.cx - p.rx) * 0.13;
      p.ry += (p.cy - p.ry) * 0.13;
      if (rRef.current) {
        rRef.current.style.left = p.rx + "px";
        rRef.current.style.top = p.ry + "px";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="p-cursor" ref={cRef} />
      <div id="p-cursor-ring" ref={rRef} />
    </>
  );
};

/* ═══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */
const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let cur = "";
      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 transition-all duration-300"
      style={{
        height: "64px",
        background: scrolled ? "rgba(6,6,8,.9)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <span
        className="font-syne font-extrabold text-lg tracking-tight"
        style={{ color: "var(-heading)" }}
      >
        Keerthi Reddy<span style={{ color: "var(-accent)" }}>.</span>portfolio
      </span>

      <ul
        className="p-nav-links hidden md:flex items-center gap-8"
        style={{ listStyle: "none" }}
      >
        {["about", "skills", "projects", "experience", "contact"].map((s) => (
          <li key={s}>
            <button
              onClick={() => go(s)}
              className={`p-nl font-dm-mono text-[11px] tracking-[1.5px] uppercase bg-transparent border-none cursor-pointer transition-colors duration-200${active === s ? " act" : ""}`}
              style={{ color: active === s ? "var(--accent)" : "var(--muted)" }}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => go("contact")}
        className="font-dm-mono text-[11px] tracking-widest uppercase px-5 py-2 cursor-pointer transition-all duration-200"
        style={{
          border: "1px solid var(--accent)",
          color: "var(--accent)",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--accent)";
          e.currentTarget.style.color = "#000";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--accent)";
        }}
      >
        Hire Me
      </button>
    </nav>
  );
};

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
const HeroSection = () => (
  <section
    id="hero"
    className="relative z-10 flex items-center min-h-screen pt-16 overflow-hidden"
  >
    <div className="px-10 w-full">
      {/* <div className="hero-light" /> */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="col-span-3">
          {/* Availability Badge */}
          <div
            className="inline-flex items-center gap-2 font-dm-mono text-[11px] tracking-[2px] uppercase px-4 py-1.5 mb-7"
            style={{
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,.02)",
              color: "var(--muted)",
            }}
          >
            <span className="p-pdot" /> Open to Full-Time & Freelance
            Opportunities
          </div>

          {/* MAIN HEADING */}
          <h1
            className="font-syne font-bold   mb-5"
            style={{
              fontSize: "clamp(48px,6vw,78px)",
              color: "var(--heading)",
            }}
          >
            <span className="p-hl text-4xl">
              <span>
                Building{" "}
                <em className="font-serif-i" style={{ color: "var(--accent)" }}>
                  Mobile & Web
                </em>
              </span>
            </span>

            <span className="p-hl text-4xl leading-loose">
              <span>Experiences</span>
            </span>

            <span className="p-hl text-[40px] md:text-4xl">
              <span>with MERN & React Native</span>
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className="p-f1 font-dm-mono text-base leading-relaxed max-w-2xl mt-6 mb-10"
            style={{ color: "var(--muted)" }}
          >
            Hi, I'm <strong style={{ color: "#ffffff" }}>Keerthi Reddy</strong>{" "}
            — a full-stack developer building modern web platforms and
            cross-platform mobile apps using <strong>MERN Stack</strong> and{" "}
            <strong>React Native</strong>. I focus on scalable architecture,
            performance optimization, and creating seamless user experiences.
          </p>

          {/* TECH STACK BADGES */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              "React",
              "Node.js",
              "MongoDB",
              "React Native",
              "Tailwind",
              "Express",
            ].map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-3 py-1 rounded-full font-dm-mono"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted)",
                  background: "rgba(255,255,255,.02)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="p-f2 flex flex-wrap gap-4">
            <button
              onClick={() => go("projects")}
              className="font-dm-mono text-[11px] font-medium tracking-widest uppercase px-8 py-3.5 cursor-pointer transition-all duration-200"
              style={{
                background: "var(--accent)",
                color: "#000",
                border: "none",
              }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 28px rgba(0,229,200,.3)",
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "none",
                  boxShadow: "none",
                })
              }
            >
              View Projects →
            </button>

            <button
              onClick={() => go("contact")}
              className="font-dm-mono text-[11px] tracking-widest uppercase px-8 py-3.5 cursor-pointer transition-all duration-200"
              style={{
                border: "1px solid var(--border)",
                color: "#e0e0ee",
                background: "transparent",
              }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, {
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                })
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  borderColor: "var(--border)",
                  color: "#e0e0ee",
                })
              }
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* RIGHT SIDE CODE BLOCK */}
        <div
          className="p-f4 p-hide-mobile col-span-2"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 0 80px rgba(0,229,200,.05)",
          }}
        >
          {/* Code header */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              borderBottom: "1px solid var(--border)",
              background: "rgba(255,255,255,.02)",
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />

            <span
              className="font-dm-mono text-[11px] ml-auto"
              style={{ color: "var(--muted)" }}
            >
              developer.config.js
            </span>
          </div>

          {/* Code content */}
          <div className="p-6 font-dm-mono text-[13px] leading-[1.9]">
            <div>
              <span className="ck">const</span>{" "}
              <span className="cfn">developer</span> = {"{"}
            </div>

            <div style={{ paddingLeft: 20 }}>
              <span className="cp">name</span>:{" "}
              <span className="cs">"Keerthi Reddy"</span>,
            </div>

            <div style={{ paddingLeft: 20 }}>
              <span className="cp">role</span>:{" "}
              <span className="cs">"Full-Stack & Mobile Developer"</span>,
            </div>

            <div style={{ paddingLeft: 20 }}>
              <span className="cp">stack</span>: [
            </div>

            <div style={{ paddingLeft: 40 }}>
              <span className="cs">"React"</span>,{" "}
              <span className="cs">"Node.js"</span>,
            </div>

            <div style={{ paddingLeft: 40 }}>
              <span className="cs">"MongoDB"</span>,{" "}
              <span className="cs">"React Native"</span>
            </div>

            <div style={{ paddingLeft: 20 }}>],</div>

            <div style={{ paddingLeft: 20 }}>
              <span className="cp">focus</span>: [
              <span className="cs">"Scalable Web Apps"</span>,{" "}
              <span className="cs">"Mobile Apps"</span>],
            </div>

            <div style={{ paddingLeft: 20 }}>
              <span className="cp">available</span>:{" "}
              <span className="ccl">true</span> <span className="p-tcursor" />
            </div>

            <div>{"}"}</div>

            <div className="mt-3">
              <span className="cc">// Let’s build something great</span>
            </div>

            <div>
              <span className="cfn">developer</span>.
              <span className="cp">connect</span>(){" "}
              <span className="cc">// 🚀</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════ */
const MarqueeSection = () => {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="relative z-10 overflow-hidden py-16"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="p-mtrack">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-14">
            <span
              className="font-syne font-bold text-[12px] tracking-[3px] uppercase"
              style={{ color: "var(--muted)" }}
            >
              {item}
            </span>
            <span style={{ color: "var(--accent)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════ */
const AboutSection = () => {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="about" ref={ref} className="relative z-10 py-32">
      <div className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT SIDE */}
          <div className="p-rv">
            <p
              className="font-dm-mono text-[11px] tracking-[3px] uppercase mb-3"
              style={{ color: "var(--accent)" }}
            >
              01 — About Me
            </p>

            <h2
              className="font-syne font-bold tracking-[-1px] leading-tight mb-8"
              style={{
                fontSize: "clamp(34px,4vw,54px)",
                color: "var(--heading)",
              }}
            >
              Crafting{" "}
              <em className="font-serif-i" style={{ color: "var(--accent)" }}>
                scalable products
              </em>{" "}
              for web & mobile
            </h2>

            <div
              className="font-dm-mono text-[15px] leading-loose space-y-5"
              style={{ color: "var(--muted)" }}
            >
              <p>
                Hi, I’m <strong style={{ color: "#fff" }}>Keerthi Reddy</strong>{" "}
                — a<strong> Full-Stack Developer</strong> specializing in
                <strong> MERN Stack</strong> and
                <strong> React Native</strong>.
              </p>

              <p>
                I build modern digital products that combine
                <strong> scalable backend architecture</strong>,
                <strong> performant frontends</strong>, and
                <strong> seamless mobile experiences</strong>.
              </p>

              <p>
                My focus is creating applications that are
                <strong> fast, secure, and maintainable</strong> while
                delivering polished user experiences.
              </p>

              <p>
                Outside of coding, I enjoy exploring new technologies, improving
                developer workflows, and designing interfaces that make complex
                systems feel simple.
              </p>
            </div>

            {/* MINI STATS */}
            {/* <div className="flex gap-10 mt-10">
              {[
                ["2+", "Years Experience"],
                ["18+", "Projects Built"],
                ["12+", "Clients"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div
                    className="font-syne text-3xl font-bold"
                    style={{ color: "var(--heading)" }}
                  >
                    {num}
                  </div>

                  <div
                    className="font-dm-mono text-[11px] uppercase tracking-[2px]"
                    style={{ color: "var(--muted)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="p-rv p-rv-d2 flex flex-col gap-5">
            {[
              [
                "⚡",
                "Performance Focused",
                "Optimising applications with efficient data fetching, caching, and code splitting.",
              ],
              [
                "📱",
                "Mobile + Web Development",
                "Building cross-platform mobile apps with React Native and scalable web apps using MERN.",
              ],
              [
                "🧩",
                "Scalable Architecture",
                "Designing modular backend systems with clean APIs and maintainable codebases.",
              ],
              [
                "🎨",
                "User-Centered Design",
                "Creating intuitive UI with smooth interactions and responsive design.",
              ],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="p-ac flex items-start gap-5 px-6 py-6"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}
              >
                <div
                  className="w-11 h-11 flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: "rgba(0,229,200,.08)",
                    border: "1px solid rgba(0,229,200,.25)",
                    borderRadius: "10px",
                  }}
                >
                  {icon}
                </div>

                <div>
                  <div
                    className="font-syne font-semibold text-[15px]"
                    style={{ color: "var(--heading)" }}
                  >
                    {title}
                  </div>

                  <div
                    className="font-dm-mono text-[13px] mt-1 leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
/* ═══════════════════════════════════════════════
   SKILLS
═══════════════════════════════════════════════ */
const SkillsSection = () => {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative z-10 py-20"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(0,229,200,.015), transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto px-10">
        {/* SECTION HEADER */}
        <div className="mb-16">
          <p
            className="p-rv font-dm-mono text-[11px] tracking-[3px] uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            02 — Skills
          </p>

          <h2
            className="p-rv font-syne font-bold tracking-[-1px]"
            style={{
              fontSize: "clamp(36px,4vw,54px)",
              color: "var(--heading)",
            }}
          >
            Technologies I{" "}
            <em className="font-serif-i" style={{ color: "var(--accent)" }}>
              work with
            </em>
          </h2>

          <p
            className="p-rv font-dm-mono text-[14px] mt-4 max-w-xl"
            style={{ color: "var(--muted)" }}
          >
            My toolkit for building modern web platforms and cross-platform
            mobile applications.
          </p>
        </div>

        {/* SKILL GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map(({ label, tags }) => (
            <div
              key={label}
              className="p-rv transition-all duration-300 p-7 rounded-xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* CATEGORY TITLE */}
              <div
                className="font-dm-mono text-[11px] tracking-[2px] uppercase mb-6"
                style={{ color: "var(--accent)" }}
              >
                {label}
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2">
                {tags.map(([tag, hot]) => (
                  <span
                    key={tag}
                    className="font-dm-mono text-[11px] px-3 py-1.5 rounded-md transition-all"
                    style={{
                      border: hot
                        ? "1px solid rgba(0,229,200,.5)"
                        : "1px solid var(--border)",

                      color: hot ? "var(--accent)" : "#e0e0ee",

                      background: hot
                        ? "rgba(0,229,200,.08)"
                        : "rgba(255,255,255,.03)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   PROJECTS
═══════════════════════════════════════════════ */
const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path
      d="M1 11L11 1M11 1H5M11 1V7"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const ProjectCard = ({ project }) => {
  const { num, featured, icon, title, desc, stack } = project;
  return (
    <div
      className={`p-pc flex project-glow flex-col gap-3.5 p-7 cursor-default transition-colors duration-300${featured ? " lg:col-span-2" : ""}`}
      style={{
        background: featured
          ? "linear-gradient(135deg,var(--surface),rgba(0,229,200,.03))"
          : "var(--bg)",
      }}
      onMouseEnter={(e) => {
        if (!featured) e.currentTarget.style.background = "var(--surface)";
      }}
      onMouseLeave={(e) => {
        if (!featured) e.currentTarget.style.background = "var(--bg)";
      }}
    >
      <span
        className="font-dm-mono text-[10px] tracking-[2px]"
        style={{ color: "var(--muted)" }}
      >
        {featured ? `${num} — Featured` : num}
      </span>
      <div
        className="w-full flex items-center justify-center text-3xl"
        style={{
          height: "108px",
          background:
            "linear-gradient(135deg,rgba(0,229,200,.08),rgba(255,107,53,.05))",
          border: "1px solid var(--border)",
          color: "rgba(0,229,200,.3)",
        }}
      >
        {icon}
      </div>
      <h3
        className="font-syne font-bold text-xl tracking-[-0.5px]"
        style={{ color: "var(--heading)" }}
      >
        {title}
      </h3>
      <p
        className="font-dm-mono text-[13px] leading-relaxed flex-1"
        style={{ color: "var(--muted)" }}
      >
        {desc}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <span
            key={s}
            className="font-dm-mono text-[10px] px-2 py-0.5 tracking-[.5px]"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid var(--border)",
              color: "var(--muted)",
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex gap-4 pt-0.5">
        {[
          ["Live", "#"],
          ["GitHub", "#"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="font-dm-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-200"
            style={{ color: "var(--muted)", textDecoration: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--accent)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            {label} <ArrowIcon />
          </a>
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <section id="projects" ref={ref} className="relative z-10 py-16">
      <div className="max-w-6xl mx-auto px-10">
        <div className="p-rv flex flex-wrap justify-between items-end gap-4 mb-14">
          <div>
            <p
              className="font-dm-mono text-[11px] tracking-[3px] uppercase mb-3"
              style={{ color: "var(--accent)" }}
            >
              03 — Projects
            </p>
            <h2
              className="font-syne font-extrabold tracking-[-1.5px] leading-tight"
              style={{
                fontSize: "clamp(32px,4vw,52px)",
                color: "var(--heading)",
              }}
            >
              Selected{" "}
              <em className="font-serif-i" style={{ color: "var(--accent)" }}>
                work
              </em>
            </h2>
          </div>
          {/* <a
            href="#"
            className="font-dm-mono text-[11px] tracking-widest uppercase px-5 py-2.5 transition-all duration-200"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--muted)";
            }}
          >
            All Projects ↗
          </a> */}
        </div>
        <div
          className="p-rv grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.num} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   EXPERIENCE  ← key fix: CSS class for tabs,
   no duplicate JS object keys
═══════════════════════════════════════════════ */
const ExperienceSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useReveal(ref);

  const exp = EXPERIENCE[active];

  return (
    <section id="experience" ref={ref} className="relative z-10 py-20">
      <div className="max-w-6xl mx-auto px-10">
        {/* HEADER */}
        <div className="mb-16">
          <p
            className="p-rv font-dm-mono text-[11px] tracking-[3px] uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            04 — Experience
          </p>

          <h2
            className="p-rv font-syne font-bold tracking-[-1px]"
            style={{
              fontSize: "clamp(36px,4vw,54px)",
              color: "var(--heading)",
            }}
          >
            Where I've{" "}
            <em className="font-serif-i" style={{ color: "var(--accent)" }}>
              worked
            </em>
          </h2>
        </div>

        <div className="p-rv grid grid-cols-1 md:grid-cols-[220px_1fr] gap-14">
          {/* TABS */}
          <div className="relative flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
            <div
              className="hidden md:block absolute left-0 top-0 bottom-0"
              style={{
                width: "1px",
                // background: "var(--border)",
              }}
            />

            {EXPERIENCE.map((e, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative text-left text-black bg-gray-800 px-6 py-4 font-dm-mono text-[12px] tracking-[1px] transition-all duration-300"
                style={{
                  color: active === i ? "text-[#000000]" : "var(--muted)",
                }}
              >
                {active === i && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      //   background: "var(--accent)",
                    }}
                    className="text-black"
                  />
                )}

                {e.tab}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div
            key={active}
            style={{
              animation: "fadeInUp .4s ease both",
            }}
          >
            <h3
              className="font-syne font-semibold text-2xl"
              style={{ color: "var(--heading)" }}
            >
              {exp.role}
            </h3>

            <p
              className="font-dm-mono text-sm mt-2"
              style={{ color: "var(--accent)" }}
            >
              {exp.company}
            </p>

            <p
              className="font-dm-mono text-[11px] tracking-widest mt-1 mb-8"
              style={{ color: "var(--muted)" }}
            >
              {exp.date}
            </p>

            <ul className="space-y-4">
              {exp.items.map((item, i) => (
                <li
                  key={i}
                  className="font-dm-mono text-base leading-relaxed flex gap-3"
                  style={{ color: "var(--muted)" }}
                >
                  <span style={{ color: "var(--accent)" }}>▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════ */
const ContactSection = () => {
  const ref = useRef(null);
  useReveal(ref);

  const contacts = [
    {
      icon: "✉",
      label: "Email",
      value: "nkeerthireddy15@gmail.com",
      href: "mailto:nkeerthireddy15@gmail.com",
    },

    {
      icon: "⌥",
      label: "GitHub",
      value: "https://github.com/nkeerthireddy15",
      href: "https://github.com/nkeerthireddy15",
    },
    {
      icon: "in",
      label: "LinkedIn",
      value: "https://www.linkedin.com/in/keerthi-n-a727962a5/",
      href: "https://www.linkedin.com/in/keerthi-n-a727962a5/",
    },
  ];

  return (
    <section id="contact" ref={ref} className="relative z-10 py-32">
      <div className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* LEFT SIDE TEXT */}
          <div className="p-rv">
            <p
              className="font-dm-mono text-[11px] tracking-[3px] uppercase mb-3"
              style={{ color: "var(--accent)" }}
            >
              05 — Contact
            </p>

            <h2
              className="font-syne font-bold tracking-[-1px] leading-tight mb-6"
              style={{
                fontSize: "clamp(34px,4vw,56px)",
                color: "var(--heading)",
              }}
            >
              Let's build something{" "}
              <em className="font-serif-i" style={{ color: "var(--accent)" }}>
                great
              </em>
            </h2>

            <p
              className="font-dm-mono text-[14px] leading-loose max-w-md"
              style={{ color: "var(--muted)" }}
            >
              I'm open to full-time opportunities, freelance projects, and
              collaborations. Feel free to reach out if you'd like to discuss a
              project or just connect.
            </p>
          </div>

          {/* RIGHT SIDE CONTACT CARDS */}
          <div className="p-rv p-rv-d2 grid grid-cols-1 gap-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 px-6 py-5 rounded-lg transition-all duration-300"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  textDecoration: "none",
                  color: "#e0e0ee",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: "rgba(0,229,200,.08)",
                    border: "1px solid rgba(0,229,200,.25)",
                    borderRadius: "8px",
                  }}
                >
                  {c.icon}
                </div>

                <div className="flex-1">
                  <div
                    className="font-syne text-[14px]"
                    style={{ color: "var(--heading)" }}
                  >
                    {c.label}
                  </div>

                  <div
                    className="font-dm-mono text-[12px]"
                    style={{ color: "var(--muted)" }}
                  >
                    {c.value}
                  </div>
                </div>

                <span style={{ color: "var(--muted)" }}>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
const Footer = () => (
  <footer
    className="relative z-10 py-8"
    style={{ borderTop: "1px solid var(--border)" }}
  >
    <div className="max-w-6xl mx-auto px-10 flex flex-wrap justify-between items-center gap-3">
      <p className="font-dm-mono text-[12px]" style={{ color: "var(--muted)" }}>
        Designed & built by{" "}
        <span style={{ color: "var(--accent)" }}>N.Keerthi Reddy</span> · 2026
      </p>
      <p
        className="font-dm-mono text-[11px] tracking-[2px]"
        style={{ color: "var(--muted)" }}
      >
        Full STACK DEVELOPER
      </p>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════ */
export default function Portfolio() {
  return (
    <>
      <GlobalStyles />
      <div className="p-grid-bg" />
      <div className="p-orb-1" />
      <div className="p-orb-2" />
      <Cursor />
      <Navbar />
      <HeroSection />
      {/* <div
        className=" max-w-7xl mx-auto flex justify-center items-center gap-10 my-14 pt-10 "
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {[
          ["2", "Years Exp."],
          ["18", "Projects"],
          ["12", "Clients"],
        ].map(([n, l]) => (
          <div key={l}>
            <div
              className="font-syne font-extrabold text-4xl leading-none"
              style={{ color: "var(--heading)" }}
            >
              {n}
              <span style={{ color: "var(--accent)" }}>+</span>
            </div>
            <div
              className="font-dm-mono text-[10px] tracking-[2px] uppercase mt-1.5"
              style={{ color: "var(--muted)" }}
            >
              {l}
            </div>
          </div>
        ))}
      </div> */}
      <MarqueeSection />
      <AboutSection />
      <div
        className="relative z-10 mx-10"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg,transparent,var(--border),transparent)",
        }}
      />
      <SkillsSection />
      {/* <ProjectsSection /> */}
      <Projects />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </>
  );
}
