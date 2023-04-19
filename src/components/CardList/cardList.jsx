import React, { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { Card } from "../Card/card";
import "./index.css";

export const CardList = ({cards}) => {

    const {setParentCounter, handleProductLike} = useContext(CardContext)

    return (
    <div className="cards">
        {cards.map((item) => {
        return (
            <Card
              product={item}
              onProductLike={handleProductLike}
              setParentCounter={setParentCounter}
              {...item}
              key={item._id}
            />);
        })}

    </div>
    );
}
//компонент отображает список карточек товаров, используя метод map для перебора массива cards.
// для каждого элемента в массиве создается компонент Card, которому передаются свойства.
//Компонент Card отображает информацию о карточке товара и обрабатывает события "лайк" и удаления карточки товара. 
// При нажатии на кнопку "лайк" или "удалить" соответствующие функции вызываются из контекста CardContext. 