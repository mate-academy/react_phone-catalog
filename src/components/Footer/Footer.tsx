import React from 'react';
import './_Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__wrapper">
      <div className="footer__logo" />
      <nav className="footer__nav">
        <ul className="footer__list">
          <li className="footer__item">
            <a
              href="https://github.com/aleksandrDnieper/react_phone-catalog"
              className="footer__link"
            >
            Github
            </a>
          </li>
          <li className="footer__item">
            <a href="#contacts" className="footer__link">Contacts</a>
          </li>
          <li className="footer__item">
            <a href="#rights" className="footer__link">Rights</a>
          </li>
        </ul>
      </nav>
      <div className="footer__block">
        <span className="footer__text">Back to top</span>
        <a href="#home" className="linkTop">
          <img
            src="/images/arrow.svg"
            alt="link_to_top"
            className="footer__arrow"
          />
        </a>
      </div>
    </div>
  </footer>
);
