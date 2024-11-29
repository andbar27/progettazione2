import Link from "./Link"
import  "./Navbar.css"

const x = 300;
const img = "vite.svg";
const img2 = "vite";
const y = 100;

const imgStyle = {
    height: y > 1000 ?"300px" : "100px",
    borderRadius: "90px"
}

function Navbar() {
    return (
        <>
        <div id="box">Ciao</div>
        <nav>{x > 10000 ? "sono in alto" : "sono in basso"}</nav>
        <img style={imgStyle} src={img}></img>
        <img className="bordoArrotondato" src={`/${img2}.svg`}></img>
        <img className="bordoArrotondato"  src={img2 + ".svg"}></img>
        <img style={{height: y > 1000 ?"300px" : "100px"}} src={img}></img>
        
        <ul>
            <li><Link></Link></li>
            <li><Link></Link></li>
            <li><Link></Link></li>
            <li><Link></Link></li>
        </ul>
        </>
    )
}

export default Navbar