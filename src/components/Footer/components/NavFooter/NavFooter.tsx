import React from 'react';
import { NavLink } from 'react-router-dom';

const NavFooter: React.FC = () => {
  return (
    <nav className="menu footer__menu">
      <ul className="menu__list footer__list">
        <li className="menu__item footer__item">
          <NavLink
            to="https://github.com/VadimDrobyazko"
            className="menu__link footer__link"
            target="_blank"
          >
            github
          </NavLink>
        </li>

        <li className="menu__item footer__item">
          <NavLink to="/contacts" className="menu__link footer__link">
            contacts
          </NavLink>
        </li>

        <li className="menu__item footer__item">
          <NavLink to="/rights" className="menu__link footer__link">
            rights
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavFooter;
