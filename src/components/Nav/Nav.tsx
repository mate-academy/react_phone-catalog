import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Nav: FC = () => (
  <>
    <nav className="nav">
      <NavLink
        to="/"
        exact
        className="nav__link"
        activeClassName="link-active"
      >

        Home
      </NavLink>

      <NavLink
        to="/phones"
        exact
        className="nav__link"
        activeClassName="link-active"
      >

        Phones
      </NavLink>

      <NavLink
        to="/tablets"
        exact
        className="nav__link"
        activeClassName="link-active"
      >

        Tablets
      </NavLink>

      <NavLink
        to="/accessories"
        exact
        className="nav__link"
        activeClassName="link-active"
      >

        Accessories
      </NavLink>
    </nav>
  </>
);
