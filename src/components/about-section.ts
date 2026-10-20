import { el } from "../utils/dom";
import { profile } from "../data/profile";
import { highlights } from "../data/resume";

export function createAboutSection(): HTMLElement {
  const initials = profile.shortName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatar = el("div", { className: "about__avatar", text: initials, attrs: { "aria-hidden": "true" } });

  const body = el("div", { className: "about__body" }, [
    ...profile.about.map((paragraph) => el("p", { className: "about__text", text: paragraph })),
    el("ul", { className: "highlights" }, highlights.map((item) => el("li", { text: item }))),
    el("ul", { className: "card__stack", attrs: { "aria-label": "Tecnologias" } }, profile.skills.map((skill) => el("li", { className: "chip", text: skill })))
  ]);

  return el("section", { attrs: { id: "sobre" } }, [
    el("h2", { className: "section__title", text: "Sobre mim" }),
    el("div", { className: "about glass" }, [avatar, body])
  ]);
}
