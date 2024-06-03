import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { movieEndpoint, apiKey } from '../globals/globalVars';
import Hero from '../components/Hero';
import Thumbnail from "../components/Thumbnail";
import isFav from '../../utilities/isFav';

function PageHome() {
    const [movies, setMovies] = useState([]);
    //State to hold the current movie type being displayed
    const [movieType, setMovieType] = useState("now_playing");
    //State to hold the movies for the hero carousel
    const [heroCarousel, setHeroCarousel] = useState();

    //useEffect to fetch movies whenever the movieType changes
    useEffect(() => {
        const fetchMovies = async (selectType) => {
            //Fetches movies from the API based on the selected type
            const response = await fetch(`${movieEndpoint}${selectType}?api_key=${apiKey}`);
            let data = await response.json();
            setMovies(data.results);

             //Sets the hero carousel movies if the type is "now_playing"
            if (movieType == "now_playing") {
                setHeroCarousel(data.results);
            } 
        };

        fetchMovies(movieType);
    }, [movieType]);

    //Function to handle changes in the movie type
    const handleMovieTypeChange = (type) => {
        setMovieType(type);
    };

    //Get the list of favourite movies from the Redux store
    const favs = useSelector((state) => state.favs.items);

    return (
        <main>
            <section>
                <Hero movies={heroCarousel} />
            </section>
            {/* Dropdown to select movie type for screens smaller than 45.25em */}
            <div className="movie-type-select">
                <select onChange={(event) => handleMovieTypeChange(event.target.value)}>
                    <option value="now_playing">Now Playing</option>
                    <option value="popular">Popular</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="top_rated">Top Rated</option>
                </select>
            </div>
            {/* Buttons to select movie type for screens larger than 45.25em */}
            <div className="movie-type-btns">
                <button onClick={() => handleMovieTypeChange("now_playing")}>Now Playing</button>
                <button onClick={() => handleMovieTypeChange("popular")}>Popular</button>
                <button onClick={() => handleMovieTypeChange("upcoming")}>Upcoming</button>
                <button onClick={() => handleMovieTypeChange("top_rated")}>Top Rated</button>
            </div>

            {/* Thumbnails on Home Page to each output Title, Release Date, Overview, Rating */}
			<section className="thumbnail-section">
                {movies.slice(0, 18).map(movie => (
                    <Thumbnail
                        key={movie.id}
                        movie={movie}
                        isFav={isFav(favs, null, movie.id)}
                    />
                ))}
			</section>
		</main>
    )
}

export default PageHome;