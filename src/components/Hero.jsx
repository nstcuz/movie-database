import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { truncateTitle, truncateOverview } from '../globals/globalVars'; // Importing utility functions for truncating title and overview
import cheeseArrow from '../images/cheese-arrow.svg'; // Importing arrow icon image
import clapperHero from '../images/clapper-hero.svg'; // Importing clapper board image

const Hero = ({ movies }) => {
    const [currentSlide, setCurrentSlide] = useState(0); // State to track the index of the current slide
    // Limit the number of hero movies to 6
    const limitedMovies = movies && movies.slice(0, 6); // Limiting the number of movies to 6

    // Effect to handle auto slide change
    useEffect(() => {
        if (movies && movies.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prevSlide) => (prevSlide + 1) % limitedMovies.length); // Auto increment the current slide index
            }, 4000); // Auto slide change every 4 seconds
            return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
        }
    }, [movies, limitedMovies]);

    // Function to handle manual slide change
    const changeSlide = (index) => {
        setCurrentSlide(index); // Set the current slide index to the selected index
    };

    // Function to handle navigation arrows
    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? limitedMovies.length - 1 : prevSlide - 1)); // Move to the previous slide
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % limitedMovies.length); // Move to the next slide
    };

    // Get movie data for current slide
    const currentMovie = limitedMovies && limitedMovies[currentSlide]; // Retrieve data for the current slide

    return (
        <section className="hero-carousel">
            <div className="hero-movie-container">
                <img className="clapper-hero" src={clapperHero} alt="Clapper board top" /> {/* Clapper board image */}
                {/* Render each movie slide */}
                {limitedMovies && limitedMovies.map((movie, index) => (
                    <figure key={movie.id} className={`movie-slide ${index === currentSlide ? 'active' : ''}`}>
                        <img
                            src={`http://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                            alt={movie.title}
                            className="hero-images"
                        /> {/* Movie backdrop image */}
                        {/* Figcaption to display movie title and overview */}
                        <figcaption className="hero-caption" style={{ display: limitedMovies && limitedMovies[currentSlide] ? 'block' : 'none' }}>
                            <h2>{currentMovie ? truncateTitle(currentMovie.title) : ''}</h2> {/* Truncated movie title */}
                            <p>{currentMovie ? truncateOverview(currentMovie.overview, 20) : ''}</p> {/* Truncated movie overview */}
                            <Link to={`/movie/${movie.id}`}> See more...{/* Link to the single details page */}
                            </Link>
                        </figcaption>
                        {/* Arrow buttons for navigating to previous and next slides */}
                        <div className="arrow-buttons">
                            <button className="arrow-button arrow-prev" onClick={prevSlide}>
                                <img src={cheeseArrow} alt="Previous" /> {/* Previous arrow icon */}
                            </button>
                            <button className="arrow-button arrow-next" onClick={nextSlide}>
                                <img src={cheeseArrow} alt="Next" /> {/* Next arrow icon */}
                            </button>
                        </div>
                    </figure>
                ))}
            </div>
            {/* Pagination dots for indicating current slide */}
            <div className="pagination-dots">
                {limitedMovies && limitedMovies.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => changeSlide(index)}
                    ></button> // Dot indicator for each slide
                ))}
            </div>
        </section>
    )
}

export default Hero;
