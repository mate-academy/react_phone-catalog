import React, { memo, useContext } from 'react';

import './Header.scss';
import { Navbar } from '../Navbar/Navbar';
import SquareLink from '../../UI/SquareLink';
import { PAGE } from '../../../definitions/enums/Router';
import SearchField from '../../UI/SearchField';
import { SearchContext } from '../../../store/contexts/SearchContext';
import { useAppSelector } from '../../../store/redux/hooks';
import { cartSelector } from '../../../store/redux/slices/cartSlice';
import { favoritesSelector } from '../../../store/redux/slices/favoritesSlice';
import { useDirection } from '../../../enhancers/hooks/direction';

export const Header: React.FC = memo(() => {
  const direction = useDirection();
  const cartIds = useAppSelector(cartSelector.selectStorageProducts);
  const favoritesIds = useAppSelector(favoritesSelector.selectStorageProducts);
  const { searchVisible, searchIn } = useContext(SearchContext);

  return (
    <header className="header">
      <Navbar />

      <div className="header__right">
        {searchVisible && <SearchField searchIn={searchIn} />}

        <SquareLink
          nav
          iconName="hearth-empty-icon"
          to={direction(PAGE.Favorites)}
          amount={favoritesIds.length}
        />

        <SquareLink
          nav
          iconName="shopping-bag-icon"
          to={direction(PAGE.Cart)}
          amount={cartIds.length}
        />
      </div>
    </header>
  );
});
