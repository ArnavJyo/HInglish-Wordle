// ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext([]);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#242424" : "#fff";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
