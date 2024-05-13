import { Link } from 'react-router-dom';
import './Footer.scss';
import '../../styles/main.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to="/" className="footer__logo">
        <img src="./icons/logo.svg" alt="logo" />
      </Link>

      <nav className="footer-nav footer__nav">
        <a
          href="https://github.com/olafchuszno/react_phone-catalog"
          className="footer-nav__item"
        >
          Github
        </a>
        <a href="/" className="footer-nav__item">
          Contacts
        </a>
        <a href="/" className="footer-nav__item">
          Rights
        </a>
      </nav>

      <Link to="#header" className="top-link footer__top-link">
        Back to top
        <button className="arrow-button">
          <img className="arrow-button__image" src="./icons/arrow-top.svg" />
        </button>
      </Link>
    </footer>
  );
};
