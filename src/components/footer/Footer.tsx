/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Link } from 'react-router-dom';
import './Footer.scss';
import { scrollToTop } from '../../services/utils/scrollToTop';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <Link to="/" className="footer__logo" />

        <div className="footer__div">
          <Link
            to="https://github.com/mate-academy/react_phone-catalog"
            className="footer__nav-link"
          >
            <div>GITHUB</div>
          </Link>

          <Link to="contacts" className="footer__nav-link">
            <div>CONTACTS</div>
          </Link>

          <Link to="rights" className="footer__nav-link">
            <div>RIGHTS</div>
          </Link>
        </div>

        <div className="footer__back-top-div">
          <p className="footer__back-top-text" onClick={scrollToTop}>
            Back to top
          </p>
          <button
            type="button"
            className="footer__button button top"
            onClick={scrollToTop}
          >
            {}
          </button>
        </div>
      </div>
    </div>
  );
};
