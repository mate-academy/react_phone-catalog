import { Link } from 'react-router-dom';
import './style.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    const topElement = document.getElementById('top');

    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__items">
        <Link className="footer__logo" to="/">
          <img src="./img/icons/Logo.svg" alt="logo" />
        </Link>

        <nav className="footer__content-mid">
          <Link
            className="footer__content-mid-link"
            to="https:/github.com/zipic"
          >
            Github
          </Link>
          <a
            className="footer__content-mid-link"
            href="tel:+38 093 116 27 88"
          >
            Contacts
          </a>
          <Link className="footer__content-mid-link" to="/right">rights</Link>
        </nav>

        <nav className="footer__content-right">
          <p className="footer__content-right-text">Back to top</p>
          <button
            type="button"
            className="footer__up"
            onClick={handleScrollToTop}
          >
            <img
              className="footer__up-back"
              src="./img/icons/chevron.png"
              alt="up"
            />
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
