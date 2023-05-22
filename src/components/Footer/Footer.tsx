/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="App__footer footer">
      <div className="footer__container _container">
        <Link to="/" className="footer__logo-link">
          <img
            className="footer__logo-img"
            src="./img/icons/LOGO.svg"
            alt="Phones"
          />
        </Link>

        <nav className="footer__navbar">
          <ul className="footer__menu-list">
            <li className="footer__menu-item">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="footer__menu-link"
              >
                github
              </a>
            </li>

            <li className="footer__menu-item">
              <Link to="/contacts" className="footer__menu-link">
                contacts
              </Link>
            </li>

            <li className="footer__menu-item">
              <Link to="/rights" className="footer__menu-link">
                rights
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="footer__back-top-link"
          onClick={scrollToTop}
        >
          Back to top
        </button>

        <button
          type="button"
          className="footer__back-top-button icon-button"
          onClick={scrollToTop}
          aria-label="Mute volume"
        />
      </div>
    </footer>
  );
};
