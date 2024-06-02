import React, { useEffect, useState } from 'react';
import { movieEndpoint, formatRatingPercentage } from '../globals/globalVars'; // Importing endpoint and formatting function
import FavoriteBtn from '../components/FavoriteBtn'; // Importing FavoriteBtn component
import { Link, useParams } from 'react-router-dom'; // Importing Link and useParams from react-router-dom
import clapperHero from '../images/clapper-hero.svg'; // Importing clapper board image
import { useSelector, useDispatch } from 'react-redux'; // Importing useSelector and useDispatch hooks from React Redux
import isFav from '../../utilities/isFav'; // Importing isFav utility function
import { addFav, deleteFav } from '../favs/favSlices'; // Importing action creators from Redux slice file

const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY; // Setting API key from environment variable

function SingleDetails() {
  const [movie, setMovie] = useState(null); // State for movie details
  const [credits, setCredits] = useState(null); // State for cast/credit details
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(''); // State for error message
  let {id} = useParams(); // Extracting id parameter from URL
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

  // Retrieve favorites state using useSelector
  const favs = useSelector((state) => state.favs.items);

  // Fetch movie and cast/credit info from API endpoints
  useEffect(() => {
    // Fetch movie info
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${movieEndpoint}${id}?api_key=${apiKey}`);
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Fetch cast/credit info
    const fetchCredits = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${movieEndpoint}${id}/credits?api_key=${apiKey}`);
        const data = await res.json();
        setCredits(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching credits data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // Call the fetch functions
    fetchMovie();
    fetchCredits();
  }, [id]);

  // Horizontal scrolling for cast members
  useEffect(() => {
    const cardContainer = document.querySelector('.card-container');
    if (!cardContainer) {
      return;
    }

    // Change scroll wheel to horizontal on .card-container
    const handleWheel = (event) => {
      event.preventDefault();
      cardContainer.scrollLeft += event.deltaY;
    };

    // Apply scroll listener only on mobile (max-width: 1023px)
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const applyScrollListener = () => {
      if (mediaQuery.matches) {
        cardContainer.addEventListener('wheel', handleWheel);
      } else {
        cardContainer.removeEventListener('wheel', handleWheel);
      }
    };
    applyScrollListener();
    mediaQuery.addEventListener('change', applyScrollListener);

    return () => {
      cardContainer.removeEventListener('wheel', handleWheel);
      mediaQuery.removeEventListener('change', applyScrollListener);
    };
  }, [credits]);

  // Handler for adding or removing from favorites
  const handleFavorite = () => {
    if (isFav(favs, null, movie.id)) {
      dispatch(deleteFav(movie)); // Remove from favorites
    } else {
      dispatch(addFav(movie)); // Add to favorites
    }
  };

  return (
    <div className='movie-details'>
      {/* Display movie details */}
      {movie && (
        <section className='title-details'>
          <h1 className='.bold-details'>{movie.title}</h1>
          <p>{movie.release_date}</p>
          <div className="specific-details">
            <div className='rating rating-placement'>
              <p>{movie && movie.vote_average + '%'}</p>
            </div>
            {/* Display movie genres */}
            {movie.genres && (
              <ul>
                {movie.genres.map((genre, i) => (
                  <li key={genre.id}>
                    {genre.name}
                    {i !== movie.genres.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section className='movie-detail-wrapper'>
        <div className="movie-cover">
          {/* Display movie poster */}
          {movie ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : 'Sorry, the movie has not loaded yet'}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>

        <div className='overview-details'>
          <div className='tablet-desktop-details'>
            {/* Display movie title and release date */}
            <img src={clapperHero} alt="clapperboard top" />
            <h1 className='.bold-details'>{movie && movie.title}</h1>
            <div className="specific-details">
              {movie && (
                <ul>
                  <li>{movie && movie.release_date} &#x2022;</li>
                  {/* Display movie genres */}
                  {movie.genres.map((genre, i) => (
                    <li key={genre.id}>
                      &nbsp;
                      {genre.name}
                      {i !== movie.genres.length - 1 ? ',' : ''}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <h2>Premise:</h2>
          {/* Display movie overview */}
          <p className='movie-premise'>{movie && movie.overview !== "" ? movie.overview : "Sorry, we do not currently have the data you are looking for. As this site uses TMDB's database, the data wont be avalible until its updated on their end"}</p>
          <div className='overview-widgets'>
            <div className='rating rating-placement'>
              {/* Format and display movie rating */}
              <p>{formatRatingPercentage(movie && movie.vote_average )}</p>
            </div>
            {/* Render FavoriteBtn component */}
            <FavoriteBtn remove={movie && isFav(favs, null, movie.id)} movie={movie} onClick={handleFavorite} />
          </div>
        </div>
      </section>

      <section className='cast-details'>
        <h2>Meet the Cast</h2>
        {/* Display cast members */}
        {credits && credits.cast && (
          <section className='card-container'>
            {/* Display up to 12 cast members */}
            {credits.cast.slice(0, 12).map((member) => {
              // Skip if image is null
              if (member.profile_path === null) {
                return null;
              }
              return (
                <div className='cast-card' key={member.id}>
                  {/* Display cast member image, name, and character */}
                  <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p>{member.character}</p>
                </div>
              );
            })}
          </section>
        )}
      </section>

      {/* Button to return to home */}
      <div className='button-container'>
        <Link to="/">
          <button className="return-home">Return Home</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleDetails;
