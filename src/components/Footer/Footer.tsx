/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './Footer.scss';
import arrow from '../../icons/backToTop.svg';
import logo from '../../img/logo.png';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <Link
          to="./"
        >
          <img src={logo.toString()} alt="logo" />
        </Link>
        <div className="footer__links">
          <Link
            target="_blank"
            className="footer__link"
            to="https://github.com/IvanVaverchak/react_phone-catalog"
          >
            Github
          </Link>
          <Link
            className="footer__link"
            to="./"
          >
            Contacts
          </Link>
          <Link
            className="footer__link"
            to="./"
          >
            Rights
          </Link>
        </div>
        <button
          className="footer__button button"
          type="button"
          onClick={scrollToTop}
        >
          <img src={arrow.toString()} alt="back to top" />
        </button>
      </div>
    </footer>
  );
};
