
import "./index.css";
import { Logo } from "../Logo/logo";
import { Link } from "react-router-dom";
import telegram from "./image/telegram.svg"
import instagram from "./image/instagram.svg"
import viber from "./image/viber.svg"
import vk from "./image/vk.svg"
import whatsapp from "./image/whatsapp.svg"

export const Footer = () => {
  
    return (
    <div className="footer"> 
        <div className="container">
            <div className="footer__wrapper">
            <div className="footer__col">
                <Logo className="footer__logo"/>
                <p className="footer__copyright">© «Интернет-магазин MarioShop.ru»</p>
            </div>
            <div className="footer__col">
                <nav className="menu-bottom">
                <a href="/" className="menu-bottom__item">Каталог</a>
                <a href="/" className="menu-bottom__item">Акции</a>
                <a href="/" className="menu-bottom__item">Новости</a>
                <a href="/" className="menu-bottom__item">Отзывы</a>
                </nav>
            </div>
            <div className="footer__col">
                <nav className="menu-bottom">
                <a href="/" className="menu-bottom__item">Оплата и доставка</a>
                <Link to={"/faq"} className="menu-bottom__item">Часто спрашивают</Link>
                <a href="/" className="menu-bottom__item">Обратная связь</a>
                <a href="/" className="menu-bottom__item">Контакты</a>
                </nav>
            </div>
            <div className="footer__col">
                <nav className="menu-bottom">
                <a href="/" className="menu-bottom__item">Мы на связи</a>
                <a href="/" className="menu-bottom__item">8 (910) 111-22-33</a>
                <a href="/" className="menu-bottom__item">dogfoodru@gmail.com</a>
                <ul className="socials">
                    <li className="socials__link socials__link:hover">
                        <a href="/">
                            <img src={telegram} alt=""/>
                        </a>
                    </li>
                    <li className="socials__link socials__link:hover">
                        <a href="/">
                            <img src={instagram} alt=""/>
                        </a>
                    </li>
                    <li className="socials__link socials__link:hover">
                        <a href="/">
                            <img src={viber} alt=""/>
                        </a>
                    </li>
                    <li className="socials__link socials__link:hover">
                        <a href="/">
                            <img src={vk} alt=""/>
                        </a>
                    </li>
                    <li className="socials__link socials__link:hover">
                        <a href="/">
                            <img src={whatsapp} alt=""/>
                        </a>
                    </li>
                </ul>
                </nav>
            </div>
            </div>
        </div>
    </div>
    );
};