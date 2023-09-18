import React from 'react';

import './Navigation.scss';
import { PageNavLink } from '../PageNavLink';

export const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <PageNavLink path="/" text="Home" />
        </li>

        <li className="nav__item">
          <PageNavLink path="/phones" text="Phones" />
        </li>

        <li className="nav__item">
          <PageNavLink path="/tablets" text="Tablets" />
        </li>

        <li className="nav__item">
          <PageNavLink path="/accessories" text="Accessories" />
        </li>
      </ul>
    </nav>
  );
};
