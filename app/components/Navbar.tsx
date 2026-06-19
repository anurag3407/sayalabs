"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastYRef = useRef(0);
  const pathname = usePathname();
  const onHome = pathname === "/";

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

  // In-page anchors on home, cross-page anchors elsewhere.
  const a = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const links = [
    { href: a("home"), label: "Home" },
    { href: a("forge"), label: "Studio" },
    { href: a("services"), label: "Craft" },
    { href: "/projects", label: "Work" },
    { href: "/community", label: "Community" },
  ];

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "navbar--hidden" : ""}`}
        id="navbar"
      >
        <div className="navbar-inner">
          <a href={onHome ? "#home" : "/"} className="nav-logo" data-cursor="link">
            <span className="nav-logo-kanji">鍛</span>
            <span className="nav-logo-text">SAYA LABS</span>
          </a>

          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} data-cursor="link">{link.label}</a>
              </li>
            ))}
            <li>
              <a href="/work-with-us" data-cursor="link" className="nav-link--accent">Work With Us</a>
            </li>
          </ul>

          <a href={a("contact")} className="nav-cta nav-cta-desktop" data-cursor="magnetic">
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
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            data-cursor="link"
          >
            {link.label}
          </a>
        ))}
        <a href="/work-with-us" onClick={() => setMobileOpen(false)} data-cursor="link">
          Work With Us
        </a>
        <a
          href={a("contact")}
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
