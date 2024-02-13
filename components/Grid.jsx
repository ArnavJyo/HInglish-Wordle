import { Row } from "./Row";

export function Grid({ currentGuess, guesses, turn, theme }) {
  return (
    <div>
      {guesses.map((guess, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} theme={theme}></Row>;
        }
        return <Row key={i} guess={guess} theme={theme}></Row>;
      })}
    </div>
  );
}
