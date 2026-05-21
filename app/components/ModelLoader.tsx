"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function ModelLoader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      setFadeOut(true);
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

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
