import { 
    useState,
    useEffect
} from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { 
    LETTERS, 
    WORDS 
} from "../data/lettersAndWords";

export default function Wordle({ solution }) {
    const [guesses, setGuesses] = useState([
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
    ]);
    const [solutionFound, setSolutionFound] = useState(false);
    const [activeLetterIndex, setActiveLetterIndex] = useState(0);
    const [activeRowIndex, setActiveRowIndex] = useState(0);
    const [failedGuesses, setFailedGuesses] = useState([]);
    const [notification, setNotification] = useState("");
    const [correctLetters, setCorrectLetters] = useState([]);
    const [presentLetters, setPresentLetters] = useState([]);
    const [absentLetters, setAbsentLetters] = useState([]);

    const SOLUTION = solution;

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        // cleanup function
        return () => window.removeEventListener("keydown", handleKeyDown);
        
    }, [activeLetterIndex]);
    
    const typeLetter = (letter) => {
        if(activeLetterIndex < 5) {
            setNotification("");

            // creating a new array as mutating it directly won't trigger the state update
            const newGuesses = [...guesses];
            newGuesses[activeRowIndex] = replaceCharacter(newGuesses[activeRowIndex], activeLetterIndex, letter);

            setGuesses(newGuesses);
            setActiveLetterIndex(index => index + 1); // why the function??
        }
    }

    const replaceCharacter = (string, index, replacement) => {
        return string.slice(0, index) + replacement + string.slice(index + replacement.length);
    }

    const hitEnter = () => {
        // check all 5 characters have been input
        if(activeLetterIndex === 5) {
            const currentGuess = guesses[activeRowIndex];

            // word is invalid
            if(!WORDS.includes(currentGuess)) {
                setNotification("WORD INVALID");

            // word already tried
            } else if(failedGuesses.includes(currentGuess)) {
                setNotification("WORD TRIED ALREADY");

            // guess is correct
            } else if(currentGuess === SOLUTION) {
                setSolutionFound(true);
                setNotification("WELL DONE!");
                setCorrectLetters([...SOLUTION]);

            // partial guess
            } else {
                const correctLetters = [];

                [...currentGuess].forEach((letter, index) => {
                    if(SOLUTION[index] === letter) {
                        correctLetters.push(letter);
                    }
                });

                setCorrectLetters([...new Set(correctLetters)]);

                setPresentLetters([
                    ...new Set([
                        ...presentLetters,
                        ...[...currentGuess].filter(letter => SOLUTION.includes(letter))
                    ])
                ]);

                setAbsentLetters([
                    ...new Set([
                        ...absentLetters,
                        ...[...currentGuess].filter(letter => !SOLUTION.includes(letter))
                    ])
                ]);

                setFailedGuesses([...failedGuesses, currentGuess]);
                setActiveRowIndex(index => index + 1);
                setActiveLetterIndex(0);
            }

        } else {
            setNotification("FIVE LETTER WORDS ONLY");
        }
    }

    const hitBackspace = () => {
        setNotification("");

        // only allow backspace if first letter is non-empty
        if(guesses[activeRowIndex][0] !== " ") {
            const newGuesses = [...guesses];

            newGuesses[activeRowIndex] = replaceCharacter(
                newGuesses[activeRowIndex],
                activeLetterIndex - 1,
                " "
            );

            setGuesses(newGuesses);
            setActiveLetterIndex(index => index - 1);
        }
    }

    const handleKeyDown = (e) => {
        if(solutionFound) return;

        if(LETTERS.includes(e.key)) {
            typeLetter(e.key);

        } else if(e.key === "Enter") {
            hitEnter();

        } else if (e.key === "Backspace") {
            hitBackspace();
        }
    }

    return (
        <div className="wordle__container">
            <h1 className="wordle__title">Ultimate Worlde</h1>
            <div className={`
                wordle__notification 
                ${solutionFound && "wordle__notification__green"}`
            }>{notification}</div>
            {guesses.map((guess, index) => (
                <Row 
                    key={index} 
                    word={guess}
                    applyRotation={activeRowIndex > index || (solutionFound && activeRowIndex === index)}
                    solution={SOLUTION}
                />
            ))}
            <Keyboard 
                presentLetters={presentLetters} 
                correctLetters={correctLetters} 
                absentLetters={absentLetters}
                typeLetter={typeLetter}
                hitEnter={hitEnter}
                hitBackspace={hitBackspace}
            />
        </div>
    )
}