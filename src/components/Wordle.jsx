import { 
    useState,
    useEffect,
    useRef
} from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";
import { 
    LETTERS, 
    WORDS 
} from "../data/lettersAndWords";

// hardcoded solution
const SOLUTION = "table";

// randomised solution
// const SOLUTION = WORDS[Math.floor(Math.random() * WORDS.length)];

export default function Wordle() {
    const [guesses, setGuesses] = useState([
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
    ]);
    const [activeLetterIndex, setActiveLetterIndex] = useState(0);
    const [activeRowIndex, setActiveRowIndex] = useState(0);
    const [notification, setNotification] = useState("");
    const solutionFound = false; // can use useState
    const [correctLetters, setCorrectLetters] = useState([]);
    const [presentLetters, setPresentLetters] = useState([]);
    const [absentLetters, setAbsentLetters] = useState([]);

    const worldRef = useRef();

    useEffect(() => {
        worldRef.current.focus();
        
    }, []);

    const typeLetter = (letter) => {
        // at 5th letter...
        if(activeLetterIndex < 5) {
            setNotification("");

            let newGuesses = [...guesses];
            newGuesses[activeRowIndex] = replaceCharacter(newGuesses[activeRowIndex], activeLetterIndex, letter);

            setGuesses(newGuesses);
            setActiveLetterIndex(index => index + 1); // why the function??
        }
    }

    const replaceCharacter = (string, index, replacement) => {
        return string.slice(0, index) + replacement + string.slice(index + replacement.length);
    }

    const hitEnter = () => {
        if(activeLetterIndex === 5) {
            const currentGuess = guesses[activeRowIndex];

            // word is invalid
            if(!WORDS.includes(currentGuess)) {
                setNotification("WORD INVALID");

            // guess is correct
            } else if(currentGuess === SOLUTION) {
                setSolution
                setNotification("WELL DONE!");

            // partial guess
            } else {
                
            }
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
            return;
        }

        if(e.key === "Enter") {
            hitEnter();
            return;
        }

        if(e.key === "Backspace") {
            hitBackspace();
        }
    }

    return (
        <div 
            className="wordle__container"
            ref={worldRef}
            tabIndex="0"
            onBlur={(e) => e.target.focus()}
            onKeyDown={handleKeyDown}
        >
            <h1 className="wordle__title">Ultimate Worlde</h1>
            <div className="wordle__notification"></div>
            {guesses.map((guess, index) => {
                return <Row key={index} word={guess}/>
            })}
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