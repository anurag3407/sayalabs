"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const dy = y - lastYRef.current;
      if (y > 200 && dy > 4) {
        setHidden(true);
      } else if (dy < -4 || y < 80) {
        setHidden(false);
      }
      lastYRef.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "navbar--hidden" : ""}`}
        id="navbar"
      >
        <div className="navbar-inner">
          <a href="#home" className="nav-logo" data-cursor="link">
            <span className="nav-logo-kanji">鍛</span>
            <span className="nav-logo-text">SAYA LABS</span>
          </a>

          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} data-cursor="link">{link.label}</a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="nav-cta nav-cta-desktop" data-cursor="magnetic">
            Start a Project
          </a>

          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            data-cursor="link"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        <button
          className="mobile-nav-close"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          data-cursor="link"
        >
          ✕
        </button>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            data-cursor="link"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="nav-cta"
          onClick={() => setMobileOpen(false)}
          data-cursor="magnetic"
        >
          Start a Project
        </a>
      </div>
    </>
  );
}
