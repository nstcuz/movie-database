// import { NavLink } from 'react-router-dom';
const Nav = () => {

    function blur(e){
        e.target.blur();
    }

    return (
        <nav className="main-nav" onClick={blur}>
            <ul>
                {/* The anchor tag code below is incorrect...
                    Use React Router's NavLink component for
                    navigation links... */}
                {/* <li><NavLink to="/" >Home</NavLink></li>
                <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li> */}
            </ul>
        </nav>
    );

};

export default Nav;