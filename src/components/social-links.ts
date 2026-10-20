import { el } from "../utils/dom";
import { icon, type IconName } from "../utils/icons";
import { githubUrl, profile } from "../data/profile";

const LINKS: Array<{ name: IconName; label: string; href: string }> = [
  { name: "github", label: "GitHub", href: githubUrl },
  { name: "linkedin", label: "LinkedIn", href: profile.linkedin }
];

/** "icons": só ícones (nav). "labeled": ícone + texto (hero e rodapé). */
export function createSocialLinks(variant: "icons" | "labeled"): HTMLUListElement {
  const items = LINKS.map(({ name, label, href }) => {
    const link = el("a", {
      className: variant === "icons" ? "glass-pill icon-btn" : "glass-pill",
      attrs: { href, target: "_blank", rel: "noopener noreferrer", "aria-label": `${label} (abre em nova aba)` }
    });
    link.append(icon(name));
    if (variant === "labeled") link.append(el("span", { text: label }));
    return el("li", {}, [link]);
  });
  return el("ul", { className: "socials" }, items);
}
