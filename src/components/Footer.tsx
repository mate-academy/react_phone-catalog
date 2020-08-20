import React from 'react';
import {
  HashRouter,
  NavLink,
} from 'react-router-dom';

const Footer = () => {
  return (
    <HashRouter>
      <div className="footer">
        <nav className="footer__nav">
          <img
            src="img/logo.svg"
            alt="Logo"
            className="footer__logo"
          />
          <ul className="footer__menu">
            <a
              href="https://github.com/tyooma"
              target="_blank"
              rel="noreferrer noopener"
              className="footer__menu-item"
            >
              GitHub
            </a>
            <NavLink to="/contacts" className="footer__menu-item">Contacts</NavLink>
            <NavLink to="/rights" className="footer__menu-item">Rights</NavLink>
          </ul>
          <div className="footer__home">
            <p className="footer__text">Back to top</p>
            <button type="button" className="footer__button">
              <img
                src="img/back-to-top-arrow.svg"
                alt="Back to top arrow"
                className="footer__arrow"
              />
            </button>
          </div>
        </nav>
      </div>

    </HashRouter>
  );
};

export default Footer;
