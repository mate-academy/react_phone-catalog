import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__item">
            <Link to="/home" className="footer__logo">
              <img
                src="./img/icons/logo.svg"
                alt="LOGO"
                className="footer__logo-image"
              />
            </Link>
          </div>

          <div className="footer__item">
            <ul className="footer__list">
              <li className="footer__list-item">
                <a
                  href="https://github.com/AllaSerhiienko"
                  className="footer__link"
                >
                  GitHub
                </a>
              </li>
              <li className="footer__list-item">
                <a
                  href="mailto:allasergienko706@gmail.com"
                  className="footer__link"
                >
                  Contacts
                </a>
              </li>
              <li className="footer__list-item">
                <Link
                  to="/home"
                  className="footer__link"
                >
                  Rights
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer__item">
            <button
              type="button"
              className="footer__top-button"
              onClick={scrollToTop}
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
