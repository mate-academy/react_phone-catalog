import React from 'react';
import './Footer.scss';
import { Logo } from '../Logo/Logo';

export const Footer: React.FC = () => {
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
    </div>
  );
};
