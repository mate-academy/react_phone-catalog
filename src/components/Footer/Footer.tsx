import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

const goToTop = () => {
  return window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: React.FC = () => (
  <div className="Footer">
    <div className="container">
      <div className="Footer__content">
        <div className="Footer__logo">
          <Logo />
        </div>

        <nav className="Footer__nav">
          <ul className="Footer__nav-list">
            <li className="Footer__nav-item">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                className="Footer__nav-link"
              >
                Github
              </a>
            </li>
            <li className="Footer__nav-item">
              <Link to="/contacts" className="Footer__nav-link">
                Contacts
              </Link>
            </li>
            <li className="Footer__nav-item">
              <Link to="/rigths" className="Footer__nav-link">
                Rights
              </Link>
            </li>
          </ul>
        </nav>

        <div className="Footer__button">
          <p className="Footer__button-text">
            Back to top
          </p>
          <button
            type="button"
            className="button button--back-to-top"
            onClick={goToTop}
            aria-label="Back to top"
          />
        </div>
      </div>
    </div>
  </div>
);
