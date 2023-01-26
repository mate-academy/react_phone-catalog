import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/" className="logo">
            <img src="img/main-logo/logo.svg" alt="" />
          </Link>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a
                  href="https://github.com/eugenekh81/react_phone-catalog"
                  className="nav__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="https://github.com/eugenekh81"
                  className="nav__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contacts
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="https://github.com/eugenekh81"
                  className="nav__link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rights
                </a>
              </li>
            </ul>
          </nav>

          <div
            className="footer__buttons buttons"
          >
            <label
              className="buttons__text"
            >
              Back to top
              <input
                aria-label="backToTopBtn"
                type="button"
                className="button button--up"
                onClick={() => window.scrollTo({
                  top: 0, left: 0, behavior: 'smooth',
                })}
              />
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
};
