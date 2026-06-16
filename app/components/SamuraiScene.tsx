"use client";

import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import ModelLoader from "./ModelLoader";

gsap.registerPlugin(ScrollTrigger);

const DRACO_CDN = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";
const MODEL_PATH = "/assets/samurai_optimized.glb";

useGLTF.preload(MODEL_PATH, DRACO_CDN);

/* ──────────────────────────────────────────────
   Viewport math helpers:
   With FOV=45, camera at z=5, the visible area at z=0 is:
     height ≈ 2 * 5 * tan(22.5°) ≈ 4.14 units
     width  ≈ height * aspect
   The model is normalized to 3 units tall.
   - 25% of screen = scale ~0.345  (0.25 * 4.14 / 3)
   - 70% of screen = scale ~0.966  (0.70 * 4.14 / 3)
   ────────────────────────────────────────────── */
const VIEWPORT_HEIGHT = 4.14; // units visible at z=0
const MODEL_NORMALIZED_SIZE = 3;

// Scale so model fills X% of viewport height
const scaleForPercent = (pct: number) =>
  (pct * VIEWPORT_HEIGHT) / MODEL_NORMALIZED_SIZE;

/* ──────────────────────────────────────────────
   SamuraiModel
   ────────────────────────────────────────────── */
function SamuraiModel({ isMobile }: { isMobile: boolean }) {
  const gltf = useGLTF(MODEL_PATH, DRACO_CDN);
  const groupRef = useRef<THREE.Group>(null!);
  const scrollProgress = useRef(0);      // 0→1 hero→aboutsaya center

  // Normalize & center the model geometry
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.set(-center.x, -center.y, -center.z);

    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const s = MODEL_NORMALIZED_SIZE / maxDim;
      clone.scale.multiplyScalar(s);
      clone.position.multiplyScalar(s);
    }
    return clone;
  }, [gltf.scene]);

  // ── Animation params ──
  const startScale = scaleForPercent(0.5);
  const endScale   = scaleForPercent(0.90);

  const startX = isMobile ? 1.2 : 2.0;
  const startY = isMobile ? -1.0 : -0.8;
  const endX = 0;
  const endY = isMobile ? -0.2 : 0;

  const startRotY = 2.5 * Math.PI;
  const endRotY   = 3 * Math.PI / 2;

  useEffect(() => {
    const heroEl  = document.getElementById("home");
    const aboutEl = document.getElementById("aboutsaya");
    if (!heroEl || !aboutEl) return;

    // Animation: hero top → aboutsaya center
    const mainTrigger = ScrollTrigger.create({
      trigger: heroEl,
      start: "top top",
      endTrigger: aboutEl,
      end: "center center",
      scrub: 0.5,
      onUpdate: (self) => {
        scrollProgress.current = Math.min(self.progress, 1);
      },
    });

    return () => {
      mainTrigger.kill();
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const p = scrollProgress.current;
    const eased = easeInOutCubic(p);
    const damp = 0.12;

    // Check if animation is done (model reached its final pose)
    const animDone = p >= 0.999;

    if (animDone) {
      // ── STUCK MODE: model is glued to the AboutSaya section ──
      // Read where the aboutsaya section's center is on screen right now
      const aboutEl = document.getElementById("aboutsaya");
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        const vh = window.innerHeight;

        // How far the section center is from viewport center, in pixels
        const sectionCenterPx = rect.top + rect.height / 2;
        const offsetFromCenter = sectionCenterPx - vh / 2;

        // Convert pixel offset to 3D units
        const pixelsToUnits = VIEWPORT_HEIGHT / vh;
        const sectionY = endY - offsetFromCenter * pixelsToUnits;

        // Lock to final pose + track section position
        groupRef.current.position.x = THREE.MathUtils.lerp(
          groupRef.current.position.x, endX, damp
        );
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y, sectionY, damp
        );
        const s = THREE.MathUtils.lerp(groupRef.current.scale.x, endScale, damp);
        groupRef.current.scale.setScalar(s);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y, endRotY, damp
        );

        // Hide once section is fully off-screen
        groupRef.current.visible = rect.bottom > -vh && rect.top < vh * 2;
      }
    } else {
      // ── ANIMATION MODE: model animates freely ──
      groupRef.current.visible = true;

      const targetX = THREE.MathUtils.lerp(startX, endX, eased);
      const targetY = THREE.MathUtils.lerp(startY, endY, eased);
      const targetScale = THREE.MathUtils.lerp(startScale, endScale, eased);
      const targetRotY = THREE.MathUtils.lerp(startRotY, endRotY, eased);

      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x, targetX, damp
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y, targetY, damp
      );
      const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, damp);
      groupRef.current.scale.setScalar(s);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, targetRotY, damp
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[startX, startY, 10]}
      scale={startScale}
      rotation={[0, startRotY, 0]}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

/* ──────────────────────────────────────────────
   Lighting
   ────────────────────────────────────────────── */
function SceneLighting() {
  return (
    <>
      <directionalLight position={[5, 5, 15]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-4, 3, 8]} intensity={0.8} color="#4a90d9" />
      <directionalLight position={[0, 2, 5]} intensity={1.5} color="#b0b0b0" />
      <ambientLight intensity={0.6} color="#ffffff" />
      <pointLight position={[0, -3, 12]} intensity={0.6} color="#D4A574" />
    </>
  );
}

/* ──────────────────────────────────────────────
   Camera
   ────────────────────────────────────────────── */
function CameraController({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 0, 16);
    } else {
      camera.position.set(0, 0.5, 15);
    }
    camera.lookAt(0, 0, 10);
  }, [camera, isMobile]);

  return null;
}

/* ──────────────────────────────────────────────
   Main exported component
   ────────────────────────────────────────────── */
export default function SamuraiScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ModelLoader />
      <div className="samurai-canvas-container" aria-hidden="true">
        <Canvas
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          camera={{ fov: 45, near: 0.1, far: 100 }}
          style={{ pointerEvents: "none" }}
        >
          <CameraController isMobile={isMobile} />
          <SceneLighting />
          <Suspense fallback={null}>
            <SamuraiModel isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   Easing
   ────────────────────────────────────────────── */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
