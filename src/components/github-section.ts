import { el } from "../utils/dom";
import { fetchRepos } from "../services/github";
import { reveal } from "../utils/reveal";
import { createRepoCard } from "./repo-card";
import { githubUrl, profile } from "../data/profile";

export function createGithubSection(): HTMLElement {
  const grid = el("div", { className: "grid", attrs: { "aria-busy": "true" } }, [
    el("div", { className: "card glass skeleton" }),
    el("div", { className: "card glass skeleton" }),
    el("div", { className: "card glass skeleton" })
  ]);

  const showFallback = (): void => {
    grid.replaceChildren(
      el("p", { className: "section__note" }, [
        "Não consegui carregar os repositórios agora. ",
        el("a", { className: "link", text: "Veja direto no GitHub", attrs: { href: githubUrl, target: "_blank", rel: "noopener noreferrer" } }),
        "."
      ])
    );
  };

  fetchRepos(profile.github)
    .then((repos) => {
      if (repos.length === 0) return showFallback();
      grid.replaceChildren(...repos.map((repo, i) => reveal(createRepoCard(repo), i % 3)));
    })
    .catch(showFallback)
    .finally(() => grid.removeAttribute("aria-busy"));

  return el("section", { attrs: { id: "github" } }, [el("h2", { className: "section__title", text: "No GitHub" }), grid]);
}
