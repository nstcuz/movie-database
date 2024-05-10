import React, {useState, useEffect} from 'react';
import { truncateTitle, truncateOverview } from '../globals/globalVars';
import cheeseArrow from '../images/cheese-arrow.svg';
import clapperHero from '../images/clapper-hero.svg';

const Hero = ( {movies} ) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    // Limit the number of hero movies to 6
    const limitedMovies = movies && movies.slice(0, 6);

    // Function to handle auto slide change
    useEffect(() => {
        if (movies && movies.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide +1) % limitedMovies.length )
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [movies, limitedMovies]);

    // Function to handle manual slide change
    const changeSlide = (index) => {
        setCurrentSlide(index);
    };

    // Function to handle navigation arrows
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? limitedMovies.length - 1 : prevSlide - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % limitedMovies.length);
    };

    // Get movie data for current slide
    const currentMovie = limitedMovies && limitedMovies[currentSlide];
    
    return (
        <section className="hero-carousel">
            <div className="hero-movie-container">
                <img className="clapper-hero" src={clapperHero} alt="Clapper board top" />
                {limitedMovies && limitedMovies.map((movie, index) => (
                    <figure key={movie.id} className={`movie-slide ${index === currentSlide ? 'active' : ''}`}>
                        <img
                            src={`http://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                            alt={movie.title}
                            className="hero-images"
                        />
                        {/* Figcaption */}
                        <figcaption className="hero-caption" style={{ display: limitedMovies && limitedMovies[currentSlide] ? 'block' : 'none' }}>
                            <h2>{currentMovie ? truncateTitle(currentMovie.title) : ''}</h2>
                            <p>{currentMovie ? truncateOverview(currentMovie.overview, 20) : ''}</p>
                        </figcaption>
                        <div className="arrow-buttons">
                            <button className="arrow-button arrow-prev" onClick={prevSlide}>
                                <img src={cheeseArrow} alt="Previous" />
                            </button>
                            <button className="arrow-button arrow-next" onClick={nextSlide}>
                                <img src={cheeseArrow} alt="Next" />
                            </button>
                        </div>
                    </figure>
                ))}
            </div>
            {/* Pagination dots */}
            <div className="pagination-dots">
                {limitedMovies && limitedMovies.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => changeSlide(index)}
                    ></button>
                ))}
            </div>
        </section>
    )
}

export default Hero;