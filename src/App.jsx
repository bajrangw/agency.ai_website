import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TrustedBy from "./components/TrustedBy.jsx";
import Services from "./components/Services.jsx";
import OurWork from "./components/OurWork.jsx";
import Teams from "./components/Teams.jsx";
import ContactUs from "./components/ContactUs.jsx";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // Initialize starting positions so overflow doesn't happen
  useEffect(() => {
    const startX = Math.round(window.innerWidth / 2);
    const startY = Math.round(window.innerHeight / 2);

    mouse.current = { x: startX, y: startY };
    position.current = { x: startX, y: startY };

    // Ensure html/body has no horizontal overflow
    if (typeof document !== "undefined") {
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
      // ensure full height root doesn't create a second scroller
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
    }

    // set initial transforms immediately to avoid NaN and layout shift
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${startX - 6}px, ${startY - 6}px, 0)`;
      dotRef.current.style.willChange = "transform";
    }
    if (outlineRef.current) {
      outlineRef.current.style.transform = `translate3d(${startX - 20}px, ${startY - 20}px, 0)`;
      outlineRef.current.style.willChange = "transform";
    }
  }, []);

  // Cursor movement animation with safe RAF cleanup
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.1;
      position.current.y += (mouse.current.y - position.current.y) * 0.1;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${Math.round(mouse.current.x) - 6}px, ${Math.round(mouse.current.y) - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${Math.round(position.current.x) - 20}px, ${Math.round(position.current.y) - 20}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Cursor wrapper - prevents scrollbars forever */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[9999]">
        <div
          ref={outlineRef}
          className="absolute h-10 w-10 rounded-full border border-primary"
          style={{ transition: "transform 0.1s ease-out", transform: "translate3d(0,0,0)" }}
        />
        <div
          ref={dotRef}
          className="absolute h-3 w-3 rounded-full bg-primary"
          style={{ transform: "translate3d(0,0,0)" }}
        />
      </div>

      <div className="dark:bg-black relative overflow-x-hidden">
        <Toaster />
        <Navbar theme={theme} setTheme={setTheme} />
        <Hero />
        <TrustedBy />
        <Services />
        <OurWork />
        <Teams />
        <ContactUs />
        <Footer theme={theme} />
      </div>
    </>
  );
};

export default App;
