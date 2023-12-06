/* eslint-disable react/button-has-type */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  const handleTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="main__footer footer">
      <div className="container">
        <div className="footer__content">
          <NavLink
            className="footer__logo-link"
            to="/"
          >
            <div className="footer__logo icon-logo" />
          </NavLink>

          <nav className="footer__social-links">
            <a
              href="https://github.com/ydem1"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Git hub
            </a>

            <a
              href="https://github.com/ydem1"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Contacts
            </a>

            <a
              href="https://github.com/ydem1"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Rights
            </a>
          </nav>

          <div className="footer__wrapper-top-btn">
            <p className="footer__top-btn-label">Back to top</p>
            <button
              className="footer__top-btn button"
              onClick={handleTopButton}
            >
              <div
                className="icon icon__arrow-primary icon__arrow-primary--top"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
