import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <NavLink
            to="/home"
            className="footer__logo-link"
          />
        </div>
        <ul className="footer__nav-list">
          <li className="footer__nav-item">
            <NavLink
              to="/home"
              className="footer__nav-link"
            >
              Github
            </NavLink>
          </li>

          <li className="footer__nav-item">
            <NavLink
              to="/home"
              className="footer__nav-link"
            >
              Contacts
            </NavLink>
          </li>

          <li className="footer__nav-item">
            <NavLink
              to="/home"
              className="footer__nav-link"
            >
              Rights
            </NavLink>
          </li>
        </ul>
        <div className="footer__anchor">
          <a href="#top" className="footer__anchor-link">
            Back to top
            <div
              className="footer__anchor-button"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
