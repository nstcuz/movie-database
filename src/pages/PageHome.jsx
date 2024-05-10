import { useState, useEffect } from 'react';
import { movieEndpoint, apiKey } from '../globals/globalVars';
import Hero from '../components/Hero';
import Thumbnail from "../components/Thumbnail";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [movieType, setMovieType] = useState("now_playing");

    useEffect(() => {
        const fetchMovies = async (selectType) => {
          const response = await fetch(`${movieEndpoint}${selectType}?api_key=${apiKey}`);
          let data = await response.json();
          setMovies(data.results);
          console.log(data.results);
        };

        fetchMovies(movieType);
    }, [movieType]);

    const handleMovieTypeChange = (type) => {
        setMovieType(type);
    };

    return (
        <main>
            <section>
                <Hero />
            </section>
            <div className="movie-type-btns">
                <button onClick={() => handleMovieTypeChange("now_playing")}>Now Playing</button>
                <button onClick={() => handleMovieTypeChange("popular")}>Popular</button>
                <button onClick={() => handleMovieTypeChange("upcoming")}>Upcoming</button>
                <button onClick={() => handleMovieTypeChange("top_rated")}>Top Rated</button>
            </div>

            {/* /grab this section 67-78 */}
			<section className="thumbnail-section">
                {movies.map(movie => (
                    <Thumbnail
                        key={movie.id}
                        title={movie.title}
                        release_date={movie.release_date}
                        overview={movie.overview}
                        rating={movie.vote_average}
                        image={movie.poster_path}
                    />
                ))}
			</section>
		</main>
    )
}

export default PageHome;