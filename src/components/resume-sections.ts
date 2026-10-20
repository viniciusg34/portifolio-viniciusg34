import { el } from "../utils/dom";
import { courses, education, experience, skillGroups, softSkills, stats, type TimelineEntry } from "../data/resume";

function chips(items: string[], label: string): HTMLUListElement {
  return el("ul", { className: "card__stack", attrs: { "aria-label": label } }, items.map((item) => el("li", { className: "chip", text: item })));
}

function section(id: string, title: string, children: Node[]): HTMLElement {
  return el("section", { attrs: { id } }, [el("h2", { className: "section__title", text: title }), ...children]);
}

function panel(title: string, content: Node, extraClass = ""): HTMLElement {
  return el("div", { className: `panel glass ${extraClass}`.trim() }, [el("h3", { className: "panel__title", text: title }), content]);
}

function timeline(entries: TimelineEntry[]): HTMLElement {
  return el(
    "ol",
    { className: "timeline" },
    entries.map((entry) => {
      const body: Node[] = [
        el("div", { className: "tl__head" }, [
          el("h3", { className: "tl__title", text: entry.title }),
          ...(entry.badge ? [el("span", { className: "chip", text: entry.badge })] : [])
        ])
      ];
      if (entry.meta) body.push(el("p", { className: "tl__meta", text: entry.meta }));
      if (entry.text) body.push(el("p", { className: "tl__text", text: entry.text }));
      if (entry.items) body.push(el("ul", { className: "tl__list" }, entry.items.map((item) => el("li", { text: item }))));
      return el("li", { className: "tl__item glass" }, body);
    })
  );
}

export function createStats(): HTMLElement {
  return el(
    "div",
    { className: "stats" },
    stats.map((stat) =>
      el("div", { className: "stat glass" }, [
        el("strong", { className: "stat__value", text: stat.value }),
        el("span", { className: "stat__label", text: stat.label })
      ])
    )
  );
}

export function createExperienceSection(): HTMLElement {
  return section("experiencia", "Experiência", [timeline(experience)]);
}

export function createSkillsSection(): HTMLElement {
  const groups = skillGroups.map((group) => panel(group.title, chips(group.items, group.title)));
  groups.push(panel("Competências comportamentais", chips(softSkills, "Competências comportamentais"), "panel--wide"));
  return section("competencias", "Competências", [el("div", { className: "skills" }, groups)]);
}

export function createEducationSection(): HTMLElement {
  return section("formacao", "Formação", [timeline(education), panel("Cursos e capacitações", chips(courses, "Cursos e capacitações"))]);
}
