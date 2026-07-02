import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export type Juice = {
  name: string;
  desc: string;
  price: string;
  garnish: string;
  liquid: string; // css color token
  accent: string;
};

function Sparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute h-2 w-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      variants={{ hover: { scale: [0, 1.2, 0], opacity: [0, 1, 0] } }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}

export function ProductCard({ juice, index }: { juice: Juice; index: number }) {
  return (
    <motion.article
      className="glass-panel group relative flex flex-col items-center rounded-3xl p-7 text-center"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover="hover"
    >
      {/* sparkles on hover */}
      <Sparkle delay={0} x={18} y={20} />
      <Sparkle delay={0.3} x={78} y={16} />
      <Sparkle delay={0.6} x={70} y={64} />

      {/* CSS 3D glass */}
      <div className="relative mb-6 h-52 w-40" style={{ perspective: 700 }}>
        {/* floating shadow */}
        <motion.div
          className="absolute bottom-1 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-foreground/20 blur-md"
          animate={{ scaleX: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative mx-auto h-full w-28"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          variants={{ hover: { rotateY: 18, rotateZ: -4 } }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* rotating fruit garnish */}
          <motion.span
            className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 text-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            variants={{ hover: { scale: 1.25 } }}
          >
            {juice.garnish}
          </motion.span>

          {/* straw */}
          <div className="absolute -top-6 left-[58%] z-10 h-24 w-2 origin-bottom rotate-[14deg] rounded-full bg-accent" />

          {/* glass body */}
          <div className="absolute bottom-0 h-44 w-28 overflow-hidden rounded-b-[2.2rem] rounded-t-lg border-2 border-white/60 bg-white/25 backdrop-blur-sm">
            {/* liquid */}
            <motion.div
              className="absolute bottom-0 left-0 w-full"
              style={{ height: "80%", background: juice.liquid }}
              variants={{ hover: { height: "86%" } }}
            >
              {/* wavy surface */}
              <motion.div
                className="absolute -top-2 left-0 h-4 w-full rounded-[50%] opacity-80"
                style={{ background: juice.liquid }}
                animate={{ scaleX: [1, 1.08, 1], y: [0, 2, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* ice cubes */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-5 w-5 rounded-md border border-white/70 bg-white/40"
                  style={{ left: 8 + i * 24, top: 10 + (i % 2) * 20 }}
                  animate={{ y: [0, -4, 0], rotate: [0, 12, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </motion.div>
            {/* glass highlight */}
            <div className="absolute left-2 top-2 h-32 w-3 rounded-full bg-white/60 blur-[1px]" />
          </div>
        </motion.div>
      </div>

      <h3 className="font-display text-xl font-semibold">{juice.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{juice.desc}</p>
      <div className="mt-5 flex w-full items-center justify-between">
        <span className="font-display text-2xl font-bold text-primary">{juice.price}</span>
        <Button variant="glow" size="sm" className="px-5">
          Add to cart
        </Button>
      </div>
    </motion.article>
  );
}
