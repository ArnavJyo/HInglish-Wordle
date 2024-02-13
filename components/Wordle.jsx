import { useContext, useEffect, useState } from "react";
import { useWordle } from "../src/useWordle";
import { Grid } from "./Grid";
import { Keypad } from "./Keypad";
import { Modal } from "./Modal";
import ThemeContext from "../contexts/ThemeContext";
export function Wordle({ solution, setSolution }) {
  const { theme } = useContext(ThemeContext);
  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    score,
    handleRestart,
  } = useWordle(solution, setSolution);
  const [showModal, setShowModal] = useState(false);
  const h1Style = {
    color: theme === "dark" ? "#fff" : "#000",
    fontFamily: "Times New Roman, serif",
    fontWeight: "bold",
    fontSize: "30px",
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);
  return (
    <>
      <h1 style={h1Style}>Hinglish Wordle Unlimited</h1>
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        turn={turn}
        theme={theme}
      ></Grid>
      <Keypad
        usedKeys={usedKeys}
        onKeyPress={handleKeyup}
        theme={theme}
      ></Keypad>
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          theme={theme}
          score={score}
          onRestart={handleRestart}
        ></Modal>
      )}
    </>
  );
}
