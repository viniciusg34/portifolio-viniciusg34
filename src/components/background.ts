import { el } from "../utils/dom";

interface Shape {
  type: "ring" | "square" | "pill";
  size: number;
  left: number;
  top: number;
  depth: number; // intensidade do parallax (negativo inverte a direção)
  dur: number;
  delay: number;
}

const SHAPES: Shape[] = [
  { type: "ring", size: 120, left: 8, top: 18, depth: 28, dur: 14, delay: 0 },
  { type: "square", size: 90, left: 82, top: 12, depth: -22, dur: 18, delay: -4 },
  { type: "pill", size: 160, left: 70, top: 48, depth: 40, dur: 16, delay: -8 },
  { type: "ring", size: 70, left: 14, top: 62, depth: -36, dur: 20, delay: -2 },
  { type: "square", size: 110, left: 46, top: 80, depth: 24, dur: 17, delay: -6 },
  { type: "ring", size: 140, left: 90, top: 78, depth: 18, dur: 22, delay: -10 }
];

function bindParallax(root: HTMLElement): void {
  let tx = 0, ty = 0, ts = 0;
  let cx = 0, cy = 0, cs = 0;
  let raf = 0;

  const tick = (): void => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    cs += (ts - cs) * 0.12;
    root.style.setProperty("--px", cx.toFixed(3));
    root.style.setProperty("--py", cy.toFixed(3));
    root.style.setProperty("--sy", cs.toFixed(1));
    const moving = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 || Math.abs(ts - cs) > 0.5;
    raf = moving ? requestAnimationFrame(tick) : 0;
  };
  const kick = (): void => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType === "touch") return;
      tx = (event.clientX / window.innerWidth - 0.5) * 2;
      ty = (event.clientY / window.innerHeight - 0.5) * 2;
      kick();
    },
    { passive: true }
  );
  window.addEventListener(
    "scroll",
    () => {
      ts = window.scrollY;
      kick();
    },
    { passive: true }
  );
}

export function createBackground(): HTMLElement {
  const shapes = SHAPES.map((shape) => {
    const node = el("div", { className: `bg__shape bg__shape--${shape.type}` }, [el("i")]);
    node.style.setProperty("--s", `${shape.size}px`);
    node.style.setProperty("--l", `${shape.left}%`);
    node.style.setProperty("--t", `${shape.top}%`);
    node.style.setProperty("--d", String(shape.depth));
    node.style.setProperty("--dur", `${shape.dur}s`);
    node.style.setProperty("--delay", `${shape.delay}s`);
    return node;
  });

  const root = el("div", { className: "bg", attrs: { "aria-hidden": "true" } }, [
    el("div", { className: "bg__orb bg__orb--1" }),
    el("div", { className: "bg__orb bg__orb--2" }),
    el("div", { className: "bg__orb bg__orb--3" }),
    ...shapes
  ]);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) bindParallax(root);
  return root;
}
