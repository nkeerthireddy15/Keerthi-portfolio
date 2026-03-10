import { useRef } from "react";

import useReveal from "../Hooks/useReveal";

export default function About() {
  const ref = useRef(null);
  useReveal(ref);

  const cards = [
    [
      "⚡",
      "Performance First",
      "Optimising bundle sizes, lazy loading, and API response times",
    ],
    [
      "🔐",
      "Security Focused",
      "JWT, OAuth, input sanitisation, and OWASP best practices",
    ],
    [
      "📐",
      "Clean Architecture",
      "MVC patterns, separation of concerns, and scalable APIs",
    ],
    [
      "🎨",
      "UI / UX Sensitive",
      "Tailwind, component libraries, responsive & accessible design",
    ],
  ];

  return (
    <section id="about" ref={ref} className="relative z-10 py-28">
      <div className="max-w-6xl mx-auto px-10 grid lg:grid-cols-2 gap-20">
        <div className="p-rv">
          <p className="section-label">// 01 — About</p>

          <h2 className="section-title">
            I build things for <em>the web</em>
          </h2>

          <p>
            I'm a MERN Stack Developer with 2+ years building full-stack
            applications from scalable backend APIs to pixel-perfect React UI.
          </p>
        </div>

        <div className="flex flex-col gap-4 p-rv p-rv-d2">
          {cards.map(([icon, title, desc]) => (
            <div key={title} className="about-card">
              <div className="icon">{icon}</div>

              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
