"use client";

import Image from "next/image";
import { Orbitron } from "next/font/google";
import localFont from "next/font/local";
import RevealOnScroll from "./RevealOnScroll";
import AnimatedNumber from "./AnimatedNumber";

const orbitron = Orbitron({ subsets: ["latin"] });
const brushFont = localFont({ src: "../../public/fonts/road-rage/road-rage.woff2" });

export default function AboutSaya() {
  return (
    <section
      id="aboutsaya"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-8"
    >
      {/* BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/aboutsaya.svg"
          alt="Dark Cyberpunk Smoke Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* THE TYPOGRAPHY LAYER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
        <h1
          className={`${brushFont.className} text-[12vw] text-white/90 text-center leading-none tracking-tight uppercase select-none`}
        >
          SAYALABS <br /> DIGITAL CRAFT
        </h1>
      </div>

      {/* 3D Samurai model renders here via the fixed SamuraiScene overlay */}

      {/* FOOTER STATS & SOCIALS */}
      <footer
        className={`relative z-30 flex justify-between items-end w-full ${orbitron.className}`}
      >
        <RevealOnScroll y={40} animateChildren stagger={0.1}>
          <div className="flex space-x-12 text-white">
            <div>
              <div className="text-3xl font-bold">
                <AnimatedNumber value={250} suffix="+" />
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                Partners Worldwide
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                <AnimatedNumber value={20} suffix="+" />
              </div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                Team Members
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll y={40} delay={0.2}>
          <div className="flex space-x-4">
            {["fb", "yt", "github"].map((icon) => (
              <div
                key={icon}
                data-cursor="link"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 backdrop-blur-sm hover:bg-red-600 transition cursor-pointer"
              >
                <span className="text-xs uppercase">{icon}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </footer>
    </section>
  );
}
