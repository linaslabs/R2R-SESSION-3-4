import { 
    useState,
    useEffect,
    useRef
} from "react";
import Row from "./Row";
import Keyboard from "./Keyboard";

const SOLUTION = "table";

export default function Wordle() {
    const [guesses, setGuesses] = useState([
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
    ]);

    const worldRef = useRef();

    useEffect(() => {
        worldRef.current.focus();
        
    }, []);

    const handleKeyDown = () => {

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
        </div>
    )
}