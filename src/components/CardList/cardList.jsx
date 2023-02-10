import { Card } from "../Card/card";
import "./index.css";

import { useEffect, useState } from "react";

export const CardList = ( {cards} ) => {

    return (
    <div className="cards">
        {cards.map((item) => {
        //  console.log({ item });
           return <Card {...item} key={item.name} />; // rest operator
        })}

    </div>
    );
}