import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../../assets/logo.png';
import upArrowIcon from '../../assets/icons/upArrow_icon.png';

export const Footer = () => (
  <footer className="footer">
    <Link to="/">
      <img src={logo} className="footer__logo" alt="Logo" />
    </Link>
    <div className="footer-links">
      <Link to="https://github.com" className="footer-links__item">
        Github
      </Link>
      <Link to="" className="footer-links__item">
        Contacts
      </Link>
      <Link to="" className="footer-links__item">
        Rights
      </Link>
    </div>
    <button
      className="footer-topButton"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <p className="footer-topButton__text">Back to top</p>
      <img
        src={upArrowIcon}
        className="footer-topButton__button"
        alt="Top button"
      />
    </button>
  </footer>
);
