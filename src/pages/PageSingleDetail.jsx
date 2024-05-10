import React, { useEffect, useState } from 'react';
import { movieEndpoint } from '../globals/globalVars';
const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;
import FavoriteBtn from '../components/FavoriteBtn';

function SingleDetail() {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieAndCredits = async () => {
      setLoading(true);
      try {
        const movieRes = await fetch(`${movieEndpoint}519182?api_key=${apiKey}`);
        const movieData = await movieRes.json();
        console.log(movieData);
        setMovie(movieData);
  
        const creditsRes = await fetch(`${movieEndpoint}519182/credits?api_key=${apiKey}`);
        const creditsData = await creditsRes.json();
        console.log(creditsData);
        setCredits(creditsData);

        //handle the errors
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchMovieAndCredits();
  }, []);

  return (
    <div className='movie-details'>

      {movie && (
        <section className='title-details'>
          <h2>{movie.title}</h2>
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
        { movie ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : 'Sorry, the movie has not loaded yet' }
        { loading && <p>Loading...</p>}
        { error && <p>{error}</p>}
      </section>

      <section className='overview-details'>
        <h3>Premise:</h3>
        <p>{ movie && movie.overview}</p>
        <p className='bold-details'>Directors: {credits && credits.crew[1].department}</p>
        {/* <p className='bold-details'>Writers: {credits.crew.}</p> */}
      </section>

      <section className='cast-details'>
        <h3>Meet the Cast</h3>
       <div className='card-details'>
          {/* <img src="" alt="" />
          <p>{credit.}</p> */}
        </div> 
      </section>
    </div>
  );
}

export default SingleDetail;