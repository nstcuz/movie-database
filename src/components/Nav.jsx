import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { movieSearch, apiKey } from '../globals/globalVars'; // Importing API endpoint and API key
import searchIcon from '../images/iconmonstr-search-thin.svg'; // Importing search icon image

const Nav = ({ showNav }) => {
    const location = useLocation(); // Get the current location using React Router's useLocation hook
    const navigate = useNavigate(); 
    const [query, setQuery] = useState(''); // State to store the search query entered by the user
    const [searchResults, setSearchResults] = useState([]); // State to store the search results
    const search = <img src={searchIcon} alt="Search icon" />; // Search icon JSX

    // Function to handle input change in the search bar
    const handleInputChange = (event) => {
        setQuery(event.target.value); // Update the query state with the user input
    };

    // Function to handle key down event in the search bar
    const handleKeyDown = () => {
        handleSearch(); // Call the handleSearch function when the user presses a key
    };

    // Function to fetch data from the API based on the search query
    const handleSearch = async () => {
        try {
            const response = await fetch(`${movieSearch}?api_key=${apiKey}&query=${query}`); // Fetch data from the API
            const data = await response.json(); // Parse the JSON response
            setSearchResults(data.results); // Update the searchResults state with the fetched data
        } catch (error) {
            console.error('Error fetching data:', error); // Log any errors that occur during fetching
        }
    };

    // Function to handle click event on a search result
    const handleResultClick = (movieId) => {
        setQuery(''); // Clear the search query
        setSearchResults([]); // Clear the search results
        navigate(`/movie/${movieId}`); // Navigate to the details page of the selected movie
    };

    return (
        <nav className={`main-nav ${showNav ? 'show' : ''}`}>
            <ul className="nav-links">
                <li className="search-bar">
                    {search}
                    {/* Input field for the search bar */}
                    <input 
                        type="text" 
                        value={query} 
                        onChange={handleInputChange} 
                        onKeyDown={handleKeyDown}
                        placeholder="Search" />
                    {/* Display search results if query is not empty and searchResults array has elements */}
                    { query && searchResults.length > 0 && (
                        <div className="search-results">
                            <ul>
                                {/* Map through searchResults array and display each search result */}
                                {searchResults.map((result) => (
                                    <li key={result.id}>
                                        <Link 
                                            to={`/movie/${result.id}`}
                                            onClick={() => 
                                                handleResultClick(result.id)
                                            }
                                        >
                                            {result.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
                {/* Navigation links */}
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
