import React, { memo, useContext } from 'react';

import './Header.scss';
import { Navbar } from '../Navbar/Navbar';
import SquareLink from '../../UI/SquareLink';
import { PAGE } from '../../../definitions/enums/Router';
import SearchField from '../../UI/SearchField';
import { SearchContext } from '../../../store/contexts/SearchContext';

export const Header: React.FC = memo(() => {
  const { searchVisible } = useContext(SearchContext);

  return (
    <header className="header">
      <Navbar />

      <div className="header__right">
        {searchVisible && <SearchField />}

        <SquareLink iconName="hearth-empty-icon" to={PAGE.Favorites} />

        <SquareLink iconName="shopping-bag-icon" to={PAGE.Cart} />
      </div>
    </header>
  );
});
