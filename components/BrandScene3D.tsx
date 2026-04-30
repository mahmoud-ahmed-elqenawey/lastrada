"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { MotionValue } from "motion";
import { useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Shard = {
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
};

const shards: Shard[] = [
  { color: "#2f4197", position: [-1.25, 0.82, 0], rotation: [0.22, 0.08, -0.65], scale: [0.16, 1.6, 0.38] },
  { color: "#30a9dc", position: [0.18, 1.25, -0.15], rotation: [0.08, 0.28, 0.86], scale: [0.14, 1.36, 0.34] },
  { color: "#39b54a", position: [1.22, 0.42, 0.12], rotation: [-0.12, 0.22, 1.42], scale: [0.15, 1.42, 0.36] },
  { color: "#f9a72b", position: [0.96, -0.8, -0.08], rotation: [0.2, -0.18, 2.35], scale: [0.16, 1.5, 0.36] },
  { color: "#ef4639", position: [-0.26, -1.28, 0.16], rotation: [-0.1, 0.28, 3.12], scale: [0.16, 1.36, 0.36] },
  { color: "#7158a6", position: [-1.32, -0.34, -0.12], rotation: [0.12, -0.24, -2.18], scale: [0.15, 1.42, 0.36] },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function usePageScrollProgress() {
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return progress;
}

function BrandObject({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    const p = progress.get();
    const t = time.current;

    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.z = -0.26 + p * 1.15 + Math.sin(t * 0.25) * 0.04;
      group.current.position.y = Math.sin(t * 0.42) * 0.08 + (p - 0.5) * 0.55;
      group.current.scale.setScalar(0.9 + p * 0.28);
    }

    if (ring.current) {
      ring.current.rotation.z = t * 0.16 - p * 1.5;
    }
  });

  return (
    <Float speed={0.75} rotationIntensity={0.18} floatIntensity={0.32} floatingRange={[-0.08, 0.08]}>
      <group ref={group} position={[2.45, -0.15, -1.15]} rotation={[0.04, -0.35, -0.26]}>
        <mesh ref={ring}>
          <torusGeometry args={[1.55, 0.018, 12, 120]} />
          <meshBasicMaterial color="#f8f8f4" transparent opacity={0.28} />
        </mesh>

        <mesh>
          <torusGeometry args={[0.68, 0.012, 8, 80]} />
          <meshBasicMaterial color="#30a9dc" transparent opacity={0.22} />
        </mesh>

        {shards.map((shard) => (
          <mesh
            key={shard.color}
            position={shard.position}
            rotation={shard.rotation}
            scale={shard.scale}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={shard.color}
              emissive={shard.color}
              emissiveIntensity={0.85}
              roughness={0.28}
              metalness={0.34}
              transparent
              opacity={0.82}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function BrandScene3D() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const scrollYProgress = usePageScrollProgress();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted || shouldReduceMotion || isMobile) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] hidden opacity-70 md:block" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        fallback={null}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[2, 3, 4]} intensity={1.6} />
        <pointLight position={[-3, -2, 2]} intensity={18} color="#ef4639" />
        <pointLight position={[3, 2, 3]} intensity={16} color="#30a9dc" />
        <BrandObject progress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
