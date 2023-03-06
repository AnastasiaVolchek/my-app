import React, { useEffect, useState } from "react";
import { Footer } from '../Footer/footer';
import { Header } from '../Header/header';
import './App.css';
import { api } from "../../utils/api";
import { findLike, useDebounce } from "../../utils/utils";
import { Route, Routes } from "react-router-dom";
import { ProductPage } from "../../pages/Product/ProductPage";
import { CatalogPage } from "../../pages/Catalog/CatalogPage";
import { UserContext } from "../../context/userContext.js";
import { CardContext } from "../../context/cardContext.js";
import { FaqPage } from "../../pages/FAQ/FaqPage";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Favorites } from "../../pages/Favorites/Favorites";


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({})
  const [favorites, setFavorites] = useState([])


  const filteredCards = (products, id) => {
  return products.filter((e) => e.author._id === id);
  };
  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);



  // функция по наж/отж лайка
  function handleProductLike(product) {
    // узнаем , отлайкан ли продукт
    const isLiked = findLike(product, currentUser);
    isLiked
      ? // Если товар был с лайком, значит было действие по удалению лайка
        api.deleteLike(product._id).then((newCard) => {
          // newCard - карточка с уже изм кол-вом лайков
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((state) => state.filter((f) => f._id !== newCard._id));
        })
      : // Если не отлайкан, значит действие было сов-но для доб-я лайка.
        api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards(filteredCards(newCards, currentUser._id));
          setFavorites((favor) => [...favor, newCard]);
        });
  }


  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);


  // Первонач загрузка продуктов и данных юзера
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        // сетим юзера
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        // сетим карточки
        setCards(items);
        // получаем отлайканные нами карточки
        const fav = items.filter((e) => findLike(e, userData));
        // сетим карточки в избранный стейт
        setFavorites(fav);
      }
    );
  }, []);

  const clickMe = async () => {
    await api.addProduct();
  }


function userEdit(userUpdate) {
  api.setUserInfo(userUpdate).then((newUserData)=> {setCurrentUser(newUserData)
});
}


const setSortCards = (sort) => {
  if (sort === 'cheapest') {
    const newCards = cards.sort((a,b)=> a.price - b.price);
    setCards([...newCards]);
  }
  if (sort === 'richest') {
    const newCards = cards.sort((a,b)=> b.price - a.price);
    setCards([...newCards]);
  }
  if (sort === 'popular') {
    const newCards = cards.sort((a,b)=> b.likes.length - a.likes.length);
    setCards([...newCards]);
  }
  if (sort === 'newest') {
    const newCards = cards.sort((a,b)=> new Date(a.created_at) - new Date(b.created_at));
    setCards([...newCards]);
  }
}

const onProductDelete = async (id) => {
  try {
    const res = await api.deleteProduct(id)
    setCards((state)=> state.filter(e => e._id !== res._id))
  } catch (error) {
    console.log(error)
    alert("Нельзя удалить чужой товар")
  }


}

const contextValue  = {setSort: setSortCards, currentUser, searchQuery, setSearchQuery, setParentCounter, parentCounter}
const contextCardValue = { cards, setParentCounter, handleProductLike, onProductDelete, favorites, setFavorites}


  return (
    <>
     <UserContext.Provider value={contextValue}> 
     <CardContext.Provider value={contextCardValue}>
      <Header />

      <main className="content container">
      <button onClick={()=>clickMe()}>Добавить новый продукт</button>
      <button onClick={()=>userEdit()}>Изменить данные пользователя</button>
      <Routes>
        <Route path="/" element={ <CatalogPage /> } 
        ></Route>
        <Route path="/product/:productId" element={<ProductPage />}>
        </Route>
        <Route path="/fakeRout/:productId" element={<ProductPage />}>
        </Route>
        <Route path="faq" element={<FaqPage />}>
        </Route>
        <Route path="favorites" element={<Favorites />}>
        </Route>
        <Route path="*" element={<NotFound/>}>
        </Route>
      </Routes>

      </main>
      <Footer/>
      </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;


// useEffect{()=>{}} update на каждое изменение компонента
// useEffect{()=>{}, [state]} update на каждое изменение конкретного state
// useEffect{()=>{}, []} update в самом начале 1 раз


// чистая функция - это ф-я, которая при одних и тех же входнх параметрах возвращает одинаковый результат


// Роутинг - схема: 

// <BrowserRouter>
// <Routes>
// <Route path="/" element={<Dashboard />}>
// <Route path="about" element={<AboutPage />} />
//</Routes> 
// </BrowserRouter>