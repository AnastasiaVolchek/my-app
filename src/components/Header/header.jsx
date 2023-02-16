import { Logo } from "../Logo/logo";
import { Search } from "../Search/search";
import "./style.css";

export const Header = ({setSearchQuery, searchQuery, user}) => {


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
                    <span>{user.email} {" "}</span>
                    <span>{user.about}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

