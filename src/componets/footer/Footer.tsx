import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from '../../img/logo.svg';
import footer_button from '../../img/footer_button.svg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="page__container">
        <div className="footer__items">
          <div className="footer__logo-link-container">
            <Link to="/">
              <img src={logo} alt="logo" className="footer__logo" />
            </Link>
          </div>

          <div className="footer__menu">
            <Link
              to="https://github.com/Viktorianeimesh"
              target="_blank"
              className="footer__link"
            >
              github
            </Link>
            <Link
              to="https://github.com/Viktorianeimesh"
              className="footer__link"
              target="_blank"
            >
              contacts
            </Link>
            <Link to="/rights" target="_blank" className="footer__link">
              rights
            </Link>
          </div>
          <div className="footer__buttonTop">
            <button
              type="button"
              className="footer__button_description"
              onClick={scrollToTop}
            >
              Back to top
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="footer__button-image"
            >
              <img
                src={footer_button}
                alt="button-to-the-top"
                className="footer__image"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
