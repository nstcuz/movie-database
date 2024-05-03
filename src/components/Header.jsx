import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import logo from '../images/cheeseboard-icon.svg';

const logoThing = <img src={logo} alt="Cheeseboard Cinema Logo" />

const Header = () => {

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    }

    const isDesktop = (e) => {
        if(e.matches){
            setShowNav(false);
        }
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 1100px)')
        mediaQuery.addEventListener('change', isDesktop);

        return() => mediaQuery.removeEventListener('change', isDesktop);
    }, []);

    return (
        <header className={showNav ? 'show' : ''}>
            <Link to="/">
                <div className="logo">
                    {logoThing}
                    <h1>Cheeseboard Cinema
                        <span>Movie database catered to you</span>
                    </h1>
                </div>
            </Link>
            <button className="btn-main-nav"
                    onMouseDown={(e) => { e.preventDefault(); }}
                    onClick={toggleNav}
                    >
                <span className="hamburger-icon">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </span>
                <span className="sr-only">Menu</span>
            </button>
            <Nav handleShowHideNav={toggleNav}/>                       
        </header>
    )
}

export default Header;