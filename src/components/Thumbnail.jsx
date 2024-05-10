//For movie thumbnails, the favorite heart is a seperate component
import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';
import { truncateTitle, truncateOverview, formatRatingPercentage } from '../globals/globalVars';

function Thumbnail({ title, release_date, overview, rating, image }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(prevState => !prevState);
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(prevState => !prevState);
  };

  return (
    <div className="thumbnail-container">
      <div  className="poster" 
            onClick={toggleOverlay} >
        <img src={"https://image.tmdb.org/t/p/w500"+image} alt={title+" poster"} />

        <div className={`details-overlay ${isOverlayVisible ? 'active' : ''}`}>
          <p>{truncateOverview( overview, 12 )}</p>
          <div className="rating">
            <p>{formatRatingPercentage( rating )}</p>
          </div>
        </div>

      </div>
      <h3>{truncateTitle( title, 36 )}</h3>
      <p className="date">{release_date}</p>

      <div className="btn-container">
        {/* href to link dynamically to single details */}
        <p className="more-btn"><a href='#'>More Info</a></p>
        <FavoriteBtn isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  )
}

export default Thumbnail;
