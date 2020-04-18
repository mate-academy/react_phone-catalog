import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

import './Footer.css';

export const Footer: FC = () => (
  <footer className="footer__nav nav">
    <div className="nav__logo">
      <NavLink
        to="/"
        className="logo header__logo"
        exact
      >
        Phone
        <br />
        <span>
          catalog
        </span>
      </NavLink>
    </div>
    <div>
      <a
        href="https://github.com/LutsenkoAnV/react_phone-catalog"
        className="footer__link"
      >
        Github
      </a>
      <a
        href="https://www.linkedin.com/in/andrii-lutsenko-41b712160"
        className="footer__link"
      >
        Contacts
      </a>
    </div>
    <div className="footer__go-top">
      <p className="go-top__title">Back to top</p>
      <Link to="top" offset={-64} className="go-top__button" />
    </div>
  </footer>
);
