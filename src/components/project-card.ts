import { el } from "../utils/dom";
import type { Project, ProjectCardHandlers } from "../types";

export function createProjectCard(project: Project, handlers: ProjectCardHandlers): HTMLElement {
  const accent = el("div", { className: "card__accent" });
  accent.style.setProperty("--accent", project.accent);

  const head = el("div", { className: "card__head" }, [
    accent,
    ...(project.tag ? [el("span", { className: "card__tag", text: project.tag })] : [])
  ]);

  const chips = el(
    "ul",
    { className: "card__stack" },
    project.stack.map((item) => el("li", { className: "chip", text: item }))
  );

  const content = [head, el("h3", { className: "card__title", text: project.title }), el("p", { className: "card__text", text: project.description }), chips];

  // Projeto sem link publicado: card informativo, sem navegação
  if (!project.url) return el("article", { className: "card card--static glass" }, content);

  const card = el(
    "a",
    { className: "card glass", attrs: { href: project.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Abrir ${project.title}` } },
    content
  );

  card.addEventListener("pointerenter", handlers.onPreload);
  card.addEventListener("focus", handlers.onPreload);
  card.addEventListener("touchstart", handlers.onPreload, { passive: true });

  card.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    handlers.onOpen(card);
  });

  return card;
}
