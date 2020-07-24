import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';
import Logo from '../Logo/Logo';

const Navigation = () => {
  const navItems = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <nav className="nav">

      <ul className="nav__list">
        <Logo />
        {navItems.map(item => (
          <li key={item}>
            <NavLink
              to={`/${item}`}
              // key={item}
              className="nav__item"
              activeClassName="nav__item--active"
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
