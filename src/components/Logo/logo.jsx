import logoSrc from "./mario4.png";


import "./index.css";

export const Logo = () => {
    return (
        <a href="/">
            <img src={logoSrc}  alt="лого компании" className="logo-pic"/>
        </a>
    )
}