import { el } from "../utils/dom";
import type { LinkedProject } from "../types";

const MAX_POOL = 4;
const LOAD_TIMEOUT_MS = 8000;

export class PortalViewer {
  private readonly root: HTMLElement;
  private readonly stage: HTMLElement;
  private readonly title: HTMLElement;
  private readonly external: HTMLAnchorElement;
  private readonly status: HTMLElement;
  private readonly frames = new Map<string, HTMLIFrameElement>();
  private activeId: string | null = null;
  private lastTrigger: HTMLElement | null = null;
  private timer = 0;

  constructor() {
    this.title = el("span", { className: "portal__title" });
    this.external = el("a", {
      className: "glass-pill",
      text: "Abrir em nova aba",
      attrs: { target: "_blank", rel: "noopener noreferrer" }
    });
    const closeButton = el("button", { className: "glass-pill", text: "Fechar", attrs: { type: "button" } });
    closeButton.addEventListener("click", () => this.close());

    const bar = el("div", { className: "portal__bar glass" }, [this.title, this.external, closeButton]);
    this.status = el("div", { className: "portal__status glass", attrs: { role: "status" } });
    this.stage = el("div", { className: "portal__stage" });
    const ring = el("div", { className: "portal__ring" });

    this.root = el("div", { className: "portal", attrs: { role: "dialog", "aria-modal": "true", "aria-hidden": "true" } }, [
      this.stage,
      ring,
      bar,
      this.status
    ]);

    document.body.append(this.root);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen) this.close();
    });
  }

  get isOpen(): boolean {
    return this.root.classList.contains("is-open");
  }

  preload(project: LinkedProject): void {
    if (this.frames.has(project.id)) return;
    this.trimPool();

    const frame = el("iframe", {
      className: "portal__frame",
      attrs: { src: project.url, title: project.title, loading: "eager", referrerpolicy: "no-referrer", allow: "camera; fullscreen; clipboard-write" }
    });
    frame.addEventListener("load", () => {
      frame.dataset.loaded = "true";
      if (this.activeId === project.id) this.hideStatus();
    });

    this.stage.append(frame);
    this.frames.set(project.id, frame);
  }

  open(project: LinkedProject, trigger: HTMLElement): void {
    this.preload(project);
    this.lastTrigger = trigger;
    this.activeId = project.id;

    const rect = trigger.getBoundingClientRect();
    this.root.style.setProperty("--x", `${rect.left + rect.width / 2}px`);
    this.root.style.setProperty("--y", `${rect.top + rect.height / 2}px`);

    this.frames.forEach((frame, id) => frame.classList.toggle("is-active", id === project.id));
    this.title.textContent = project.title;
    this.external.href = project.url;
    this.watchLoad(project.id);

    this.root.setAttribute("aria-hidden", "false");
    this.root.classList.add("is-visible");
    document.documentElement.classList.add("is-portal-open");
    requestAnimationFrame(() => requestAnimationFrame(() => this.root.classList.add("is-open")));
  }

  close(): void {
    if (!this.isOpen) return;
    window.clearTimeout(this.timer);
    this.root.classList.remove("is-open");
    this.root.setAttribute("aria-hidden", "true");

    const onEnd = (event: TransitionEvent): void => {
      if (event.target !== this.stage || event.propertyName !== "clip-path") return;
      this.stage.removeEventListener("transitionend", onEnd);
      this.root.classList.remove("is-visible");
      document.documentElement.classList.remove("is-portal-open");
      this.lastTrigger?.focus({ preventScroll: true });
    };
    this.stage.addEventListener("transitionend", onEnd);
  }

  private watchLoad(id: string): void {
    window.clearTimeout(this.timer);
    const frame = this.frames.get(id);
    if (frame?.dataset.loaded === "true") {
      this.hideStatus();
      return;
    }
    this.showStatus("Carregando…");
    this.timer = window.setTimeout(() => {
      if (this.activeId === id && frame?.dataset.loaded !== "true") {
        this.showStatus("Demorou ou o site bloqueia incorporação. Use “Abrir em nova aba”.");
      }
    }, LOAD_TIMEOUT_MS);
  }

  private showStatus(message: string): void {
    this.status.textContent = message;
    this.status.classList.add("is-visible");
  }

  private hideStatus(): void {
    this.status.classList.remove("is-visible");
  }

  private trimPool(): void {
    if (this.frames.size < MAX_POOL) return;
    for (const [id, frame] of this.frames) {
      if (id === this.activeId) continue;
      frame.remove();
      this.frames.delete(id);
      return;
    }
  }
}
