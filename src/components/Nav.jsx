import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { movieSearch, apiKey } from '../globals/globalVars';
import searchIcon from '../images/iconmonstr-search-thin.svg';

const Nav = ({ showNav }) => {
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const search = <img src={searchIcon} alt="Search icon" />

    const handleInputChange = (event) => {
        setQuery(event.target.value)
    }

    const handleKeyDown = (event) => {
        // if (event.key === 'Enter') {
            // event.preventDefault()
            handleSearch();
        // }
    }

    const handleSearch = async() => {
        try {
            const response = await fetch(`${movieSearch}?api_key=${apiKey}&query=${query}`);
            const data = await response.json()
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <nav className={`main-nav ${showNav ? 'show' : ''}`}>
            <ul className="nav-links">
                <li className="search-bar">
                    {search}
                    <input 
                        type="text" 
                        value={query} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyDown}
                        placeholder="Search" />
                    { query && searchResults.length > 0 && (
                <div className="search-results">
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                {/* <Link to={}>{result.title}</Link> */}
                                {result.title}
                            </li>
                        ))}
                    </ul>
                </div>
                )}
                </li>
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