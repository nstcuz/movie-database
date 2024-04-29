import github from '../images/iconmonstr-github-3-48.svg';

const githubIcon = <img src={github} alt="Github Icon" />

const Footer = () => {

    return (
        <footer>
            {githubIcon}
            <p>&copy;By Cat, Nic, Natalia, Matthew 2024</p>
        </footer>
    )
}

export default Footer;