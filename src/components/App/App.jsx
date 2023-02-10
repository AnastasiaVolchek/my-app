

import React, { useEffect, useState } from "react";
import { CardList } from "../CardList/cardList";
import { Footer } from '../Footer/footer';
import { Header } from '../Header/header';
import './App.css';
import data from "../../data/data.json"



function App() {

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(()=>{

    const newState = data.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setCards(()=>[...newState]);
  }, [searchQuery])

  // console.log(cards, searchQuery);

  const getIssues = (numb) => {
    const tmp = numb % 10;
    if (tmp === 1) return " товар";
    if (tmp > 1 && tmp < 5) return " товара";
    if (tmp > 4 || !numb) return " товаров";
  };

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <main className="content container">
        {searchQuery && <p> По запросу {searchQuery} найдено {cards.length} {getIssues(cards.length)} </p>}
      <CardList cards={cards}/>
      </main>
      <Footer/>

    </>
  );
}

export default App;


// useEffect{()=>{}} update на каждое изменение компонента
// useEffect{()=>{}, [state]} update на каждое изменение конкретного state
// useEffect{()=>{}, []} update в самом начале 1 раз
