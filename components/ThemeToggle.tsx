// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  // Read initial theme from localStorage if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("theme");
    const prefersLight =
      stored === "light" ||
      (!stored &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches);

    if (prefersLight) {
      document.documentElement.classList.add("light-mode");
      setIsLight(true);
    }
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);

    if (next) {
      document.documentElement.classList.add("light-mode");
      window.localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light-mode");
      window.localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label="Toggle light mode"
    >
      <span className="theme-toggle-dot" />
      <span className="theme-toggle-label">
        {isLight ? "light" : "dark"}
      </span>
    </button>
  );
}
