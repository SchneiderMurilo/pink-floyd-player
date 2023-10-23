import logo from "../../assets/logo.webp"
import "./Header.css"

export default function Header() {

    return (
        <div className="header">
            <img className="logo" src={logo} alt="logo" />
        </div>
    )

}