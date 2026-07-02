import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const RING = ["🍊", "🍓", "🍉", "🥭", "🍋", "🍑", "🫐", "🥝"];
const CONFETTI = Array.from({ length: 24 });

export function SpecialOffer() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center [background:var(--gradient-citrus)] animate-gradient-pan"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* confetti */}
          {CONFETTI.map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-0 h-2 w-2 rounded-sm"
              style={{
                left: `${(i * 37) % 100}%`,
                background: i % 2 ? "white" : "var(--color-lime)",
              }}
              animate={{ y: [0, 420], rotate: [0, 360], opacity: [1, 1, 0] }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeIn",
              }}
            />
          ))}

          {/* rotating fruit ring */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {RING.map((f, i) => {
              const a = (i / RING.length) * Math.PI * 2;
              return (
                <span
                  key={i}
                  className="absolute text-4xl opacity-80"
                  style={{
                    left: `calc(50% + ${Math.cos(a) * 200}px)`,
                    top: `calc(50% + ${Math.sin(a) * 200}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {f}
                </span>
              );
            })}
          </motion.div>

          {/* animated discount badge */}
          <motion.div
            className="relative z-10 mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white text-primary shadow-[var(--shadow-glow)]"
            animate={{ scale: [1, 1.08, 1], rotate: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-display text-3xl font-extrabold">-30%</span>
          </motion.div>

          <h2 className="relative z-10 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
            Fresh Squeeze Weekend
          </h2>
          <p className="relative z-10 mx-auto mt-3 max-w-lg text-primary-foreground/90">
            Get 30% off every cold-pressed bottle this weekend. Bursting with real
            fruit, zero added sugar.
          </p>
          <Button variant="soft" size="xl" className="relative z-10 mt-8">
            Claim the deal
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
