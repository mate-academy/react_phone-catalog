import React from 'react';
import { NavLink } from 'react-router-dom';
import { headerLinks } from '../../helpers/config';

import './Navbar.scss';


export const Navbar: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {headerLinks.map(({ name, url, exact }) => {
          return (
            <li className="nav__item" key={name}>
              <NavLink
                to={url}
                className="nav__link"
                exact={exact}
                activeClassName="nav__link--active"
              >
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
