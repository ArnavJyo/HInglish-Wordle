export function Row({ guess, currentGuess, theme }) {
  if (guess) {
    return (
      <div className={`row past ${theme}`}>
        {guess.map((elem, i) => (
          <div key={i} className={elem.color}>
            {elem.key}
          </div>
        ))}
      </div>
    );
  }
  if (currentGuess) {
    let letters = currentGuess.split("");
    return (
      <div className={`row current ${theme}`}>
        {letters.map((letter, i) => (
          <div key={i} className='filled'>
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }

  return (
    <div className={`row ${theme}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
