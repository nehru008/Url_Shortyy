import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const THEME_KEY = "url_shortyy_theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      isDark: theme === "dark",
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
