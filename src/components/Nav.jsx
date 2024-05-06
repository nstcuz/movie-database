import { NavLink, useLocation } from 'react-router-dom';
import searchIcon from '../images/iconmonstr-search-thin.svg';

const Nav = ({ showNav, handleShowHideNav}) => {
    const location = useLocation();
    const search = <img src={searchIcon} alt="Search icon" />

    const closeNav = (e) => {
        if ( window.innerWidth < 1024) {
            handleShowHideNav();
        } else {
            e.target.blur();
        }
    }

    return (
        <nav className={`main-nav ${showNav ? 'show' : ''}`} onClick={closeNav}>
            <ul className="nav-links">
                <div className="search-bar">
                    {search}
                    <input type="text" placeholder="Search" />
                </div>
                <div className="header-nav-links">
                    <li>
                        <NavLink to="/about" className={location.pathname === '/about' ? 'current-page' : ''}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorites" className={location.pathname === '/favorites' ? 'current-page' : ''}>Favorites</NavLink>
                    </li>
                </div>
            </ul>
        </nav>
    );

};

export default Nav;