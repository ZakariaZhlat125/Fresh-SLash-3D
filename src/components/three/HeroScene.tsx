import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  Sparkles,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

import { scrollState } from "@/lib/scroll-store";
import { JuiceGlass } from "./JuiceGlass";
import {
  Orange,
  Mango,
  Strawberry,
  WatermelonSlice,
  MintLeaf,
  IceCube,
  OrangeSlice,
  LemonSlice,
  Blueberry,
  MangoCube,
  StrawberryHalf,
  MangoHalf,
  Lemon,
} from "./fruits";

/**
 * Returns true when running on a mobile / low-end device.
 * Checked once at module load so it never triggers a re-render.
 */
const isMobile: boolean = (() => {
  if (typeof navigator === "undefined") return false;
  const touch = navigator.maxTouchPoints > 0;
  const ua = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return touch || ua || small;
})();

/** Colourful splash particles that bloom outward during section 3. */
function SplashParticles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colors = useMemo(
    () => [
      new THREE.Color("#ff8412"),
      new THREE.Color("#ff4d5e"),
      new THREE.Color("#f7b32b"),
      new THREE.Color("#4caf50"),
    ],
    [],
  );
  const data = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => {
        const dir = new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize();
        return {
          dir,
          dist: 1.5 + Math.random() * 3,
          scale: 0.04 + Math.random() * 0.09,
          color: colors[i % colors.length],
          spin: Math.random() * Math.PI,
        };
      }),
    [colors],
  );

  useFrame((state) => {
    if (!ref.current) return;
    // 0 outside section 3, ramps 0..1 across progress 0.4-0.6.
    const p = THREE.MathUtils.clamp((scrollState.progress - 0.4) * 5, 0, 1);
    const burst = Math.sin(p * Math.PI); // in then out
    const t = state.clock.elapsedTime;
    data.forEach((d, i) => {
      const r = d.dist * burst;
      dummy.position.set(
        d.dir.x * r,
        d.dir.y * r + Math.sin(t + i) * 0.1,
        d.dir.z * r,
      );
      dummy.scale.setScalar(d.scale * burst);
      dummy.rotation.set(t + d.spin, t, 0);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
      ref.current!.setColorAt(i, d.color);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, data.length]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0.2} metalness={0.1} />
    </instancedMesh>
  );
}

/** Section 4 — a swirling storm of ice cubes circling the glass. */
function IceStorm() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        angle: (i / 18) * Math.PI * 2,
        radius: 1.6 + Math.random() * 1.4,
        y: -1.2 + Math.random() * 2.6,
        speed: 0.4 + Math.random() * 0.6,
        spin: Math.random() * Math.PI * 2,
        scale: 0.12 + Math.random() * 0.16,
      })),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Active across progress 0.55-0.85, peaking mid-section 4.
    const p = THREE.MathUtils.clamp((scrollState.progress - 0.55) * 3.6, 0, 1);
    const intensity = Math.sin(p * Math.PI);
    ref.current.visible = intensity > 0.01;
    data.forEach((d, i) => {
      const a = d.angle + t * d.speed;
      dummy.position.set(
        Math.cos(a) * d.radius * (0.6 + intensity * 0.4),
        d.y + Math.sin(t * d.speed + d.spin) * 0.25,
        Math.sin(a) * d.radius * (0.6 + intensity * 0.4),
      );
      dummy.rotation.set(t * 0.6 + d.spin, t * 0.8, d.spin);
      dummy.scale.setScalar(d.scale * intensity);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, data.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#eef8ff"
        roughness={0.08}
        transmission={0.92}
        thickness={0.6}
        ior={1.31}
        clearcoat={1}
        attenuationColor="#cfeaff"
        attenuationDistance={1.5}
      />
    </instancedMesh>
  );
}

/** Section 5 — a rising spiral of mint leaves around the glass. */
function MintWhirl() {
  const ref = useRef<THREE.Group>(null);
  const leaves = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 4, // two spiral turns
        radius: 1.3 + (i / 10) * 0.9,
        y: -1.4 + (i / 10) * 3,
        scale: 0.5 + Math.random() * 0.4,
        seed: 30 + i,
      })),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    // Grows in across progress 0.78-0.98 and keeps spinning.
    const p = THREE.MathUtils.clamp((scrollState.progress - 0.78) * 5, 0, 1);
    ref.current.visible = p > 0.01;
    ref.current.scale.setScalar(p);
    ref.current.rotation.y = state.clock.elapsedTime * 0.45;
  });

  return (
    <group ref={ref}>
      {leaves.map((l, i) => (
        <MintLeaf
          key={i}
          position={[
            Math.cos(l.angle) * l.radius,
            l.y,
            Math.sin(l.angle) * l.radius,
          ]}
          scale={l.scale}
          speed={1.2}
          seed={l.seed}
        />
      ))}
      <Sparkles
        count={40}
        scale={6}
        size={2.5}
        speed={0.5}
        color="#7ed88a"
        opacity={0.7}
      />
    </group>
  );
}

/** Dynamic juice splash wrapping around the glass without touching the ground. */
function SplashRibbon() {
  const wrap = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const outer = useRef<THREE.Mesh>(null);
  const droplets = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const dropletData = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        angle: (i / 36) * Math.PI * 2,
        radius: 1.15 + Math.random() * 0.45,
        scale: 0.03 + Math.random() * 0.06,
        phase: Math.random() * Math.PI * 2,
        wave: 0.8 + Math.random() * 0.8,
      })),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (wrap.current) {
      wrap.current.rotation.y = -t * 0.35;
      wrap.current.position.y = Math.sin(t * 0.6) * 0.12 - 0.1;
    }
    if (inner.current) {
      inner.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.12;
      inner.current.rotation.y = Math.cos(t * 0.7) * 0.1;
    }
    if (outer.current) {
      outer.current.rotation.x = Math.PI / 2 - Math.cos(t * 0.6) * 0.15;
    }
    if (droplets.current) {
      dropletData.forEach((d, i) => {
        const y =
          Math.sin(t * d.wave + d.phase) * 0.25 +
          Math.sin(d.angle * 3 + t) * 0.12;
        dummy.position.set(
          Math.cos(d.angle) * d.radius,
          y,
          Math.sin(d.angle) * d.radius,
        );
        const s = d.scale * (0.8 + Math.sin(t * 2 + d.phase) * 0.2);
        dummy.scale.set(s, s * 1.6, s);
        dummy.rotation.set(0, -d.angle, Math.sin(t + d.phase) * 0.5);
        dummy.updateMatrix();
        droplets.current!.setMatrixAt(i, dummy.matrix);
      });
      droplets.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={wrap}>
      {/* main splash ring hugging the glass */}
      <mesh ref={inner} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.075, 20, 90]} />
        <meshPhysicalMaterial
          color="#ff9526"
          roughness={0.12}
          transmission={0.55}
          thickness={0.8}
          ior={1.35}
          transparent
          opacity={0.85}
          clearcoat={1}
          emissive="#ff6a00"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* thinner trailing ring */}
      <mesh ref={outer} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.25, 0]}>
        <torusGeometry args={[1.32, 0.04, 16, 90]} />
        <meshPhysicalMaterial
          color="#ffb04d"
          roughness={0.1}
          transmission={0.7}
          thickness={0.5}
          ior={1.35}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* flying splash droplets */}
      <instancedMesh
        ref={droplets}
        args={[undefined, undefined, dropletData.length]}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshPhysicalMaterial
          color="#ff9526"
          roughness={0.1}
          transmission={0.5}
          thickness={0.4}
          ior={1.35}
          transparent
          opacity={0.9}
        />
      </instancedMesh>
    </group>
  );
}

/** Fruits arranged on an orbiting ring around the glass. */
function FruitOrbit() {
  // On mobile we render only the most important fruits to stay within budget.
  const ring = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.y = state.clock.elapsedTime * 0.12;
    // Fruits fly in during section 1 (progress 0-0.25): scale + radius grow.
    const p = THREE.MathUtils.clamp(scrollState.progress * 5, 0, 1);
    const s = 0.4 + p * 0.6;
    ring.current.scale.setScalar(s);
  });

  return (
    <group ref={ring}>
      {/* ---- Core fruits (always rendered) ---- */}
      <Orange position={[2.4, 0.3, 0.2]} scale={0.85} speed={1.1} seed={1} />
      <Mango position={[-2.2, 0.9, 0.6]} scale={0.9} speed={0.9} seed={2} />
      <Strawberry
        position={[1.6, 1.4, -1.6]}
        scale={0.75}
        speed={1.3}
        seed={3}
      />
      <WatermelonSlice
        position={[-1.8, -0.6, -1.4]}
        scale={1}
        speed={1}
        seed={4}
      />
      <MintLeaf position={[0.9, 1.9, 1.1]} scale={0.9} speed={1.4} seed={7} />
      <Blueberry
        position={[0.6, 2.2, -1.3]}
        scale={0.9}
        speed={1.4}
        seed={16}
      />
      <MangoCube position={[-0.4, 2, 1.8]} scale={0.85} speed={1.1} seed={19} />
      <OrangeSlice
        position={[2.7, 1.1, -0.8]}
        scale={0.8}
        speed={1.05}
        seed={12}
      />
      <LemonSlice
        position={[-2.5, 1.7, -1]}
        scale={0.7}
        speed={0.95}
        seed={14}
      />
      {/* ---- Extra fruits — desktop only ---- */}
      {!isMobile && (
        <>
          <Orange
            position={[-2.6, -0.3, 1.2]}
            scale={0.6}
            speed={1.2}
            seed={5}
          />
          <Strawberry
            position={[2.2, -0.8, 1.4]}
            scale={0.6}
            speed={1.1}
            seed={6}
          />
          <MintLeaf
            position={[-1.1, 1.6, -0.6]}
            scale={0.7}
            speed={1.5}
            seed={8}
          />
          <IceCube
            position={[1.2, -1.4, -0.4]}
            scale={0.6}
            speed={0.8}
            seed={9}
          />
          <IceCube
            position={[-0.9, -1.2, 1.1]}
            scale={0.5}
            speed={0.9}
            seed={10}
          />
          <Mango
            position={[0.2, -1.6, 1.6]}
            scale={0.55}
            speed={1}
            seed={11}
          />
          <OrangeSlice
            position={[-1.5, -1.5, -1.8]}
            scale={0.6}
            speed={1.2}
            seed={13}
          />
          <LemonSlice
            position={[1.9, -0.2, 2]}
            scale={0.55}
            speed={1.15}
            seed={15}
          />
          <Blueberry
            position={[-2.9, 0.4, -0.3]}
            scale={0.75}
            speed={1.25}
            seed={17}
          />
          <Blueberry
            position={[2.5, 0.9, 1.5]}
            scale={0.65}
            speed={1.35}
            seed={18}
          />
          <MangoCube
            position={[2.9, -0.9, -1.2]}
            scale={0.7}
            speed={0.95}
            seed={20}
          />
          <StrawberryHalf
            position={[-1.6, -1.8, 1.2]}
            scale={0.75}
            speed={1.2}
            seed={21}
          />
          <StrawberryHalf
            position={[2.6, 1.9, 0.6]}
            scale={0.65}
            speed={1.05}
            seed={22}
          />
          <MangoHalf
            position={[-2.7, -1.1, -0.9]}
            scale={0.95}
            speed={0.85}
            seed={23}
          />
          <Lemon
            position={[-3, 1.2, 1.3]}
            scale={0.8}
            speed={1.1}
            seed={24}
          />
        </>
      )}
    </group>
  );
}

/** Studio lighting built from in-scene lightformers (no external HDRI fetch). */
function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      <Lightformer
        intensity={2.2}
        position={[0, 4, 2]}
        scale={[6, 6, 1]}
        color="#fff6e6"
      />
      <Lightformer
        intensity={1.4}
        position={[-4, 1, 2]}
        scale={[3, 6, 1]}
        color="#ffd7a1"
      />
      <Lightformer
        intensity={1.2}
        position={[4, 1, 2]}
        scale={[3, 6, 1]}
        color="#ffe9c7"
      />
      <Lightformer
        intensity={1}
        position={[0, -3, -2]}
        scale={[8, 4, 1]}
        color="#e9fff0"
      />
    </Environment>
  );
}

/** Camera parallax, mouse-follow and scroll zoom. */
function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const p = scrollState.progress;
    const zoom = 8.5 - p * 2.2; // slow zoom-in as user scrolls
    const swing = Math.sin(p * Math.PI) * 1.6; // gentle orbital swing mid-journey
    const px = scrollState.pointer.x;
    const py = scrollState.pointer.y;
    target.set(px * 1.4 + swing, 0.4 + py * 0.8, zoom);
    camera.position.lerp(target, 0.05);
    camera.lookAt(0, 0.1, 0);
  });
  return null;
}

export function HeroScene() {
  return (
    <>
      <color attach="background" args={["#fff7e9"]} />
      <fog attach="fog" args={["#fff2dd", 9, 20]} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-5, 2, -3]}
        intensity={0.8}
        color="#ffd8a8"
      />

      <StudioEnvironment />
      <CameraRig />

      <group position={[0, 0.1, 0]}>
        <JuiceGlass />
        <SplashRibbon />
        <FruitOrbit />
        <SplashParticles />
        {!isMobile && <IceStorm />}
        {!isMobile && <MintWhirl />}
        <Sparkles
          count={isMobile ? 20 : 60}
          scale={9}
          size={3}
          speed={0.35}
          color="#ffcf7a"
          opacity={0.6}
        />
      </group>

      {!isMobile && (
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.35}
          scale={12}
          blur={2.8}
          far={5}
          color="#c47a1a"
        />
      )}

      {!isMobile && (
        <EffectComposer enableNormalPass={false}>
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.04}
            bokehScale={2.5}
          />
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.6} />
        </EffectComposer>
      )}
    </>
  );
}
