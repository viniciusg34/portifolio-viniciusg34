import { el } from "../utils/dom";
import { icon } from "../utils/icons";
import { reveal } from "../utils/reveal";
import { profile } from "../data/profile";
import { createSocialLinks } from "./social-links";
import { createThemeToggle } from "./theme-toggle";

export interface NavItem {
  id: string;
  label: string;
}

export function createNavbar(items: NavItem[]): HTMLElement {
  const initials = profile.shortName.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
  const links = new Map<string, HTMLAnchorElement[]>();

  const makeLink = (item: NavItem, className: string): HTMLAnchorElement => {
    const anchor = el("a", { className, text: item.label, attrs: { href: `#${item.id}` } });
    links.set(item.id, [...(links.get(item.id) ?? []), anchor]);
    return anchor;
  };

  const indicator = el("span", { className: "nav__indicator", attrs: { "aria-hidden": "true" } });
  const list = el("ul", { className: "nav__links" }, items.map((item) => el("li", {}, [makeLink(item, "nav__link")])));
  const track = el("div", { className: "nav__track" }, [indicator, list]);

  const brand = el("a", { className: "nav__brand", attrs: { href: "#", "aria-label": "Voltar ao topo" } }, [
    el("span", { className: "nav__mark", text: initials, attrs: { "aria-hidden": "true" } }),
    el("span", { className: "nav__name", text: profile.shortName })
  ]);

  const menuButton = el("button", {
    className: "glass-pill icon-btn menu-toggle",
    attrs: { type: "button", "aria-label": "Abrir menu", "aria-expanded": "false", "aria-controls": "nav-menu" }
  });
  const iconMenu = icon("menu");
  iconMenu.setAttribute("class", "i-menu");
  const iconClose = icon("close");
  iconClose.setAttribute("class", "i-close");
  menuButton.append(iconMenu, iconClose);

  const nav = el("nav", { className: "nav glass", attrs: { "aria-label": "Principal" } }, [
    brand,
    track,
    el("div", { className: "nav__actions" }, [createSocialLinks("icons"), createThemeToggle(), menuButton])
  ]);

  const menu = el("div", { className: "nav__menu glass", attrs: { id: "nav-menu" } }, [
    el("ul", { className: "nav__menu-list" }, items.map((item) => el("li", {}, [makeLink(item, "nav__menu-link")]))),
    createSocialLinks("labeled")
  ]);

  const bar = el("header", { className: "topbar" }, [nav, menu]);

  // ----- menu mobile -----
  const setOpen = (open: boolean): void => {
    bar.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  menuButton.addEventListener("click", () => setOpen(!bar.classList.contains("is-open")));
  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !bar.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  brand.addEventListener("click", (event) => {
    event.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ----- seção ativa + indicador deslizante -----
  let active = "";

  const place = (): void => {
    const link = links.get(active)?.[0];
    if (!link || link.offsetWidth === 0) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.setProperty("--ix", `${link.offsetLeft}px`);
    indicator.style.setProperty("--iw", `${link.offsetWidth}px`);
    indicator.style.opacity = "1";
  };

  const setActive = (id: string): void => {
    active = id;
    links.forEach((anchors, key) =>
      anchors.forEach((anchor) => {
        anchor.classList.toggle("is-active", key === id);
        if (key === id) anchor.setAttribute("aria-current", "true");
        else anchor.removeAttribute("aria-current");
      })
    );
    place();
  };

  const sections = items.map((item) => ({ id: item.id, node: document.getElementById(item.id) }));

  const spy = (): void => {
    const line = window.innerHeight * 0.4;
    let current = "";
    for (const entry of sections) {
      if (entry.node && entry.node.getBoundingClientRect().top <= line) current = entry.id;
    }
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom && sections.length > 0) current = sections[sections.length - 1].id;
    if (current !== active) setActive(current);
  };

  // ----- esconde ao rolar para baixo, mostra ao subir -----
  let lastY = window.scrollY;
  const autoHide = (): void => {
    const y = window.scrollY;
    const delta = y - lastY;
    if (Math.abs(delta) < 6) return;
    lastY = y;
    bar.classList.toggle("is-hidden", delta > 0 && y > 160 && !bar.classList.contains("is-open"));
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        spy();
        autoHide();
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", place);
  document.fonts?.ready.then(place);
  spy();

  reveal(nav);
  return bar;
}
