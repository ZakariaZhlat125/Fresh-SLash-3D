// Lightweight cross-component store read inside the R3F render loop.
// Framer Motion scroll + pointer listeners write here; useFrame reads it.
export const scrollState = {
  progress: 0, // 0..1 across the whole page
  section: 0, // active section index
  pointer: { x: 0, y: 0 }, // normalized -1..1
  hoverGlass: false,
};
