import { a as __toESM } from "../_runtime.mjs";
import { $ as ShapeGeometry, J as RepeatWrapping, M as MathUtils, Q as Shape, R as Object3D, Y as SRGBColorSpace, ct as Vector3, et as SphereGeometry, f as Color, l as CanvasTexture } from "../_libs/@monogrid/gainmap-js+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as RoundedBox, d as useThree, i as Environment, l as useFrame, n as Lightformer, o as Canvas, p as require_jsx_runtime, r as ContactShadows, t as Sparkles } from "../_libs/@react-three/drei+[...].mjs";
import { i as AnimatePresence, n as useMotionValueEvent, r as motion, t as useScroll } from "../_libs/framer-motion.mjs";
import { a as Snowflake, c as Leaf, d as Facebook, f as Citrus, i as Sparkles$1, l as Instagram, n as Truck, o as Quote, r as Star, s as Mail, t as Twitter, u as GlassWater } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as wt, n as dt, r as qt, t as ce } from "../_libs/@react-three/postprocessing+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-cz4nJ7XS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var scrollState = {
	progress: 0,
	section: 0,
	pointer: {
		x: 0,
		y: 0
	},
	hoverGlass: false
};
/** A stylised drinking glass filled with fresh orange juice. */
function JuiceGlass() {
	const group = (0, import_react.useRef)(null);
	const juice = (0, import_react.useRef)(null);
	const surface = (0, import_react.useRef)(null);
	const bubbles = (0, import_react.useRef)(null);
	const bubbleData = (0, import_react.useMemo)(() => Array.from({ length: 40 }, () => ({
		x: (Math.random() - .5) * .9,
		z: (Math.random() - .5) * .9,
		offset: Math.random(),
		speed: .3 + Math.random() * .5,
		scale: .02 + Math.random() * .05
	})), []);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const drops = (0, import_react.useRef)(null);
	const dropData = (0, import_react.useMemo)(() => Array.from({ length: 90 }, () => {
		const angle = Math.random() * Math.PI * 2;
		const h = -.8 + Math.random() * 1.55;
		const r = MathUtils.lerp(.62, .78, (h + .85) / 1.7) + .01;
		return {
			angle,
			pos: new Vector3(Math.cos(angle) * r, h, Math.sin(angle) * r),
			scale: .015 + Math.random() * .035,
			stretch: 1 + Math.random() * .8
		};
	}), []);
	(0, import_react.useLayoutEffect)(() => {
		if (!drops.current) return;
		dropData.forEach((d, i) => {
			dummy.position.copy(d.pos);
			dummy.rotation.set(0, -d.angle, 0);
			dummy.scale.set(d.scale, d.scale * d.stretch, d.scale * .55);
			dummy.updateMatrix();
			drops.current.setMatrixAt(i, dummy.matrix);
		});
		drops.current.instanceMatrix.needsUpdate = true;
	}, [dropData, dummy]);
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		if (group.current) {
			const hoverBoost = scrollState.hoverGlass ? 1 : 0;
			group.current.position.y = Math.sin(t * .6) * .12;
			group.current.rotation.y += .004 + hoverBoost * .02;
			group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, scrollState.pointer.x * .08, .05);
		}
		if (juice.current && surface.current) {
			const fill = MathUtils.clamp((scrollState.progress - .2) * 3.2, .35, 1);
			juice.current.scale.y = fill;
			juice.current.position.y = -.75 + fill * 1.4 / 2;
			const top = -.75 + fill * 1.4;
			surface.current.position.y = top;
			surface.current.rotation.z = Math.sin(t * 2.2) * .05;
			surface.current.rotation.x = Math.cos(t * 1.8) * .05;
		}
		if (bubbles.current) {
			bubbleData.forEach((b, i) => {
				const h = (t * b.speed + b.offset) % 1;
				dummy.position.set(b.x, -.7 + h * 1.3, b.z);
				dummy.scale.setScalar(b.scale * (1 - h * .4));
				dummy.updateMatrix();
				bubbles.current.setMatrixAt(i, dummy.matrix);
			});
			bubbles.current.instanceMatrix.needsUpdate = true;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.78,
					.62,
					1.7,
					64,
					1,
					true
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ffffff",
					roughness: 0,
					transmission: 1,
					thickness: .5,
					ior: 1.5,
					transparent: true,
					opacity: .35,
					clearcoat: 1,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.85,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.62,
					.62,
					.06,
					64
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ffffff",
					roughness: 0,
					transmission: .9,
					thickness: .4,
					ior: 1.5,
					transparent: true,
					opacity: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: juice,
				position: [
					0,
					-.05,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.72,
					.58,
					1.4,
					64
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ff8412",
					roughness: .25,
					transmission: .35,
					thickness: 1.2,
					ior: 1.35,
					transparent: true,
					opacity: .95,
					emissive: "#ff5a00",
					emissiveIntensity: .12
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: surface,
				position: [
					0,
					.62,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.71,
					.71,
					.02,
					64
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ffa733",
					roughness: .15,
					metalness: 0,
					clearcoat: 1,
					emissive: "#ff7a1a",
					emissiveIntensity: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
				ref: bubbles,
				args: [
					void 0,
					void 0,
					bubbleData.length
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1,
					10,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#fff3d6",
					transparent: true,
					opacity: .6,
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
				ref: drops,
				args: [
					void 0,
					void 0,
					dropData.length
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1,
					12,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ffffff",
					roughness: .05,
					transmission: .95,
					thickness: .1,
					ior: 1.33,
					transparent: true,
					opacity: .7,
					clearcoat: 1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.72,
					.86,
					0
				],
				rotation: [
					0,
					0,
					-.15
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.34,
						.34,
						.06,
						40,
						1,
						false,
						0,
						Math.PI * 1.75
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ff8a1e",
						roughness: .5,
						side: 2
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					scale: [
						.86,
						1.1,
						.86
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.34,
						.34,
						.06,
						40,
						1,
						false,
						0,
						Math.PI * 1.75
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
						color: "#ffa030",
						roughness: .3,
						clearcoat: .8,
						transmission: .2,
						thickness: .2,
						side: 2
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.28,
					.7,
					0
				],
				rotation: [
					0,
					0,
					.28
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.05,
					.05,
					2.2,
					20
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ff4d6d",
					roughness: .35
				})]
			})
		]
	});
}
function usePhase(seed = 0) {
	return (0, import_react.useMemo)(() => seed * 12.9898 + 4.1414, [seed]);
}
/** Shared gentle floating + rotation behaviour. */
function useFloat(ref, { position, speed = 1, rotationSpeed = .3, seed = 0 }) {
	const phase = usePhase(seed);
	useFrame((state) => {
		const g = ref.current;
		if (!g) return;
		const t = state.clock.elapsedTime;
		g.position.y = position[1] + Math.sin(t * speed + phase) * .22;
		g.position.x = position[0] + Math.cos(t * speed * .6 + phase) * .08;
		g.rotation.y += rotationSpeed * .01;
		g.rotation.x = Math.sin(t * .4 + phase) * .18;
	});
}
var texCache = /* @__PURE__ */ new Map();
function canvasTexture(key, draw, srgb = true, size = 256) {
	const cached = texCache.get(key);
	if (cached) return cached;
	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = size;
	draw(canvas.getContext("2d"), size);
	const tex = new CanvasTexture(canvas);
	if (srgb) tex.colorSpace = SRGBColorSpace;
	tex.wrapS = tex.wrapT = RepeatWrapping;
	tex.anisotropy = 4;
	texCache.set(key, tex);
	return tex;
}
function speckles(ctx, s, count, colors, rMin, rMax) {
	for (let i = 0; i < count; i++) {
		ctx.fillStyle = colors[i % colors.length];
		ctx.beginPath();
		ctx.arc(Math.random() * s, Math.random() * s, rMin + Math.random() * (rMax - rMin), 0, Math.PI * 2);
		ctx.fill();
	}
}
/** Subtle noise bump shared by juicy pulp surfaces. */
function usePulpBump() {
	return (0, import_react.useMemo)(() => canvasTexture("pulp-bump", (ctx, s) => {
		ctx.fillStyle = "#808080";
		ctx.fillRect(0, 0, s, s);
		speckles(ctx, s, 700, ["rgba(60,60,60,0.4)", "rgba(200,200,200,0.3)"], .8, 2);
	}, false), []);
}
function Orange(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, props);
	const maps = (0, import_react.useMemo)(() => {
		return {
			map: canvasTexture("orange-map", (ctx, s) => {
				ctx.fillStyle = "#f97f16";
				ctx.fillRect(0, 0, s, s);
				speckles(ctx, s, 800, ["rgba(255,170,80,0.35)", "rgba(205,95,10,0.3)"], .8, 2.5);
				const tinge = ctx.createLinearGradient(0, 0, 0, s * .18);
				tinge.addColorStop(0, "rgba(150,160,60,0.28)");
				tinge.addColorStop(1, "rgba(150,160,60,0)");
				ctx.fillStyle = tinge;
				ctx.fillRect(0, 0, s, s * .18);
			}),
			bump: canvasTexture("orange-bump", (ctx, s) => {
				ctx.fillStyle = "#808080";
				ctx.fillRect(0, 0, s, s);
				speckles(ctx, s, 900, ["rgba(40,40,40,0.5)", "rgba(220,220,220,0.35)"], 1, 2.2);
			}, false)
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.5,
					64,
					64
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					map: maps.map,
					bumpMap: maps.bump,
					bumpScale: .35,
					roughness: .5,
					clearcoat: .35,
					clearcoatRoughness: .6,
					sheen: .3,
					sheenColor: "#ffb35c"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.5,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.025,
					.045,
					.07,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6d4c2b",
					roughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.1,
					.53,
					0
				],
				rotation: [
					.3,
					0,
					-.9
				],
				scale: [
					.22,
					.02,
					.1
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1,
					16,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3f8f2f",
					roughness: .55,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.49,
					0
				],
				scale: [
					.07,
					.025,
					.07
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1,
					12,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c9660e",
					roughness: .95
				})]
			})
		]
	});
}
function Mango(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, props);
	const map = (0, import_react.useMemo)(() => canvasTexture("mango-map", (ctx, s) => {
		const g = ctx.createLinearGradient(0, 0, 0, s);
		g.addColorStop(0, "#e6653c");
		g.addColorStop(.35, "#ff9d3c");
		g.addColorStop(1, "#ffc855");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, s, s);
		const blush = ctx.createRadialGradient(s * .3, s * .25, 0, s * .3, s * .25, s * .45);
		blush.addColorStop(0, "rgba(214,66,48,0.55)");
		blush.addColorStop(1, "rgba(214,66,48,0)");
		ctx.fillStyle = blush;
		ctx.fillRect(0, 0, s, s);
		speckles(ctx, s, 450, ["rgba(120,60,20,0.18)", "rgba(255,230,170,0.15)"], .7, 1.8);
		ctx.strokeStyle = "rgba(200,110,40,0.1)";
		ctx.lineWidth = s * .012;
		for (let i = 0; i < 12; i++) {
			const x = Math.random() * s;
			ctx.beginPath();
			ctx.moveTo(x, Math.random() * s * .3);
			ctx.quadraticCurveTo(x + s * .03, s * .5, x, s * (.7 + Math.random() * .3));
			ctx.stroke();
		}
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			scale: [
				1,
				.82,
				1.35
			],
			rotation: [
				.3,
				0,
				.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.5,
				64,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				map,
				roughness: .32,
				clearcoat: .6,
				clearcoatRoughness: .35,
				sheen: .2,
				sheenColor: "#ffd28a"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.28,
				.38,
				-.28
			],
			rotation: [
				.3,
				0,
				.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.02,
				.035,
				.06,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7a5230",
				roughness: .9
			})]
		})]
	});
}
function Strawberry(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, props);
	const geometry = (0, import_react.useMemo)(() => {
		const geo = new SphereGeometry(.42, 48, 48);
		const pos = geo.attributes.position;
		const v = new Vector3();
		for (let i = 0; i < pos.count; i++) {
			v.fromBufferAttribute(pos, i);
			const t = (v.y + .42) / .84;
			const taper = .45 + .55 * Math.pow(t, .7);
			pos.setXYZ(i, v.x * taper, v.y * 1.2, v.z * taper);
		}
		geo.computeVertexNormals();
		return geo;
	}, []);
	const maps = (0, import_react.useMemo)(() => {
		const drawSeeds = (ctx, s, seed, rim) => {
			const rows = 10;
			const cols = 13;
			for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
				const x = (c + (r % 2 ? .5 : 0)) / cols * s;
				const y = (r + .5) / rows * s;
				ctx.fillStyle = rim;
				ctx.beginPath();
				ctx.ellipse(x, y, s * .016, s * .026, 0, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = seed;
				ctx.beginPath();
				ctx.ellipse(x, y, s * .01, s * .02, 0, 0, Math.PI * 2);
				ctx.fill();
			}
		};
		return {
			map: canvasTexture("strawberry-map", (ctx, s) => {
				const g = ctx.createLinearGradient(0, 0, 0, s);
				g.addColorStop(0, "#f76d6d");
				g.addColorStop(.18, "#e8324e");
				g.addColorStop(.6, "#d42440");
				g.addColorStop(1, "#c11c36");
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, s, s);
				speckles(ctx, s, 150, ["rgba(255,150,150,0.15)", "rgba(140,10,30,0.15)"], 1, 2.5);
				drawSeeds(ctx, s, "#f5d76e", "rgba(120,15,30,0.75)");
			}),
			bump: canvasTexture("strawberry-bump", (ctx, s) => {
				ctx.fillStyle = "#909090";
				ctx.fillRect(0, 0, s, s);
				drawSeeds(ctx, s, "#e8e8e8", "#303030");
			}, false)
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			castShadow: true,
			geometry,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				map: maps.map,
				bumpMap: maps.bump,
				bumpScale: .5,
				roughness: .28,
				clearcoat: .9,
				clearcoatRoughness: .25
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.46,
				0
			],
			children: [[
				0,
				1,
				2,
				3,
				4,
				5
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					1.15,
					i / 6 * Math.PI * 2,
					0
				],
				position: [
					Math.sin(i / 6 * Math.PI * 2) * .1,
					.02,
					Math.cos(i / 6 * Math.PI * 2) * .1
				],
				scale: [
					.09,
					.02,
					.24
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1,
					12,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3f8f2f",
					roughness: .6,
					side: 2
				})]
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.08,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.02,
					.03,
					.14,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#4d8a2f",
					roughness: .7
				})]
			})]
		})]
	});
}
function WatermelonSlice(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, props);
	const pulp = usePulpBump();
	const rindMap = (0, import_react.useMemo)(() => canvasTexture("watermelon-rind", (ctx, s) => {
		ctx.fillStyle = "#3f9e44";
		ctx.fillRect(0, 0, s, s);
		ctx.strokeStyle = "#1f6b2a";
		ctx.lineWidth = s * .055;
		for (let i = 0; i < 7; i++) {
			const x = i / 7 * s + s * .05;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			for (let y = 0; y <= s; y += s / 8) ctx.lineTo(x + Math.sin(y / s * Math.PI * 4 + i) * s * .02, y);
			ctx.stroke();
		}
		speckles(ctx, s, 200, ["rgba(255,255,255,0.06)", "rgba(0,60,10,0.12)"], .6, 1.6);
	}), []);
	const seeds = (0, import_react.useMemo)(() => Array.from({ length: 16 }, (_, i) => {
		const ring = Math.floor(i / 6);
		const a = .3 + i % 6 * ((Math.PI - .6) / 5) + ring * .12;
		const r = [
			.44,
			.3,
			.16
		][ring] ?? .16;
		return {
			pos: [
				Math.cos(a) * r,
				(i % 2 ? 1 : -1) * .078,
				Math.sin(a) * r
			],
			rot: a,
			white: i % 5 === 4
		};
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		rotation: [
			.4,
			0,
			.3
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.6,
					.6,
					.16,
					48,
					1,
					false,
					0,
					Math.PI
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: rindMap,
					roughness: .45,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				scale: [
					.9,
					.9,
					1.02
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.6,
					.6,
					.15,
					48,
					1,
					false,
					0,
					Math.PI
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eaf7ea",
					roughness: .7,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				scale: [
					.78,
					.78,
					1.05
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.6,
					.6,
					.14,
					48,
					1,
					false,
					0,
					Math.PI
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ff3d52",
					bumpMap: pulp,
					bumpScale: .2,
					roughness: .32,
					clearcoat: .7,
					clearcoatRoughness: .3,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: seeds.map((sd, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: sd.pos,
					rotation: [
						Math.PI / 2,
						0,
						sd.rot
					],
					scale: [
						.028,
						.045,
						.014
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						1,
						10,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: sd.white ? "#f2e8d4" : "#26160c",
						roughness: .35
					})]
				}, i))
			})
		]
	});
}
function MintLeaf(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, {
		...props,
		rotationSpeed: (props.rotationSpeed ?? 1) * 2
	});
	const { geo, map } = (0, import_react.useMemo)(() => {
		const shape = new Shape();
		shape.moveTo(0, -.5);
		shape.quadraticCurveTo(.38, -.25, .3, .15);
		shape.quadraticCurveTo(.22, .42, 0, .55);
		shape.quadraticCurveTo(-.22, .42, -.3, .15);
		shape.quadraticCurveTo(-.38, -.25, 0, -.5);
		const geometry = new ShapeGeometry(shape, 24);
		geometry.computeBoundingBox();
		const bb = geometry.boundingBox;
		const uv = geometry.attributes.uv;
		for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) - bb.min.x) / (bb.max.x - bb.min.x), (uv.getY(i) - bb.min.y) / (bb.max.y - bb.min.y));
		return {
			geo: geometry,
			map: canvasTexture("mint-map", (ctx, s) => {
				const g = ctx.createLinearGradient(0, s, 0, 0);
				g.addColorStop(0, "#2f7d32");
				g.addColorStop(1, "#58b35a");
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, s, s);
				ctx.strokeStyle = "rgba(222,245,212,0.85)";
				ctx.lineWidth = s * .016;
				ctx.beginPath();
				ctx.moveTo(s / 2, s * .02);
				ctx.lineTo(s / 2, s * .96);
				ctx.stroke();
				ctx.lineWidth = s * .008;
				ctx.strokeStyle = "rgba(215,240,205,0.55)";
				for (let i = 0; i < 8; i++) {
					const y = s * (.12 + i * .105);
					ctx.beginPath();
					ctx.moveTo(s / 2, y);
					ctx.quadraticCurveTo(s * .7, y - s * .06, s * .92, y - s * .13);
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(s / 2, y);
					ctx.quadraticCurveTo(s * .3, y - s * .06, s * .08, y - s * .13);
					ctx.stroke();
				}
			})
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: geo,
				castShadow: true,
				rotation: [
					-.6,
					.3,
					.2
				],
				scale: .95,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map,
					roughness: .45,
					side: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: geo,
				rotation: [
					-.4,
					-.7,
					-.4
				],
				position: [
					.2,
					-.06,
					.12
				],
				scale: .65,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map,
					roughness: .45,
					side: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.05,
					-.42,
					.05
				],
				rotation: [
					0,
					0,
					.4
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.012,
					.018,
					.22,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3c8a3c",
					roughness: .7
				})]
			})
		]
	});
}
/** Shared citrus wheel — used for orange and lemon slices. */
function CitrusSlice(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, {
		...props,
		rotationSpeed: (props.rotationSpeed ?? 1) * 1.5
	});
	const pulp = usePulpBump();
	const wedges = 8;
	const gap = .08;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		rotation: [
			.9,
			.2,
			.4
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.5,
					.5,
					.09,
					48
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: props.peel,
					roughness: .55
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				scale: [
					.92,
					1.05,
					.92
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.5,
					.5,
					.09,
					48
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: props.pith,
					roughness: .8
				})]
			}),
			Array.from({ length: wedges }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				scale: [
					.84,
					1.12,
					.84
				],
				rotation: [
					0,
					i / wedges * Math.PI * 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.5,
					.5,
					.09,
					12,
					1,
					false,
					gap / 2,
					Math.PI * 2 / wedges - gap
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: props.flesh,
					bumpMap: pulp,
					bumpScale: .25,
					roughness: .22,
					clearcoat: 1,
					clearcoatRoughness: .2,
					transmission: .35,
					thickness: .3,
					ior: 1.35,
					side: 2
				})]
			}, i)),
			Array.from({ length: wedges }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					0,
					i / wedges * Math.PI * 2,
					0
				],
				position: [
					Math.sin(i / wedges * Math.PI * 2 + Math.PI / 2) * .21,
					0,
					Math.cos(i / wedges * Math.PI * 2 + Math.PI / 2) * .21
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.008,
					.096,
					.42
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: props.pith,
					roughness: .75
				})]
			}, `m${i}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.045,
				.045,
				.098,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: props.pith,
				roughness: .75
			})] })
		]
	});
}
function OrangeSlice(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitrusSlice, {
		...props,
		peel: "#ff8a1e",
		pith: "#ffe8c7",
		flesh: "#ffa030"
	});
}
function LemonSlice(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CitrusSlice, {
		...props,
		peel: "#ffd93b",
		pith: "#fdf6d8",
		flesh: "#ffe867"
	});
}
function Blueberry(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.3,
					48,
					48
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#3b4a8f",
					roughness: .55,
					clearcoat: .5,
					clearcoatRoughness: .6,
					sheen: .6,
					sheenColor: "#9db2f0",
					sheenRoughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.055,
					.018,
					8,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#242f5c",
					roughness: .8
				})]
			}),
			[
				0,
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					Math.cos(i / 5 * Math.PI * 2) * .07,
					.285,
					Math.sin(i / 5 * Math.PI * 2) * .07
				],
				rotation: [
					.5,
					-(i / 5) * Math.PI * 2,
					0
				],
				scale: [
					.02,
					.008,
					.045
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1,
					8,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2c3a70",
					roughness: .85
				})]
			}, i))
		]
	});
}
function MangoCube(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, props);
	const pulp = usePulpBump();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				.42,
				.42,
				.42
			],
			radius: .06,
			smoothness: 4,
			castShadow: true,
			rotation: [
				.5,
				.8,
				.2
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#ffb020",
				bumpMap: pulp,
				bumpScale: .15,
				roughness: .22,
				clearcoat: 1,
				clearcoatRoughness: .25,
				transmission: .2,
				thickness: .4,
				ior: 1.35
			})
		})
	});
}
function IceCube(props) {
	const ref = (0, import_react.useRef)(null);
	useFloat(ref, props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		position: props.position,
		scale: props.scale ?? 1,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoundedBox, {
			args: [
				.55,
				.55,
				.55
			],
			radius: .09,
			smoothness: 4,
			castShadow: true,
			rotation: [
				.4,
				.6,
				.2
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#f4fbff",
				roughness: .07,
				transmission: .95,
				thickness: .8,
				ior: 1.31,
				clearcoat: 1,
				clearcoatRoughness: .1,
				attenuationColor: "#cfeaff",
				attenuationDistance: 1.5
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				.4,
				.6,
				.2
			],
			scale: .6,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.55,
				.55,
				.55
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#ffffff",
				transparent: true,
				opacity: .22,
				roughness: 1,
				depthWrite: false
			})]
		})]
	});
}
/** Colourful splash particles that bloom outward during section 3. */
function SplashParticles() {
	const ref = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const colors = (0, import_react.useMemo)(() => [
		new Color("#ff8412"),
		new Color("#ff4d5e"),
		new Color("#f7b32b"),
		new Color("#4caf50")
	], []);
	const data = (0, import_react.useMemo)(() => Array.from({ length: 120 }, (_, i) => {
		return {
			dir: new Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize(),
			dist: 1.5 + Math.random() * 3,
			scale: .04 + Math.random() * .09,
			color: colors[i % colors.length],
			spin: Math.random() * Math.PI
		};
	}), [colors]);
	useFrame((state) => {
		if (!ref.current) return;
		const p = MathUtils.clamp((scrollState.progress - .4) * 5, 0, 1);
		const burst = Math.sin(p * Math.PI);
		const t = state.clock.elapsedTime;
		data.forEach((d, i) => {
			const r = d.dist * burst;
			dummy.position.set(d.dir.x * r, d.dir.y * r + Math.sin(t + i) * .1, d.dir.z * r);
			dummy.scale.setScalar(d.scale * burst);
			dummy.rotation.set(t + d.spin, t, 0);
			dummy.updateMatrix();
			ref.current.setMatrixAt(i, dummy.matrix);
			ref.current.setColorAt(i, d.color);
		});
		ref.current.instanceMatrix.needsUpdate = true;
		if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			data.length
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			roughness: .2,
			metalness: .1
		})]
	});
}
/** Section 4 — a swirling storm of ice cubes circling the glass. */
function IceStorm() {
	const ref = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const data = (0, import_react.useMemo)(() => Array.from({ length: 18 }, (_, i) => ({
		angle: i / 18 * Math.PI * 2,
		radius: 1.6 + Math.random() * 1.4,
		y: -1.2 + Math.random() * 2.6,
		speed: .4 + Math.random() * .6,
		spin: Math.random() * Math.PI * 2,
		scale: .12 + Math.random() * .16
	})), []);
	useFrame((state) => {
		if (!ref.current) return;
		const t = state.clock.elapsedTime;
		const p = MathUtils.clamp((scrollState.progress - .55) * 3.6, 0, 1);
		const intensity = Math.sin(p * Math.PI);
		ref.current.visible = intensity > .01;
		data.forEach((d, i) => {
			const a = d.angle + t * d.speed;
			dummy.position.set(Math.cos(a) * d.radius * (.6 + intensity * .4), d.y + Math.sin(t * d.speed + d.spin) * .25, Math.sin(a) * d.radius * (.6 + intensity * .4));
			dummy.rotation.set(t * .6 + d.spin, t * .8, d.spin);
			dummy.scale.setScalar(d.scale * intensity);
			dummy.updateMatrix();
			ref.current.setMatrixAt(i, dummy.matrix);
		});
		ref.current.instanceMatrix.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		ref,
		args: [
			void 0,
			void 0,
			data.length
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			1,
			1,
			1
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color: "#eef8ff",
			roughness: .08,
			transmission: .92,
			thickness: .6,
			ior: 1.31,
			clearcoat: 1,
			attenuationColor: "#cfeaff",
			attenuationDistance: 1.5
		})]
	});
}
/** Section 5 — a rising spiral of mint leaves around the glass. */
function MintWhirl() {
	const ref = (0, import_react.useRef)(null);
	const leaves = (0, import_react.useMemo)(() => Array.from({ length: 10 }, (_, i) => ({
		angle: i / 10 * Math.PI * 4,
		radius: 1.3 + i / 10 * .9,
		y: -1.4 + i / 10 * 3,
		scale: .5 + Math.random() * .4,
		seed: 30 + i
	})), []);
	useFrame((state) => {
		if (!ref.current) return;
		const p = MathUtils.clamp((scrollState.progress - .78) * 5, 0, 1);
		ref.current.visible = p > .01;
		ref.current.scale.setScalar(p);
		ref.current.rotation.y = state.clock.elapsedTime * .45;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [leaves.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MintLeaf, {
			position: [
				Math.cos(l.angle) * l.radius,
				l.y,
				Math.sin(l.angle) * l.radius
			],
			scale: l.scale,
			speed: 1.2,
			seed: l.seed
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
			count: 40,
			scale: 6,
			size: 2.5,
			speed: .5,
			color: "#7ed88a",
			opacity: .7
		})]
	});
}
/** Dynamic juice splash wrapping around the glass without touching the ground. */
function SplashRibbon() {
	const wrap = (0, import_react.useRef)(null);
	const inner = (0, import_react.useRef)(null);
	const outer = (0, import_react.useRef)(null);
	const droplets = (0, import_react.useRef)(null);
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const dropletData = (0, import_react.useMemo)(() => Array.from({ length: 36 }, (_, i) => ({
		angle: i / 36 * Math.PI * 2,
		radius: 1.15 + Math.random() * .45,
		scale: .03 + Math.random() * .06,
		phase: Math.random() * Math.PI * 2,
		wave: .8 + Math.random() * .8
	})), []);
	useFrame((state) => {
		const t = state.clock.elapsedTime;
		if (wrap.current) {
			wrap.current.rotation.y = -t * .35;
			wrap.current.position.y = Math.sin(t * .6) * .12 - .1;
		}
		if (inner.current) {
			inner.current.rotation.x = Math.PI / 2 + Math.sin(t * .8) * .12;
			inner.current.rotation.y = Math.cos(t * .7) * .1;
		}
		if (outer.current) outer.current.rotation.x = Math.PI / 2 - Math.cos(t * .6) * .15;
		if (droplets.current) {
			dropletData.forEach((d, i) => {
				const y = Math.sin(t * d.wave + d.phase) * .25 + Math.sin(d.angle * 3 + t) * .12;
				dummy.position.set(Math.cos(d.angle) * d.radius, y, Math.sin(d.angle) * d.radius);
				const s = d.scale * (.8 + Math.sin(t * 2 + d.phase) * .2);
				dummy.scale.set(s, s * 1.6, s);
				dummy.rotation.set(0, -d.angle, Math.sin(t + d.phase) * .5);
				dummy.updateMatrix();
				droplets.current.setMatrixAt(i, dummy.matrix);
			});
			droplets.current.instanceMatrix.needsUpdate = true;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: wrap,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: inner,
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.05,
					.075,
					20,
					90
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ff9526",
					roughness: .12,
					transmission: .55,
					thickness: .8,
					ior: 1.35,
					transparent: true,
					opacity: .85,
					clearcoat: 1,
					emissive: "#ff6a00",
					emissiveIntensity: .1
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: outer,
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.25,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.32,
					.04,
					16,
					90
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ffb04d",
					roughness: .1,
					transmission: .7,
					thickness: .5,
					ior: 1.35,
					transparent: true,
					opacity: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
				ref: droplets,
				args: [
					void 0,
					void 0,
					dropletData.length
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1,
					10,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
					color: "#ff9526",
					roughness: .1,
					transmission: .5,
					thickness: .4,
					ior: 1.35,
					transparent: true,
					opacity: .9
				})]
			})
		]
	});
}
/** Fruits arranged on an orbiting ring around the glass. */
function FruitOrbit() {
	const ring = (0, import_react.useRef)(null);
	useFrame((state) => {
		if (!ring.current) return;
		ring.current.rotation.y = state.clock.elapsedTime * .12;
		const s = .4 + MathUtils.clamp(scrollState.progress * 5, 0, 1) * .6;
		ring.current.scale.setScalar(s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: ring,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orange, {
				position: [
					2.4,
					.3,
					.2
				],
				scale: .85,
				speed: 1.1,
				seed: 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mango, {
				position: [
					-2.2,
					.9,
					.6
				],
				scale: .9,
				speed: .9,
				seed: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strawberry, {
				position: [
					1.6,
					1.4,
					-1.6
				],
				scale: .75,
				speed: 1.3,
				seed: 3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatermelonSlice, {
				position: [
					-1.8,
					-.6,
					-1.4
				],
				scale: 1,
				speed: 1,
				seed: 4
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orange, {
				position: [
					-2.6,
					-.3,
					1.2
				],
				scale: .6,
				speed: 1.2,
				seed: 5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strawberry, {
				position: [
					2.2,
					-.8,
					1.4
				],
				scale: .6,
				speed: 1.1,
				seed: 6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MintLeaf, {
				position: [
					.9,
					1.9,
					1.1
				],
				scale: .9,
				speed: 1.4,
				seed: 7
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MintLeaf, {
				position: [
					-1.1,
					1.6,
					-.6
				],
				scale: .7,
				speed: 1.5,
				seed: 8
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IceCube, {
				position: [
					1.2,
					-1.4,
					-.4
				],
				scale: .6,
				speed: .8,
				seed: 9
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IceCube, {
				position: [
					-.9,
					-1.2,
					1.1
				],
				scale: .5,
				speed: .9,
				seed: 10
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mango, {
				position: [
					.2,
					-1.6,
					1.6
				],
				scale: .55,
				speed: 1,
				seed: 11
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrangeSlice, {
				position: [
					2.7,
					1.1,
					-.8
				],
				scale: .8,
				speed: 1.05,
				seed: 12
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrangeSlice, {
				position: [
					-1.5,
					-1.5,
					-1.8
				],
				scale: .6,
				speed: 1.2,
				seed: 13
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LemonSlice, {
				position: [
					-2.5,
					1.7,
					-1
				],
				scale: .7,
				speed: .95,
				seed: 14
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LemonSlice, {
				position: [
					1.9,
					-.2,
					2
				],
				scale: .55,
				speed: 1.15,
				seed: 15
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blueberry, {
				position: [
					.6,
					2.2,
					-1.3
				],
				scale: .9,
				speed: 1.4,
				seed: 16
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blueberry, {
				position: [
					-2.9,
					.4,
					-.3
				],
				scale: .75,
				speed: 1.25,
				seed: 17
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blueberry, {
				position: [
					2.5,
					.9,
					1.5
				],
				scale: .65,
				speed: 1.35,
				seed: 18
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MangoCube, {
				position: [
					-.4,
					2,
					1.8
				],
				scale: .85,
				speed: 1.1,
				seed: 19
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MangoCube, {
				position: [
					2.9,
					-.9,
					-1.2
				],
				scale: .7,
				speed: .95,
				seed: 20
			})
		]
	});
}
/** Studio lighting built from in-scene lightformers (no external HDRI fetch). */
function StudioEnvironment() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, {
		resolution: 256,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
				intensity: 2.2,
				position: [
					0,
					4,
					2
				],
				scale: [
					6,
					6,
					1
				],
				color: "#fff6e6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
				intensity: 1.4,
				position: [
					-4,
					1,
					2
				],
				scale: [
					3,
					6,
					1
				],
				color: "#ffd7a1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
				intensity: 1.2,
				position: [
					4,
					1,
					2
				],
				scale: [
					3,
					6,
					1
				],
				color: "#ffe9c7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
				intensity: 1,
				position: [
					0,
					-3,
					-2
				],
				scale: [
					8,
					4,
					1
				],
				color: "#e9fff0"
			})
		]
	});
}
/** Camera parallax, mouse-follow and scroll zoom. */
function CameraRig() {
	const { camera } = useThree();
	const target = (0, import_react.useMemo)(() => new Vector3(), []);
	useFrame(() => {
		const p = scrollState.progress;
		const zoom = 8.5 - p * 2.2;
		const swing = Math.sin(p * Math.PI) * 1.6;
		const px = scrollState.pointer.x;
		const py = scrollState.pointer.y;
		target.set(px * 1.4 + swing, .4 + py * .8, zoom);
		camera.position.lerp(target, .05);
		camera.lookAt(0, .1, 0);
	});
	return null;
}
function HeroScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#fff7e9"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#fff2dd",
				9,
				20
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .6 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				4,
				6,
				5
			],
			intensity: 2.2,
			castShadow: true,
			"shadow-mapSize": [1024, 1024]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-5,
				2,
				-3
			],
			intensity: .8,
			color: "#ffd8a8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioEnvironment, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.1,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JuiceGlass, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashRibbon, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FruitOrbit, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplashParticles, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IceStorm, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MintWhirl, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
					count: 60,
					scale: 9,
					size: 3,
					speed: .35,
					color: "#ffcf7a",
					opacity: .6
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-2,
				0
			],
			opacity: .35,
			scale: 12,
			blur: 2.8,
			far: 5,
			color: "#c47a1a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(dt, {
			enableNormalPass: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ce, {
					focusDistance: .02,
					focalLength: .04,
					bokehScale: 2.5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(wt, {
					intensity: .7,
					luminanceThreshold: .7,
					luminanceSmoothing: .3,
					mipmapBlur: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(qt, {
					eskil: false,
					offset: .15,
					darkness: .6
				})
			]
		})
	] });
}
/**
* Client-only WebGL layer. It is fixed behind the page content and driven by
* the shared scrollState store, so a single canvas powers every section.
*/
function ClientCanvas() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
	}, []);
	if (!mounted || reduced) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			shadows: true,
			dpr: [1, 2],
			gl: {
				antialias: true,
				alpha: true,
				powerPreference: "high-performance"
			},
			camera: {
				position: [
					0,
					.4,
					8.5
				],
				fov: 42
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroScene, {})
			})
		})
	});
}
var BLOBS = [
	{
		c: "var(--color-primary)",
		size: 380,
		top: "5%",
		left: "-6%",
		delay: 0
	},
	{
		c: "var(--color-lime)",
		size: 320,
		top: "55%",
		left: "70%",
		delay: 2
	},
	{
		c: "var(--color-berry)",
		size: 260,
		top: "72%",
		left: "8%",
		delay: 4
	},
	{
		c: "var(--color-mango)",
		size: 300,
		top: "12%",
		left: "72%",
		delay: 1
	}
];
var SLICES = [
	"🍊",
	"🍓",
	"🍉",
	"🥭",
	"🍋",
	"🌿"
];
/** Ambient animated background: soft blurred colour blobs, drifting fruit
*  slices, rising bubbles and light particles. Pure CSS/Framer, very cheap. */
function BackgroundFX() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-sunrise",
		children: [
			BLOBS.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "animate-blob absolute rounded-full opacity-30 blur-3xl",
				style: {
					width: b.size,
					height: b.size,
					top: b.top,
					left: b.left,
					background: b.c,
					animationDelay: `${b.delay}s`
				}
			}, i)),
			SLICES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute text-3xl opacity-40 blur-[1px] select-none",
				style: {
					top: `${8 + i * 15}%`,
					left: `${(i * 17 + 5) % 90}%`
				},
				animate: {
					y: [
						0,
						-40,
						0
					],
					rotate: [
						0,
						25,
						-10,
						0
					]
				},
				transition: {
					duration: 10 + i * 2,
					repeat: Infinity,
					ease: "easeInOut"
				},
				children: s
			}, i)),
			Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute rounded-full bg-white/50",
				style: {
					width: 6 + i % 4 * 5,
					height: 6 + i % 4 * 5,
					left: `${i * 53 % 100}%`,
					bottom: -20
				},
				animate: {
					y: [-0, -700],
					opacity: [
						0,
						.8,
						0
					]
				},
				transition: {
					duration: 9 + i % 5 * 2,
					repeat: Infinity,
					delay: i * .6,
					ease: "linear"
				}
			}, `b${i}`))
		]
	});
}
var FRUITS = [
	{
		c: "var(--color-primary)",
		from: {
			x: -160,
			y: -120
		}
	},
	{
		c: "var(--color-berry)",
		from: {
			x: 150,
			y: -140
		}
	},
	{
		c: "var(--color-lime)",
		from: {
			x: -170,
			y: 130
		}
	},
	{
		c: "var(--color-mango)",
		from: {
			x: 180,
			y: 120
		}
	},
	{
		c: "var(--color-accent)",
		from: {
			x: 0,
			y: -190
		}
	}
];
function JuiceLoader() {
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDone(true), 2700);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: !done && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-sunrise",
		exit: {
			opacity: 0,
			filter: "blur(12px)"
		},
		transition: {
			duration: .8,
			ease: "easeInOut"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-48 w-40",
			children: [FRUITS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute left-1/2 top-1/2 h-8 w-8 rounded-full",
				style: {
					background: f.c,
					marginLeft: -16,
					marginTop: -16
				},
				initial: {
					...f.from,
					scale: 1,
					opacity: 0
				},
				animate: {
					x: 0,
					y: -10,
					scale: 0,
					opacity: [
						0,
						1,
						1,
						0
					]
				},
				transition: {
					duration: 1.1,
					delay: .15 * i,
					ease: "easeInOut"
				}
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-0 left-1/2 h-40 w-28 -translate-x-1/2 overflow-hidden rounded-b-[2.5rem] rounded-t-xl border-2 border-primary/30 bg-white/30 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute bottom-0 left-0 w-full [background:var(--gradient-citrus)]",
					initial: { height: "0%" },
					animate: { height: "78%" },
					transition: {
						duration: 1.2,
						delay: 1,
						ease: "easeOut"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: "absolute inset-x-0 bottom-6 text-center text-3xl",
					initial: {
						y: 30,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					transition: {
						duration: .6,
						delay: 1.9
					},
					children: "🍊"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
			className: "mt-8 font-display text-lg font-semibold tracking-tight text-foreground",
			initial: {
				opacity: 0,
				y: 10
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { delay: 2 },
			children: "Squeezing something fresh…"
		})]
	}) });
}
function Sparkle({ delay, x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
		className: "pointer-events-none absolute h-2 w-2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]",
		style: {
			left: `${x}%`,
			top: `${y}%`
		},
		initial: {
			scale: 0,
			opacity: 0
		},
		variants: { hover: {
			scale: [
				0,
				1.2,
				0
			],
			opacity: [
				0,
				1,
				0
			]
		} },
		transition: {
			duration: 1,
			repeat: Infinity,
			delay
		}
	});
}
function ProductCard({ juice, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		className: "glass-panel group relative flex flex-col items-center rounded-3xl p-7 text-center",
		initial: {
			opacity: 0,
			y: 60
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .6,
			delay: index * .1,
			ease: "easeOut"
		},
		whileHover: "hover",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, {
				delay: 0,
				x: 18,
				y: 20
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, {
				delay: .3,
				x: 78,
				y: 16
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkle, {
				delay: .6,
				x: 70,
				y: 64
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-6 h-52 w-40",
				style: { perspective: 700 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute bottom-1 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-foreground/20 blur-md",
					animate: {
						scaleX: [
							1,
							.85,
							1
						],
						opacity: [
							.35,
							.2,
							.35
						]
					},
					transition: {
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					className: "relative mx-auto h-full w-28",
					animate: { y: [
						0,
						-8,
						0
					] },
					transition: {
						duration: 4,
						repeat: Infinity,
						ease: "easeInOut"
					},
					variants: { hover: {
						rotateY: 18,
						rotateZ: -4
					} },
					style: { transformStyle: "preserve-3d" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "absolute -top-3 left-1/2 z-20 -translate-x-1/2 text-3xl",
							animate: { rotate: 360 },
							transition: {
								duration: 12,
								repeat: Infinity,
								ease: "linear"
							},
							variants: { hover: { scale: 1.25 } },
							children: juice.garnish
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-6 left-[58%] z-10 h-24 w-2 origin-bottom rotate-[14deg] rounded-full bg-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-0 h-44 w-28 overflow-hidden rounded-b-[2.2rem] rounded-t-lg border-2 border-white/60 bg-white/25 backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "absolute bottom-0 left-0 w-full",
								style: {
									height: "80%",
									background: juice.liquid
								},
								variants: { hover: { height: "86%" } },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "absolute -top-2 left-0 h-4 w-full rounded-[50%] opacity-80",
									style: { background: juice.liquid },
									animate: {
										scaleX: [
											1,
											1.08,
											1
										],
										y: [
											0,
											2,
											0
										]
									},
									transition: {
										duration: 2.4,
										repeat: Infinity,
										ease: "easeInOut"
									}
								}), [
									0,
									1,
									2
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									className: "absolute h-5 w-5 rounded-md border border-white/70 bg-white/40",
									style: {
										left: 8 + i * 24,
										top: 10 + i % 2 * 20
									},
									animate: {
										y: [
											0,
											-4,
											0
										],
										rotate: [
											0,
											12,
											0
										]
									},
									transition: {
										duration: 3 + i,
										repeat: Infinity,
										ease: "easeInOut"
									}
								}, i))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-2 top-2 h-32 w-3 rounded-full bg-white/60 blur-[1px]" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl font-semibold",
				children: juice.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: juice.desc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex w-full items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl font-bold text-primary",
					children: juice.price
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "glow",
					size: "sm",
					className: "px-5",
					children: "Add to cart"
				})]
			})
		]
	});
}
var RING = [
	"🍊",
	"🍓",
	"🍉",
	"🥭",
	"🍋",
	"🍑",
	"🫐",
	"🥝"
];
var CONFETTI = Array.from({ length: 24 });
function SpecialOffer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center [background:var(--gradient-citrus)] animate-gradient-pan",
				initial: {
					opacity: 0,
					scale: .9
				},
				whileInView: {
					opacity: 1,
					scale: 1
				},
				viewport: { once: true },
				transition: {
					duration: .7,
					ease: "easeOut"
				},
				children: [
					CONFETTI.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "absolute top-0 h-2 w-2 rounded-sm",
						style: {
							left: `${i * 37 % 100}%`,
							background: i % 2 ? "white" : "var(--color-lime)"
						},
						animate: {
							y: [0, 420],
							rotate: [0, 360],
							opacity: [
								1,
								1,
								0
							]
						},
						transition: {
							duration: 4 + i % 4,
							repeat: Infinity,
							delay: i * .2,
							ease: "easeIn"
						}
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2",
						animate: { rotate: 360 },
						transition: {
							duration: 30,
							repeat: Infinity,
							ease: "linear"
						},
						children: RING.map((f, i) => {
							const a = i / RING.length * Math.PI * 2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute text-4xl opacity-80",
								style: {
									left: `calc(50% + ${Math.cos(a) * 200}px)`,
									top: `calc(50% + ${Math.sin(a) * 200}px)`,
									transform: "translate(-50%, -50%)"
								},
								children: f
							}, i);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "relative z-10 mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white text-primary shadow-[var(--shadow-glow)]",
						animate: {
							scale: [
								1,
								1.08,
								1
							],
							rotate: [
								-6,
								6,
								-6
							]
						},
						transition: {
							duration: 3,
							repeat: Infinity,
							ease: "easeInOut"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-3xl font-extrabold",
							children: "-30%"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "relative z-10 font-display text-4xl font-bold text-primary-foreground md:text-5xl",
						children: "Fresh Squeeze Weekend"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "relative z-10 mx-auto mt-3 max-w-lg text-primary-foreground/90",
						children: "Get 30% off every cold-pressed bottle this weekend. Bursting with real fruit, zero added sugar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "soft",
						size: "xl",
						className: "relative z-10 mt-8",
						children: "Claim the deal"
					})
				]
			})
		})
	});
}
var JUICES = [
	{
		name: "Sunrise Orange",
		desc: "Pure Valencia oranges, cold-pressed at dawn.",
		price: "$6",
		garnish: "🍊",
		liquid: "linear-gradient(180deg,#ffb347,#ff7a1a)",
		accent: "orange"
	},
	{
		name: "Berry Bliss",
		desc: "Strawberry, raspberry & a hint of mint.",
		price: "$7",
		garnish: "🍓",
		liquid: "linear-gradient(180deg,#ff6f91,#e2304a)",
		accent: "berry"
	},
	{
		name: "Melon Splash",
		desc: "Watermelon & lime over crushed ice.",
		price: "$6",
		garnish: "🍉",
		liquid: "linear-gradient(180deg,#ff8ba0,#ff4d5e)",
		accent: "melon"
	},
	{
		name: "Mango Tango",
		desc: "Alphonso mango with a citrus twist.",
		price: "$7",
		garnish: "🥭",
		liquid: "linear-gradient(180deg,#ffd25e,#f7971e)",
		accent: "mango"
	}
];
var FEATURES = [
	{
		icon: Leaf,
		title: "100% Real Fruit",
		text: "No concentrates, no added sugar — ever."
	},
	{
		icon: Sparkles$1,
		title: "Cold-Pressed",
		text: "Locks in nutrients and fresh flavor."
	},
	{
		icon: Truck,
		title: "Same-Day Delivery",
		text: "Chilled to your door in under an hour."
	}
];
var MARQUEE = [
	"100% Real Fruit",
	"Cold-Pressed Daily",
	"No Added Sugar",
	"Same-Day Delivery",
	"Eco-Friendly Bottles",
	"Zero Preservatives"
];
var PROCESS = [
	{
		icon: Citrus,
		step: "01",
		title: "Picked at dawn",
		text: "Ripe fruit arrives from local orchards within hours of harvest — never stored, never frozen."
	},
	{
		icon: GlassWater,
		step: "02",
		title: "Pressed cold",
		text: "Our hydraulic press extracts every drop without heat, keeping enzymes and vitamins intact."
	},
	{
		icon: Snowflake,
		step: "03",
		title: "Bottled & chilled",
		text: "Straight into glass bottles and onto ice — at your door the very same day, ice-cold."
	}
];
var TESTIMONIALS = [
	{
		name: "Maya R.",
		role: "Yoga instructor",
		quote: "The Sunrise Orange tastes like it was squeezed in front of me. I've cancelled every other juice subscription.",
		emoji: "🍊"
	},
	{
		name: "Daniel K.",
		role: "Marathon runner",
		quote: "Berry Bliss after a long run is my ritual now. Real fruit, real energy — you can taste the difference.",
		emoji: "🍓"
	},
	{
		name: "Lina S.",
		role: "Café owner",
		quote: "We serve Squeeze in our café and customers keep asking where it's from. Absolute best cold-pressed in town.",
		emoji: "🥭"
	}
];
function Index() {
	const rig = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: rig,
		offset: ["start start", "end end"]
	});
	useMotionValueEvent(scrollYProgress, "change", (v) => {
		scrollState.progress = v;
		scrollState.section = Math.min(4, Math.floor(v * 5));
	});
	(0, import_react.useEffect)(() => {
		const onMove = (e) => {
			scrollState.pointer.x = e.clientX / window.innerWidth * 2 - 1;
			scrollState.pointer.y = -(e.clientY / window.innerHeight * 2 - 1);
		};
		window.addEventListener("pointermove", onMove);
		return () => window.removeEventListener("pointermove", onMove);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JuiceLoader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundFX, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "fixed inset-x-0 top-0 z-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl font-extrabold tracking-tight",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-citrus",
								children: "Squeeze"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-8 text-sm font-medium md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#menu",
									className: "story-link",
									children: "Menu"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#story",
									className: "story-link",
									children: "Our Story"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#offer",
									className: "story-link",
									children: "Offers"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "hero",
							size: "default",
							className: "px-6",
							children: "Order now"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: rig,
				className: "relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-screen items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto grid w-full max-w-6xl items-center gap-8 px-6 pt-24 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 40
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .8,
									delay: 2.6
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles$1, { className: "h-4 w-4" }), " Freshly pressed daily"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "mt-5 font-display text-5xl font-extrabold leading-[1.05] md:text-7xl",
										children: [
											"Taste the ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-gradient-citrus",
												children: "fresh"
											}),
											" ",
											"side of every day"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-5 max-w-md text-lg text-muted-foreground",
										children: "Premium cold-pressed juices made from real, ripe fruit. Vibrant, refreshing, and delivered ice-cold to your door."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex flex-wrap gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "hero",
											size: "xl",
											children: "Shop juices"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "soft",
											size: "xl",
											children: "Watch the blend"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex items-center gap-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex text-primary",
											children: [
												0,
												1,
												2,
												3,
												4
											].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }, i))
										}), "Loved by 12,000+ juice fans"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-screen items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-full max-w-6xl px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "max-w-md md:ml-auto md:text-right",
								initial: {
									opacity: 0,
									x: 60
								},
								whileInView: {
									opacity: 1,
									x: 0
								},
								viewport: { once: true },
								transition: { duration: .7 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-4xl font-bold md:text-5xl",
									children: [
										"Poured fresh,",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-citrus",
											children: "never from concentrate"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-lg text-muted-foreground",
									children: "Watch it fill — ripe fruit pressed within hours, ice dropped in, mint spun through. Every glass is a little ritual of freshness."
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-screen items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-full max-w-6xl px-6 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 40
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { duration: .7 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-4xl font-bold md:text-6xl",
									children: [
										"Bursting with",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-citrus",
											children: "real flavor"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-4 max-w-xl text-lg text-muted-foreground",
									children: "Whole fruit, blended into vivid splashes of color and taste. Nothing artificial — just the good, juicy stuff."
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-screen items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-full max-w-6xl px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "max-w-md",
								initial: {
									opacity: 0,
									x: -60
								},
								whileInView: {
									opacity: 1,
									x: 0
								},
								viewport: { once: true },
								transition: { duration: .7 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-4xl font-bold md:text-5xl",
									children: [
										"Served ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-citrus",
											children: "ice-cold"
										}),
										", always"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-lg text-muted-foreground",
									children: "Crystal-clear ice, a frosted glass and a storm of chill — every sip lands at the perfect 4°C, from the first to the last."
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex min-h-screen items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-full max-w-6xl px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "max-w-md md:ml-auto md:text-right",
								initial: {
									opacity: 0,
									x: 60
								},
								whileInView: {
									opacity: 1,
									x: 0
								},
								viewport: { once: true },
								transition: { duration: .7 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-4xl font-bold md:text-5xl",
									children: [
										"A ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-citrus",
											children: "mint-fresh"
										}),
										" ",
										"finish"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-lg text-muted-foreground",
									children: "A whirl of garden mint spins through at the end — cool, green and impossibly fresh. That’s the Squeeze signature."
								})]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden border-y border-border/60 py-4 [background:var(--gradient-citrus)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-marquee flex w-max items-center gap-8 whitespace-nowrap",
							children: [...MARQUEE, ...MARQUEE].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-8 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground",
								children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: "text-lg",
									children: "🍊"
								})]
							}, i))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "story",
						className: "py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3",
							children: FEATURES.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "glass-panel rounded-3xl p-8",
								initial: {
									opacity: 0,
									y: 40
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									duration: .5,
									delay: i * .1
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 items-center justify-center rounded-2xl [background:var(--gradient-citrus)] text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-xl font-semibold",
										children: f.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-muted-foreground",
										children: f.text
									})
								]
							}, f.title))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-12 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-4xl font-bold md:text-5xl",
									children: [
										"From ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-citrus",
											children: "orchard"
										}),
										" to bottle"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-lg text-muted-foreground",
									children: "Three steps. Zero shortcuts. Every bottle, every day."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative grid gap-6 md:grid-cols-3",
								children: PROCESS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "glass-panel relative rounded-3xl p-8",
									initial: {
										opacity: 0,
										y: 40
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										duration: .5,
										delay: i * .15
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-5xl font-extrabold text-primary/15",
											children: p.step
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-2xl [background:var(--gradient-fresh)] text-secondary-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-6 w-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 font-display text-xl font-semibold",
											children: p.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted-foreground",
											children: p.text
										})
									]
								}, p.step))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "menu",
						className: "py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-12 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-4xl font-bold md:text-5xl",
									children: [
										"Our ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-citrus",
											children: "signature"
										}),
										" ",
										"blends"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-lg text-muted-foreground",
									children: "Four cold-pressed favorites — pick your fresh."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
								children: JUICES.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
									juice: j,
									index: i
								}, j.name))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-12 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-4xl font-bold md:text-5xl",
									children: [
										"Fresh ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-citrus",
											children: "words"
										}),
										" from juice fans"
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-6 md:grid-cols-3",
								children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
									className: "glass-panel flex flex-col rounded-3xl p-8",
									initial: {
										opacity: 0,
										y: 40
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										duration: .5,
										delay: i * .15
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-8 w-8 text-primary/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
											className: "mt-4 flex-1 text-muted-foreground",
											children: [
												"“",
												t.quote,
												"”"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
											className: "mt-6 flex items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-xl shadow-sm",
													children: t.emoji
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-display font-semibold",
													children: t.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm text-muted-foreground",
													children: t.role
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-auto flex text-primary",
													children: [
														0,
														1,
														2,
														3,
														4
													].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }, s))
												})
											]
										})
									]
								}, t.name))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "offer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecialOffer, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto max-w-3xl px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								className: "glass-panel rounded-[2.5rem] p-10 text-center md:p-14",
								initial: {
									opacity: 0,
									y: 40
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { duration: .6 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-sm font-semibold text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " Juicy news, monthly"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "mt-4 font-display text-3xl font-bold md:text-4xl",
										children: [
											"Get ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-gradient-citrus",
												children: "10% off"
											}),
											" your first order"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-3 max-w-md text-muted-foreground",
										children: "New blends, seasonal fruit drops and subscriber-only deals. No spam, just pulp."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row",
										onSubmit: (e) => e.preventDefault(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											required: true,
											placeholder: "you@example.com",
											className: "h-12 flex-1 rounded-full border border-border bg-white/80 px-5 text-sm outline-none ring-ring/40 transition focus:ring-2"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "hero",
											size: "lg",
											type: "submit",
											className: "rounded-full px-8",
											children: "Subscribe"
										})]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "border-t border-border/60 pb-10 pt-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto max-w-6xl px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-10 md:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "md:col-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-2xl font-extrabold text-gradient-citrus",
												children: "Squeeze"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 max-w-sm text-sm text-muted-foreground",
												children: "Premium cold-pressed juices made from real, ripe fruit — pressed at dawn, delivered ice-cold."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-5 flex gap-3",
												children: [
													Instagram,
													Twitter,
													Facebook
												].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "#",
													"aria-label": "Social link",
													className: "flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-muted-foreground shadow-sm transition hover:text-primary hover:shadow-[var(--shadow-glow)]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
												}, i))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display text-sm font-bold uppercase tracking-wider",
										children: "Explore"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-4 space-y-2 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#menu",
												className: "story-link",
												children: "Menu"
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#story",
												className: "story-link",
												children: "Our Story"
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#offer",
												className: "story-link",
												children: "Offers"
											}) })
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-display text-sm font-bold uppercase tracking-wider",
										children: "Visit us"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-4 space-y-2 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "14 Citrus Lane, Fruitville" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mon–Sun, 7am–8pm" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "hello@squeezejuice.co" })
										]
									})] })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-sm text-muted-foreground md:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"© ",
									(/* @__PURE__ */ new Date()).getFullYear(),
									" Squeeze Juice Co. Freshly made, always."
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-1.5",
									children: [
										"Made with ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											children: "🍊"
										}),
										" and zero concentrate"
									]
								})]
							})]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Index as component };
