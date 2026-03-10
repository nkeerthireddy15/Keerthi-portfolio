import GlobalStyles from "./Components/GlobalStyles";

import Cursor from "./Components/Cursor";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MarqueeSection from "./Components/MarqueeSection";
import About from "./Components/About";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

export default function Homepage() {
  return (
    <>
      <GlobalStyles />

      <div className="p-grid-bg" />
      <div className="p-orb-1" />
      <div className="p-orb-2" />

      <Cursor />
      <Navbar />

      <Hero />
      <MarqueeSection />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
