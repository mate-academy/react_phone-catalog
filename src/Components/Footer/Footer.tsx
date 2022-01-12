import React from 'react';
import { Logo } from '../Logo/Logo';

import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <Logo />
        <a
          href="https://github.com/Oleh-Khashchevskyi"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <button
          type="button"
          className="footer__button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to top
          <i className="fas fa-angle-up" />
        </button>
      </div>
    </footer>
  );
};
