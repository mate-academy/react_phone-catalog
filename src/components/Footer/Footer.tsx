import React from 'react';
import './Footer.scss';
import { Logo } from '../Logo/Logo';
import arrowUp from '../../images/arrow-up.svg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <Logo />

      <nav className="footer__nav">
        <ul className="footer__list">
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/OlhaArama/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>

          <li className="footer__item">
            <a
              className="footer__link"
              href="mailto:arama.o.f@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>

          <li className="footer__item">
            <a
              className="footer__link"
              href="https://github.com/OlhaArama/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </a>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        onClick={scrollToTop}
        className="footer__scroll-button"
      >
        <img src={arrowUp} alt="arrow up" />
      </button>
    </div>
  );
};
