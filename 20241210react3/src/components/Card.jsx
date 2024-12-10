
function Card({titolo, imgUrl, descrizione, isVisit}) {
    return (
        <div>
            <img src={imgUrl} alt=""></img>
            <div>
            </div>
            <h2>{titolo}</h2>
            <p>{descrizione}</p>
            {isVisit && <span><b>Visitato</b></span>}
            {!isVisit && <span><b>Non visitato</b></span>}
        </div>
    )
}
export default Card