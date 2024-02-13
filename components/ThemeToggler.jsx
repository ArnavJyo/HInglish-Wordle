import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import sunImage from "../imgs/sunimage.png";
import moonImage from "../imgs/moonimage.png";
export default function ThemeToggler() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const buttonStyle = {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundImage: `url(${theme === "light" ? sunImage : moonImage})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className={`theme-${theme}`}>
      <button
        onClick={toggleTheme}
        style={buttonStyle}
        className='toggleButton'
      ></button>
    </div>
  );
}
