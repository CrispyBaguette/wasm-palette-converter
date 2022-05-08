import {
  faMoon,
  faSun,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function ThemeToggler() {
  const userPrefersDarkMode = (): boolean => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  const getCurrentTheme = (): Theme => {
    // We have a theme set
    if ("theme" in localStorage) {
      const theme = localStorage.getItem("theme");
      // Is it valid ?
      if (theme === "dark" || theme === "light") {
        return theme;
      } else {
        // Invalid theme, remove it and return default
        localStorage.removeItem("theme");
        return userPrefersDarkMode() ? "dark" : "light";
      }
    } else {
      return userPrefersDarkMode() ? "dark" : "light";
    }
  };

  const [theme, setTheme] = useState<Theme>(getCurrentTheme());

  const rotateTheme = () => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("light");
        break;
    }
  };

  const getIcon = (): IconDefinition => {
    switch (theme) {
      case "light":
        return faMoon;
      case "dark":
        return faSun;
    }
  };

  useEffect(() => {
    localStorage.theme = theme;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <FontAwesomeIcon
      icon={getIcon()}
      onClick={rotateTheme}
      className="fa-2x hover:text-nord-7 mx-2"
    />
  );
}

export default ThemeToggler;
