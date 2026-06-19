"use client";

import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const DRACO_CDN = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";
const MODEL_PATH = "/assets/katana_optimized.glb";

useGLTF.preload(MODEL_PATH, DRACO_CDN);

const VIEWPORT_HEIGHT = 4.14;
const MODEL_NORMALIZED_SIZE = 3;

const scaleForPercent = (pct: number) =>
  (pct * VIEWPORT_HEIGHT) / MODEL_NORMALIZED_SIZE;

/* ──────────────────────────────────────────────
   Stage definitions — the katana arcs through three
   story sections, each a discrete "pose"
   ────────────────────────────────────────────── */
type Stage = {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  opacity: number;
};

const stages = {
  // 1. Drawn from below in Forge section (slightly off-screen)
  forge: {
    x: 0,
    y: -2.4,
    z: 0,
    scale: scaleForPercent(0.55),
    rotX: 0,
    rotY: 0,
    rotZ: -Math.PI / 8,
    opacity: 0,
  } as Stage,
  // 2. Blade section start — vertical, centered, dramatic
  bladeStart: {
    x: 0,
    y: 0,
    z: 0,
    scale: scaleForPercent(0.85),
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    opacity: 1,
  } as Stage,
  // 3. Blade section midpoint — rotating reveal
  bladeMid: {
    x: 0,
    y: 0,
    z: 0,
    scale: scaleForPercent(0.92),
    rotX: 0,
    rotY: Math.PI * 2,
    rotZ: 0,
    opacity: 1,
  } as Stage,
  // 4. Blade section end — slashing horizontal
  bladeEnd: {
    x: 1.0,
    y: 0.3,
    z: 0,
    scale: scaleForPercent(0.75),
    rotX: 0,
    rotY: Math.PI * 2,
    rotZ: Math.PI / 2,
    opacity: 1,
  } as Stage,
  // 5. Path section — receding upward
  path: {
    x: 1.6,
    y: 2.4,
    z: -1,
    scale: scaleForPercent(0.4),
    rotX: 0,
    rotY: Math.PI * 2.4,
    rotZ: Math.PI / 4,
    opacity: 0,
  } as Stage,
};

function lerpStage(a: Stage, b: Stage, t: number): Stage {
  return {
    x: THREE.MathUtils.lerp(a.x, b.x, t),
    y: THREE.MathUtils.lerp(a.y, b.y, t),
    z: THREE.MathUtils.lerp(a.z, b.z, t),
    scale: THREE.MathUtils.lerp(a.scale, b.scale, t),
    rotX: THREE.MathUtils.lerp(a.rotX, b.rotX, t),
    rotY: THREE.MathUtils.lerp(a.rotY, b.rotY, t),
    rotZ: THREE.MathUtils.lerp(a.rotZ, b.rotZ, t),
    opacity: THREE.MathUtils.lerp(a.opacity, b.opacity, t),
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/* ──────────────────────────────────────────────
   KatanaModel
   ────────────────────────────────────────────── */
function KatanaModel({ isMobile }: { isMobile: boolean }) {
  const gltf = useGLTF(MODEL_PATH, DRACO_CDN);
  const groupRef = useRef<THREE.Group>(null!);
  const scrollProgress = useRef(0); // 0→1 across forge top → path bottom
  const visibility = useRef(0); // 0→1 fade in/out

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

    // Mark materials transparent so we can fade
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          (mat as THREE.Material).transparent = true;
        });
      }
    });

    return clone;
  }, [gltf.scene]);

  useEffect(() => {
    const forgeEl = document.getElementById("forge");
    const bladeEl = document.getElementById("blade");
    const pathEl = document.getElementById("path");
    if (!forgeEl || !bladeEl || !pathEl) return;

    const mainTrigger = ScrollTrigger.create({
      trigger: forgeEl,
      start: "top center",
      endTrigger: pathEl,
      end: "bottom center",
      scrub: 0.5,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    // Visibility — fade in during forge, fade out at end of path
    const visTrigger = ScrollTrigger.create({
      trigger: forgeEl,
      start: "top 70%",
      endTrigger: pathEl,
      end: "bottom 30%",
      onEnter: () => gsap.to(visibility, { current: 1, duration: 0.8, ease: "power2.out" }),
      onLeave: () => gsap.to(visibility, { current: 0, duration: 0.8, ease: "power2.in" }),
      onEnterBack: () => gsap.to(visibility, { current: 1, duration: 0.8, ease: "power2.out" }),
      onLeaveBack: () => gsap.to(visibility, { current: 0, duration: 0.8, ease: "power2.in" }),
    });

    return () => {
      mainTrigger.kill();
      visTrigger.kill();
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const p = scrollProgress.current;

    // 5-stage interpolation across full scroll arc
    // 0.00 → 0.20: forge → bladeStart   (rise from below)
    // 0.20 → 0.50: bladeStart → bladeMid (rotate)
    // 0.50 → 0.75: bladeMid → bladeEnd   (slash)
    // 0.75 → 1.00: bladeEnd → path       (recede)
    let target: Stage;
    if (p < 0.2) {
      target = lerpStage(stages.forge, stages.bladeStart, easeInOutCubic(p / 0.2));
    } else if (p < 0.5) {
      target = lerpStage(stages.bladeStart, stages.bladeMid, easeInOutCubic((p - 0.2) / 0.3));
    } else if (p < 0.75) {
      target = lerpStage(stages.bladeMid, stages.bladeEnd, easeInOutCubic((p - 0.5) / 0.25));
    } else {
      target = lerpStage(stages.bladeEnd, stages.path, easeInOutCubic((p - 0.75) / 0.25));
    }

    const damp = 0.1;
    const xScale = isMobile ? 0.6 : 1;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      target.x * xScale,
      damp
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      target.y,
      damp
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      target.z,
      damp
    );
    const s = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      target.scale * (isMobile ? 0.75 : 1),
      damp
    );
    groupRef.current.scale.setScalar(s);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      target.rotX,
      damp
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target.rotY,
      damp
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      target.rotZ,
      damp
    );

    const targetOpacity = target.opacity * visibility.current;
    groupRef.current.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((mat) => {
          const m = mat as THREE.Material & { opacity: number };
          m.opacity = THREE.MathUtils.lerp(m.opacity ?? 1, targetOpacity, damp);
        });
      }
    });

    groupRef.current.visible = visibility.current > 0.01;
  });

  return (
    <group
      ref={groupRef}
      position={[stages.forge.x, stages.forge.y, stages.forge.z]}
      scale={stages.forge.scale}
      rotation={[stages.forge.rotX, stages.forge.rotY, stages.forge.rotZ]}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

/* ──────────────────────────────────────────────
   Lighting — dramatic spotlight to match blade bg
   ────────────────────────────────────────────── */
function KatanaLighting() {
  return (
    <>
      <directionalLight position={[0, 8, 6]} intensity={2.5} color="#ffeacc" />
      <directionalLight position={[-3, 2, 8]} intensity={0.8} color="#4a90d9" />
      <directionalLight position={[3, -2, 6]} intensity={0.6} color="#c41e3a" />
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight position={[0, -4, 10]} intensity={1.0} color="#D4A574" />
      <spotLight
        position={[0, 6, 4]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.5}
        color="#ffd9a0"
      />
    </>
  );
}

function CameraController({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 0, 14);
    } else {
      camera.position.set(0, 0.2, 13);
    }
    camera.lookAt(0, 0, 0);
  }, [camera, isMobile]);

  return null;
}

export default function KatanaScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

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

  // Perf gate: only run the render loop while the forge→path zone is on screen.
  useEffect(() => {
    if (!mounted) return;
    const forgeEl = document.getElementById("forge");
    const pathEl = document.getElementById("path");
    if (!forgeEl || !pathEl) return;
    const gate = ScrollTrigger.create({
      trigger: forgeEl,
      start: "top bottom",
      endTrigger: pathEl,
      end: "bottom top",
      onToggle: (self) => setActive(self.isActive),
    });
    return () => gate.kill();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="katana-canvas-container"
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
        camera={{ fov: 45, near: 0.1, far: 100 }}
        style={{ pointerEvents: "none" }}
      >
        <CameraController isMobile={isMobile} />
        <KatanaLighting />
        <Suspense fallback={null}>
          <KatanaModel isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
