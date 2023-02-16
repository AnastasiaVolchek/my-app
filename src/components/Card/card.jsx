import { ReactComponent as Like } from "./like.svg"

import "./index.css";
// здесь приходит props, а мы сразу достали props.card
export const Card = ({ currentUser, product, pictures, name, discount, price, onProductLike}) => {

    const isLiked = product.likes.some(el=> el === currentUser._id )
    const handleLikeClick = () => {
        onProductLike(product);
    }
    return(
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
                <span className="card__discount">{discount}%</span>
                </div>
            <div className="card__sticky card__sticky_type_top-right">
                <button 
                className={`card__favorite ${isLiked ? "card__favorite_active" : ""}`}
                onClick={handleLikeClick}
                >
                    <Like className="card__liked"/>
                </button>
            </div>
        <a href="/" className="card__link">
            <img src={pictures} alt="card__image" className="card__image"/>
            <div className="card__desc">
                <span className="card__price">{price}руб</span>
                <span className="card__wight">1pc</span>
                <p className="card__name">{name}</p>
            </div>
            </a>
            <a href="/" className="card__card btn btn_type_primary">В корзину</a>
       
        </div>
    )
}