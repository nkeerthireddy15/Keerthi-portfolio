import { PROJECTS } from "../data/Projects";
import { useRef } from "react";
import useReveal from "../Hooks/useReveal";

export default function Projects() {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section id="projects" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-10">
        <p className="section-label">// 03 — Projects</p>

        <h2 className="section-title">
          Selected <em>work</em>
        </h2>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div
              key={project.num}
              className={`project-card ${project.featured ? "featured" : ""}`}
            >
              <span className="project-num">{project.num}</span>

              <div className="project-icon">{project.icon}</div>

              <h3 className="project-title">{project.title}</h3>

              <p className="project-desc">{project.desc}</p>

              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="stack-badge">
                    {tech}
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
