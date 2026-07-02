import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Leaf,
  Sparkles,
  Truck,
  Star,
  Citrus,
  GlassWater,
  Snowflake,
  Quote,
  Instagram,
  Twitter,
  Facebook,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ClientCanvas } from "@/components/three/ClientCanvas";
import { BackgroundFX } from "@/components/BackgroundFX";
import { JuiceLoader } from "@/components/JuiceLoader";
import { ProductCard, type Juice } from "@/components/ProductCard";
import { SpecialOffer } from "@/components/SpecialOffer";
import { scrollState } from "@/lib/scroll-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Squeeze — Premium Cold-Pressed Juices, Freshly Made" },
      {
        name: "description",
        content:
          "Squeeze crafts premium cold-pressed juices from real fruit. Explore a vibrant interactive 3D experience and order refreshing blends delivered to your door.",
      },
      {
        property: "og:title",
        content: "Squeeze — Premium Cold-Pressed Juices",
      },
      {
        property: "og:description",
        content:
          "Vibrant, cold-pressed juices made from real fruit. Fresh, playful, and delivered fast.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const JUICES: Juice[] = [
  {
    name: "Sunrise Orange",
    desc: "Pure Valencia oranges, cold-pressed at dawn.",
    price: "$6",
    garnish: "🍊",
    liquid: "linear-gradient(180deg,#ffb347,#ff7a1a)",
    accent: "orange",
  },
  {
    name: "Berry Bliss",
    desc: "Strawberry, raspberry & a hint of mint.",
    price: "$7",
    garnish: "🍓",
    liquid: "linear-gradient(180deg,#ff6f91,#e2304a)",
    accent: "berry",
  },
  {
    name: "Melon Splash",
    desc: "Watermelon & lime over crushed ice.",
    price: "$6",
    garnish: "🍉",
    liquid: "linear-gradient(180deg,#ff8ba0,#ff4d5e)",
    accent: "melon",
  },
  {
    name: "Mango Tango",
    desc: "Alphonso mango with a citrus twist.",
    price: "$7",
    garnish: "🥭",
    liquid: "linear-gradient(180deg,#ffd25e,#f7971e)",
    accent: "mango",
  },
];

const FEATURES = [
  {
    icon: Leaf,
    title: "100% Real Fruit",
    text: "No concentrates, no added sugar — ever.",
  },
  {
    icon: Sparkles,
    title: "Cold-Pressed",
    text: "Locks in nutrients and fresh flavor.",
  },
  {
    icon: Truck,
    title: "Same-Day Delivery",
    text: "Chilled to your door in under an hour.",
  },
];

const MARQUEE = [
  "100% Real Fruit",
  "Cold-Pressed Daily",
  "No Added Sugar",
  "Same-Day Delivery",
  "Eco-Friendly Bottles",
  "Zero Preservatives",
];

const PROCESS = [
  {
    icon: Citrus,
    step: "01",
    title: "Picked at dawn",
    text: "Ripe fruit arrives from local orchards within hours of harvest — never stored, never frozen.",
  },
  {
    icon: GlassWater,
    step: "02",
    title: "Pressed cold",
    text: "Our hydraulic press extracts every drop without heat, keeping enzymes and vitamins intact.",
  },
  {
    icon: Snowflake,
    step: "03",
    title: "Bottled & chilled",
    text: "Straight into glass bottles and onto ice — at your door the very same day, ice-cold.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maya R.",
    role: "Yoga instructor",
    quote:
      "The Sunrise Orange tastes like it was squeezed in front of me. I've cancelled every other juice subscription.",
    emoji: "🍊",
  },
  {
    name: "Daniel K.",
    role: "Marathon runner",
    quote:
      "Berry Bliss after a long run is my ritual now. Real fruit, real energy — you can taste the difference.",
    emoji: "🍓",
  },
  {
    name: "Lina S.",
    role: "Café owner",
    quote:
      "We serve Squeeze in our café and customers keep asking where it's from. Absolute best cold-pressed in town.",
    emoji: "🥭",
  },
];

function Index() {
  const rig = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rig,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollState.progress = v;
    scrollState.section = Math.min(4, Math.floor(v * 5));
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <JuiceLoader />
      <BackgroundFX />
      <ClientCanvas />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-40">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-2xl font-extrabold tracking-tight">
            <span className="text-gradient-citrus">Squeeze</span>
          </span>
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#menu" className="story-link">
              Menu
            </a>
            <a href="#story" className="story-link">
              Our Story
            </a>
            <a href="#offer" className="story-link">
              Offers
            </a>
          </div>
          <Button variant="hero" size="default" className="px-6">
            Order now
          </Button>
        </nav>
      </header>

      {/* 3D-driven scroll region (sections 1-3) */}
      <div ref={rig} className="relative z-10">
        {/* Section 1 — Hero */}
        <section className="flex min-h-screen items-center">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 pt-24 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur">
                <Sparkles className="h-4 w-4" /> Freshly pressed daily
              </span>
              <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] md:text-7xl">
                Taste the <span className="text-gradient-citrus">fresh</span>{" "}
                side of every day
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Premium cold-pressed juices made from real, ripe fruit. Vibrant,
                refreshing, and delivered ice-cold to your door.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="hero" size="xl">
                  Shop juices
                </Button>
                <Button variant="soft" size="xl">
                  Watch the blend
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex text-primary">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                Loved by 12,000+ juice fans
              </div>
            </motion.div>
            {/* right column intentionally empty — the 3D glass floats here */}
            <div className="hidden md:block" />
          </div>
        </section>

        {/* Section 2 — Poured fresh */}
        <section className="flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <motion.div
              className="max-w-md md:ml-auto md:text-right"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Poured fresh,{" "}
                <span className="text-gradient-citrus">
                  never from concentrate
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Watch it fill — ripe fruit pressed within hours, ice dropped in,
                mint spun through. Every glass is a little ritual of freshness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 3 — Bursting flavor */}
        <section className="flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-6xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-4xl font-bold md:text-6xl">
                Bursting with{" "}
                <span className="text-gradient-citrus">real flavor</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Whole fruit, blended into vivid splashes of color and taste.
                Nothing artificial — just the good, juicy stuff.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 4 — Ice cold */}
        <section className="flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <motion.div
              className="max-w-md"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Served <span className="text-gradient-citrus">ice-cold</span>,
                always
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Crystal-clear ice, a frosted glass and a storm of chill — every
                sip lands at the perfect 4°C, from the first to the last.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 5 — Mint finish */}
        <section className="flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <motion.div
              className="max-w-md md:ml-auto md:text-right"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                A <span className="text-gradient-citrus">mint-fresh</span>{" "}
                finish
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A whirl of garden mint spins through at the end — cool, green
                and impossibly fresh. That’s the Squeeze signature.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Solid content below the 3D region */}
      <div className="relative z-10 bg-background">
        {/* Marquee ribbon */}
        <div className="overflow-hidden border-y border-border/60 py-4 [background:var(--gradient-citrus)]">
          <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground"
              >
                {item}
                <span aria-hidden className="text-lg">
                  🍊
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <section id="story" className="py-20">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="glass-panel rounded-3xl p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl [background:var(--gradient-citrus)] text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process — From orchard to bottle */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                From <span className="text-gradient-citrus">orchard</span> to
                bottle
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Three steps. Zero shortcuts. Every bottle, every day.
              </p>
            </div>
            <div className="relative grid gap-6 md:grid-cols-3">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.step}
                  className="glass-panel relative rounded-3xl p-8"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <span className="font-display text-5xl font-extrabold text-primary/15">
                    {p.step}
                  </span>
                  <div className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-2xl [background:var(--gradient-fresh)] text-secondary-foreground">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — Products */}
        <section id="menu" className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Our <span className="text-gradient-citrus">signature</span>{" "}
                blends
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Four cold-pressed favorites — pick your fresh.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {JUICES.map((j, i) => (
                <ProductCard key={j.name} juice={j} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Fresh <span className="text-gradient-citrus">words</span> from
                juice fans
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.figure
                  key={t.name}
                  className="glass-panel flex flex-col rounded-3xl p-8"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Quote className="h-8 w-8 text-primary/40" />
                  <blockquote className="mt-4 flex-1 text-muted-foreground">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-xl shadow-sm">
                      {t.emoji}
                    </span>
                    <div>
                      <div className="font-display font-semibold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                    <span className="ml-auto flex text-primary">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* Special offer */}
        <div id="offer">
          <SpecialOffer />
        </div>

        {/* Newsletter */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              className="glass-panel rounded-[2.5rem] p-10 text-center md:p-14"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-primary">
                <Mail className="h-4 w-4" /> Juicy news, monthly
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Get <span className="text-gradient-citrus">10% off</span> your
                first order
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                New blends, seasonal fruit drops and subscriber-only deals. No
                spam, just pulp.
              </p>
              <form
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 flex-1 rounded-full border border-border bg-white/80 px-5 text-sm outline-none ring-ring/40 transition focus:ring-2"
                />
                <Button
                  variant="hero"
                  size="lg"
                  type="submit"
                  className="rounded-full px-8"
                >
                  Subscribe
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/60 pb-10 pt-14">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 md:grid-cols-4">
              <div className="md:col-span-2">
                <span className="font-display text-2xl font-extrabold text-gradient-citrus">
                  Squeeze
                </span>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Premium cold-pressed juices made from real, ripe fruit —
                  pressed at dawn, delivered ice-cold.
                </p>
                <div className="mt-5 flex gap-3">
                  {[Instagram, Twitter, Facebook].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label="Social link"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-muted-foreground shadow-sm transition hover:text-primary hover:shadow-[var(--shadow-glow)]"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider">
                  Explore
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#menu" className="story-link">
                      Menu
                    </a>
                  </li>
                  <li>
                    <a href="#story" className="story-link">
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a href="#offer" className="story-link">
                      Offers
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-display text-sm font-bold uppercase tracking-wider">
                  Visit us
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>14 Citrus Lane, Fruitville</li>
                  <li>Mon–Sun, 7am–8pm</li>
                  <li>hello@squeezejuice.co</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row">
              <p>
                © {new Date().getFullYear()} Squeeze Juice Co. Freshly made,
                always.
              </p>
              <p className="flex items-center gap-1.5">
                Made with <span aria-hidden>🍊</span> and zero concentrate
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
