/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { PageNavLink } from '../PageNavLink';
import './Nav.scss';

export const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <PageNavLink to="/" text="home" />
        </li>
        <li className="nav__item">
          <PageNavLink to="/phones" text="phones" />
        </li>
        <li className="nav__item">
          <PageNavLink to="/tablets" text="tablets" />
        </li>
        <li className="nav__item">
          <PageNavLink to="/accessories" text="accessories" />
        </li>
      </ul>
    </nav>
  );
};
