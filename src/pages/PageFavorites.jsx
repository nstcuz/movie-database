import "../scss/styles.scss";
import { Link } from "react-router-dom";
import {
  truncateTitle,
  truncateOverview,
  formatRatingPercentage,
  appTitle,
} from "../globals/globalVars";
import { useSelector } from "react-redux";
import Thumbnail from "../components/Thumbnail";
import isFav from "../../utilities/isFav.js";
import "../scss/styles.scss";
import { Link } from "react-router-dom";
import {
  truncateTitle,
  truncateOverview,
  formatRatingPercentage,
  appTitle,
} from "../globals/globalVars";
import { useSelector } from "react-redux";
import Thumbnail from "../components/Thumbnail";
import isFav from "../../utilities/isFav.js";
// import { truncateTitle, truncateOverview, formatRatingPercentage } from '../globals/globalVars';
import { useEffect } from "react";
import { useEffect } from "react";

function PageFavs() {
  const favs = useSelector((state) => state.favs.items);
  console.log(favs);
  const favs = useSelector((state) => state.favs.items);
  console.log(favs);

  // useEffect(() => {
  //     const fetchMovies = async () => {
  //       const response = await fetch(`${movieEndpoint}?api_key=${apiKey}`);
  //       let data = await response.json();
  //       setMovies(data);
  //       console.log(data);
  //     };
  // useEffect(() => {
  //     const fetchMovies = async () => {
  //       const response = await fetch(`${movieEndpoint}?api_key=${apiKey}`);
  //       let data = await response.json();
  //       setMovies(data);
  //       console.log(data);
  //     };

  //     fetchMovies();
  // }, []);
  useEffect(() => {
    document.title = `${appTitle}-favs`;
  });
  //     fetchMovies();
  // }, []);
  useEffect(() => {
    document.title = `${appTitle}-favs`;
  });

  return (
    <main className="fav-container">
      <section>
        <div className="heading-fav">
        <h2>Favourite Movies</h2>
        </div>
        {favs.length < 1 ? (
          <div className="fav-body">
          <p>
            That's not <i>gouda</i>, you have no favorites. 
            <br></br>
            <br></br>
            Return to the <Link to="/">home</Link> page to
            add some favourite movies.
          </p>
          </div>
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
      </section>
    </main>
  );
  return (
    <main>
      <section>
        <h2>Favourite Movies</h2>
        {favs.length < 1 ? (
          <p>
            No favourite movies. Return to the <Link to="/">home</Link> page to
            add some favourite kittens.
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
      </section>
    </main>
  );
}

export default PageFavs;
