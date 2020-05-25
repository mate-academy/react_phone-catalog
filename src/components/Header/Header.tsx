import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

import './Header.scss';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { Icon } from '../Icon';
import { SECTION_LINK } from '../../helpers';

export const Header = () => (
  <header className="Header" id="top">
    <Link to="/" className="Header__Logo">
      <img src="./img/logo.svg" alt="Logo" />
    </Link>
    <NavLink
      to="/"
      exact
      className="Nav__Link"
      activeClassName="Nav__Link--active"
    >
      Home
    </NavLink>
    <Nav links={SECTION_LINK} />
    <Route path="/:section" exact component={Search} />
    <Link to="/favorites" className="Header__Button">
      <Icon
        name="favorites"
        tag={7}
        border={false}
        inActive={false}
      />
    </Link>
    <Link to="/cart" className="Header__Button">
      <Icon
        name="shopping-bag"
        border={false}
        inActive={false}
      />
    </Link>
  </header>
);
