import React from "react";
import { ReactComponent as Like } from "./like.svg"
import "./index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { findLike } from "../../utils/utils";

export const Card = ({ 
    product, 
    pictures,
    stock, 
    name, 
    discount, 
    price, 
    setParentCounter, 
    onProductLike
}) => {
    const {currentUser} = React.useContext(UserContext);
    const {onProductDelete} = React.useContext(CardContext);
    
    //isLiked вычисляется с помощью функции findLike, которая проверяет, есть ли у текущего пользователя лайк на данном продукте. 
    //handleLikeClick вызывает функцию onProductLike, которая добавляет/удаляет продукт из избранного.
    
    const isLiked = findLike(product, currentUser);
    const handleLikeClick = () => {
        onProductLike(product);
    }
    
    //handleDelete вызывает функцию onProductDelete с идентификатором продукта для удаления.

    const handleDelete = () => {
        onProductDelete(product._id)
    }

    return (
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
                {discount>0 && <span className="card__discount">-{discount}%</span>}
            </div>
            <div className="card__sticky card__sticky_type_top-right">
                <button 
                    className={`card__favorite ${isLiked ? "card__favorite_active" : "card__favorite_not_active"}`}
                    onClick={handleLikeClick}>
                    <Like className="card__liked"/>
                </button>
            </div>
        <Link to={`/product/${product._id}`} className="card__link">
            <img src={pictures} alt="card__image" className="card__image"/>
            <div className="card__desc">
                <span className="card__price">{price}руб</span>
                <p className="card__name">{name}</p>
                <h6 className="card__link">Доступно: {stock} шт.</h6>
            </div>
        </Link>
            <span
            onClick={() => setParentCounter((state) => state + 1)}
            className='card__card btn btn_type_primary'>
            В корзину
            </span>
            <span
            onClick={() => handleDelete()}
            className='card__card btn btn_type_primary'>
            Удалить
            </span>
        </div>
    )
}