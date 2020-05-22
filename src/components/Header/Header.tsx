import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { Icon } from '../Icon';
import { sectionLinks } from '../../helpers';

export const Header = () => (
  <header className="Header" id="top">
    <Link to="/" className="Header__Logo">
      <img src="./images/logo.svg" alt="Logo" />
    </Link>
    <Nav links={sectionLinks} />
    <Search />
    <Link to="/favorites" className="Header__Button">
      <Icon
        name="favorites"
        tag={7}
        size={2}
        border={0}
        inActive={false}
      />
    </Link>
    <Link to="/cart" className="Header__Button">
      <Icon
        name="shopping-bag"
        size={2}
        border={0}
        inActive={false}
      />
    </Link>
  </header>
);
