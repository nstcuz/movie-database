import Thumbnail from "../components/Thumbnail";
import Hero from '../components/Hero';

const PageHome = () => {
    return (
        <main>
            <section>
                <Hero />
            </section>
            <p>Tab between Popular/Now Playing/Upcoming/Top Rated thumbs.</p>
			<section className="thumbnail-section">
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
			</section>
		</main>
    )
}

export default PageHome;