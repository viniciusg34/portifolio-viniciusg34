import { el } from "../utils/dom";
import { icon } from "../utils/icons";
import { applyTheme, currentTheme } from "../utils/theme";

export function createThemeToggle(): HTMLButtonElement {
  const button = el("button", { className: "glass-pill icon-btn theme-toggle", attrs: { type: "button" } });
  const sun = icon("sun");
  sun.setAttribute("class", "i-sun");
  const moon = icon("moon");
  moon.setAttribute("class", "i-moon");
  button.append(sun, moon);

  const sync = (): void => {
    const label = `Mudar para tema ${currentTheme() === "dark" ? "claro" : "escuro"}`;
    button.setAttribute("aria-label", label);
    button.title = label;
  };
  sync();

  button.addEventListener("click", () => {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
    sync();
  });
  return button;
}
