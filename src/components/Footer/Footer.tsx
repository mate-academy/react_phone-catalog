import React from 'react';
import './Footer.scss';
import { Logo } from '../Logo/Logo';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo />
        <nav className="footer-navbar">
          <ul className="footer-list">
            <li className="footer-list__item">
              <a href="https://github.com/Wincherz" className="footer-list__link">Github</a>
            </li>
            <li className="footer-list__item">
              <a href="https://vk.com/wincher" className="footer-list__link">Contacts</a>
            </li>
            <li className="footer-list__item">
              <a href="https://mate.academy" className="footer-list__link">Rights</a>
            </li>
          </ul>
        </nav>
        <div className="footer-right">
          <h4 className="footer-right__title">Back to top</h4>
          <button type="button" className="footer-right__button"> </button>
        </div>
      </div>
    </footer>
  );
};
