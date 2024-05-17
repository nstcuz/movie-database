import React, { useEffect, useState } from 'react';
import { movieEndpoint } from '../globals/globalVars';
const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;
import FavoriteBtn from '../components/FavoriteBtn';

function SingleDetails() {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // make API call to 2 diff endpoint, one for the movie, the other for cast members
  useEffect(() => {
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

    const fetchCredits = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${movieEndpoint}519182/credits?api_key=${apiKey}`);
        const data = await res.json();
        setCredits(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
    fetchCredits();
  }, []);

  // horizontal scrolling for cast members
  useEffect(() => {
    const cardContainer = document.querySelector('.card-container');
    if (!cardContainer) {
      // this console error thing is sure cool, never knew about it 
      console.error('card container not found');
      return;
    }
    const handleWheel = (event) => {
      event.preventDefault();
      cardContainer.scrollLeft += event.deltaY;
    };

    cardContainer.addEventListener('wheel', handleWheel);
    return () => {
      cardContainer.removeEventListener('wheel', handleWheel);
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

      <section className="movie-cover-details">
        {movie ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : 'Sorry, the movie has not loaded yet'}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </section>

      <section className='overview-details'>
        <h2>Premise:</h2>
        <p>{movie && movie.overview}</p>
        <p className='bold-details'>Directors: </p>
        <p className='bold-details'>Writers: </p>
      </section>

      <section className='cast-details'>
        <h2>Meet the Cast</h2>
        {credits && credits.cast && (
          <section className='card-container'>
            {credits.cast.map((member) => (
              <div className='cast-card' key={member.id}>
                <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
                <h2>{member.name}</h2>
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