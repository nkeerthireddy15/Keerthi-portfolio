export default function GlobalStyles() {
  return (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap');

    :root {
      --accent:  #00e5c8;
      --accent2: #ff6b35;
      --surface: #111118;
      --border:  rgba(255,255,255,0.07);
      --muted:   #55556e;
      --heading: #f0f0fa;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html  { scroll-behavior: smooth; }
    body  { background: #060608; color: #e0e0ee; font-family: 'DM Mono', monospace; overflow-x: hidden; cursor: none; }

    /* Cursor */
    #p-cursor      { width:12px;height:12px;background:var(--accent);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s; }
    #p-cursor-ring { width:36px;height:36px;border:1px solid rgba(0,229,200,.4);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .25s,height .25s; }

    /* Grid bg */
    .p-grid-bg { position:fixed;inset:0;background-image:linear-gradient(rgba(0,229,200,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,200,.022) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;z-index:0; }

    /* Orbs */
    .p-orb-1 { position:fixed;width:600px;height:600px;background:var(--accent);border-radius:50%;filter:blur(130px);opacity:.09;top:-200px;right:-200px;pointer-events:none;z-index:0;animation:orbF1 20s ease-in-out infinite; }
    .p-orb-2 { position:fixed;width:500px;height:500px;background:var(--accent2);border-radius:50%;filter:blur(130px);opacity:.09;bottom:-150px;left:-150px;pointer-events:none;z-index:0;animation:orbF2 25s ease-in-out infinite; }
    @keyframes orbF1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-55px,55px)} }
    @keyframes orbF2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(55px,-40px)} }

    /* Typography helpers */
    .font-syne    { font-family:'Syne',sans-serif; }
    .font-dm-mono { font-family:'DM Mono',monospace; }
    .font-serif-i { font-family:'Instrument Serif',serif;font-style:italic; }

    /* Keyframes */
    @keyframes slideUp   { from{transform:translateY(105%);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes fadeInUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes pulseD    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.75)} }
    @keyframes mScroll   { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    /* Hero animations */
    .p-hl           { display:block;overflow:hidden; }
    .p-hl span      { display:block;animation:slideUp .85s cubic-bezier(.16,1,.3,1) both; }
    .p-hl:nth-child(1) span { animation-delay:.05s; }
    .p-hl:nth-child(2) span { animation-delay:.19s; }
    .p-hl:nth-child(3) span { animation-delay:.33s; }
    .p-f1 { animation:fadeInUp .9s .55s both; }
    .p-f2 { animation:fadeInUp .9s .72s both; }
    .p-f3 { animation:fadeInUp .9s .90s both; }
    .p-f4 { animation:fadeInUp .9s .28s both; }

    /* Typed cursor */
    .p-tcursor { display:inline-block;width:2px;height:14px;background:var(--accent);vertical-align:middle;animation:blink 1s infinite; }

    /* Pulse dot */
    .p-pdot { width:7px;height:7px;flex-shrink:0;background:var(--accent);border-radius:50%;animation:pulseD 2s ease-in-out infinite; }

    /* Marquee */
    .p-mtrack { display:flex;gap:56px;white-space:nowrap;width:max-content;animation:mScroll 28s linear infinite; }

    /* Scroll reveal */
    .p-rv { opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1); }
    .p-rv.vis { opacity:1;transform:translateY(0); }
    .p-rv-d1 { transition-delay:.1s; }
    .p-rv-d2 { transition-delay:.22s; }

    /* Nav underline */
    .p-nl { position:relative; }
    .p-nl::after { content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--accent);transition:width .3s; }
    .p-nl:hover::after,.p-nl.act::after { width:100%; }

    /* Project top bar */
    .p-pc { position:relative;overflow:hidden; }
    .p-pc::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),transparent);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.16,1,.3,1); }
    .p-pc:hover::before { transform:scaleX(1); }

    /* About card */
    .p-ac { transition:border-color .2s,transform .2s; }
    .p-ac:hover { transform:translateX(8px); border-color:rgba(0,229,200,.35) !important; }

    /* Skill tag */
    .p-st { transition:border-color .2s,color .2s,background .2s; }
    .p-st:hover { border-color:rgba(0,229,200,.5) !important;color:var(--accent) !important;background:rgba(0,229,200,.06) !important; }

    /* Social link */
    .p-sl:hover { border-color:rgba(0,229,200,.4) !important;background:rgba(0,229,200,.03) !important;color:var(--accent) !important; }
    .p-sl:hover .p-sarr { transform:translate(4px,-4px);color:var(--accent); }
    .p-sarr { transition:transform .2s,color .2s; }

    /* Syntax colors */
    .ck  { color:#ff6b9d; }
    .cfn { color:#79b8ff; }
    .cs  { color:#9ecbff; }
    .ccl { color:var(--accent); }
    .cp  { color:#b392f0; }
    .cc  { color:var(--muted);font-style:italic; }
    .cn  { color:var(--accent2); }

    /* Form focus */
    .p-inp:focus { outline:none;border-color:var(--accent) !important; }

    @media(max-width:768px){
      .p-hide-mobile { display:none !important; }
      .p-nav-links   { display:none !important; }
    }
  `}</style>
  );
}
