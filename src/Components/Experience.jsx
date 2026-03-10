import { EXPERIENCE } from "../data/experience";
import { useState, useRef } from "react";
import useReveal from "../Hooks/useReveal";

export default function Experience() {
  const [active, setActive] = useState(0);

  const ref = useRef(null);
  useReveal(ref);

  const exp = EXPERIENCE[active];

  return (
    <section id="experience" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-10">
        <p className="section-label">// 04 — Experience</p>

        <h2 className="section-title">
          Where I've <em>worked</em>
        </h2>

        <div className="exp-grid">
          <div className="exp-tabs">
            {EXPERIENCE.map((e, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={active === i ? "active" : ""}
              >
                {e.tab}
              </button>
            ))}
          </div>

          <div className="exp-content">
            <h3>{exp.role}</h3>

            <p>{exp.company}</p>

            <p>{exp.date}</p>

            <ul>
              {exp.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
