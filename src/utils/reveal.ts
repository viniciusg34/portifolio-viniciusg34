const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target as HTMLElement;
        observer?.unobserve(node);
        node.classList.add("is-visible");

        // Terminada a entrada, devolve o elemento ao CSS normal (hover etc. não herdam a transição lenta)
        const done = (event: TransitionEvent): void => {
          if (event.target !== node || event.propertyName !== "filter") return;
          node.removeEventListener("transitionend", done);
          node.classList.remove("reveal", "is-visible");
          node.style.removeProperty("--i");
        };
        node.addEventListener("transitionend", done);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  return observer;
}

/** Faz o elemento surgir com blur + fade quando entra na tela. `index` define o atraso (stagger). */
export function reveal<T extends HTMLElement>(node: T, index = 0): T {
  if (reduceMotion || !("IntersectionObserver" in window)) return node;
  node.classList.add("reveal");
  node.style.setProperty("--i", String(index));
  getObserver().observe(node);
  return node;
}
