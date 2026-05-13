import './Footer.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="footer__logo">
            <img
              src="img/icons/logo.svg"
              alt="Nice Gadgets Logo"
              className="footer__logo-img"
            />
          </Link>

          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__item">
                <a
                  href="https://github.com/AleksanderChaika/react_phone-catalog"
                  className="footer__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li className="footer__item">
                <Link to="/contacts" className="footer__link">
                  Contacts
                </Link>
              </li>
              <li className="footer__item">
                <Link to="/rights" className="footer__link">
                  Rights
                </Link>
              </li>
            </ul>
          </nav>

          <div className="footer__back-to-top">
            <span className="footer__back-text">Back to top</span>
            <button
              type="button"
              className="footer__back-button"
              onClick={scrollToTop}
            >
              <img
                src="img/icons/arrow-up.svg"
                alt="Top"
                className="footer__back-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
