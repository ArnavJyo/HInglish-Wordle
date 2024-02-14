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
       {!solution && (
        <ProgressSpinner
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "50px",
          }}
          strokeWidth='8'
          fill='var(--surface-ground)'
          animationDuration='60s'
        />
      )}
      {solution && (
        <Wordle solution={solution} setSolution={setSolution}></Wordle>
      )}
      <ThemeToggler></ThemeToggler>
    </div>
  );
}

export default App;
