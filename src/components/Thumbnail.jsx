//For movie thumbnails, include another component for the "rating circle"

import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';
 
function Thumbnail() {
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
        <img />

        <div className={`details-overlay ${isOverlayVisible ? 'active' : ''}`}>
          <p>Movie details wee woo wee woo so much details</p>
          <div className="rating">
            <p>XX%</p>
          </div>
        </div>

        
      </div>
      <h3>Movie Title Movie Title Movie Title</h3>
      <p>Release Date</p>


      <div className="btn-container">
        {/* href to link dynamically to single details */}
        <p className="more-btn"><a href='#'>More Info</a></p>
        <FavoriteBtn isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  )
}


export default Thumbnail;
