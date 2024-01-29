import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <NavLink
            to="/home"
            className="footer__logo-link"
          />
        </div>
        <ul className="footer__nav-list">
          <li className="footer__nav-item">
            <a
              href="https://github.com/Shostyy"
              className="footer__nav-link"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </li>

          <li className="footer__nav-item">
            <a
              href="https://www.linkedin.com/in/shosty/"
              className="footer__nav-link"
              rel="noreferrer"
              target="_blank"
            >
              Contacts
            </a>
          </li>

          <li className="footer__nav-item">
            <NavLink
              to="/home"
              className="footer__nav-link"
            >
              Rights
            </NavLink>
          </li>
        </ul>
        <div className="footer__anchor">
          { /* eslint-disable-next-line */}
          <button
            className="footer__anchor-button"
            onClick={() => scrollToTop()}
          >
            Back to top
            <div
              className="footer__anchor-icon"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
