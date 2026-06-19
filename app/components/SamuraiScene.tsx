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

const MODEL_NORMALIZED_SIZE = 5;
// Front-facing yaw for this GLB (camera looks down −z).
const BASE_ROT_Y = (3 * Math.PI) / 2;

/* ──────────────────────────────────────────────
   Cinematic camera keyframes — one per saga beat.
   The model sits at the origin; the camera ORBITS
   (big px swings) + dollies, and the model adds large
   yaw so you see it from changing angles — not just
   up/down. Beat 1 frames the figure on the RIGHT.
   ────────────────────────────────────────────── */
type CamStop = {
  px: number; py: number; pz: number;
  tx: number; ty: number; tz: number;
  fov: number; mRotY: number;
};

// Saga beats occupy progress 0 → SAGA_END; the rest/stick blend runs after.
const SAGA_END = 0.8;
const STOP_POSITIONS = [0.10, 0.34, 0.58, 0.80];

const STOPS_DESKTOP: CamStop[] = [
  // intro — figure on the RIGHT, low dramatic 3/4
  { px: -1.6, py: -0.20, pz: 8.0, tx: -1.35, ty: 0.05, tz: 0, fov: 44, mRotY: -0.55 },
  // vow (copy left → model right) — orbit left, dolly in, big turn
  { px: -2.7, py: 0.10, pz: 6.8, tx: -1.15, ty: 0.0, tz: 0, fov: 41, mRotY: -1.55 },
  // edge (copy right → model left) — swing around to the other side, crane up
  { px: 2.7, py: 0.42, pz: 6.8, tx: 1.15, ty: 0.05, tz: 0, fov: 41, mRotY: 0.75 },
  // craft — settle to centered front
  { px: 0.0, py: 0.26, pz: 8.6, tx: 0.0, ty: 0.15, tz: 0, fov: 39, mRotY: 0.0 },
];

const STOPS_MOBILE: CamStop[] = [
  { px: -0.9, py: -0.15, pz: 10.0, tx: -0.75, ty: 0.05, tz: 0, fov: 47, mRotY: -0.45 },
  { px: -1.5, py: 0.10, pz: 9.0, tx: -0.62, ty: 0.0, tz: 0, fov: 45, mRotY: -1.3 },
  { px: 1.5, py: 0.34, pz: 9.0, tx: 0.62, ty: 0.05, tz: 0, fov: 45, mRotY: 0.65 },
  { px: 0.0, py: 0.22, pz: 10.2, tx: 0.0, ty: 0.12, tz: 0, fov: 43, mRotY: 0.0 },
];

// Rest pose — straight-on camera so the screen→world math for the
// card stays simple. The model is moved to the card and stuck there.
const REST_DESKTOP = { pz: 8.5, fov: 42, scale: 0.6, yOff: 0.35 };
const REST_MOBILE = { pz: 10.0, fov: 44, scale: 0.5, yOff: 0.25 };

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function smoothstep(e0: number, e1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

function sampleStops(stops: CamStop[], p: number): CamStop {
  if (p <= STOP_POSITIONS[0]) return stops[0];
  if (p >= STOP_POSITIONS[STOP_POSITIONS.length - 1]) return stops[stops.length - 1];
  let i = 0;
  while (i < STOP_POSITIONS.length - 1 && p > STOP_POSITIONS[i + 1]) i++;
  const a = stops[i];
  const b = stops[i + 1];
  const seg = (p - STOP_POSITIONS[i]) / (STOP_POSITIONS[i + 1] - STOP_POSITIONS[i]);
  const t = easeInOutCubic(seg);
  const L = THREE.MathUtils.lerp;
  return {
    px: L(a.px, b.px, t), py: L(a.py, b.py, t), pz: L(a.pz, b.pz, t),
    tx: L(a.tx, b.tx, t), ty: L(a.ty, b.ty, t), tz: L(a.tz, b.tz, t),
    fov: L(a.fov, b.fov, t), mRotY: L(a.mRotY, b.mRotY, t),
  };
}

function SamuraiModel({ isMobile }: { isMobile: boolean }) {
  const gltf = useGLTF(MODEL_PATH, DRACO_CDN);
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();

  const progress = useRef(0);
  const vis = useRef(0);
  const camTarget = useRef(new THREE.Vector3(-1.35, 0.05, 0));
  const stops = isMobile ? STOPS_MOBILE : STOPS_DESKTOP;
  const rest = isMobile ? REST_MOBILE : REST_DESKTOP;

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
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => ((m as THREE.Material).transparent = true));
      }
    });
    return clone;
  }, [gltf.scene]);

  useEffect(() => {
    const homeEl = document.getElementById("home");
    const forgeEl = document.getElementById("forge");
    if (!homeEl || !forgeEl) return;

    // Master progress: 0 at the very top, 1 once the Forge (and its stamp
    // card) is on screen — the last 20% blends from the saga arc into the
    // rest pose stuck on the card.
    const main = ScrollTrigger.create({
      trigger: homeEl,
      start: "top top",
      endTrigger: forgeEl,
      end: "top 30%",
      scrub: 1,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    const visTrigger = ScrollTrigger.create({
      trigger: homeEl,
      start: "top 60%",
      endTrigger: forgeEl,
      end: "bottom top",
      onEnter: () => gsap.to(vis, { current: 1, duration: 0.9, ease: "power2.out" }),
      onLeave: () => gsap.to(vis, { current: 0, duration: 0.6, ease: "power2.in" }),
      onEnterBack: () => gsap.to(vis, { current: 1, duration: 0.9, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(vis, { current: 0, duration: 0.6, ease: "power2.in" }),
    });

    return () => {
      main.kill();
      visTrigger.kill();
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const cam = camera as THREE.PerspectiveCamera;
    const g = groupRef.current;
    const damp = 0.1;
    const p = progress.current;

    // How far we are into the rest/stick blend (0 = full saga, 1 = stuck).
    const restBlend = smoothstep(SAGA_END, 1.0, p);

    // ── Saga camera state ──
    const sagaP = THREE.MathUtils.clamp(p / SAGA_END, 0, 1);
    const s = sampleStops(stops, sagaP);

    // ── Rest state: where is the Forge stamp card on screen right now? ──
    let restX = 0, restY = rest.yOff;
    let restVisFactor = 1;
    const stampEl = document.getElementById("forge-stamp");
    if (stampEl) {
      const r = stampEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const visH = 2 * rest.pz * Math.tan((rest.fov * Math.PI) / 180 / 2);
      const visW = visH * (vw / vh);
      restX = ((cx - vw / 2) / vw) * visW;
      restY = -((cy - vh / 2) / vh) * visH + rest.yOff;
      // Fade as the card scrolls up past the top.
      restVisFactor = THREE.MathUtils.clamp(r.bottom / (vh * 0.35), 0, 1);
    }

    // ── Fully rested: rigid-lock to the card like a flat 2D image (no drift) ──
    if (restBlend >= 0.999) {
      cam.position.set(0, 0, rest.pz);
      camTarget.current.set(0, 0, 0);
      cam.lookAt(camTarget.current);
      if (Math.abs(cam.fov - rest.fov) > 0.001) {
        cam.fov = rest.fov;
        cam.updateProjectionMatrix();
      }
      g.position.set(restX, restY, 0); // set directly — stuck to the card
      g.scale.setScalar(rest.scale);
      g.rotation.y = BASE_ROT_Y;

      const restOpacity = vis.current * restVisFactor;
      g.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.isMesh && mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            const m = mat as THREE.Material & { opacity: number };
            m.opacity = THREE.MathUtils.lerp(m.opacity ?? 1, restOpacity, 0.2);
          });
        }
      });
      g.visible = restOpacity > 0.01;
      return;
    }

    // ── Blend camera (saga orbit → straight-on rest) ──
    const camX = THREE.MathUtils.lerp(s.px, 0, restBlend);
    const camY = THREE.MathUtils.lerp(s.py, 0, restBlend);
    const camZ = THREE.MathUtils.lerp(s.pz, rest.pz, restBlend);
    const tgX = THREE.MathUtils.lerp(s.tx, 0, restBlend);
    const tgY = THREE.MathUtils.lerp(s.ty, 0, restBlend);
    const fov = THREE.MathUtils.lerp(s.fov, rest.fov, restBlend);

    cam.position.x = THREE.MathUtils.lerp(cam.position.x, camX, damp);
    cam.position.y = THREE.MathUtils.lerp(cam.position.y, camY, damp);
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, camZ, damp);
    camTarget.current.x = THREE.MathUtils.lerp(camTarget.current.x, tgX, damp);
    camTarget.current.y = THREE.MathUtils.lerp(camTarget.current.y, tgY, damp);
    cam.lookAt(camTarget.current);
    if (Math.abs(fov - cam.fov) > 0.001) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, fov, damp);
      cam.updateProjectionMatrix();
    }

    // ── Blend model transform (origin/center → stuck on card) ──
    const posX = THREE.MathUtils.lerp(0, restX, restBlend);
    const posY = THREE.MathUtils.lerp(0, restY, restBlend);
    const scl = THREE.MathUtils.lerp(1, rest.scale, restBlend);
    const rotY = THREE.MathUtils.lerp(BASE_ROT_Y + s.mRotY, BASE_ROT_Y, restBlend);

    g.position.x = THREE.MathUtils.lerp(g.position.x, posX, damp);
    g.position.y = THREE.MathUtils.lerp(g.position.y, posY, damp);
    const sc = THREE.MathUtils.lerp(g.scale.x, scl, damp);
    g.scale.setScalar(sc);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, rotY, damp);

    // ── Opacity / visibility ──
    const opacityTarget = vis.current * THREE.MathUtils.lerp(1, restVisFactor, restBlend);
    g.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          const m = mat as THREE.Material & { opacity: number };
          m.opacity = THREE.MathUtils.lerp(m.opacity ?? 1, opacityTarget, 0.12);
        });
      }
    });
    g.visible = opacityTarget > 0.01 || g.scale.x > 0.02;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, BASE_ROT_Y, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* Strong, dramatic lighting so the figure reads clearly. */
function SceneLighting() {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#181420", 1.3]} />
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[5, 9, 9]} intensity={3.6} color="#fff3e2" />
      <directionalLight position={[-7, 4, 6]} intensity={1.7} color="#9fc4ff" />
      <directionalLight position={[0, 4, -7]} intensity={2.2} color="#C41E3A" />
      <spotLight position={[0, 10, 5]} angle={0.7} penumbra={0.9} intensity={2.6} color="#ffd9a0" />
      <pointLight position={[0, -2, 9]} intensity={1.1} color="#D4A574" />
    </>
  );
}

export default function SamuraiScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(timer);
    };
  }, []);

  // Perf gate: run the render loop while the saga → forge-rest zone is on screen.
  useEffect(() => {
    if (!mounted) return;
    const homeEl = document.getElementById("home");
    const forgeEl = document.getElementById("forge");
    if (!homeEl || !forgeEl) return;
    const gate = ScrollTrigger.create({
      trigger: homeEl,
      start: "top bottom",
      endTrigger: forgeEl,
      end: "bottom top",
      onToggle: (self) => setActive(self.isActive),
    });
    return () => gate.kill();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <ModelLoader />
      <div
        className="samurai-canvas-container"
        aria-hidden="true"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.45s ease" }}
      >
        <Canvas
          frameloop={active ? "always" : "never"}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          camera={{ fov: 44, near: 0.1, far: 100, position: [-1.6, -0.2, 8.0] }}
          style={{ pointerEvents: "none" }}
        >
          <SceneLighting />
          <Suspense fallback={null}>
            <SamuraiModel isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
