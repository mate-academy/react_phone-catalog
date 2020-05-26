import React, { useContext } from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

import './Header.scss';
import { FavoritesContext } from '../Favorites';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { Icon } from '../Icon';
import { SECTION_LINK } from '../../helpers';

export const Header = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
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
          tag={favorites.length}
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
  )
};
