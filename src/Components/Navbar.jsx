import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      let cur = "";

      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) {
          cur = s.id;
        }
      });

      setActive(cur);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="nav">
      <span className="logo">dev.portfolio</span>

      <ul>
        {["about", "skills", "projects", "experience", "contact"].map((s) => (
          <li key={s}>
            <button onClick={() => scrollTo(s)}>{s}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
