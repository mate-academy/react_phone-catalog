import { Link } from 'react-router-dom';
import './Footer.scss';
import LOGO from '../../icons/LOGO.svg';
import Arrow_up from '../../icons/Arrow_up.svg';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/">
          <img
            src={LOGO}
            alt="Logo"
            className="logo logo--footer"
          />
        </Link>

        <nav className="footer__nav">
          <Link
            to="https://github.com/olena-hapon"
            className="footer__link"
          >
            Github
          </Link>
          <Link
            to="https://github.com/olena-hapon"
            className="footer__link"
          >
            Contacts
          </Link>
          <Link
            className="footer__link"
            to="https://github.com/olena-hapon"
          >
            Rights
          </Link>
        </nav>

        <button
          className="footer__button"
          type="button"
          onClick={() => scrollToTop()}
        >
          <img
            src={Arrow_up}
            alt="Arrow"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
