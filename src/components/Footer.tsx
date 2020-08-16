import React from 'react';
import { HashRouter } from 'react-router-dom';

const Footer = () => {
  return (
    <HashRouter>
      <div className="footer">
        <nav className="footer__nav">
          <img
            src={`${window.location.origin}/img/logo.svg`}
            alt="Logo"
            className="footer__logo"
          />
          <ul className="footer__menu">
            <li className="footer__menu-item">GitHub</li>
            <li className="footer__menu-item">Contacts</li>
            <li className="footer__menu-item">Rights</li>
          </ul>
          <div className="footer__home">
            <p className="footer__text">Back to top</p>
            <button type="button" className="footer__button">
              <img
                src={`${window.location.origin}/img/back-to-top-arrow.svg`}
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
