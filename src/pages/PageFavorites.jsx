// import "../scss/styles.scss";
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
    <main className="fav-container">
      <section>
        <div className="heading-fav">
          <h2>Favourite Movies</h2>
        </div>
        <div className="content">
          {favs.length < 1 ? (
            <p className="fav-p">
              No favourite movies. Return to the <Link to="/">home</Link> page to
              add some favourite movies.
            </p>
          ) : (
            <section className="thumbnail-section">
              {favs != null &&
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