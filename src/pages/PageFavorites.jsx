import '../scss/styles.scss';
import { Link } from 'react-router-dom';
import { appTitle } from '../globals/globalVars';
import { useSelector } from 'react-redux';
import Thumbnail from '../components/Thumbnail';
// import { useEffect } from 'react';

function PageFavs() {
  const favs = useSelector((state) => state.favs.items);
  console.log(favs);

//   useEffect(() => {
//     document.title = `${appTitle}-favs`;
//   }, []);

  return (
    <main>
      <section>
        <h2>Favourite Movies</h2>
        {favs.length === 0 ? (
          <p>No favorite movies. Return to the <Link to="/">home</Link> page to add some favorites.</p>
        ) : (
            <p>You have favorite movies!</p>
        //   <section className="thumbnail-section">
        //     {favs.map((movie) => (
        //       <Thumbnail key={movie.id} movie={movie} isFavorited={true} />
        //     ))}
        //   </section>
        )}
      </section>
    </main>
    // <main>
    //   <section>
    //     <h2>Favourite Movies</h2>
    //     {favs.length < 1 ? (
    //       <p>
    //         No favourite movies. Return to the <Link to="/">home</Link> page to add some favourite kittens.
    //       </p>
    //     ) : (
    //       <section className="thumbnail-section">
    //         {favs.map((singleMovie, i) => {
    //           return <Thumbnail key={i} movie={singleMovie} isFavorited={true} />;
    //         })}
    //       </section>
    //     )}
    //   </section>
    // </main>
  );
}

export default PageFavs;
