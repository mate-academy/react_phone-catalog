import React from 'react';
import { ArrowUp } from '../ArrowUp/ArrowUp';
import { Logo } from '../Logo/Logo';

import './Footer.scss';

export const Footer: React.FC = () => {
  const nameLinks = ['Github', 'Contacts', 'Rights'];

  return (
    <footer className="footer">
      <div className="footer__content container">
        <Logo />

        <div className="footer__link-container">
          {nameLinks.map(link => (
            <a
              key={link}
              href="https://github.com/OleksandrOse"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="footer__button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Back to top
          <ArrowUp />
        </button>
      </div>
    </footer>
  );
};
