import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <ul className="nav">
        <li className="nav__item">
          <NavLink className="nav__link hover-shadow hover-color animated" to="/" exact>
            <span>H</span>
            <span>o</span>
            <span>m</span>
            <span>e</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link hover-shadow hover-color animated" to="/phones">
            <span>P</span>
            <span>h</span>
            <span>o</span>
            <span>n</span>
            <span>e</span>
            <span>s</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link hover-shadow hover-color animated" to="/tablets">
            <span>T</span>
            <span>a</span>
            <span>b</span>
            <span>l</span>
            <span>e</span>
            <span>t</span>
            <span>s</span>
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link hover-shadow hover-color animated" to="/accessories">
            <span>A</span>
            <span>c</span>
            <span>c</span>
            <span>e</span>
            <span>s</span>
            <span>s</span>
            <span>o</span>
            <span>r</span>
            <span>i</span>
            <span>e</span>
            <span>s</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Nav;
