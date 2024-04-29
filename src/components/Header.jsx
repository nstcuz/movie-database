import Nav from './Nav'
import logo from '../images/cheeseboard-icon.svg';

const logoThing = <img src={logo} alt="Cheeseboard Cinema Logo" />

const Header = () => {

    return (
        <header>
            {logoThing}
            <h1>Cheeseboard Cinema
                <span>Movie database catered to you</span>
            </h1>

            <Nav />
            
        </header>
    )
}

export default Header;