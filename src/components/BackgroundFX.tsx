import { motion } from "framer-motion";

const BLOBS = [
  { c: "var(--color-primary)", size: 380, top: "5%", left: "-6%", delay: 0 },
  { c: "var(--color-lime)", size: 320, top: "55%", left: "70%", delay: 2 },
  { c: "var(--color-berry)", size: 260, top: "72%", left: "8%", delay: 4 },
  { c: "var(--color-mango)", size: 300, top: "12%", left: "72%", delay: 1 },
];

const SLICES = ["🍊", "🍓", "🍉", "🥭", "🍋", "🌿"];

/** Ambient animated background: soft blurred colour blobs, drifting fruit
 *  slices, rising bubbles and light particles. Pure CSS/Framer, very cheap. */
export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-sunrise">
      {/* blurred colour circles */}
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="animate-blob absolute rounded-full opacity-30 blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: b.c,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* drifting fruit slices */}
      {SLICES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl opacity-40 blur-[1px] select-none"
          style={{ top: `${8 + i * 15}%`, left: `${(i * 17 + 5) % 90}%` }}
          animate={{ y: [0, -40, 0], rotate: [0, 25, -10, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {s}
        </motion.span>
      ))}

      {/* rising bubbles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={`b${i}`}
          className="absolute rounded-full bg-white/50"
          style={{
            width: 6 + (i % 4) * 5,
            height: 6 + (i % 4) * 5,
            left: `${(i * 53) % 100}%`,
            bottom: -20,
          }}
          animate={{ y: [-0, -700], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 9 + (i % 5) * 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
