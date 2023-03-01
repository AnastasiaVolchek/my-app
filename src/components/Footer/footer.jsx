import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./style.css";

export const Footer = () => {
  
    const user = useContext(UserContext);

    return (
    <div className="footer"> 
        <div className="container">
            {user.name}
            footer
        </div>
    </div>
    );
};