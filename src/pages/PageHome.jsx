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

    const truncateTitle = ( title, maxLength) => {
        //Add '...' if the original overview has more words than maxLength
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    }

    const truncateOverview = ( overview, maxWords ) => {
        //Split overview into array of words
        const words = overview.split(' ');
        //Select the desired number of words
        const slicedWords = words.slice(0, maxWords);
        //Join selected words back into string
        const truncatedOverview = slicedWords.join(' ');
        //Add '...' if the original overview has more words than maxWords
        if (words.length > maxWords) {
          return truncatedOverview + '...';
        }
        return truncatedOverview;
    }

    const formatRatingPercentage = ( voteAverage ) => {
        if ( voteAverage === 0 ) {
            return "NR"; //For upcoming movies that have no ratings
        }
        //Converts rating to percentage and rounds to nearest integer
        const percentage = Math.round(voteAverage * 10) + '%';
        return percentage;
    }

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
			<section className="thumbnail-section">
                {movies.map(movie => (
                    <Thumbnail
                        key={movie.id}
                        title={truncateTitle(movie.title, 32)}
                        release_date={movie.release_date}
                        overview={truncateOverview(movie.overview, 12)}
                        rating={formatRatingPercentage(movie.vote_average)}
                        image={movie.poster_path}
                    />
                ))}
			</section>
		</main>
    )
}

export default PageHome;