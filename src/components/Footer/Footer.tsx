/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './footer.scss';
import { scrollToTop } from '../../helpers/scrollToTop';
import { Logo } from '../Logo';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <Logo />
        <div className="footer__nav">
          <Link
            to="/"
            className="footer__link"
            target="_blank"
          >
            Github
          </Link>
          <Link
            to="/"
            className="footer__link"
            target="_blank"
          >
            Contacts
          </Link>
          <Link
            to="/"
            className="footer__link"
            target="_blank"
          >
            rights
          </Link>
        </div>
        <button
          className="back-to-top"
          type="button"
          onClick={scrollToTop}
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};
