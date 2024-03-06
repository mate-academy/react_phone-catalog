import { Link } from 'react-router-dom';

import './index.scss';
import { ICONS, LOGO } from '../../images';

export const Footer = () => {
  const scrollToTopHandler = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer--logo--link">
        <img src={LOGO} alt="Logo" className="footer__logo" />
      </Link>

      <nav className="footer__nav">
        <ul className="footer__nav--list">
          <li className="footer__nav__item">
            <Link
              to="https://github.com/kovachhh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__nav__item--link"
            >
              Github
            </Link>
          </li>

          <li className="footer__nav__item">
            <Link
              to="https://www.linkedin.com/in/viktor-koval-703816204/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__nav__item--link"
            >
              Contacts
            </Link>
          </li>

          <li className="footer__nav__item">
            <Link
              to="https://github.com/kovachhh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__nav__item--link"
            >
              Rights
            </Link>
          </li>
        </ul>
      </nav>

      <Link
        to="#/"
        className="footer__back-to-top"
        onClick={scrollToTopHandler}
      >
        <p className="footer__back-to-top--text">Back to top</p>
        <img
          className="footer__back-to-top--icon"
          src={ICONS.arrowUp}
          alt="Back to top"
        />
      </Link>
    </footer>
  );
};
