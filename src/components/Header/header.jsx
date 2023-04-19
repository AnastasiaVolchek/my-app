import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { Logo } from "../Logo/logo";
import { Search } from "../Search/search";
import IconBasket from "./basketMaterial/BasketMaterial";
import "./style.css";
import { ReactComponent as Like } from "../Card/like.svg"
import { ReactComponent as LoginIcon } from "./images/login.svg"
import { ReactComponent as Chart } from "./images/charts.svg"
import { ReactComponent as Profile } from "./images/profile.svg"
import { ReactComponent as Create } from "./images/create.svg"
import { Modal } from '../Modal/Modal';
import { CreateProduct } from '../CreateProduct/CreateProduct';

export const Header = ({ setShowModal, activeModal }) => {

    const { currentUser, searchQuery, setSearchQuery, parentCounter, isAuthentificated } = useContext(UserContext);
    const { favorites } = useContext(CardContext);

    const [counter, setCounter] = useState(parentCounter);
    const [isCreateModuleActive, setCreateModal] = useState(false);
    
    useEffect(() => {
        setCounter((st) => st + 1);
        return () => setCounter(parentCounter)
    }, [parentCounter]);

    // const navigate = useNavigate();



    return (
        <div className="header" id="head">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo />
                        <Search
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery} />
                    </div>
                    <div>
                        <IconBasket count={counter} />
                    </div>
                    <div>
                        <Link to={"/favorites"} className="header__bubble-link">
                            <Like className="header__liked" />
                            {favorites.length !== 0 && <span className="header__bubble">{favorites.length}</span>}
                        </Link>
                    </div>
                    {!isAuthentificated ? <Link to={"/login"} className="header__link" onClick={() => setShowModal(true)}>
                        <LoginIcon />
                    </Link> :
                        <Link to={"/profile"} className="header__link" onClick={() => setShowModal(true)}>
                            <Profile/>
                        </Link>
                    }
                        <Link to={"/chart"} className="header__link" >
                            <Chart/>
                        </Link>
                        <span onClick={()=>setCreateModal(true)} className="header__link" >
                            <Create/>
                        </span>
                        <Modal activeModal={isCreateModuleActive} setShowModal={setCreateModal}>
                            <CreateProduct setCreateModal={setCreateModal} >Создать новый продукт</CreateProduct>
                        </Modal>
                </div>
            </div>
        </div>
    );
};

