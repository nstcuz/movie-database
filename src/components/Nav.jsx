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
            <ul>
                {/* The anchor tag code below is incorrect...
                    Use React Router's NavLink component for
                    navigation links... */}
                {/* <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li> */}
            </ul>
        </nav>
    );

};

export default Nav;