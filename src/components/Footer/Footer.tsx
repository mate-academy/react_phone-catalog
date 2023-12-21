import { Link } from 'react-router-dom';
import { moveToUp } from '../../helpers/movePageToUp';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__navbar">
            <Link
              to="/"
              className="logo"
              onClick={moveToUp}
            >
              <img
                src="img/logo/Logo.svg"
                alt="Logo"
                className="logo__image"
              />
            </Link>

            <nav className="footer__navbar-menu">
              <ul className="footer__navbar-menu-list">
                <li className="footer__navbar-menu-item">
                  <Link
                    to="https://github.com/Sirius9312/react_phone-catalog"
                    className="footer__navbar-menu-link"
                  >
                    Github
                  </Link>
                </li>

                <li className="footer__navbar-menu-item">
                  <Link
                    to="/"
                    className="footer__navbar-menu-link"
                    onClick={moveToUp}
                  >
                    Contacts
                  </Link>
                </li>

                <li className="footer__navbar-menu-item">
                  <Link
                    to="/"
                    className="footer__navbar-menu-link"
                    onClick={moveToUp}
                  >
                    Rights
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="footer__back-to-top-container">
              <div className="footer__back-to-top-text">Back to top</div>

              <button
                type="button"
                className="footer__arrow-up-container"
                onClick={moveToUp}
              >
                <div className="icon icon--arrow-up" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
