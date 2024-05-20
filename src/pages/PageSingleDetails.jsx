import React, { useEffect, useState } from 'react';
import { movieEndpoint } from '../globals/globalVars';
const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;
import FavoriteBtn from '../components/FavoriteBtn';
import clapper from '../images/clapper-hero.svg'; 
import clapper2 from '../images/white stripes.png'; 

function SingleDetails() {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // make API call to 2 diff endpoint, one for the movie, the other for cast members
  useEffect(() => {
    // fetch movie info
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${movieEndpoint}519182?api_key=${apiKey}`);
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.error('error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // fetch cast/credit info
    const fetchCredits = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${movieEndpoint}519182/credits?api_key=${apiKey}`);
        const data = await res.json();
        setCredits(data);
        setLoading(false);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    // call them ^
    fetchMovie();
    fetchCredits();
  }, []);

  // horizontal scrolling for cast members
  useEffect(() => {
    const cardContainer = document.querySelector('.card-container');
    //check
    if (!cardContainer) {
      console.error('card container not found');
      return;
    }

  // change scroll wheel to horizontal on .card-container
    const handleWheel = (event) => {
      event.preventDefault();
      cardContainer.scrollLeft += event.deltaY;
    };

  // only work when displayed in mobile 1024px 
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

  return (
    <div className='movie-details'>
      {movie && (
        <section className='title-details'>
          <h1 className='.bold-details'>{movie.title}</h1>
          <p>{movie.release_date}</p>
          <div className="specific-details">
            <p>{movie.vote_average}</p>
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
            <FavoriteBtn />
          </div>
        </section>
      )}

      <section className='movie-detail-wrapper'>
        <div className="movie-cover-details">
          {movie ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : 'Sorry, the movie has not loaded yet'}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>

        <div className='overview-details'>
          <div className='tablet-desktop-details'>
          <img src="clapper" alt="test" />
            <h1 className='.bold-details'>{movie && movie.title}</h1>
            <div className="specific-details">
              {movie && (
                <ul>
                <li>{movie && movie.release_date}</li>
                  {movie.genres.map((genre, i) => (
                    <li key={genre.id}>
                      &nbsp;
                      {genre.name}
                      {i !== movie.genres.length - 1 ? ',' : ''}
                    </li>
                  ))}
                </ul>
              )}
              </div> {/*specific details*/}
            </div> {/*tablet-desktop-details*/}

          <h2>Premise:</h2>
          <p className='movie-premise'>{movie && movie.overview}</p>
          <p className='bold-details'>Directors: </p>
          <p className='bold-details'>Writers: </p>
        </div> {/*overview details */}
      </section>

      <section className='cast-details'>
        <h2>Meet the Cast</h2>
        {credits && credits.cast && (
          <section className='card-container'>
            {credits.cast.map((member) => (
              <div className='cast-card' key={member.id}>
                <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.character}</p>
              </div>
            ))}
          </section>
        )}
      </section>

      <div className='button-container'>
        <button className="return-home">Return Home</button>
      </div>
    </div>
  );
}

export default SingleDetails;