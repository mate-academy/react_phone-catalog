import { Link } from 'react-router-dom';
import { ICONS } from '../../images/icons/icons';

import './Footer.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="footer">
      <Link
        to="/"
        className="footer--logo--link"
      >
        <img
          src={ICONS.logo}
          alt="Logo"
          className="footer--logo"
        />
      </Link>
      <nav className="footer__navigation">
        <ul className="footer__navigation--list">
          <li className="footer__navigation--item">
            <Link
              to="https://github.com/NikitaOrliak"
              target="_blank"
              rel="noopener noreferrer"
              className="upperCase footer__navigation--item--link"
            >
              GITHUB
            </Link>
          </li>
          <li className="footer__navigation--item">
            <Link
              to="https://github.com/NikitaOrliak"
              target="_blank"
              rel="noopener noreferrer"
              className="upperCase footer__navigation--item--link"
            >
              CONTACTS
            </Link>
          </li>
          <li className="footer__navigation--item">
            <Link
              to="https://github.com/NikitaOrliak"
              target="_blank"
              rel="noopener noreferrer"
              className="upperCase footer__navigation--item--link"
            >
              RIGHTS
            </Link>
          </li>
        </ul>
      </nav>
      <Link
        to="#/"
        className="footer__back-to-top"
        onClick={handleScrollToTop}
      >
        <p className="smallText footer__back-to-top--text">
          Back to top
        </p>
        <img
          className="smallIcon footer__back-to-top--icon"
          src={ICONS.arrowUp}
          alt="Arrow top"
        />
      </Link>
    </footer>
  );
};
