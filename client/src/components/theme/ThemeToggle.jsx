import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import Button from "../common/Button.jsx";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      icon={isDark ? Sun : Moon}
      variant="secondary"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
