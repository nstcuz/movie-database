import React, { useEffect, useState } from 'react';
import { movieEndpoint } from '../globals/globalVars';
const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;


function App() {
const [movie, setMovie] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
  useEffect(() => {
    const fetchMovie = async () => {
        setLoading(true);
      try {
        const res= await fetch(movieEndpoint + '112?api_key=' + apiKey);
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
    <div className="movie-card">
      <h2>{movie ? movie.original_title : 'movie title not available'}</h2>
      { movie ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : 'sorry the movie hasnt loaded yet' }
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default App;
