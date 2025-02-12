import Wordle from "./components/Wordle"
import { useEffect, useState } from "react"

function App() {
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWord = async () => {
      const data = await fetch("https://random-word-api.herokuapp.com/word?number=1&length=5");
      const word = await data.json();
      setIsLoading(false);
      setSolution(word[0]);
    }

    fetchWord();

  }, []);

  return (
    <div>
      {isLoading ? <p>loading</p> : <Wordle solution={solution}/>}
    </div>
  )
}

export default App
