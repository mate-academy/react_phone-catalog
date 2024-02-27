// import React from 'react';
import Logo from '../img/logo.svg';
import Back from '../img/Slider button right.png';

/* eslint-disable jsx-a11y/anchor-is-valid */

export const Footer = () => {
  return (
    <footer className="footer">
      <a href="#">
        <img src={Logo} className="footer__logo" alt="logo" />
      </a>
      <nav className="nav nav-footer">
        <ul className="nav__list nav-footer__list">
          <li className="nav__list__row">
            <a
              href="https://github.com/OleksChernikov"
              target="_blank"
              className="nav__list__row__link"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://github.com/OleksChernikov"
              target="_blank"
              className="nav__list__row__link"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>
          <li>
            <a
              href="https://github.com/OleksChernikov"
              target="_blank"
              className="nav__list__row__link"
              rel="noreferrer"
            >
              rights
            </a>
          </li>
        </ul>
      </nav>
      <a
        href=""
        className="footer__link"
      >
        {' '}
        Back to top
        <img
          src={Back}
          className="footer__link-icon"
          alt="icon"
        />
      </a>
    </footer>
  );
};
