import '../scss/styles.scss'
import { Link } from 'react-router-dom';
import { movieEndpoint, apiKey } from '../globals/globalVars';
import { useSelector } from 'react-redux';
import Thumbnail from '../components/Thumbnail';


function PageFavs() {

    const favs = useSelector((state) => state.favs.items);


    return (
        <main>
		    <section>
                <h2>Favourite Movies</h2>
                {favs.length < 1 ? <p>No favourite movies. Return to the <Link to="/">home</Link> page to add some favourite kittens.</p> : 
                <section className="thumbnail-section">
                {favs.map(movie => (
                    <Thumbnail
                        key={movie.id}
                        title={truncateTitle(movie.title, 32)}
                        release_date={movie.release_date}
                        overview={truncateOverview(movie.overview, 12)}
                        rating={formatRatingPercentage(movie.vote_average)}
                        image={movie.poster_path}
                    />
                ))}
			</section>}
            </section>
	    </main>
    );
	
}

export default PageFavs;
