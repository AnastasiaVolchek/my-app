import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import HeaderV3, { Header, Header2, Template } from './components/Header/header';

// const el2 = React.createElement("h1", {}, "Hello React.js in child")
// const element = React.createElement("div", null, el2)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // element
   <App />,
  // <Header/>
  // <HeaderV3 /> 
  // <Template />
);

reportWebVitals();
