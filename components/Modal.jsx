export function Modal({ isCorrect, turn, solution, score, onRestart, theme }) {
  return (
    <div className={`modal ${theme}`}>
      {isCorrect && (
        <div>
          <p>YOU WIN!!!</p>
          <p className='solution'>{solution}</p>
          <p> You found the solution in {turn} guesses</p>
          <p>Your Score: {score}</p>
          <button
            className={theme === "dark" ? "darkButton" : "lightButton"}
            onClick={onRestart}
          >
            Continue
          </button>
          <button
            className={theme === "dark" ? "darkButton" : "lightButton"}
            onClick={onRestart}
          >
            Restart
          </button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <p>You are out of guesses</p>
          <p className='solution'>{solution}</p>
          <p> better luck next time</p>
          <p>Your Score: {score}</p>
          <button
            className={theme === "dark" ? "darkButton" : "lightButton"}
            onClick={onRestart}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
