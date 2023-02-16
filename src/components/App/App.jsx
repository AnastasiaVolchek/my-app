

import React, { useEffect, useState } from "react";
import { CardList } from "../CardList/cardList";
import { Footer } from '../Footer/footer';
import { Header } from '../Header/header';
import './App.css';
import data from "../../data/data.json"
import { api } from "../../utils/api";
import { getIssues, useDebounce } from "../../utils/utils";


function App() {

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({})


  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data]));
  }

  const debounceValueInApp = useDebounce(searchQuery, 500);

  function handleProductLike (product) {
    const isLiked = product.likes.some(el=> el === currentUser._id );
    isLiked 
    ? api.deleteLike(product._id).then((newCard)=>{
      const newCards = cards.map((e)=> e._id === newCard._id ? newCard : e);
      setCards([...newCards]);
    })
    : api.addLike(product._id).then((newCard)=>{
    const newCards = cards.map((e)=> e._id === newCard._id ? newCard : e);
    setCards([...newCards]);
    });
  }

  useEffect(()=>{
    handleSearch(debounceValueInApp)
    // console.log({debounceValueInApp})
  }, [debounceValueInApp, searchQuery])


  useEffect(()=>{
  Promise.all([api.getProductList(), api.getUserInfo()]).then(([productData, userData])=>{
    setCards(productData.products);
    setCurrentUser(userData);
    }
  );
  // api.getProductList().then((data)=>setCards(data.products));
  // api.getUserInfo().then((data)=>setCurrentUser(data));
  }, [])

  return (
    <>
      <Header 
      user={currentUser}
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery}
      />
      <main className="content container">
        {searchQuery && <p> По запросу {searchQuery} найдено {cards.length} {getIssues(cards.length)} </p>}
      <CardList currentUser={currentUser} handleProductLike={handleProductLike} cards={cards}/>
      </main>
      <Footer/>

    </>
  );
}

export default App;


// useEffect{()=>{}} update на каждое изменение компонента
// useEffect{()=>{}, [state]} update на каждое изменение конкретного state
// useEffect{()=>{}, []} update в самом начале 1 раз


// чистая функция - это ф-я, которая при одних и тех же входнх параметрах возвращает одинаковый результат