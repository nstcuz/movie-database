import { useState, useEffect } from 'react';
import { movieEndpoint, apiKey } from '../globals/globalVars';
import Hero from '../components/Hero';
import Thumbnail from "../components/Thumbnail";

function PageHome() {
    const [movies, setMovies] = useState([]);
    const [movieType, setMovieType] = useState("now_playing");
    const [heroCarousel, setHeroCarousel] = useState();

    useEffect(() => {
        const fetchMovies = async (selectType) => {
          const response = await fetch(`${movieEndpoint}${selectType}?api_key=${apiKey}`);
          let data = await response.json();
          setMovies(data.results);
          console.log(data.results);

          if (movieType == "now_playing") {
            setHeroCarousel(data.results);
          } 
        };

        fetchMovies(movieType);
    }, [movieType]);

    const handleMovieTypeChange = (type) => {
        setMovieType(type);
    };

    return (
        <main>
            <section>
                <Hero movies={heroCarousel} />
            </section>
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
                        title={movie.title}
                        release_date={movie.release_date}
                        overview={movie.overview}
                        rating={movie.vote_average}
                        image={movie.poster_path}
                        movie={movie}
                    />
                ))}
			</section>
		</main>
    )
}

export default PageHome;