import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';
import { truncateTitle, truncateOverview, formatRatingPercentage } from '../globals/globalVars';
import { Link } from 'react-router-dom';


function Thumbnail({ isFav, movie }) {
  if (!movie) {
    return null;
  }

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(prevState => !prevState);
  };
  return (
    <div className="thumbnail-container">
      {/* Movie excerpt overlay when tapped/hovered */}
      <div  className="poster" 
            onClick={toggleOverlay} >
        <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.title+" poster"} />

        <div className={`details-overlay ${isOverlayVisible ? 'active' : ''}`}>
          {/* truncateOverview shortens and adds "..." to the overview at 12 words*/}
          <p>{truncateOverview( movie.overview, 12 )}</p>
          {/* formatRatingPercentage converts the vote_average to a comprehensible percentage */}
          <div className="rating">
            <p>{formatRatingPercentage( movie.vote_average )}</p>
          </div>
        </div>
      </div>
      {/* truncateTitle shortens and adds "..." to the title at 36 characters*/}
      <h3>{truncateTitle( movie.title, 36 )}</h3>
      <p className="date">{movie.release_date}</p>

      <div className="btn-container">
        {/* Link dynamically to Single Details */}
        <p className="more-btn"><Link to={`/movie/${movie.id}`}>More Info</Link></p>
        {/* FavoriteBtn changes color and favoriting the movie */}
        {isFav ?
        <FavoriteBtn remove={true}  movie={movie}/> :
        <FavoriteBtn remove={false}  movie={movie}/>
       }
      </div>
    </div>
  )
}

export default Thumbnail;
