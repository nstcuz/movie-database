//For movie thumbnails, the favorite heart is a seperate component
import { useState } from 'react';
import FavoriteBtn from './FavoriteBtn';
import { truncateTitle, truncateOverview, formatRatingPercentage } from '../globals/globalVars';
import { useDispatch } from 'react-redux';
import { addFav, deleteFav } from '../favs/favSlices.jsx';


function Thumbnail({ isFav, movie }) {
  if (!movie) {
   
    return null;
  }

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const dispatch = useDispatch();

  // const toggleFavorite = () => {
  //   setIsFavorited(prevState => !prevState);
  //   if (!isFavorited) {
  //     handleFav();
  //   } else {
  //     handleFav();
  //   }
  // };
  
  const handleFav = (addToFav, movie) => {
    if(addToFav === true){
      dispatch(addFav(movie));
      console.log("Adding to favorites:");
    } else {
      dispatch(deleteFav(movie));
      console.log("Removing from favorites:");
    }
  }

  // const handleRemoveFav = (movie) => {
  //   dispatchFavAction(false, movie);
  // };

  // const dispatchFavAction = (isAdding) => {
  //   if (isAdding) {
  //     dispatch(addFav(movie));
  //     // Dispatch action to add to favorites
  //     console.log("Adding to favorites:");
  //   } else {
  //     // Dispatch action to remove from favorites
  //     dispatch(deleteFav(movie));
  //     console.log("Removing from favorites:");
  //   }
  // };
  const toggleOverlay = () => {
    setIsOverlayVisible(prevState => !prevState);
  };
  return (
    <div className="thumbnail-container">
      <div  className="poster" 
            onClick={toggleOverlay} >
        <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.title+" poster"} />

        <div className={`details-overlay ${isOverlayVisible ? 'active' : ''}`}>
          <p>{truncateOverview( movie.overview, 12 )}</p>
          <div className="rating">
            <p>{formatRatingPercentage( movie.vote_average )}</p>
          </div>
        </div>

      </div>
      <h3>{truncateTitle( movie.title, 36 )}</h3>
      <p className="date">{movie.release_date}</p>


      <div className="btn-container">
        {/* href to link dynamically to single details */}
        <p className="more-btn"><a href='#'>More Info</a></p>
        {isFav ?
        <FavoriteBtn remove={true} handleFavClick={handleFav} movie={movie}/> :
        <FavoriteBtn remove={false} handleFavClick={handleFav} movie={movie}/>
       }
      </div>
    </div>
  )
}

export default Thumbnail;
