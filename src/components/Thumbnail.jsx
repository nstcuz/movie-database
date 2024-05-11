//For movie thumbnails, the favorite heart is a seperate component
import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';
import { truncateTitle, truncateOverview, formatRatingPercentage } from '../globals/globalVars';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../favs/favSlices';


function Thumbnail({ title, release_date, overview, rating, image, movie }) {
  if (!movie) {
   
    return null;
  }
  const [isFavorited, setIsFavorited] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleFavorite = () => {
    setIsFavorited(prevState => {
      const nextState = !prevState;
      if (!nextState) {
        handleRemoveFav();
      } else {
        handleAddFav();
      }
      return nextState;
    });
  };

  const handleAddFav = (movie) => {
    dispatchFavAction(true, movie);
  };

  const handleRemoveFav = (movie) => {
    dispatchFavAction(false, movie);
  };

  const dispatchFavAction = (isAdding) => {
    if (isAdding) {
      dispatch(addFav(movie));
      // Dispatch action to add to favorites
      console.log("Adding to favorites:");
    } else {
      // Dispatch action to remove from favorites
      dispatch(deleteFav(movie));
      console.log("Removing from favorites:");
    }
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
        <FavoriteBtn isFavorited={isFavorited} handleFavClick={toggleFavorite} movieObj={movie} />
      </div>
    </div>
  )
}

export default Thumbnail;
