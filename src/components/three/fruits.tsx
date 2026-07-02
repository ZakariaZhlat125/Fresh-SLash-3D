import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type FloatProps = {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  rotationSpeed?: number;
  seed?: number;
};

// Small deterministic hash so each instance floats with its own phase.
function usePhase(seed = 0) {
  return useMemo(() => seed * 12.9898 + 4.1414, [seed]);
}

/** Shared gentle floating + rotation behaviour. */
function useFloat(
  ref: React.RefObject<THREE.Group | null>,
  { position, speed = 1, rotationSpeed = 0.3, seed = 0 }: FloatProps,
) {
  const phase = usePhase(seed);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.position.y = position[1] + Math.sin(t * speed + phase) * 0.22;
    g.position.x = position[0] + Math.cos(t * speed * 0.6 + phase) * 0.08;
    g.rotation.y += rotationSpeed * 0.01;
    g.rotation.x = Math.sin(t * 0.4 + phase) * 0.18;
  });
}

// ---------- procedural texture helpers (cached, canvas-generated) ----------
const texCache = new Map<string, THREE.Texture>();

function canvasTexture(
  key: string,
  draw: (ctx: CanvasRenderingContext2D, s: number) => void,
  srgb = true,
  size = 256,
): THREE.Texture {
  const cached = texCache.get(key);
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  texCache.set(key, tex);
  return tex;
}

function speckles(
  ctx: CanvasRenderingContext2D,
  s: number,
  count: number,
  colors: string[],
  rMin: number,
  rMax: number,
) {
  for (let i = 0; i < count; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(
      Math.random() * s,
      Math.random() * s,
      rMin + Math.random() * (rMax - rMin),
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
}

/** Subtle noise bump shared by juicy pulp surfaces. */
function usePulpBump() {
  return useMemo(
    () =>
      canvasTexture(
        "pulp-bump",
        (ctx, s) => {
          ctx.fillStyle = "#808080";
          ctx.fillRect(0, 0, s, s);
          speckles(
            ctx,
            s,
            700,
            ["rgba(60,60,60,0.4)", "rgba(200,200,200,0.3)"],
            0.8,
            2,
          );
        },
        false,
      ),
    [],
  );
}

export function Orange(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  const maps = useMemo(() => {
    const map = canvasTexture("orange-map", (ctx, s) => {
      ctx.fillStyle = "#f97f16";
      ctx.fillRect(0, 0, s, s);
      speckles(
        ctx,
        s,
        800,
        ["rgba(255,170,80,0.35)", "rgba(205,95,10,0.3)"],
        0.8,
        2.5,
      );
      // faint green tinge near the stem (top of UV)
      const tinge = ctx.createLinearGradient(0, 0, 0, s * 0.18);
      tinge.addColorStop(0, "rgba(150,160,60,0.28)");
      tinge.addColorStop(1, "rgba(150,160,60,0)");
      ctx.fillStyle = tinge;
      ctx.fillRect(0, 0, s, s * 0.18);
    });
    const bump = canvasTexture(
      "orange-bump",
      (ctx, s) => {
        ctx.fillStyle = "#808080";
        ctx.fillRect(0, 0, s, s);
        speckles(
          ctx,
          s,
          900,
          ["rgba(40,40,40,0.5)", "rgba(220,220,220,0.35)"],
          1,
          2.2,
        );
      },
      false,
    );
    return { map, bump };
  }, []);
  return (
    <group ref={ref} position={props.position} scale={props.scale ?? 1}>
      <mesh castShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhysicalMaterial
          map={maps.map}
          bumpMap={maps.bump}
          bumpScale={0.35}
          roughness={0.5}
          clearcoat={0.35}
          clearcoatRoughness={0.6}
          sheen={0.3}
          sheenColor="#ffb35c"
        />
      </mesh>
      {/* stem */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.025, 0.045, 0.07, 8]} />
        <meshStandardMaterial color="#6d4c2b" roughness={0.9} />
      </mesh>
      {/* small leaf at the stem */}
      <mesh
        position={[0.1, 0.53, 0]}
        rotation={[0.3, 0, -0.9]}
        scale={[0.22, 0.02, 0.1]}
      >
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial
          color="#3f8f2f"
          roughness={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* navel dimple at the bottom */}
      <mesh position={[0, -0.49, 0]} scale={[0.07, 0.025, 0.07]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color="#c9660e" roughness={0.95} />
      </mesh>
    </group>
  );
}

export function Mango(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  const map = useMemo(
    () =>
      canvasTexture("mango-map", (ctx, s) => {
        const g = ctx.createLinearGradient(0, 0, 0, s);
        g.addColorStop(0, "#e6653c");
        g.addColorStop(0.35, "#ff9d3c");
        g.addColorStop(1, "#ffc855");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
        // red sun blush
        const blush = ctx.createRadialGradient(
          s * 0.3,
          s * 0.25,
          0,
          s * 0.3,
          s * 0.25,
          s * 0.45,
        );
        blush.addColorStop(0, "rgba(214,66,48,0.55)");
        blush.addColorStop(1, "rgba(214,66,48,0)");
        ctx.fillStyle = blush;
        ctx.fillRect(0, 0, s, s);
        speckles(
          ctx,
          s,
          450,
          ["rgba(120,60,20,0.18)", "rgba(255,230,170,0.15)"],
          0.7,
          1.8,
        );
        // faint vertical ripening streaks
        ctx.strokeStyle = "rgba(200,110,40,0.1)";
        ctx.lineWidth = s * 0.012;
        for (let i = 0; i < 12; i++) {
          const x = Math.random() * s;
          ctx.beginPath();
          ctx.moveTo(x, Math.random() * s * 0.3);
          ctx.quadraticCurveTo(
            x + s * 0.03,
            s * 0.5,
            x,
            s * (0.7 + Math.random() * 0.3),
          );
          ctx.stroke();
        }
      }),
    [],
  );
  return (
    <group ref={ref} position={props.position} scale={props.scale ?? 1}>
      <mesh castShadow scale={[1, 0.82, 1.35]} rotation={[0.3, 0, 0.4]}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhysicalMaterial
          map={map}
          roughness={0.32}
          clearcoat={0.6}
          clearcoatRoughness={0.35}
          sheen={0.2}
          sheenColor="#ffd28a"
        />
      </mesh>
      {/* stem dimple */}
      <mesh position={[0.28, 0.38, -0.28]} rotation={[0.3, 0, 0.4]}>
        <cylinderGeometry args={[0.02, 0.035, 0.06, 8]} />
        <meshStandardMaterial color="#7a5230" roughness={0.9} />
      </mesh>
    </group>
  );
}

export function Strawberry(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  // Berry silhouette: sphere tapered toward the bottom tip.
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.42, 48, 48);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = (v.y + 0.42) / 0.84; // 0 bottom tip, 1 top
      const taper = 0.45 + 0.55 * Math.pow(t, 0.7);
      pos.setXYZ(i, v.x * taper, v.y * 1.2, v.z * taper);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
  const maps = useMemo(() => {
    const drawSeeds = (
      ctx: CanvasRenderingContext2D,
      s: number,
      seed: string,
      rim: string,
    ) => {
      const rows = 10;
      const cols = 13;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ((c + (r % 2 ? 0.5 : 0)) / cols) * s;
          const y = ((r + 0.5) / rows) * s;
          ctx.fillStyle = rim;
          ctx.beginPath();
          ctx.ellipse(x, y, s * 0.016, s * 0.026, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = seed;
          ctx.beginPath();
          ctx.ellipse(x, y, s * 0.01, s * 0.02, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    const map = canvasTexture("strawberry-map", (ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, 0, s);
      g.addColorStop(0, "#f76d6d"); // pale shoulder near the calyx
      g.addColorStop(0.18, "#e8324e");
      g.addColorStop(0.6, "#d42440");
      g.addColorStop(1, "#c11c36");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      speckles(
        ctx,
        s,
        150,
        ["rgba(255,150,150,0.15)", "rgba(140,10,30,0.15)"],
        1,
        2.5,
      );
      drawSeeds(ctx, s, "#f5d76e", "rgba(120,15,30,0.75)");
    });
    const bump = canvasTexture(
      "strawberry-bump",
      (ctx, s) => {
        ctx.fillStyle = "#909090";
        ctx.fillRect(0, 0, s, s);
        drawSeeds(ctx, s, "#e8e8e8", "#303030");
      },
      false,
    );
    return { map, bump };
  }, []);
  return (
    <group ref={ref} position={props.position} scale={props.scale ?? 1}>
      <mesh castShadow geometry={geometry}>
        <meshPhysicalMaterial
          map={maps.map}
          bumpMap={maps.bump}
          bumpScale={0.5}
          roughness={0.28}
          clearcoat={0.9}
          clearcoatRoughness={0.25}
        />
      </mesh>
      {/* leafy calyx */}
      <group position={[0, 0.46, 0]}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            rotation={[1.15, (i / 6) * Math.PI * 2, 0]}
            position={[
              Math.sin((i / 6) * Math.PI * 2) * 0.1,
              0.02,
              Math.cos((i / 6) * Math.PI * 2) * 0.1,
            ]}
            scale={[0.09, 0.02, 0.24]}
          >
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial
              color="#3f8f2f"
              roughness={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 0.14, 8]} />
          <meshStandardMaterial color="#4d8a2f" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

export function WatermelonSlice(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  const pulp = usePulpBump();
  const rindMap = useMemo(
    () =>
      canvasTexture("watermelon-rind", (ctx, s) => {
        ctx.fillStyle = "#3f9e44";
        ctx.fillRect(0, 0, s, s);
        // dark wavy stripes
        ctx.strokeStyle = "#1f6b2a";
        ctx.lineWidth = s * 0.055;
        for (let i = 0; i < 7; i++) {
          const x = (i / 7) * s + s * 0.05;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          for (let y = 0; y <= s; y += s / 8) {
            ctx.lineTo(x + Math.sin((y / s) * Math.PI * 4 + i) * s * 0.02, y);
          }
          ctx.stroke();
        }
        speckles(
          ctx,
          s,
          200,
          ["rgba(255,255,255,0.06)", "rgba(0,60,10,0.12)"],
          0.6,
          1.6,
        );
      }),
    [],
  );
  const seeds = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const ring = Math.floor(i / 6);
        const a = 0.3 + (i % 6) * ((Math.PI - 0.6) / 5) + ring * 0.12;
        const r = [0.44, 0.3, 0.16][ring] ?? 0.16;
        return {
          pos: [Math.cos(a) * r, (i % 2 ? 1 : -1) * 0.078, Math.sin(a) * r] as [
            number,
            number,
            number,
          ],
          rot: a,
          white: i % 5 === 4, // some immature white seeds
        };
      }),
    [],
  );
  return (
    <group
      ref={ref}
      position={props.position}
      scale={props.scale ?? 1}
      rotation={[0.4, 0, 0.3]}
    >
      {/* striped rind */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.16, 48, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          map={rindMap}
          roughness={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* white pith */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.9, 0.9, 1.02]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 48, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          color="#eaf7ea"
          roughness={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* juicy red flesh */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.78, 0.78, 1.05]}>
        <cylinderGeometry args={[0.6, 0.6, 0.14, 48, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial
          color="#ff3d52"
          bumpMap={pulp}
          bumpScale={0.2}
          roughness={0.32}
          clearcoat={0.7}
          clearcoatRoughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* seeds on both flat faces */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {seeds.map((sd, i) => (
          <mesh
            key={i}
            position={sd.pos}
            rotation={[Math.PI / 2, 0, sd.rot]}
            scale={[0.028, 0.045, 0.014]}
          >
            <sphereGeometry args={[1, 10, 8]} />
            <meshStandardMaterial
              color={sd.white ? "#f2e8d4" : "#26160c"}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function MintLeaf(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, { ...props, rotationSpeed: (props.rotationSpeed ?? 1) * 2 });
  const { geo, map } = useMemo(() => {
    // Real leaf outline with normalized UVs for the vein texture.
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.5);
    shape.quadraticCurveTo(0.38, -0.25, 0.3, 0.15);
    shape.quadraticCurveTo(0.22, 0.42, 0, 0.55);
    shape.quadraticCurveTo(-0.22, 0.42, -0.3, 0.15);
    shape.quadraticCurveTo(-0.38, -0.25, 0, -0.5);
    const geometry = new THREE.ShapeGeometry(shape, 24);
    geometry.computeBoundingBox();
    const bb = geometry.boundingBox!;
    const uv = geometry.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(
        i,
        (uv.getX(i) - bb.min.x) / (bb.max.x - bb.min.x),
        (uv.getY(i) - bb.min.y) / (bb.max.y - bb.min.y),
      );
    }
    const texture = canvasTexture("mint-map", (ctx, s) => {
      const g = ctx.createLinearGradient(0, s, 0, 0);
      g.addColorStop(0, "#2f7d32");
      g.addColorStop(1, "#58b35a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      // central vein
      ctx.strokeStyle = "rgba(222,245,212,0.85)";
      ctx.lineWidth = s * 0.016;
      ctx.beginPath();
      ctx.moveTo(s / 2, s * 0.02);
      ctx.lineTo(s / 2, s * 0.96);
      ctx.stroke();
      // side veins
      ctx.lineWidth = s * 0.008;
      ctx.strokeStyle = "rgba(215,240,205,0.55)";
      for (let i = 0; i < 8; i++) {
        const y = s * (0.12 + i * 0.105);
        ctx.beginPath();
        ctx.moveTo(s / 2, y);
        ctx.quadraticCurveTo(s * 0.7, y - s * 0.06, s * 0.92, y - s * 0.13);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s / 2, y);
        ctx.quadraticCurveTo(s * 0.3, y - s * 0.06, s * 0.08, y - s * 0.13);
        ctx.stroke();
      }
    });
    return { geo: geometry, map: texture };
  }, []);
  return (
    <group ref={ref} position={props.position} scale={props.scale ?? 1}>
      <mesh geometry={geo} castShadow rotation={[-0.6, 0.3, 0.2]} scale={0.95}>
        <meshStandardMaterial
          map={map}
          roughness={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        geometry={geo}
        rotation={[-0.4, -0.7, -0.4]}
        position={[0.2, -0.06, 0.12]}
        scale={0.65}
      >
        <meshStandardMaterial
          map={map}
          roughness={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* short stem */}
      <mesh position={[0.05, -0.42, 0.05]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.012, 0.018, 0.22, 6]} />
        <meshStandardMaterial color="#3c8a3c" roughness={0.7} />
      </mesh>
    </group>
  );
}

/** Shared citrus wheel — used for orange and lemon slices. */
function CitrusSlice(
  props: FloatProps & { peel: string; pith: string; flesh: string },
) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, { ...props, rotationSpeed: (props.rotationSpeed ?? 1) * 1.5 });
  const pulp = usePulpBump();
  const wedges = 8;
  const gap = 0.08;
  return (
    <group
      ref={ref}
      position={props.position}
      scale={props.scale ?? 1}
      rotation={[0.9, 0.2, 0.4]}
    >
      {/* peel rim */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.09, 48]} />
        <meshStandardMaterial color={props.peel} roughness={0.55} />
      </mesh>
      {/* white pith disc */}
      <mesh scale={[0.92, 1.05, 0.92]}>
        <cylinderGeometry args={[0.5, 0.5, 0.09, 48]} />
        <meshStandardMaterial color={props.pith} roughness={0.8} />
      </mesh>
      {/* juicy wedge segments */}
      {Array.from({ length: wedges }, (_, i) => (
        <mesh
          key={i}
          scale={[0.84, 1.12, 0.84]}
          rotation={[0, (i / wedges) * Math.PI * 2, 0]}
        >
          <cylinderGeometry
            args={[
              0.5,
              0.5,
              0.09,
              12,
              1,
              false,
              gap / 2,
              (Math.PI * 2) / wedges - gap,
            ]}
          />
          <meshPhysicalMaterial
            color={props.flesh}
            bumpMap={pulp}
            bumpScale={0.25}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.2}
            transmission={0.35}
            thickness={0.3}
            ior={1.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* white membranes between segments */}
      {Array.from({ length: wedges }, (_, i) => (
        <mesh
          key={`m${i}`}
          rotation={[0, (i / wedges) * Math.PI * 2, 0]}
          position={[
            Math.sin((i / wedges) * Math.PI * 2 + Math.PI / 2) * 0.21,
            0,
            Math.cos((i / wedges) * Math.PI * 2 + Math.PI / 2) * 0.21,
          ]}
        >
          <boxGeometry args={[0.008, 0.096, 0.42]} />
          <meshStandardMaterial color={props.pith} roughness={0.75} />
        </mesh>
      ))}
      {/* central core */}
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.098, 16]} />
        <meshStandardMaterial color={props.pith} roughness={0.75} />
      </mesh>
    </group>
  );
}

export function OrangeSlice(props: FloatProps) {
  return (
    <CitrusSlice {...props} peel="#ff8a1e" pith="#ffe8c7" flesh="#ffa030" />
  );
}

export function LemonSlice(props: FloatProps) {
  return (
    <CitrusSlice {...props} peel="#ffd93b" pith="#fdf6d8" flesh="#ffe867" />
  );
}

export function Blueberry(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  return (
    <group ref={ref} position={props.position} scale={props.scale ?? 1}>
      <mesh castShadow>
        <sphereGeometry args={[0.3, 48, 48]} />
        <meshPhysicalMaterial
          color="#3b4a8f"
          roughness={0.55}
          clearcoat={0.5}
          clearcoatRoughness={0.6}
          sheen={0.6}
          sheenColor="#9db2f0"
          sheenRoughness={0.9}
        />
      </mesh>
      {/* star-shaped calyx crown */}
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.055, 0.018, 8, 12]} />
        <meshStandardMaterial color="#242f5c" roughness={0.8} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.07,
            0.285,
            Math.sin((i / 5) * Math.PI * 2) * 0.07,
          ]}
          rotation={[0.5, -(i / 5) * Math.PI * 2, 0]}
          scale={[0.02, 0.008, 0.045]}
        >
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#2c3a70" roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

export function MangoCube(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  const pulp = usePulpBump();
  return (
    <group ref={ref} position={props.position} scale={props.scale ?? 1}>
      <RoundedBox
        args={[0.42, 0.42, 0.42]}
        radius={0.06}
        smoothness={4}
        castShadow
        rotation={[0.5, 0.8, 0.2]}
      >
        <meshPhysicalMaterial
          color="#ffb020"
          bumpMap={pulp}
          bumpScale={0.15}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.25}
          transmission={0.2}
          thickness={0.4}
          ior={1.35}
        />
      </RoundedBox>
    </group>
  );
}

export function IceCube(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  return (
    <group ref={ref} position={props.position} scale={props.scale ?? 1}>
      <RoundedBox
        args={[0.55, 0.55, 0.55]}
        radius={0.09}
        smoothness={4}
        castShadow
        rotation={[0.4, 0.6, 0.2]}
      >
        <meshPhysicalMaterial
          color="#f4fbff"
          roughness={0.07}
          transmission={0.95}
          thickness={0.8}
          ior={1.31}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationColor="#cfeaff"
          attenuationDistance={1.5}
        />
      </RoundedBox>
      {/* frosty inner core */}
      <mesh rotation={[0.4, 0.6, 0.2]} scale={0.6}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.22}
          roughness={1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

const berryTaper = (t: number) => 0.45 + 0.55 * Math.pow(t, 0.7);

/** Halved strawberry showing the white core and pink streaked flesh. */
export function StrawberryHalf(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, { ...props, rotationSpeed: (props.rotationSpeed ?? 1) * 1.3 });
  const { shell, face, skinMap, cutMap } = useMemo(() => {
    // Outer skin: half of the tapered berry (cut plane at z = 0).
    const shellGeo = new THREE.SphereGeometry(0.42, 48, 48, 0, Math.PI);
    const pos = shellGeo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = (v.y + 0.42) / 0.84;
      const k = berryTaper(t);
      pos.setXYZ(i, v.x * k, v.y * 1.2, v.z * k);
    }
    shellGeo.computeVertexNormals();
    // Flat cut face matching the berry silhouette.
    const steps = 32;
    const right: Array<[number, number]> = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const yb = (t * 2 - 1) * 0.42;
      const r = Math.sqrt(Math.max(0, 0.42 * 0.42 - yb * yb)) * berryTaper(t);
      right.push([r, yb * 1.2]);
    }
    const shape = new THREE.Shape();
    shape.moveTo(right[0][0], right[0][1]);
    right.forEach(([x, y]) => shape.lineTo(x, y));
    for (let i = steps; i >= 0; i--) shape.lineTo(-right[i][0], right[i][1]);
    const faceGeo = new THREE.ShapeGeometry(shape, 24);
    faceGeo.computeBoundingBox();
    const bb = faceGeo.boundingBox!;
    const uv = faceGeo.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(
        i,
        (uv.getX(i) - bb.min.x) / (bb.max.x - bb.min.x),
        (uv.getY(i) - bb.min.y) / (bb.max.y - bb.min.y),
      );
    }
    const skin = canvasTexture("strawberry-half-skin", (ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, 0, s);
      g.addColorStop(0, "#f76d6d");
      g.addColorStop(0.18, "#e8324e");
      g.addColorStop(0.6, "#d42440");
      g.addColorStop(1, "#c11c36");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      // sunken golden seeds on the outer skin
      const rows = 9;
      const cols = 12;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ((c + (r % 2 ? 0.5 : 0)) / cols) * s;
          const y = ((r + 0.5) / rows) * s;
          ctx.fillStyle = "rgba(120,15,30,0.7)";
          ctx.beginPath();
          ctx.ellipse(x, y, s * 0.016, s * 0.026, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#f5d76e";
          ctx.beginPath();
          ctx.ellipse(x, y, s * 0.01, s * 0.02, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
    const cut = canvasTexture("strawberry-cut", (ctx, s) => {
      // flesh: white heart fading to red rim
      const g = ctx.createRadialGradient(
        s * 0.5,
        s * 0.55,
        s * 0.05,
        s * 0.5,
        s * 0.55,
        s * 0.52,
      );
      g.addColorStop(0, "#fff3ef");
      g.addColorStop(0.35, "#ffc9cd");
      g.addColorStop(0.75, "#f2607a");
      g.addColorStop(1, "#d42440");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      // white central core column
      const core = ctx.createLinearGradient(s * 0.42, 0, s * 0.58, 0);
      core.addColorStop(0, "rgba(255,247,242,0)");
      core.addColorStop(0.5, "rgba(255,247,242,0.9)");
      core.addColorStop(1, "rgba(255,247,242,0)");
      ctx.fillStyle = core;
      ctx.fillRect(s * 0.42, s * 0.12, s * 0.16, s * 0.75);
      // pink streaks radiating from the core to the rim
      ctx.lineWidth = s * 0.012;
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2;
        const inner = s * 0.1;
        const outer = s * (0.34 + Math.random() * 0.12);
        ctx.strokeStyle =
          i % 2 ? "rgba(255,255,255,0.55)" : "rgba(240,110,130,0.5)";
        ctx.beginPath();
        ctx.moveTo(
          s * 0.5 + Math.cos(a) * inner,
          s * 0.55 + Math.sin(a) * inner,
        );
        ctx.quadraticCurveTo(
          s * 0.5 + Math.cos(a) * outer * 0.7,
          s * 0.55 + Math.sin(a) * outer * 0.75,
          s * 0.5 + Math.cos(a) * outer,
          s * 0.55 + Math.sin(a) * outer,
        );
        ctx.stroke();
      }
    });
    return { shell: shellGeo, face: faceGeo, skinMap: skin, cutMap: cut };
  }, []);
  return (
    <group
      ref={ref}
      position={props.position}
      scale={props.scale ?? 1}
      rotation={[0.15, 2.6, 0.25]}
    >
      <mesh castShadow geometry={shell}>
        <meshPhysicalMaterial
          map={skinMap}
          roughness={0.28}
          clearcoat={0.9}
          clearcoatRoughness={0.25}
        />
      </mesh>
      <mesh geometry={face} position={[0, 0, 0.001]}>
        <meshPhysicalMaterial
          map={cutMap}
          roughness={0.3}
          clearcoat={0.6}
          clearcoatRoughness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/** Hedgehog-cut mango half — scored flesh cubes popping out of the skin. */
export function MangoHalf(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  const pulp = usePulpBump();
  const skinMap = useMemo(
    () =>
      canvasTexture("mango-half-skin", (ctx, s) => {
        const g = ctx.createLinearGradient(0, 0, s, s);
        g.addColorStop(0, "#d6572f");
        g.addColorStop(0.45, "#f28a35");
        g.addColorStop(1, "#ffc24a");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
        speckles(
          ctx,
          s,
          350,
          ["rgba(120,60,20,0.18)", "rgba(255,230,170,0.16)"],
          0.7,
          1.8,
        );
      }),
    [],
  );
  const cubes = useMemo(() => {
    const out: Array<{
      pos: [number, number, number];
      rot: [number, number, number];
      s: number;
    }> = [];
    const rows = 5;
    const cols = 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const u = ((c + 0.5) / cols) * 2 - 1; // across width
        const w = ((r + 0.5) / rows) * 2 - 1; // along length
        const x = u * 0.3;
        const z = w * 0.46;
        const e = (x / 0.38) ** 2 + (z / 0.55) ** 2;
        if (e > 1) continue;
        const dome = Math.sqrt(Math.max(0, 1 - e));
        out.push({
          pos: [x, 0.1 + dome * 0.14, z],
          rot: [w * 0.45, 0, -u * 0.45],
          s: 0.12 + dome * 0.05,
        });
      }
    }
    return out;
  }, []);
  return (
    <group
      ref={ref}
      position={props.position}
      scale={props.scale ?? 1}
      rotation={[0.55, 0.4, -0.25]}
    >
      {/* curved skin bowl */}
      <mesh castShadow scale={[0.8, 0.55, 1.15]}>
        <sphereGeometry
          args={[0.5, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]}
        />
        <meshStandardMaterial
          map={skinMap}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* flesh dome under the cubes */}
      <mesh scale={[0.76, 0.22, 1.1]}>
        <sphereGeometry args={[0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#ffc24a"
          bumpMap={pulp}
          bumpScale={0.15}
          roughness={0.3}
          clearcoat={0.7}
          clearcoatRoughness={0.3}
        />
      </mesh>
      {/* scored flesh cubes */}
      {cubes.map((c, i) => (
        <RoundedBox
          key={i}
          args={[c.s, c.s, c.s]}
          radius={0.02}
          smoothness={2}
          position={c.pos}
          rotation={c.rot}
          castShadow
        >
          <meshPhysicalMaterial
            color="#ffb020"
            bumpMap={pulp}
            bumpScale={0.12}
            roughness={0.24}
            clearcoat={0.9}
            clearcoatRoughness={0.25}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

/** Whole lemon with pitted skin and nipple tips. */
export function Lemon(props: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFloat(ref, props);
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.42, 48, 48);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const t = v.y / 0.42; // -1..1 pole to pole
      // elongate and pull the poles into little nipples
      const y = v.y * 1.18 + Math.sign(v.y) * Math.pow(Math.abs(t), 6) * 0.09;
      pos.setXYZ(i, v.x * 0.82, y, v.z * 0.82);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);
  const maps = useMemo(() => {
    const map = canvasTexture("lemon-map", (ctx, s) => {
      const g = ctx.createLinearGradient(0, 0, s, s);
      g.addColorStop(0, "#ffe14d");
      g.addColorStop(0.5, "#ffd93b");
      g.addColorStop(1, "#f5c518");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
      speckles(
        ctx,
        s,
        700,
        ["rgba(255,245,180,0.35)", "rgba(200,150,20,0.25)"],
        0.8,
        2.2,
      );
    });
    const bump = canvasTexture(
      "lemon-bump",
      (ctx, s) => {
        ctx.fillStyle = "#808080";
        ctx.fillRect(0, 0, s, s);
        speckles(
          ctx,
          s,
          900,
          ["rgba(40,40,40,0.5)", "rgba(220,220,220,0.35)"],
          1,
          2.2,
        );
      },
      false,
    );
    return { map, bump };
  }, []);
  return (
    <group
      ref={ref}
      position={props.position}
      scale={props.scale ?? 1}
      rotation={[0, 0, 0.9]}
    >
      <mesh castShadow geometry={geometry}>
        <meshPhysicalMaterial
          map={maps.map}
          bumpMap={maps.bump}
          bumpScale={0.35}
          roughness={0.45}
          clearcoat={0.4}
          clearcoatRoughness={0.5}
          sheen={0.25}
          sheenColor="#fff0a0"
        />
      </mesh>
      {/* green stem button */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.02, 0.035, 0.05, 8]} />
        <meshStandardMaterial color="#5c7a2e" roughness={0.85} />
      </mesh>
    </group>
  );
}
