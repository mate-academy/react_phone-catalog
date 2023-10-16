import React from 'react';
import classNames from 'classnames';

import './Navigation.scss';
import { PageNavLink } from '../PageNavLink';

type Props = {
  isOpen: boolean,
};

export const Navigation: React.FC<Props> = ({ isOpen }) => {
  return (
    <nav className={classNames('nav', {
      'nav--open': isOpen,
    })}
    >
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
