import { Logo } from "../Logo/logo";
import { Search } from "../Search/search";
import "./style.css";

export const Header = ({setSearchQuery, searchQuery}) => {
    return (
        <div className = "header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Logo/>
                        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

