import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <ul className="footer__links">
      <li>
        <NavLink
          to="/"
          exact
          className="footer__link"
        >
          Home
        </NavLink>
      </li>

      <li>© Created by Alice Vitchenko</li>

      <li>
        <NavLink
          to={{
            pathname: '/phones',
            search: 'page=1&perPage=8&sort=age',
          }}
          exact
          className="footer__link"
        >
          Phones
        </NavLink>
      </li>
    </ul>
  </footer>
);

export default Footer;
