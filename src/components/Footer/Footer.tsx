import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer container">
      <Link to="/" className="logo footer__logo">
        <img src="_new/img/logo.svg" alt="Logo" />
      </Link>

      <div className="footer__info">
        <a
          href="/#"
          target="_blank"
          className="footer__item"
        >
          github
        </a>

        <a
          href="/#"
          target="_blank"
          className="footer__item"
        >
          contacts
        </a>

        <a
          href="/#"
          target="_blank"
          className="footer__item"
        >
          rights
        </a>
      </div>

      <div className="footer__back-to-top">
        <p className="footer__text">
          Back to top
        </p>

        <button
          type="button"
          className="button button--small button__nav"
          onClick={scrollToTop}
        >
          <img src="_new/img/icons/arrow-up.svg" alt="Arrow up" />
        </button>
      </div>
    </footer>
  );
};
