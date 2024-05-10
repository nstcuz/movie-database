//For movie thumbnails, include another component for the "rating circle"

import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';


function Thumbnail({ title, release_date, overview, rating, image }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const dispatch = useDispatch();

//pass whole movie thumbnail 
  const toggleFavorite = () => {

        if(addToFav === true){
            dispatch(addFav(movie));
        }else{
            dispatch(deleteFav(movie));
        
    }
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
            <p>{rating}</p>
          </div>
        </div>

      </div>
      <h3>{title}</h3>
      <p class="date">{release_date}</p>


      <div className="btn-container">
        {/* href to link dynamically to single details */}
        <p className="more-btn"><a href='#'>More Info</a></p>
        <FavoriteBtn isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  )
}

export default Thumbnail;
