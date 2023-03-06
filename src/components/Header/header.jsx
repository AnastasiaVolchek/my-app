import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { Logo } from "../Logo/logo";
import { Search } from "../Search/search";
import IconBasket from "./basketMaterial/BasketMaterial";
import "./style.css";
import { ReactComponent as Like } from "../Card/like.svg"

export const Header = () => {
const {currentUser, searchQuery, setSearchQuery, parentCounter} = useContext(UserContext);
const [counter, setCounter] = useState(parentCounter);
const {favorites} = useContext(CardContext);

    useEffect(() => {
      setCounter((st) => st + 1);

      return () => setCounter(parentCounter) 
    }, [parentCounter]);

    return (
        <div className = "header" id="head">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo/>
                        <Search 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery}/>
                    </div>
                    <div>  
                        <IconBasket count={counter} /> 
                    </div>
                    <div> 
                        <Link to={"/favorites"} className="header__bubble-link">
                            <Like className="header__liked"/>
                        {favorites.length !==0 && <span className="header__bubble">{favorites.length}</span>} 
                        </Link>
                    </div>
                    <div>
                    <span>{currentUser.email} {" "}</span>
                    <span>{currentUser.about}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

