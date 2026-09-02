import { useState, useRef } from "react";
import useReveal from "../Hooks/useReveal";

export default function Contact() {
  const ref = useRef(null);
  useReveal(ref);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <section id="contact" ref={ref} className="py-28">
      <div className="max-w-6xl mx-auto px-10 grid lg:grid-cols-2 gap-20">
        <div>
          <h2>
            Let's build something <em>great</em>
          </h2>

          <p>I'm open to freelance work and collaborations.</p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <button>Send Message</button>
        </div>
      </div>
    </section>
  );
}
