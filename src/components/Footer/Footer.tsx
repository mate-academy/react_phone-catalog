import React from 'react';
import './Footer.scss';
import { getAssetPath } from '../getAssetPath';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={`footer ${className || ''}`}>
      <div className="footer__container">
        <a href="#/" className="footer__logo-link">
          <div className="footer__logo">
            NICE
            <img src="./img/Finger.png" alt="Finger" className="footer__icon" />
            <br />
            GADGETS
          </div>
        </a>

        <nav className="footer__nav">
          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                GITHUB
              </a>
            </li>
            <li className="footer__item">
              <a href="#/contacts" className="footer__link">
                CONTACTS
              </a>
            </li>
            <li className="footer__item">
              <a href="#/rights" className="footer__link">
                RIGHTS
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__back-to-top">
          <span className="footer__back-text">Back to top</span>
          <button
            type="button"
            className="footer__back-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img
              src={getAssetPath('img/VectorTop.svg')}
              alt="Arrow up"
              className="footer__back-icon"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
