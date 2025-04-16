import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/" className="footer__logo icon icon--logo"></Link>

      <nav className="footer__nav">
        <ul className="footer__nav-list">
          <li className="footer__nav-list--item">
            <Link
              to="https://github.com/kravets111?tab=repositories"
              className="text__body--uppercase nav__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </Link>
          </li>

          <li className="footer__nav-list--item">
            <Link to="#" className="text__body--uppercase nav__link">
              Contacts
            </Link>
          </li>

          <li className="footer__nav-list--item">
            <Link to="#" className="text__body--uppercase nav__link">
              rights
            </Link>
          </li>
        </ul>
      </nav>

      <div className="footer__bottom">
        <p className="footer__bottom-text text text__body--small">
          Back to top
        </p>

        <button
          type="button"
          className="footer__bottom-button icon icon--arrow icon--arrow-up"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        ></button>
      </div>
    </footer>
  );
};
