export type Theme = "light" | "dark";

const KEY = "theme";
const META_COLOR: Record<Theme, string> = { light: "#eef2ff", dark: "#0b1020" };

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme, persist = true): void {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLOR[theme]);
  window.setTimeout(() => root.classList.remove("theme-anim"), 500);
  if (!persist) return;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage indisponível */
  }
}

/** Acompanha o tema do sistema enquanto a pessoa não escolheu manualmente. */
export function initTheme(): void {
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (event) => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {
      /* segue */
    }
    applyTheme(event.matches ? "light" : "dark", false);
  });
}
