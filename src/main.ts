import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/glass.css";
import "./styles/portal.css";
import "./styles/responsive.css";
import "./styles/motion.css";
import "./styles/nav.css";
import "./styles/sections.css";

import { projects } from "./data/projects";
import { githubConfigured, profile } from "./data/profile";
import { createProjectCard } from "./components/project-card";
import { createAboutSection } from "./components/about-section";
import { createBackground } from "./components/background";
import { createContactSection } from "./components/contact-section";
import { createGithubSection } from "./components/github-section";
import { createNavbar } from "./components/navbar";
import { createEducationSection, createExperienceSection, createSkillsSection, createStats } from "./components/resume-sections";
import { createSocialLinks } from "./components/social-links";
import { PortalViewer } from "./components/portal-viewer";
import { el } from "./utils/dom";
import { reveal } from "./utils/reveal";
import { initTheme } from "./utils/theme";

function revealAll(root: HTMLElement, selector: string): void {
  root.querySelectorAll<HTMLElement>(selector).forEach((node) => {
    const siblings = node.parentElement ? Array.from(node.parentElement.children) : [];
    reveal(node, Math.max(0, siblings.indexOf(node)) % 4);
  });
}

function mount(): void {
  const root = document.getElementById("app");
  if (!root) throw new Error("Elemento #app não encontrado");

  initTheme();
  document.body.prepend(createBackground());
  const viewer = new PortalViewer();

  const hero = el("header", { className: "hero" }, [
    el("p", { className: "hero__eyebrow", text: `Olá, eu sou ${profile.shortName}` }),
    el("h1", { className: "hero__title", text: "Desenvolvedor de software focado em backend com Kotlin e Java." }),
    el("p", {
      className: "hero__text",
      text: "Quatro anos de TI em ambiente corporativo, com experiência em front-end e back-end. Hoje busco uma vaga de estágio em desenvolvimento de software."
    }),
    el("p", { className: "hero__loc", text: `${profile.location} · Aberto a oportunidades de estágio` }),
    el("div", { className: "hero__cta" }, [
      el("a", { className: "glass-pill glass-pill--primary", text: "Fale comigo", attrs: { href: "#contato" } }),
      createSocialLinks("labeled")
    ])
  ]);

  const cards = projects.map((project) => {
    const { url } = project;
    const handlers = url
      ? {
          onPreload: () => viewer.preload({ ...project, url }),
          onOpen: (trigger: HTMLElement) => viewer.open({ ...project, url }, trigger)
        }
      : { onPreload: () => undefined, onOpen: () => undefined };
    return createProjectCard(project, handlers);
  });

  const projectsSection = el("section", { attrs: { id: "projetos" } }, [
    el("h2", { className: "section__title", text: "Projetos" }),
    el("div", { className: "grid" }, cards)
  ]);

  const footer = el("footer", { className: "footer" }, [
    el("p", { text: `© ${new Date().getFullYear()} ${profile.name}` }),
    el("p", { text: "Feito com HTML, CSS e TypeScript" })
  ]);

  root.append(hero, createStats(), createAboutSection(), createExperienceSection(), createSkillsSection(), projectsSection);
  if (githubConfigured) root.append(createGithubSection());
  root.append(createEducationSection(), createContactSection(), footer);

  document.body.prepend(
    createNavbar([
      { id: "sobre", label: "Sobre" },
      { id: "experiencia", label: "Experiência" },
      { id: "projetos", label: "Projetos" },
      { id: "formacao", label: "Formação" },
      { id: "contato", label: "Contato" }
    ])
  );

  // Entrada suave com blur ao rolar
  Array.from(hero.children).forEach((child, i) => reveal(child as HTMLElement, i + 1));
  revealAll(root, ".section__title, .about, .stats > *, .tl__item, .skills > *, .panel, .contact");
  cards.forEach((card, i) => reveal(card, i % 3));
  reveal(footer);

  document.title = `${profile.name} | Desenvolvedor de Software`;
}

// Brilho que acompanha o ponteiro nos cards
document.addEventListener(
  "pointermove",
  (event) => {
    if (!(event.target instanceof Element)) return;
    const card = event.target.closest<HTMLElement>(".card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  },
  { passive: true }
);

mount();
