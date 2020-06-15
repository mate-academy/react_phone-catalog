import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import '../../commonStyles/Link.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img
          src="./img/icons/header/LOGO.png"
          alt="logo"
        />
      </div>
      <ul className="footer__link-list link__list">
        <li className="link__item">
          <NavLink
            to="/"
            className="link__routing-link"
          >
            github
          </NavLink>
        </li>
        <li className="link__item">
          <NavLink
            to="/phones"
            className="link__routing-link"
          >
            contacts
          </NavLink>
        </li>
        <li className="link__item">
          <NavLink
            to="/tablets"
            className="link__routing-link"
          >
            rights
          </NavLink>
        </li>
      </ul>
      <div className="footer__button-wrapper">
        <span className="footer__button-description">
          Back to top
        </span>
        <button
          type="button"
          className="footer__button"
        >
          <span className="footer__button-content">
            <img
              src="./img/icons/Footer/Vector (Stroke).png"
              alt="arrow"
            />
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
