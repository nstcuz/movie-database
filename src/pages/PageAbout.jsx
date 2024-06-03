import logo from '../images/TMDb-logo.svg';
import { NavLink } from 'react-router-dom';

const About = () => {
    return (
        <div className='about-content'>
            <div className='about-container'>
                <div className='header-container about-container'>
                <div className='clacker'>
                     {/* heading */}
                    <h2>About Us</h2>
                </div>
                </div>
                 {/* About the movie text */}
            <div className='about-text'>
            <p>Cheeseboard Cinema is a movie database where users can search up movie titles based on different catagories, such as genre and popularity.</p>
             {/* more text in the about and a link to the favouries page  */}
            <p className="border-bottom">Join and build your collect with our <NavLink to="/favorites">Favourites</NavLink> feature!</p>
            <p>So... what's with the <em>"cheese"</em> theme?</p>
            <p>Ever watched something and thought <em>"That's so cheesey"</em>?</p>
            <p className="border-bottom">The creator behind Cheeseboard Cinema combined that sentiment and the iconic "clapperboard", which a "cheeseboard" movie database
                where everyone can create their own list of movies catered to them!
            </p>
             {/* links to every members page and copyright */}
            <p>Project collaboration with <a href='https://www.cgtwebdesigns.com/' className='tolower'>Catharina Trust</a>, <a href='https://www.natcreates.com/' className='tolower'>Natalia Nguyen</a>, <a href='https://mlewebs.ca/' className='tolower'>Matthew Lew</a> and <a href='https://niccousins.com/' className='tolower'>Nic Cousins</a>.</p>
            <p>This product uses the <a href="https://developer.imdb.com/">TMDb API</a> but is not endoresed or certified by TMDb.</p>
            <div className='image-container'>
                 {/* TMDB logo*/}
            <img src={logo} alt="TMDb logo" />
            </div>
            </div>
            </div>
        </div>
    );
}

export default About;