import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';
import { Button } from '../Button/Button';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container container__footer">
        <Link to="/" className="logo footer__logo">
          <img src="img/logo.svg" alt="Logo" />
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

          <Button
            className="button button--small button__nav"
            onClick={scrollToTop}
          >
            <img src="img/icons/arrow-up.svg" alt="Arrow up" />
          </Button>
        </div>
      </div>
    </footer>
  );
};
