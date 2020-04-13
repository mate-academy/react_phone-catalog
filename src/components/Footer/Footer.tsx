import React from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './_Footer.scss';
import arrow from '../../assets/arrow.svg';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__container wrapper">
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
        <HashLink
          smooth
          to={`${useLocation().pathname}#home`}
          className="linkTop"
        >
          <img
            src={arrow}
            alt="link_to_top"
            className="footer__arrow"
          />
        </HashLink>
      </div>
    </div>
  </footer>
);
