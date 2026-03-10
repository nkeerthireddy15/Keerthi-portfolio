import { MARQUEE_ITEMS } from "../data/marquee";

export default function MarqueeSection() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee">
      {items.map((item, i) => (
        <span key={i}>{item}</span>
      ))}
    </div>
  );
}
