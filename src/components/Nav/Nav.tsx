import React from 'react';
import './Nav.scss';
import { PageNavLink } from '../PageNavLink/PageNavLink';

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
