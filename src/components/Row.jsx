export default function Row({ word }) {
    const renderedLetters = word.split("").map((letter, index) => (
        <div key={index} className="letter__container">
            {letter}
            <div className="letter__back">{letter}</div>
        </div>
    ));
    
    return (
        <div className="row__container">{renderedLetters}</div>
    )
}