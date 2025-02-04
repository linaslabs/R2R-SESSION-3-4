import { LETTERS } from "../data/lettersAndWords";
import Key from "./Key";
import { IoBackspaceSharp } from "react-icons/io5";

export default function Keyboard({
    absentLetters,
    presentLetters,
    correctLetters,
    typeLetter,
    hitEnter,
    hitBackspace
}) {
    return (
        <div className="keyboard__container">
            <div className="keyboard__row">
                {LETTERS.slice(0, 10).map(letter => (
                    <Key
                        key={letter}
                        letter={letter}
                        typeLetter={typeLetter}
                        isAbsent={absentLetters.includes(letter)}
                        isPresent={presentLetters.includes(letter)}
                        isCorrect={correctLetters.includes(letter)}
                    />
                ))}
            </div>
            <div className="keyboard__row">
                {LETTERS.slice(10, 19).map(letter => (
                    <Key
                        key={letter}
                        letter={letter}
                        typeLetter={typeLetter}
                        isAbsent={absentLetters.includes(letter)}
                        isPresent={presentLetters.includes(letter)}
                        isCorrect={correctLetters.includes(letter)}
                    />
                ))}
            </div>
            <div className="keyboard__row">
                <button
                    className="key enter"
                    onClick={() => hitEnter()}
                >Enter</button>
                {LETTERS.slice(19, 26).map(letter => (
                    <Key
                        key={letter}
                        letter={letter}
                        typeLetter={typeLetter}
                        isAbsent={absentLetters.includes(letter)}
                        isPresent={presentLetters.includes(letter)}
                        isCorrect={correctLetters.includes(letter)}
                    />
                ))}
                <button
                    className="key backspace"
                    onClick={() => hitBackspace()}
                ><IoBackspaceSharp size={"24px"}/></button>
            </div>
        </div>
    )
}