"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import RevealOnScroll from "./RevealOnScroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    kanji: "発見",
    title: "Discovery",
    desc: "We immerse ourselves in your world — brand, audience, goals, competitors. Deep research fuels sharp strategy.",
  },
  {
    number: "02",
    kanji: "戦略",
    title: "Strategy",
    desc: "Every great project needs a battle plan. Architecture, user flows, technical approach, and creative direction.",
  },
  {
    number: "03",
    kanji: "創造",
    title: "Creation",
    desc: "This is where the forge runs hot. Design and development work in lockstep, crafting experiences as beautiful as they are functional.",
  },
  {
    number: "04",
    kanji: "完成",
    title: "Launch",
    desc: "Rigorous testing, performance optimization, seamless deployment. We ensure your presence hits the ground running.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!timelineRef.current || !lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );

      const stepEls = sectionRef.current?.querySelectorAll<HTMLElement>(".process-step-v");
      stepEls?.forEach((step) => {
        const sides = step.querySelectorAll(".process-step-v__side");
        sides.forEach((side, idx) => {
          const dir = idx === 0 ? -60 : 60;
          gsap.from(side, {
            x: dir,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: step, start: "top 78%", once: true },
          });
        });

        const marker = step.querySelector(".process-step-v__marker");
        if (marker) {
          gsap.from(marker, {
            scale: 0,
            duration: 0.7,
            ease: "back.out(2)",
            scrollTrigger: { trigger: step, start: "top 72%", once: true },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section process-section" id="process">
      <div className="container">
        <div className="section-header">
          <RevealOnScroll>
            <div className="eyebrow">How We Work</div>
          </RevealOnScroll>
          <SplitText as="h2" className="section-title" split="chars" stagger={0.025}>
            THE PROCESS
          </SplitText>
          <RevealOnScroll y={30} delay={0.2}>
            <p className="section-description">
              A battle-tested methodology refined over years. Four phases that transform vision into reality with disciplined precision.
            </p>
          </RevealOnScroll>
        </div>

        <div ref={timelineRef} className="process-timeline-wrap">
          <div className="process-spine">
            <div ref={lineRef} className="process-spine__line" />
          </div>

          {steps.map((s, i) => {
            const isLeftSideContent = i % 2 === 0;
            return (
              <div key={s.number} className="process-step-v">
                <div className="process-step-v__side process-step-v__side--left">
                  {isLeftSideContent ? (
                    <>
                      <SplitText
                        as="h3"
                        className="process-step-v__title"
                        split="words"
                        stagger={0.04}
                        duration={1}
                      >
                        {s.title}
                      </SplitText>
                      <p className="process-step-v__desc">{s.desc}</p>
                    </>
                  ) : (
                    <>
                      <span className="process-step-v__num process-step-v__num--filled">
                        {s.number}
                      </span>
                      <span className="process-step-v__kanji">{s.kanji}</span>
                    </>
                  )}
                </div>
                <div className="process-step-v__marker-col">
                  <div className="process-step-v__marker" />
                </div>
                <div className="process-step-v__side process-step-v__side--right">
                  {isLeftSideContent ? (
                    <>
                      <span className="process-step-v__num">{s.number}</span>
                      <span className="process-step-v__kanji">{s.kanji}</span>
                    </>
                  ) : (
                    <>
                      <SplitText
                        as="h3"
                        className="process-step-v__title"
                        split="words"
                        stagger={0.04}
                        duration={1}
                      >
                        {s.title}
                      </SplitText>
                      <p className="process-step-v__desc">{s.desc}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
