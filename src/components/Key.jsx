export default function Key({
    isAbsent,
    isPresent,
    isCorrect,
    letter,
    typeLetter
}) {
    return (
        <button
            className={`key
                ${isAbsent && "key__absent"} 
                ${isPresent && "key__present"} 
                ${isCorrect && "key__correct"}`
            }
            onClick={() => typeLetter(letter)}
        >{letter}</button>
    )
}