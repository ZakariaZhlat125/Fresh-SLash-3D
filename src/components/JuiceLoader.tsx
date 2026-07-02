import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FRUITS = [
  { c: "var(--color-primary)", from: { x: -160, y: -120 } },
  { c: "var(--color-berry)", from: { x: 150, y: -140 } },
  { c: "var(--color-lime)", from: { x: -170, y: 130 } },
  { c: "var(--color-mango)", from: { x: 180, y: 120 } },
  { c: "var(--color-accent)", from: { x: 0, y: -190 } },
];

export function JuiceLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sunrise"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative h-48 w-40">
            {/* flying fruits assembling into the glass */}
            {FRUITS.map((f, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-8 w-8 rounded-full"
                style={{ background: f.c, marginLeft: -16, marginTop: -16 }}
                initial={{ ...f.from, scale: 1, opacity: 0 }}
                animate={{ x: 0, y: -10, scale: 0, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeInOut" }}
              />
            ))}

            {/* glass */}
            <div className="absolute bottom-0 left-1/2 h-40 w-28 -translate-x-1/2 overflow-hidden rounded-b-[2.5rem] rounded-t-xl border-2 border-primary/30 bg-white/30 backdrop-blur">
              <motion.div
                className="absolute bottom-0 left-0 w-full [background:var(--gradient-citrus)]"
                initial={{ height: "0%" }}
                animate={{ height: "78%" }}
                transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
              />
              {/* logo emerging from the liquid */}
              <motion.span
                className="absolute inset-x-0 bottom-6 text-center text-3xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.9 }}
              >
                🍊
              </motion.span>
            </div>
          </div>

          <motion.p
            className="mt-8 font-display text-lg font-semibold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            Squeezing something fresh…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
