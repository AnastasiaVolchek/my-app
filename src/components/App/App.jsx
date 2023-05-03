import React, { useEffect, useState } from "react";
import { Footer } from '../Footer/footer';
import { Header } from '../Header/header';
import './App.scss';
import { api } from "../../utils/api";
import { findLike, useDebounce } from "../../utils/utils";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductPage } from "../../pages/Product/ProductPage";
import { CatalogPage } from "../../pages/Catalog/CatalogPage";
import { UserContext } from "../../context/userContext.js";
import { CardContext } from "../../context/cardContext.js";
import { FaqPage } from "../../pages/FAQ/FaqPage";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Favorites } from "../../pages/Favorites/Favorites";
import { Modal } from "../Modal/Modal";
import { Login } from "../Auth/Login/Login";
import { Register } from "../Auth/Register/Register";
import { ResetPass } from "../Auth/ResetPassword/ResetPassword";
import { Profile } from "../Profile/Profile";
import { Chart } from "../Chart/Chart";


function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({})
  const [favorites, setFavorites] = useState([])
  const [activeModal, setShowModal] = useState(false)
  const [isAuthentificated, setIsAuthentificated] = useState(false)


 // функция, которая фильтрует продукты по автору (выдает только мои продукты)
  const filteredCards = (products, id) => {
    return products.filter((e) => e.author._id === id);
    // return products 
  };

  //поиск товаров
  //Функция принимает один аргумент search, который является строкой поискового запроса
  //отправляем запрос на поиск товаров, затем фильтруем по автору, затем меняем стейт
  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
  };

  //задержка при поиске 
  //Хук useDebounce задерживает изменение значения переменной на определенное время 
  const debounceValueInApp = useDebounce(searchQuery, 500);


  // функция по наж/отж лайка
  function handleProductLike(product) {
    // Функция findLike - узнаем , отлайкан ли продукт был (принимает объект продукта и текущего юзера)
    const isLiked = findLike(product, currentUser);
     isLiked
      ? // Если товар уже лайкнут, то переменная isLiked будет равна true => надо удалить лайк
      api.deleteLike(product._id).then((newCard) => {
        // newCard - карточка с уже измененным кол-вом лайков
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        // отфильтрованные карточки товаров будут обновлены в состоянии компонента с помощью setCards
        setCards(filteredCards(newCards, currentUser._id));
        //также если мы удалили лайк, то обновится список избранных товаров с помощью setFavorites
        setFavorites((state) => state.filter((f) => f._id !== newCard._id));
      })
      : // Если не отлайкан, значит действие было совершено для добавления лайка.
      api.addLike(product._id).then((newCard) => {
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        setCards(filteredCards(newCards, currentUser._id));
        setFavorites((favor) => [...favor, newCard]);
      });
      return isLiked
  }

//для обновления карточек товаров в приложении при каждом изменении значения переменной debounceValueInApp
  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);


  // Первонач загрузка продуктов и данных юзера (когда оба запроса выполнятся успешно)
  // Promise.all позволяет выполнить несколько асинхронных запросов одновременно
  // Обновление при каждом изменении статуса аутентификации 
  // если пользователь не авторизован,  то функция завершается

  useEffect(() => {
    if (!isAuthentificated) {
      return
    }
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        // сетим юзера
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        // сетим карточки
        setCards(items);
        // + получаем отлайканные нами карточки
        const fav = items.filter((e) => findLike(e, userData));
        // и сетим карточки в избранное
        setFavorites(fav);
      }
    );
  }, [isAuthentificated]);


//Сортировка товаров
//Функция принимает аргумент sort, который является типом сортировки товаров
//Внутри функции происходит проверка значения аргумента sort, и соответсвенно сортировка
//затем обновляется состояние компонента с помощью метода setCards, который принимает новый массив карточек товаров
  const setSortCards = (sort) => {
    if (sort === 'подешевле') {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards]);
    }
    if (sort === 'подороже') {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards]);
    }
    if (sort === 'популярные') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
    if (sort === 'новинки') {
      const newCards = cards.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setCards([...newCards]);
    }
  }

  //Удаление товара
  //Если удаление прошло успешно, то из состояния компонента удаляется карточка товара
  //Остаются только те, у которых id не равен id удаленного товара
  const onProductDelete = async (id) => {
    try {
      const res = await api.deleteProduct(id)
      setCards((state) => state.filter(e => e._id !== res._id))
    } catch (error) {
      console.log(error)
      alert("Нельзя удалить чужой товар")
    }
  }

  //Контекст
  const contextValue = { setSort: setSortCards, currentUser, setCurrentUser, searchQuery, setSearchQuery, setParentCounter, parentCounter, isAuthentificated }
  const contextCardValue = { cards, setParentCounter, handleProductLike, onProductDelete, favorites, setFavorites }

  const navigate = useNavigate();

  //useEffect следит за navigate 
  // при каждом апдейте navigate - попытка получить токен из локального хранилища с помощью метода getItem("token")
  //Если токен найден, то isAuthentificated = true, пользователь авторизован
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthentificated(true)
    } 
  }, [navigate]);

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal} />
          {isAuthentificated ?
          <main className="content container">
            <div className="marioLogo">
              <h3>Магазин игрушек Amiibo - коллекция Супер Марио </h3>
            </div>
            <Routes>
              <Route path="/" element={<CatalogPage />}
              ></Route>
              <Route path="/product/:productId" element={<ProductPage />}>
              </Route>
              <Route path="/fakeRout/:productId" element={<ProductPage />}>
              </Route>
              <Route path="faq" element={<FaqPage />}>
              </Route>
              <Route path="favorites" element={<Favorites />}>
              </Route>
              <Route path="profile" element={<Profile />}>
              </Route>
              <Route path="chart" element={<Chart/>}>
              </Route>
              <Route path="login" element={
                <Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Login setShowModal={setShowModal} />
                </Modal>}>
              </Route>
              <Route path="register" element={
                <Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Register setShowModal={setShowModal} />
                </Modal>}>
              </Route>
              <Route path="reset-password" element={
                <Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <ResetPass setShowModal={setShowModal} />
                </Modal>}>
              </Route>
              <Route path="*" element={<NotFound />}>
              </Route>
            </Routes>

          </main>
          : 
          <div className="not__auth">Пожалуйста, авторизуйтесь
          <Routes>
          <Route path="login" element={
                <Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Login setShowModal={setShowModal} />
                </Modal>}>
              </Route>
              <Route path="register" element={
                <Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <Register setShowModal={setShowModal} />
                </Modal>}>
              </Route>
              <Route path="reset-password" element={
                <Modal activeModal={activeModal} setShowModal={setShowModal}>
                  <ResetPass setShowModal={setShowModal} />
                </Modal>}>
              </Route>
          </Routes>
          </div>}
          <Footer />
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