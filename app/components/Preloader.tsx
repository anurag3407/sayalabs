"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Preloader — cinematic page-load reveal.
 * - Shows brand wordmark with a top→bottom mask wipe.
 * - Once the document is loaded (and a minimum show time has passed), runs an exit timeline.
 * - The ModelLoader sits on top (z-index higher) and handles 3D asset loading separately.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const word1 = useRef<HTMLSpanElement>(null);
  const word2 = useRef<HTMLSpanElement>(null);
  const kanji = useRef<HTMLSpanElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    document.documentElement.classList.add("preloading");

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    gsap.set([word1.current, word2.current, kanji.current], { yPercent: 110 });
    gsap.set(line.current, { scaleX: 0, transformOrigin: "left center" });

    tl.to(kanji.current, { yPercent: 0, duration: 1.1 }, 0)
      .to(word1.current, { yPercent: 0, duration: 1.1 }, 0.15)
      .to(word2.current, { yPercent: 0, duration: 1.1 }, 0.25)
      .to(line.current, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.4);

    const minShowMs = 1400;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minShowMs - elapsed);
      window.setTimeout(() => {
        const exit = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove("preloading");
            setDone(true);
          },
        });
        exit
          .to([kanji.current, word1.current, word2.current], {
            yPercent: -110,
            duration: 0.9,
            ease: "expo.in",
            stagger: 0.04,
          })
          .to(line.current, { scaleX: 0, transformOrigin: "right center", duration: 0.7, ease: "expo.inOut" }, 0)
          .to(root.current, { yPercent: -100, duration: 1.05, ease: "expo.inOut" }, "-=0.2");
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    // Safety net — never stay on screen longer than 5s
    const fallback = window.setTimeout(finish, 5000);

    return () => {
      tl.kill();
      window.clearTimeout(fallback);
      document.documentElement.classList.remove("preloading");
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="preloader" role="status" aria-label="Loading">
      <div className="preloader-grid" />
      <div className="preloader-stage">
        <span className="preloader-mask">
          <span ref={kanji} className="preloader-kanji">鍛</span>
        </span>
        <div className="preloader-wordmark">
          <span className="preloader-mask">
            <span ref={word1} className="preloader-word">SAYA</span>
          </span>
          <span className="preloader-mask">
            <span ref={word2} className="preloader-word preloader-word--accent">LABS</span>
          </span>
        </div>
        <div ref={line} className="preloader-line" />
        <div className="preloader-meta">
          <span>Digital Craft Studio</span>
          <span>2026 / EST</span>
        </div>
      </div>
    </div>
  );
}
