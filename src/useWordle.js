import { useState, useEffect } from "react";
import { useScore } from "../contexts/ScoreContext";
export const useWordle = (solution, setSolution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const { score, updateScore } = useScore();

  const calculateScore = () => {
    const maxScore = 120;
    const baseScore = 20;
    const minTurns = 1;

    const turns = turn + 1;
    const scoreForTurn = maxScore - baseScore * Math.max(0, turns - minTurns);

    return scoreForTurn;
  };
  const handleRestart = (e) => {
    console.log(score);
    if (e.target.innerText === "Restart") {
      updateScore(0);
    }
    console.log(score);
    setSolution(null);
    setTurn(0);
    setCurrentGuess("");
    setGuesses([...Array(6)]);
    setHistory([]);
    setCorrect(false);
    setUsedKeys({});
  };

  const formatGuess = () => {
    let solutionArr = [...solution];
    let formattedGuess = [...currentGuess].map((elem) => {
      return { key: elem, color: "grey" };
    });
    formattedGuess.forEach((elem, i) => {
      if (solutionArr[i] === elem.key) {
        formattedGuess[i].color = "green";
        solutionArr[i] = null;
      }
    });
    formattedGuess.forEach((elem, i) => {
      if (solutionArr.includes(elem.key) && elem.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArr[solutionArr.indexOf(elem.key)] = null;
      }
    });
    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      if (currentGuess === solution) {
        setCorrect(true);
        const scoreForTurn = calculateScore();
        updateScore(score + scoreForTurn);
      }
    }
    setGuesses((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prev) => {
      let newKeys = { ...prev };
      formattedGuess.forEach((l) => {
        const currColor = newKeys[l.key];

        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "grey" &&
          currColor !== "green" &&
          currColor !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        alert("you used all the guesses");
        return;
      }
      if (history.includes(currentGuess)) {
        alert("You already tried that word");
        return;
      }
      if (currentGuess.length !== 5) {
        alert("Please finish the word");
        return;
      }
      const formattedWord = formatGuess();
      addNewGuess(formattedWord);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };
  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyup,
    usedKeys,
    score,
    handleRestart,
  };
};
