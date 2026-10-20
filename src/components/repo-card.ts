import { el } from "../utils/dom";
import type { GithubRepo } from "../types";

const dateFormat = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" });

export function createRepoCard(repo: GithubRepo): HTMLAnchorElement {
  const meta = el("ul", { className: "repo__meta" });
  if (repo.language) meta.append(el("li", { text: repo.language }));
  if (repo.stars > 0) meta.append(el("li", { text: `★ ${repo.stars}` }));
  meta.append(el("li", { text: `Atualizado ${dateFormat.format(new Date(repo.pushedAt))}` }));

  return el(
    "a",
    { className: "card glass", attrs: { href: repo.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Abrir repositório ${repo.name} no GitHub` } },
    [
      el("h3", { className: "card__title", text: repo.name }),
      el("p", { className: "card__text", text: repo.description ?? "Sem descrição." }),
      meta
    ]
  );
}
