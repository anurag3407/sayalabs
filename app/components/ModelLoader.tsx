"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function ModelLoader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Hide the loader when it's no longer active (meaning loading finished or failed)
    if (!active) {
      let hideTimer: NodeJS.Timeout;
      const timer = setTimeout(() => {
        setFadeOut(true);
        hideTimer = setTimeout(() => setVisible(false), 800);
      }, 0);
      return () => {
        clearTimeout(timer);
        if (hideTimer) clearTimeout(hideTimer);
      };
    }
  }, [active]);

  // Safety fallback: Never block the screen for more than 5 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 800);
    }, 5000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`model-loader ${fadeOut ? "model-loader--hidden" : ""}`}>
      <div className="model-loader__inner">
        {/* Japanese decorative text */}
        <div className="model-loader__kanji">読込中</div>

        {/* Brand */}
        <div className="model-loader__brand">SAYA LABS</div>

        {/* Progress bar */}
        <div className="model-loader__bar-track">
          <div
            className="model-loader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="model-loader__percent">
          {Math.round(progress)}
          <span className="model-loader__percent-sign">%</span>
        </div>

        {/* Loading text */}
        <div className="model-loader__text">Loading Experience</div>
      </div>
    </div>
  );
}
