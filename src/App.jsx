import { useEffect, useState, useContext } from "react";
import "./App.css";
import { Wordle } from "../components/Wordle";
import "./index.css";
import ThemeToggler from "../components/ThemeToggler";
import ThemeContext from "../contexts/ThemeContext";
import { ProgressSpinner } from "primereact/progressspinner";

function App() {
  const [solution, setSolution] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (solution === null) {
      fetch("https://wordleserver.onrender.com/solution")
        .then((res) => res.json())
        .then((words) => {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          setSolution(randomWord.word);
        });
    }
  }, [solution, setSolution]);

  return (
    <div className={`theme-${theme}`}>
      {solution && (
        <Wordle solution={solution} setSolution={setSolution}></Wordle>
      )}
      <ThemeToggler></ThemeToggler>
    </div>
  );
}

export default App;
