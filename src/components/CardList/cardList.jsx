import { Card } from "../Card/card";
import "./index.css";

import { useEffect, useState } from "react";

export const CardList = ( {currentUser, cards, handleProductLike} ) => {

    return (
    <div className="cards">
        {cards.map((item) => {
        //  console.log({ item });
           return <Card currentUser={currentUser} product={item} onProductLike={handleProductLike} {...item} key={item._id} />; // rest operator
        })}

    </div>
    );
}