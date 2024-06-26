import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { movieEndpoint, apiKey } from '../globals/globalVars';
import Hero from '../components/Hero';
import Thumbnail from "../components/Thumbnail";
import isFav from '../../utilities/isFav';

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [movieType, setMovieType] = useState("now_playing");
    const [heroCarousel, setHeroCarousel] = useState();

    useEffect(() => {
        const fetchMovies = async (selectType) => {
          const response = await fetch(`${movieEndpoint}${selectType}?api_key=${apiKey}`);
          let data = await response.json();
          setMovies(data.results);
          console.log(data);

          if (movieType == "now_playing") {
            setHeroCarousel(data.results);
          } 
        };

        fetchMovies(movieType);
    }, [movieType]);

    const handleMovieTypeChange = (type) => {
        setMovieType(type);
    };

    const favs = useSelector((state) => state.favs.items);

    return (
        <main>
            <section>
                <Hero movies={heroCarousel} />
            </section>
            <div className="movie-type-select">
                <select onChange={(event) => handleMovieTypeChange(event.target.value)}>
                    <option value="now_playing">Now Playing</option>
                    <option value="popular">Popular</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="top_rated">Top Rated</option>
                </select>
            </div>
            <div className="movie-type-btns">
                <button onClick={() => handleMovieTypeChange("now_playing")}>Now Playing</button>
                <button onClick={() => handleMovieTypeChange("popular")}>Popular</button>
                <button onClick={() => handleMovieTypeChange("upcoming")}>Upcoming</button>
                <button onClick={() => handleMovieTypeChange("top_rated")}>Top Rated</button>
            </div>

            {/* /grab this section 67-78 */}
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