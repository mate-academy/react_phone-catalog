import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from './../../helpers/constants';
import { Logo } from '../SvgSprite/SvgSprite';

export const Nav = () => {
  return (
    <nav className="header_nav nav">

      <NavLink to="/" className="header_logo" exact>
        <Logo />
      </NavLink>

      <ul className="header_nav-list  nav__list">
        {navLinks.map(link => (
          <li className="nav__item"
            key={link.title}
          >
            <NavLink to={link.path}
              className="nav__link">
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
