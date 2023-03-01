import React, { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { Card } from "../Card/card";
import "./index.css";

export const CardList = () => {

    const {cards, setParentCounter, handleProductLike} = useContext(CardContext)

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