import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Thumbnail from "../components/Thumbnail";
import isFav from "../../utilities/isFav.js";
import { appTitle } from "../globals/globalVars";
import { setFavorites } from "../favs/favSlices"; // Import the setFavorites action creator

// Gets the 'fav' from the redux
function PageFavorites() {
  const favs = useSelector((state) => state.favs.items);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${appTitle}-favs`;

    // Initialize state with items from local storage if they exist
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites && storedFavorites.length > 0) {
      // dispatch setFavorites action with the stored favs 
      dispatch(setFavorites(storedFavorites));
    }
  }, [dispatch]);

  return (
    <main>
      <section className="fav-container">
        <div className="heading-fav">
           {/* heading*/}
          <h2>Favourite Movies</h2>
        </div>
        <div className="content">
           {/* Checks if there are faved movies*/}
          {favs.length < 1 ? (
            <div className="paragraph-container">  {/* black box conatiner  */}
               {/* the dashed border container  */}
              <div className="dashed-border">
                <p className="fav-p">
                  {/* if there are no favs it displays this  */}
                  That's not <em>gouda</em>, you have no favourites!
                </p>
                <p className="fav-p">
                  {/* if there are no favs it displays this also */}
                  Return to the <Link to="/">home</Link> page and start your collection by clicking the hearts on your favourite movies
                </p>
              </div>
            </div>
          ) : (
            <section className="thumbnail-section"> {/* Map over favorite movies which looks at each unique key, passes the movie data to the thumbnail component and cehcks if the movie is faved */}
              {favs.map((movie) => (
                <Thumbnail
                  key={movie.id}  
                  movie={movie}
                  isFav={isFav(favs, true, movie.id)}
                />
              ))}
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

export default PageFavorites;
