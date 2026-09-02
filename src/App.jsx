import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Code2, Folder,
  FileDown, Github, Home, Linkedin, Mail, MapPin, Menu, MonitorSmartphone,
  Sparkles, UserRound, X,
} from "lucide-react";
import axio from "./assets/axio-p.png";
import osi from "./assets/osi-p.png";
import skibboo from "./assets/skibboo-p.png";

const projects = [
  { title: "AutomedSystems", short: "AMS", category: "Multi-tenant ERP", description: "An ERP platform for project, customer and workflow management with tenant-aware RBAC, role-based dashboards, milestone tracking and reporting.", stack: ["React.js", "Node.js", "Express.js", "MongoDB"], href: "https://www.automedsystems.com/", color: "#e4e3dc" },
  { title: "Oniro", short: "ON", category: "Restaurant operations platform", description: "A secure restaurant operations platform with role-based administration, reservation management, encrypted API communication and configurable access controls.", stack: ["React.js", "Node.js", "Express.js", "MongoDB"], href: "https://oniro.in/", color: "#e4e3dc" },
  { title: "Eco Planet Elevators", short: "EPE", category: "Premium elevator website", description: "A polished product website presenting residential, commercial and specialized elevator solutions through responsive, performance-focused pages and clear enquiry journeys.", stack: ["React.js", "JavaScript", "Responsive UI"], href: "https://ecoplanetelevators.co.in/", color: "#e4e3dc" },
  { title: "Skibboo", short: "SK", category: "Kids study & play app", description: "A mobile platform where children can create and join study or play sessions, supported by parental controls and secure collaboration.", stack: ["React Native", "Node.js", "MongoDB"], image: skibboo, href: "https://play.google.com/store/apps/details?id=com.skibboo&hl=en", color: "#e4e3dc" },
  { title: "OSI India", short: "OSI", category: "Professional association", description: "A role-based medical association platform with secure membership, fellowship, approval and payment workflows.", stack: ["React.js", "Next.js", "Node.js"], image: osi, href: "https://osindia.org/", color: "#e4e3dc" },
  { title: "MaxioCel", short: "MX", category: "Healthcare website", description: "A production website for an advanced wound-care brand, focused on clear product communication and responsive performance.", stack: ["React.js", "JavaScript", "Responsive UI"], href: "https://maxiocel.com/", color: "#e4e3dc" },
  { title: "AxioBio", short: "AX", category: "Healthcare platform", description: "A high-performance corporate product experience for a global medical technology and wound-care company.", stack: ["React.js", "Tailwind CSS", "Node.js"], image: axio, href: "https://axiobio.com/", color: "#e4e3dc" },
  { title: "Royle Systems", short: "RS", category: "Industrial website", description: "A responsive production website presenting industrial equipment, services and company capabilities.", stack: ["React.js", "JavaScript", "API Integration"], href: "https://roylesystems.com/", color: "#e4e3dc" },
  { title: "Spago Foods", short: "SF", category: "Food brand website", description: "A consumer-facing website designed to present the brand, product range and business information clearly.", stack: ["React.js", "Responsive UI", "Performance"], href: "https://spagofoods.com/", color: "#e4e3dc" },
  { title: "CNB Tek", short: "CNB", category: "Corporate website", description: "A clean corporate web experience showcasing technology solutions, services and company information.", stack: ["React.js", "JavaScript", "Responsive UI"], href: "https://www.cnbtek.com/", color: "#e4e3dc" },
];

const navigation = [
  { label: "Home", id: "home", icon: <Home /> },
  { label: "About", id: "about", icon: <UserRound /> },
  { label: "Work", id: "work", icon: <Folder /> },
  { label: "Experience", id: "experience", icon: <BriefcaseBusiness /> },
];

function Window({ title, meta, className = "", children }) {
  return (
    <div className={`window ${className}`}>
      <div className="window-bar">
        <div className="window-dots"><span /><span /><span /></div>
        <p>{title}</p><span className="window-meta">{meta}</span>
      </div>
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    update(); const timer = setInterval(update, 60000); return () => clearInterval(timer);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const reveal = { initial: reduceMotion ? false : { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .12 }, transition: { duration: .55, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="desktop-shell">
      <header className="system-bar">
        <a href="#home" className="system-brand"><span>KN</span> workspace</a>
        <nav className="system-nav">{navigation.map(({ label, id }) => <button key={id} onClick={() => go(id)}>{label}</button>)}</nav>
        <div className="system-status"><span className="status-dot" /> Available <b>{time}</b></div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <div className="mobile-menu">{navigation.map(({ label, id }) => <button key={id} onClick={() => go(id)}>{label}</button>)}<a href="mailto:nkeerthireddy15@gmail.com">Contact</a></div>}
      </header>

      <main>
        <section className="hero-grid" id="home">
          <Motion.div {...reveal} className="desktop-folders" aria-label="Portfolio navigation">
            {navigation.map(({ label, id, icon }) => <button key={id} className="desktop-folder" onClick={() => go(id)}><span><Folder fill="currentColor" /></span><span className="folder-symbol">{icon}</span><b>{label}</b></button>)}
          </Motion.div>

          <Motion.div initial={reduceMotion ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .65 }}>
            <Window title="hello_keerthi.dev" meta="PROFILE">
              <div className="hero-window-body">
                <div className="identity-block">
                  <div className="avatar"><span>KN</span><i>open to work</i></div>
                  <div className="intro-copy">
                    <p className="eyebrow">FULL-STACK + MOBILE DEVELOPER</p>
                    <h1>Keerthi<br /><em>N.</em></h1>
                    <p className="hero-summary">Full Stack Developer building production web and mobile applications with React, Next.js, Node.js and React Native.</p>
                    <div className="hero-actions"><button className="pixel-button filled" onClick={() => go("work")}>Explore my work <ArrowDownRight /></button><a className="pixel-button" href="/Keerthi_N_Resume.pdf" download>Resume <FileDown /></a></div>
                  </div>
                </div>
                <aside className="profile-readme">
                  <div><span>01</span><p><b>3+ years</b> building production applications</p></div>
                  <div><span>02</span><p><b>40% faster APIs</b> through backend optimization</p></div>
                  <div><span>03</span><p><b>Bengaluru, India</b> <MapPin size={14} /></p></div>
                </aside>
              </div>
            </Window>
          </Motion.div>

          <Motion.div {...reveal} className="quick-note">
            <span>NOTE.txt</span><p>Good software should feel obvious to use and dependable under pressure.</p><Sparkles />
          </Motion.div>
        </section>

        <section className="marquee" aria-label="Technology stack"><div>{["React.js", "TypeScript", "Node.js", "MongoDB", "React Native", "Next.js", "NestJS", "MySQL", "React.js", "TypeScript", "Node.js", "MongoDB"].map((item, i) => <span key={`${item}-${i}`}>{item}<i>✦</i></span>)}</div></section>

        <section className="section about-section" id="about">
          <div className="section-title"><span>01 / ABOUT</span><h2>Full-stack thinking.<br /><em>Product-level care.</em></h2></div>
          <div className="about-layout">
            <Motion.div {...reveal}><Window title="about_me.md" meta="README"><div className="document-body"><p className="drop-cap">I’m a Full Stack Developer with 3+ years of combined professional experience, including full-time product delivery and a six-month MERN internship.</p><p>I build production applications with JavaScript, TypeScript, React, Next.js, Node.js and React Native. My work includes REST APIs, multi-tenant and RBAC systems, payments, authentication and cloud deployments.</p><div className="document-links"><a href="https://github.com/nkeerthireddy15" target="_blank" rel="noreferrer"><Github /> github</a><a href="https://www.linkedin.com/in/keerthii-n-a727962a5" target="_blank" rel="noreferrer"><Linkedin /> linkedin</a></div></div></Window></Motion.div>
            <Motion.div {...reveal}><Window title="toolbox.app" meta="SKILLS"><div className="toolbox"><div><Code2 /><h3>Frontend</h3><p>React.js, Next.js, TypeScript, Redux, Tailwind CSS</p></div><div><MonitorSmartphone /><h3>Mobile</h3><p>React Native, Firebase, Maps, push notifications</p></div><div><span className="tool-glyph">{`{ }`}</span><h3>Backend</h3><p>Node.js, Express.js, NestJS, REST APIs, Webhooks</p></div><div><span className="tool-glyph">DB</span><h3>Data & cloud</h3><p>MongoDB, MySQL, DigitalOcean, CI/CD, Git</p></div></div></Window></Motion.div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-title inline"><span>02 / SELECTED WORK</span><h2>Things I’ve helped<br /><em>ship.</em></h2><p>Real products, real users, real production constraints.</p></div>
          <div className="project-stack">
            {projects.map((project, index) => (
              <Motion.a {...reveal} href={project.href} target="_blank" rel="noreferrer" className="project-window" key={project.title}>
                <div className="project-bar"><span>0{index + 1}</span><p>{project.title}.project</p><ArrowUpRight /></div>
                <div className="project-image" style={{ background: project.color }}>{project.image ? <img src={project.image} alt={`${project.title} project preview`} loading="lazy" /> : <div className="project-placeholder"><span>{project.short}</span><p>{project.title}</p></div>}</div>
                <div className="project-info"><div><p>{project.category}</p><h3>{project.title}</h3></div><p className="project-copy">{project.description}</p><div className="chips">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
              </Motion.a>
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="section-title"><span>03 / EXPERIENCE</span><h2>Building beyond<br /><em>localhost.</em></h2></div>
          <Motion.div {...reveal}><Window title="career_history.log" meta="CURRENT"><div className="career"><aside><span>JAN 2024 — PRESENT</span><h3>Telco Communications</h3><p>Full Stack Developer · Bengaluru</p></aside><div className="career-content"><p>Building and maintaining production web and mobile products across the complete delivery lifecycle.</p><ul><li>Reduced API response time by 40% through middleware, query and backend architecture optimization.</li><li>Improved Core Web Vitals by 30% using lazy loading, code splitting and asset optimization.</li><li>Built e-commerce, payments, maps tracking, notifications, role-aware dashboards and SSO.</li><li>Deployed production systems on DigitalOcean using CI/CD, domains, DNS and SSL.</li></ul></div></div><div className="career career-secondary"><aside><span>JUL 2023 — DEC 2023</span><h3>Refactor Academy</h3><p>MERN Stack Developer Intern · Remote</p></aside><div className="career-content"><p>Built and optimized MERN modules for SkillIQ, an online interview platform.</p><ul><li>Worked on candidate workflows and assessment management.</li><li>Contributed to performance tracking features and reusable MERN modules.</li></ul></div></div></Window></Motion.div>
        </section>

        <section className="section contact-section" id="contact">
          <Motion.div {...reveal}><Window title="new_message.mail" meta="LET'S CONNECT"><div className="contact-body"><p>Want to build something useful?</p><h2>Let’s make it<br /><em>work beautifully.</em></h2><a className="mail-row" href="mailto:nkeerthireddy15@gmail.com"><Mail /><span>nkeerthireddy15@gmail.com</span><ArrowUpRight /></a><div className="contact-links"><a href="tel:+919346748879">+91 9346748879</a><a href="https://www.linkedin.com/in/keerthii-n-a727962a5" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/nkeerthireddy15" target="_blank" rel="noreferrer">GitHub</a><a href="/Keerthi_N_Resume.pdf" download>Download resume</a></div></div></Window></Motion.div>
        </section>
      </main>

      <nav className="dock" aria-label="Quick navigation">{navigation.map(({ label, id, icon }) => <button key={id} onClick={() => go(id)} aria-label={label}>{icon}<span>{label}</span></button>)}<a href="mailto:nkeerthireddy15@gmail.com" aria-label="Email Keerthi"><Mail /><span>Contact</span></a></nav>
      <footer><span>© {new Date().getFullYear()} Keerthi N</span><span>Built with React · Bengaluru, India</span><button onClick={() => go("home")}>Back to desktop ↑</button></footer>
    </div>
  );
}

export default App;
