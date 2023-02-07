import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
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
          <a href="#header" className="button footer__button">
            <img src="./assets/arrow-top.svg" alt="arrow-top" />
          </a>
        </div>
      </div>
    </footer>
  );
};
