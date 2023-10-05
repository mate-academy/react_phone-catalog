import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { BackToTopButton } from './BackToTop';
import './Footer.scss';

const gitHubLink = 'https://github.com/ZadorozhnyiYevhenii';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Logo />

      <nav className="footer__nav">
        <ul className="footer__list">
          <NavLink
            to={gitHubLink}
            className="footer__item"
          >
            github
          </NavLink>
          <NavLink
            to="/contacts"
            className="footer__item"
          >
            contacts
          </NavLink>
          <NavLink
            to="/rights"
            className="footer__item"
          >
            rights
          </NavLink>
        </ul>
      </nav>

      <div className="footer_button">
        <BackToTopButton />
      </div>
    </footer>
  );
};
