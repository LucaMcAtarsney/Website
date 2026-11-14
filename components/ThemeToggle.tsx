"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  // The pre-paint script in layout.tsx already applied the class; mirror it.
  useEffect(() => {
    setLight(document.documentElement.classList.contains("light-mode"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light-mode", next);
    try {
      window.localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="toggle"
      aria-label={`Switch to ${light ? "dark" : "light"} theme`}
    >
      [ {light ? "light" : "dark"} ]
    </button>
  );
}
