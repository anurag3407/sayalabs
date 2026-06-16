"use client";

import Marquee from "./Marquee";

type Variant = "primary" | "outline" | "kanji" | "services";

type Props = {
  variant?: Variant;
  speed?: number;
  direction?: "left" | "right";
};

const SERVICE_WORDS = [
  "WEB DESIGN",
  "DEVELOPMENT",
  "BRANDING",
  "SEO",
  "MOTION",
  "STRATEGY",
  "UI / UX",
  "IDENTITY",
];

const KANJI_WORDS = ["創造", "革新", "鍛造", "精神", "美学", "完璧", "職人", "守破離"];

const PRIMARY_WORDS = ["FORGED IN CRAFT", "BORN IN TOKYO", "BUILT FOR THE WORLD", "STUDIO 鍛"];

export default function MarqueeStrip({ variant = "primary", speed = 40, direction = "left" }: Props) {
  if (variant === "services") {
    return (
      <div className="marquee-strip">
        <Marquee
          speed={speed}
          direction={direction}
          separator={null}
          items={SERVICE_WORDS.flatMap((w, i) => [
            <span key={`${w}-${i}-a`} className="marquee-text">{w}</span>,
            <span key={`${w}-${i}-b`} className="marquee-sep" />,
            <span key={`${w}-${i}-c`} className="marquee-text marquee-text--outline">{w}</span>,
            <span key={`${w}-${i}-d`} className="marquee-sep" />,
          ])}
        />
      </div>
    );
  }

  if (variant === "kanji") {
    return (
      <div className="marquee-strip">
        <Marquee
          speed={speed}
          direction={direction}
          separator={null}
          items={KANJI_WORDS.flatMap((w, i) => [
            <span key={`${w}-${i}-a`} className="marquee-kanji">{w}</span>,
            <span key={`${w}-${i}-b`} className="marquee-text marquee-text--outline">/</span>,
          ])}
        />
      </div>
    );
  }

  if (variant === "outline") {
    return (
      <div className="marquee-strip marquee-strip--no-borders">
        <Marquee
          speed={speed}
          direction={direction}
          separator={null}
          items={PRIMARY_WORDS.flatMap((w, i) => [
            <span key={`${w}-${i}-a`} className="marquee-text marquee-text--outline">{w}</span>,
            <span key={`${w}-${i}-b`} className="marquee-sep" />,
          ])}
        />
      </div>
    );
  }

  // primary
  return (
    <div className="marquee-strip">
      <Marquee
        speed={speed}
        direction={direction}
        separator={null}
        items={PRIMARY_WORDS.flatMap((w, i) => [
          <span key={`${w}-${i}-a`} className="marquee-text">{w}</span>,
          <span key={`${w}-${i}-b`} className="marquee-sep" />,
          <span key={`${w}-${i}-c`} className="marquee-text marquee-text--accent">{w}</span>,
          <span key={`${w}-${i}-d`} className="marquee-sep" />,
        ])}
      />
    </div>
  );
}
