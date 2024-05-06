import { NavLink } from 'react-router-dom';
import searchIcon from '../images/iconmonstr-search-thin.svg';

const Nav = ({handleShowHideNav}) => {

    const search = <img src={searchIcon} alt="Search icon" />

    const closeNav = (e) => {
        if ( window.innerWidth < 1024) {
            handleShowHideNav();
        } else {
            e.target.blur();
        }
    }

    return (
        <nav className="main-nav" onClick={closeNav}>
            <ul className="nav-links">
                <div className="search-bar">
                    {search}
                    <input type="text" placeholder="Search" />
                </div>
                <div className="header-nav-links">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                </div>
            </ul>
        </nav>
    );

};

export default Nav;