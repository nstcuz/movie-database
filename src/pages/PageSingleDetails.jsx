import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { movieEndpoint, formatRatingPercentage } from '../globals/globalVars';
import FavoriteBtn from '../components/FavoriteBtn';
import isFav from '../../utilities/isFav';
import { addFav, deleteFav } from '../favs/favSlices';
import clapperHero from '../images/clapper-hero.svg';

const apiKey = import.meta.env.VITE_MOVIEDB_API_KEY;

function SingleDetails() {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let {id} = useParams();
  const dispatch = useDispatch(); // get dispatch function

  // retrieve favourites state using useSelector
  const favs = useSelector((state) => state.favs.items);

  // make API call to 2 diff endpoint, one for the movie, the other for cast members
  useEffect(() => {
    // fetch movie info
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${movieEndpoint}${id}?api_key=${apiKey}`); // retreive data
        const data = await res.json(); // convert data
        setMovie(data); // set data
        setLoading(false);
      } catch (err) {
        console.error('error fetching data:', err); // handle errors
        setError(err.message);
        setLoading(false);
      }
    };

    // fetch cast/credit info
    const fetchCredits = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${movieEndpoint}${id}/credits?api_key=${apiKey}`); // retrieve data
        const data = await res.json(); // conver to JSON format
        setCredits(data); // set data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err); // handle errors
        setError(err.message);
        setLoading(false);
      }
    };

    // call both when id changes ^
    fetchMovie();
    fetchCredits();
  }, [id]);

  // horizontal scrolling for cast members
  useEffect(() => {
    const cardContainer = document.querySelector('.card-container');
    //check
    if (!cardContainer) {
      return;
    }

  // change scroll wheel to horizontal on .card-container
    const handleWheel = (event) => {
      event.preventDefault();
      cardContainer.scrollLeft += event.deltaY;
    };

  // only work when displayed within mobile to 1024px 
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

  // handler for adding or removing from favorites
  const handleFavorite = () => {
    if (isFav(favs, null, movie.id)) {
      dispatch(deleteFav(movie)); // remove from favorites
    } else {
      dispatch(addFav(movie)); // add to favorites
    }
  };

  return (
    <div className='movie-details'>
      {movie && (
        <section className='title-details'>
          <h1 className='.bold-details'>{movie.title}</h1>
          <p>{movie.release_date}</p>
          <div className="specific-details">
            <div className='rating rating-placement'>
              <p>{formatRatingPercentage(movie && movie.vote_average )}</p> 
            </div>
            {movie.genres && (
              <ul>
                {/* display genres */}
                {movie.genres.map((genre, i) => (
                  <li key={genre.id}>
                    {genre.name}
                    {/* add a comma after them except for the last one */}
                    {i !== movie.genres.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            )}
            <FavoriteBtn remove={movie && isFav(favs, null, movie.id)} movie={movie} onClick={handleFavorite} />
          </div>
        </section>
      )}

      <section className='movie-detail-wrapper'>
        <div className="movie-cover">
          {movie ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> : 'Sorry, the movie has not loaded yet'}
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </div>

        <div className='overview-details'>
          <div className='tablet-desktop-details'>
          <img src={clapperHero} alt="clapperboard top" />
            <h1 className='.bold-details'>{movie && movie.title}</h1>
            <div className="specific-details">
              {movie && (
                <ul>
                <li>{movie && movie.release_date} &#x2022;</li>
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
          <p className='movie-premise'>{movie && movie.overview !== "" ? movie.overview : "Sorry, we do not currently have the data you are looking for. As this site uses TMDB's database, the data wont be avalible until its updated on their end"}</p>
          <div className='overview-widgets'>
            <div className='rating rating-placement'>
              <p>{formatRatingPercentage(movie && movie.vote_average )}</p>
            </div>
            <FavoriteBtn remove={movie && isFav(favs, null, movie.id)} movie={movie} onClick={handleFavorite} />
          </div>
        </div> {/*overview details */}
      </section>

      <section className='cast-details'>
        <h2>Meet the Cast</h2>
        {credits && credits.cast && (
          <section className='card-container'>
          {/* cap at 12 Cast members */}
          {credits.cast
            .filter(member => member.profile_path !== null)
            .slice(0, 12)
            .map(member => (
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
      <Link to="/">
        <button className="return-home">Return Home</button>
      </Link>
      </div>
    </div>
  );
}

export default SingleDetails;