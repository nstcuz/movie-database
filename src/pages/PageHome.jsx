import Thumbnail from "../components/Thumbnail";

const PageHome = () => {
    return (
        <main>
            <section>
                <p>Slideshow goes here</p>
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