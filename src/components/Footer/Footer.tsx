import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="container footer__container">
        <Link
          to="/"
          className="logo"
        >
          <img
            src="./assets/logo.svg"
            alt="logo"
            className="logo__image"
          />
        </Link>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <a
                href="https://github.com/savchuksavchuk"
                className="nav__link"
              >
                Github
              </a>
            </li>
            <li className="nav__item">
              <a
                href="/contacts"
                className="nav__link"
              >
                Contacts
              </a>
            </li>
            <li className="nav__item">
              <a
                href="/rights"
                className="nav__link"
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>
        <div className="footer__back">
          <span className="text__small
            text__small--secondary
            footer__back-text"
          >
            Back to top
          </span>
          <button
            type="button"
            className="button footer__button"
            onClick={() => goToTop()}
          >
            <img src="./assets/arrow-top.svg" alt="arrow-top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
