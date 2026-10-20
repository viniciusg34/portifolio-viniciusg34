import { el } from "../utils/dom";
import { profile } from "../data/profile";
import { createSocialLinks } from "./social-links";

export function createContactSection(): HTMLElement {
  const actions = el("div", { className: "contact__actions" }, [
    el("a", { className: "glass-pill glass-pill--primary", text: "Enviar e-mail", attrs: { href: `mailto:${profile.email}` } }),
    el("a", { className: "glass-pill", text: profile.phoneDisplay, attrs: { href: `tel:${profile.phone}` } }),
    createSocialLinks("labeled")
  ]);

  return el("section", { attrs: { id: "contato" } }, [
    el("div", { className: "contact glass" }, [
      el("h2", { className: "contact__title", text: "Vamos conversar?" }),
      el("p", {
        className: "contact__text",
        text: "Estou em busca de uma vaga de estágio em desenvolvimento de software. Se o meu perfil faz sentido para o seu time, vou adorar conversar."
      }),
      actions,
      el("p", { className: "contact__meta", text: `${profile.location} · ${profile.email}` })
    ])
  ]);
}
