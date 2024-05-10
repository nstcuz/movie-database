import React, { useEffect, useState } from 'react';
import { movieEndpoint } from '../globals/globalVars';
const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;
import FavoriteBtn from '../components/FavoriteBtn';

function SingleDetail() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(movieEndpoint + '112?api_key=' + apiKey);
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  return (
    <div className='single-details'>
      {movie && (
        <section className='title-details'>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
            <p>{movie.vote_average}</p>
                {movie.genres && (
                    <ul>
                    {movie.genres.map((genre) => (
                        <li key={genre.id}>{genre.name} </li>
                    ))}
                    </ul>
                )}
          <FavoriteBtn />
        </section>
      )}
      <section className="movie-card">
        { movie ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : 'Sorry, the movie has not loaded yet' }
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </section>
    </div>
  );
}

export default SingleDetail;