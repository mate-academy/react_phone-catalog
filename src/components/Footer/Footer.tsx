import './Footer.css';

const Footer = () => {
return (
<footer className="footer">
<a
href="https://github.com/sashkatmshchk-pixel"
target="_blank"
rel="noopener noreferrer"
className="footer-link"
>
GITHUB
</a>

<button
onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
className="footer-btn"
>
BACK TO TOP
</button>
</footer>
);
};

export default Footer;