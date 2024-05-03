import { NavLink } from 'react-router-dom';

const Nav = ({handleShowHideNav}) => {

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
                <input type="text" placeholder="Search" />
                <div className="header-nav-links">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/favorites">Favorites</NavLink></li>
                </div>
            </ul>
        </nav>
    );

};

export default Nav;