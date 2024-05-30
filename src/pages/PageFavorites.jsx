import '../scss/styles.scss'
import { Link } from "react-router-dom";
import {
  truncateTitle,
  truncateOverview,
  formatRatingPercentage,
  appTitle
} from "../globals/globalVars";
import { useSelector } from "react-redux";
import Thumbnail from "../components/Thumbnail";
import isFav from "../../utilities/isFav.js";
import { useEffect } from "react";



function PageFavorites() {
  const favs = useSelector((state) => state.favs.items);
  console.log(favs);

  useEffect(() => {
    document.title = `${appTitle}-favs`;
  });

  return (
    <main>
      <section className="fav-container">
        <div className="heading-fav">
          <h2>Favourite Movies</h2>
        </div>
        <div className="content">
          {favs.length < 1 ? (
            <div className="paragraph-container">
              <p className="fav-p">
                That's not <i>gouda</i>, you have no favorites!
              <br></br>
              <br></br>
               Return to the <Link to="/">home</Link> page and start your collection by clicking the hearts on your favorite movies
              </p>
            </div>
          ) : (
            <section className="thumbnail-section">
              {favs &&
                favs.length > 0 &&
                favs.map((movie) => (
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