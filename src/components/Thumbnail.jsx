//For movie thumbnails, the favorite heart is a seperate component
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

  const truncateTitle = ( title, maxLength) => {
    //Add '...' if the original overview has more words than maxLength
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  const truncateOverview = ( overview, maxWords ) => {
    //Split overview into array of words
    const words = overview.split(' ');
    //Select the desired number of words
    const slicedWords = words.slice(0, maxWords);
    //Join selected words back into string
    const truncatedOverview = slicedWords.join(' ');
    //Add '...' if the original overview has more words than maxWords
    if (words.length > maxWords) {
      return truncatedOverview + '...';
    }
    return truncatedOverview;
  }

  const formatRatingPercentage = ( voteAverage ) => {
    if ( voteAverage === 0 ) {
        return "NR"; //For upcoming movies that have no ratings
    }
    //Converts rating to percentage and rounds to nearest integer
    const percentage = Math.round(voteAverage * 10) + '%';
    return percentage;
  }

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
