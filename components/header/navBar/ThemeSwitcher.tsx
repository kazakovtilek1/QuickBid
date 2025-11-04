"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={`
        py-1 px-2 cursor-pointer rounded-[6px] border border-[#DE970098]/60 
        hover:border-[#DE970098] transition
        ${currentTheme === "dark" ? "bg-black text-white" : "bg-white text-black"}
      `}
      aria-label="Toggle Dark Mode"
    >
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
