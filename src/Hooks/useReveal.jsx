import { useEffect } from "react";

export default function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
          }
        });
      },
      { threshold: 0.1 },
    );

    ref.current.querySelectorAll(".p-rv").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref]);
}
