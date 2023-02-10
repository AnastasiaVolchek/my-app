
import { Footer } from '../Footer/footer';
import { Header, Header2, Template } from '../Header/header';
import './App.css';

function App() {

  const templ = "Hello ";
  const templ2 = 1234;
  const templ22 = 14354;

  const templ3 = true;
  const templ4 = "chat";

  const obj = {
    templ : "Hello ",
    templ2 : 1234,
    templ22 : 14354,
  }

  const arr = [
    {title: "Мой первый элемент", name: "hi"},
    {title: "Мой 2 элемент", name: "hi2"},
    {title: "Мой 3 элемент", name: "hi3"},
    {title: "Мой 4 элемент", name: "hi4"},
    {title: "Мой 5 элемент", name: "hi5"},
  ];

  const firstItem = <li>Самый самый первый элемент</li>
  const firstItem2 = <li>Самый самый первый элемент для авторизованных</li>


  const isAuth = true


  return (
    <div className="App">
       {/* <span>{obj.templ + obj.templ22}</span>
       <Header />
       <Footer />
       <Header2 /> */}
       <ul>
        {/* {isAuth ? firstItem : null} */}
        {isAuth && firstItem2}

       {arr.map((el) => (
        <li>{el.name}</li>
       ))}
      {/* <label htmlFor="">
        <input 
        type="text" 
        placeholder="asdasd" 
        tabIndex={2} 
        className="input-class"
        />
      </label> */}

       </ul>

       <Footer myownprops = "sdfsdfsdf!" arr={arr} />
    </div>
  );
}

export default App;
