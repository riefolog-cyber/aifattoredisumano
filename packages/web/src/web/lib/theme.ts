import { STORAGE_KEYS } from "./site";

export type Theme = "dark" | "light";

export function systemTheme(): Theme {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function initialTheme(): Theme {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.theme) || "null");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage non disponibile: si usa la preferenza di sistema
  }
  return systemTheme();
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f6f4ea" : "#11191d");
}
