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

    useEffect(() => {
        const handleResize = () => {
            // Update showNav based on window width
            if (window.innerWidth >=1024) {
                setShowNav(false);
            }
        };
        // Listen for resize
        window.addEventListener('resize', handleResize);
        return() => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <header className={showNav ? 'show' : ''}>
            <div class="header-contents">
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
                    <span className="sr-only"></span>
                </button>
                <Nav handleShowHideNav={toggleNav}/>
            </div>                      
        </header>
    )
}

export default Header;