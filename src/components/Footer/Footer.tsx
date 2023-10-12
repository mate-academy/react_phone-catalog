/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import { ReactSVG } from 'react-svg';

import { Logo } from '../Logo';
import { handleScrollToTop } from './utils';

import './footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <Logo />

          <ul className="footer__links">
            <li className="footer__item">
              <a
                href="https://github.com/artem-ivashchenko/react_phone-catalog"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__item">
              <a href="/" className="footer__link">
                Contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="/" className="footer__link">
                Rights
              </a>
            </li>
          </ul>

          <div className="footer__back-to-top">
            <label htmlFor="back-to-top" className="footer__back-text">
              Back to top
            </label>

            <button
              type="button"
              className="footer__back-button"
              aria-label="back-to-top"
              id="back-to-top"
              onClick={handleScrollToTop}
            >
              <ReactSVG src="img/icons/ArrowUp.svg" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
