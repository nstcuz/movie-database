import Thumbnail from "../components/Thumbnail";

const PageHome = () => {
    return (
        <main>
            <section>
                <p>Slideshow goes here</p>
            </section>
			<section>
				<p>Tab between Popular/Now Playing/Upcoming/Top Rated thumbs.</p>
                <p>Thumbs go here.</p>
                <Thumbnail/>
			</section>
		</main>
    )
}

export default PageHome;