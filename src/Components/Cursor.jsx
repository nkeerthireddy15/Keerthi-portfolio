import { useEffect, useRef } from "react";

export default function Cursor() {
  const cRef = useRef(null);
  const rRef = useRef(null);

  const pos = useRef({ cx: 0, cy: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current.cx = e.clientX;
      pos.current.cy = e.clientY;

      if (cRef.current) {
        cRef.current.style.left = e.clientX + "px";
        cRef.current.style.top = e.clientY + "px";
      }
    };

    document.addEventListener("mousemove", move);

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
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="p-cursor" ref={cRef} />
      <div id="p-cursor-ring" ref={rRef} />
    </>
  );
}
