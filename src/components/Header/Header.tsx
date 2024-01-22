import React, { memo } from 'react';

import './Header.scss';
import { Navbar } from '../Navbar/Navbar';
import SquareLink from '../../UI/SquareLink';
import { PAGE } from '../../constants/Router';
import SearchField from '../../UI/SearchField';

export const Header: React.FC = memo(() => {
  return (
    <header className="header">
      <Navbar />

      <div className="header__right">
        <SearchField />

        <SquareLink iconName="hearth-empty-icon" to={PAGE.Favorites} />

        <SquareLink iconName="shopping-bag-icon" to={PAGE.Cart} />
      </div>
    </header>
  );
});
