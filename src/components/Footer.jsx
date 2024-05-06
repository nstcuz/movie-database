import github from '../images/iconmonstr-github-3-48.svg';

const githubIcon = <img src={github} alt="Github Icon" />

const Footer = () => {

    return (
        <footer>
            {githubIcon}
            <p>&copy;By 
                <a href="https://cgtwebdesigns.com/">Cat</a>, 
                <a href="https://niccousins.com/">Nic</a>, 
                <a href="https://natcreates.com/">Natalia</a>, 
                <a href="https://mlewebs.ca/">Matthew</a> 2024</p>
        </footer>
    )
}

export default Footer;