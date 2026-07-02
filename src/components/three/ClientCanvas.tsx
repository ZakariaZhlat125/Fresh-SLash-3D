import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { HeroScene } from "./HeroScene";

/**
 * Client-only WebGL layer. It is fixed behind the page content and driven by
 * the shared scrollState store, so a single canvas powers every section.
 */
export function ClientCanvas() {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  if (!mounted || reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.4, 8.5], fov: 42 }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
