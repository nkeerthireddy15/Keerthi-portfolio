import { SKILLS } from "../data/skills";
import { useRef } from "react";

import useReveal from "../Hooks/useReveal";

export default function Skills() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="skills" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-10">
        <p className="section-label">// 02 — Skills</p>

        <h2 className="section-title">
          My tech <em>arsenal</em>
        </h2>

        <div className="skills-grid">
          {SKILLS.map((group) => (
            <div key={group.label} className="skill-group">
              <h4>{group.label}</h4>

              <div className="flex flex-wrap gap-2">
                {group.tags.map(([tag, hot]) => (
                  <span key={tag} className={`skill-tag ${hot ? "hot" : ""}`}>
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
}
