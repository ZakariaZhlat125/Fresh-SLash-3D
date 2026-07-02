import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scroll-store";

/** A stylised drinking glass filled with fresh orange juice. */
export function JuiceGlass() {
  const group = useRef<THREE.Group>(null);
  const juice = useRef<THREE.Mesh>(null);
  const surface = useRef<THREE.Mesh>(null);
  const bubbles = useRef<THREE.InstancedMesh>(null);

  const bubbleData = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        x: (Math.random() - 0.5) * 0.9,
        z: (Math.random() - 0.5) * 0.9,
        offset: Math.random(),
        speed: 0.3 + Math.random() * 0.5,
        scale: 0.02 + Math.random() * 0.05,
      })),
    [],
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Condensation droplets on the outside of the glass (static, set once).
  const drops = useRef<THREE.InstancedMesh>(null);
  const dropData = useMemo(
    () =>
      Array.from({ length: 90 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const h = -0.8 + Math.random() * 1.55;
        // glass tapers 0.62 (bottom) -> 0.78 (top) over height 1.7
        const r = THREE.MathUtils.lerp(0.62, 0.78, (h + 0.85) / 1.7) + 0.01;
        return {
          angle,
          pos: new THREE.Vector3(Math.cos(angle) * r, h, Math.sin(angle) * r),
          scale: 0.015 + Math.random() * 0.035,
          stretch: 1 + Math.random() * 0.8,
        };
      }),
    [],
  );

  useLayoutEffect(() => {
    if (!drops.current) return;
    dropData.forEach((d, i) => {
      dummy.position.copy(d.pos);
      dummy.rotation.set(0, -d.angle, 0);
      dummy.scale.set(d.scale, d.scale * d.stretch, d.scale * 0.55);
      dummy.updateMatrix();
      drops.current!.setMatrixAt(i, dummy.matrix);
    });
    drops.current.instanceMatrix.needsUpdate = true;
  }, [dropData, dummy]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Whole glass: slow float + gentle rotation, reacts to hover + pointer.
    if (group.current) {
      const hoverBoost = scrollState.hoverGlass ? 1 : 0;
      group.current.position.y = Math.sin(t * 0.6) * 0.12;
      group.current.rotation.y += 0.004 + hoverBoost * 0.02;
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        scrollState.pointer.x * 0.08,
        0.05,
      );
    }

    // Juice fill level animates as juice "pours" in section 2 (progress 0.25-0.55).
    if (juice.current && surface.current) {
      const fill = THREE.MathUtils.clamp(
        (scrollState.progress - 0.2) * 3.2,
        0.35,
        1,
      );
      juice.current.scale.y = fill;
      juice.current.position.y = -0.75 + (fill * 1.4) / 2;
      const top = -0.75 + fill * 1.4;
      surface.current.position.y = top;
      // wobbling juice surface
      surface.current.rotation.z = Math.sin(t * 2.2) * 0.05;
      surface.current.rotation.x = Math.cos(t * 1.8) * 0.05;
    }

    // Rising bubbles inside the juice.
    if (bubbles.current) {
      bubbleData.forEach((b, i) => {
        const h = (t * b.speed + b.offset) % 1;
        dummy.position.set(b.x, -0.7 + h * 1.3, b.z);
        dummy.scale.setScalar(b.scale * (1 - h * 0.4));
        dummy.updateMatrix();
        bubbles.current!.setMatrixAt(i, dummy.matrix);
      });
      bubbles.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* Glass body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.78, 0.62, 1.7, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0}
          transmission={1}
          thickness={0.5}
          ior={1.5}
          transparent
          opacity={0.35}
          clearcoat={1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Glass base */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.06, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0}
          transmission={0.9}
          thickness={0.4}
          ior={1.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Juice fill */}
      <mesh ref={juice} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.72, 0.58, 1.4, 64]} />
        <meshPhysicalMaterial
          color="#ff8412"
          roughness={0.25}
          transmission={0.35}
          thickness={1.2}
          ior={1.35}
          transparent
          opacity={0.95}
          emissive="#ff5a00"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* Juice surface */}
      <mesh ref={surface} position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.71, 0.71, 0.02, 64]} />
        <meshPhysicalMaterial
          color="#ffa733"
          roughness={0.15}
          metalness={0}
          clearcoat={1}
          emissive="#ff7a1a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Bubbles */}
      <instancedMesh
        ref={bubbles}
        args={[undefined, undefined, bubbleData.length]}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial
          color="#fff3d6"
          transparent
          opacity={0.6}
          roughness={0.2}
        />
      </instancedMesh>

      {/* Water droplets on the outside of the glass */}
      <instancedMesh ref={drops} args={[undefined, undefined, dropData.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.05}
          transmission={0.95}
          thickness={0.1}
          ior={1.33}
          transparent
          opacity={0.7}
          clearcoat={1}
        />
      </instancedMesh>

      {/* Orange wheel garnish on the rim */}
      <group position={[0.72, 0.86, 0]} rotation={[0, 0, -0.15]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry
            args={[0.34, 0.34, 0.06, 40, 1, false, 0, Math.PI * 1.75]}
          />
          <meshStandardMaterial
            color="#ff8a1e"
            roughness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.86, 1.1, 0.86]}>
          <cylinderGeometry
            args={[0.34, 0.34, 0.06, 40, 1, false, 0, Math.PI * 1.75]}
          />
          <meshPhysicalMaterial
            color="#ffa030"
            roughness={0.3}
            clearcoat={0.8}
            transmission={0.2}
            thickness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Straw */}
      <mesh position={[0.28, 0.7, 0]} rotation={[0, 0, 0.28]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 2.2, 20]} />
        <meshStandardMaterial color="#ff4d6d" roughness={0.35} />
      </mesh>
    </group>
  );
}
