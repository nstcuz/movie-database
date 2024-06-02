import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav'; // Importing the Nav component
import logo from '../images/cheeseboard-icon.svg'; // Importing the logo image

const logoThing = <img src={logo} alt="Cheeseboard Cinema Logo" />; // Logo JSX

const Header = () => {
    // State to manage the visibility of the navigation menu
    const [showNav, setShowNav] = useState(false);

    // Function to toggle the navigation menu visibility
    const toggleNav = () => {
        setShowNav(!showNav);
    };

    // Effect to handle resizing of the window
    useEffect(() => {
        const handleResize = () => {
            // Update showNav based on window width
            if (window.innerWidth >=1024) {
                setShowNav(false); // Close the navigation menu if window width is >= 1024px
            }
        };

        // Listen for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={showNav ? 'show' : ''}>
            <div className="header-contents">
                {/* Logo linking back to the home page */}
                <Link to="/">
                    <div className="logo">
                        {logoThing}
                        <h1>Cheeseboard Cinema
                            <span>Movie database catered to you</span>
                        </h1>
                    </div>
                </Link>
                {/* Button for toggling the navigation menu on mobile */}
                <button className={'btn-main-nav'}
                        onMouseDown={(e) => { e.preventDefault(); }} // Prevent default behavior on mouse down
                        onClick={toggleNav} // Toggle the navigation menu visibility on click
                        >
                    <span className={`hamburger-icon ${showNav ? 'open' : ''}`}>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </span>
                    <span className="sr-only"></span>
                </button>
                {/* Render the Nav component */}
                <Nav showNav={showNav} handleShowHideNav={toggleNav}/>
            </div>                      
        </header>
    )
}

export default Header;
