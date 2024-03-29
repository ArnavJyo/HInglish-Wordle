import { useEffect, useState } from "react";

export function Keypad({ usedKeys, onKeyPress, theme }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("https://wordleserver.onrender.com/letters")
      .then((res) => res.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);

  const handleClick = (key) => {
  
      onKeyPress({ key });
    
  };

  return (
    <div className={`keypad ${theme}`}>
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div
              key={l.key}
              className={`${color} ${
                l.key === "Enter" || l.key === "Backspace" ? "large-key" : ""
              }`}
              onClick={() => handleClick(l.key)}
            >
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
