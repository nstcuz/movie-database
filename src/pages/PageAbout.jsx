import logo from '../images/TMDb-logo.svg';

import '../scss/styles.scss'

const About = () => {
    return (
        <div className='about-content'>
            <div className='about-container'>
            <h2>About Us</h2>
            <p>Cheeseboard Cinema is a movie database where users can search up movie titles based on different catagories, such as genre and popularity.</p>
            <p>Join and build your collect with our <a href="PageFavorites.jsx">Favorites</a> feature!</p>
            <p>So... what's with the "cheese" theme?</p>
            <p>Ever watched something and thought "That's so cheesey"</p>
            <p>The creator behind Cheeseboard Cinema combined that sentiment and the iconic "clapperboard", which a "cheeseboard" movie database
                where everyone can create their own list of movies catered to them!
            </p>
            <p>Page designed by Natalia Nguyen, project collaberation with Catarina Trust, Matthew Lew and Nic Cousins.</p>
            <p>This product uses the <a href="https://developer.imdb.com/">TMDb API</a> but is not endoresed or certified by TMDb.</p>
            <img src={logo} alt="TMDb logo" />
            </div>
        </div>
    );
}

export default About;