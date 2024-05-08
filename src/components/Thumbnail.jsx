//For movie thumbnails, include another component for the "rating circle"

import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';


function Thumbnail({ title, release_date, overview, popularity, image }) {
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
            onClick={toggleOverlay}
            >
        {/*src and alt will be dynamic later*/}
        <img src={"https://image.tmdb.org/t/p/w500"+image} alt="" />

        <div className={`details-overlay ${isOverlayVisible ? 'active' : ''}`}>
          <p>{overview}</p>
          <div className="rating">
            <p>{popularity}</p>
          </div>
        </div>

      </div>
      <h3>{title}</h3>
      <p>{release_date}</p>

      <div className="btn-container">
        {/* href to link dynamically to single details */}
        <p className="more-btn"><a href='#'>More Info</a></p>
        <FavoriteBtn isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  )
}

export default Thumbnail;
