//For movie thumbnails, include another component for the "rating circle"

import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';
 
function Thumbnail() {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(prevState => !prevState);
  };

  return (
    <div className="thumbnail-container">
      <img />
      <h3>Movie Title Movie Title Movie Title</h3>
      <p>Release Date</p>

      <div className="details-overlay">
        <p>Movie details wee woo wee woo so much details</p>
        <div className="rating">
          <p>XX%</p>
        </div>
      </div>

      <div className="btn-container">
        {/* href to link dynamically to single details */}
        <p className="more-btn"><a>More Info</a></p>
        <FavoriteBtn isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  )
}


export default Thumbnail;
