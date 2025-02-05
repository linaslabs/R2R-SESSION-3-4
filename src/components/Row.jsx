export default function Row({ 
    word, 
    applyRotation, 
    solution
}) {
    return (
      <div className="row__container">
        {word.split("").map((letter, index) => {
          const bgClass =
            solution[index] === letter
              ? "correct"
              : solution.includes(letter)
              ? "present"
              : "absent";
  
          return (
            <div
                key={index}
                className={`
                    letter__container 
                    ${bgClass} 
                    ${applyRotation && `rotate--${index + 1}00`} 
                    ${letter !== " " && "active"}`}
            >
              {letter}
              <div className="letter__back">{letter}</div>
            </div>
          );
        })}
      </div>
    );
  }