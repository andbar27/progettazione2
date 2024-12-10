function Card() {
    
    const img = "https://i.pinimg.com/originals/ee/87/d8/ee87d8be406a16e8649217baa79505c2.jpg"
    const img2 = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/zoro-bounty-wanted-poster-one-piece-roronoa-zoro.jpg"
    const img3 = "https://cdn.shopify.com/s/files/1/0573/7522/8070/products/OP-428-Frankyjpg.jpg?v=1622780043"
    const img4 = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/one-piece-wanted-poster-robin-niklas-andersen.jpg"

    const NewElemnt = {
    height: "550px",
    width: "400px"
    } 

    const title1 = "Monkey D. Luffy"
    const title2 = "Roronoa Zoro"
    const title3 = "Franky"
    const title4 = "Nico Robin"

    const descr = "Monkey D. Luffy è il fondatore, capitano e il più forte combattente dei sempre più famigerati e potenti Pirati di Cappelli di paglia"
    const descr2 = "Roronoa Zoro è lo spadaccino dei Pirati di Cappello di paglia. In passato è stato un cacciatore di taglie."
    const descr3 = "Franky è un cyborg e il carpentiere dei Pirati di Cappello di paglia. Il suo nome era Cutty Flam finché non l'ha abbandonato su richiesta di Iceburg per nascondere la sua identità."
    const descr4 = "Nico Robin, noto anche per il suo epiteto 'Devil Child' e la 'Luce della Rivoluzione',[8] è l'archeologa dei Pirati del Cappello di paglia e uno degli alti ufficiali della Grand Fleet del Cappello di paglia."

    return (

        <div>
            <img src={img} style = {NewElemnt}></img>
            <div>
                <h2>{title1} </h2>
                <p>{descr}</p>
            </div>
            <div>
                <img src={img2} style = {NewElemnt}></img>
                <h2>{title2}</h2>
                <p>{descr2}</p>
            </div>
            <img src={img3} style = {NewElemnt}></img>
            <div>
                <h2>{title3} </h2>
                <p>{descr3}</p>
            </div>
            <img src={img4} style = {NewElemnt}></img>
            <div>
                <h2>{title4} </h2>
                <p>{descr4}</p>
            </div>

        </div>
    )
}
export default Card