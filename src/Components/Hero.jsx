export default function Hero() {
  const scroll = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero">
      <h1>Full-Stack MERN Developer</h1>

      <p>
        Crafting scalable web apps using MongoDB, Express, React and Node.js.
      </p>

      <button onClick={() => scroll("projects")}>View Projects</button>
    </section>
  );
}
