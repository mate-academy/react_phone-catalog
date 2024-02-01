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
import { useAppParams } from '../../../enhancers/hooks/appParams';

export const Header: React.FC = memo(() => {
  const { category } = useAppParams();
  const cartIds = useAppSelector(cartSelector.selectIds);
  const favoritesIds = useAppSelector(favoritesSelector.selectIds);
  const { searchVisible } = useContext(SearchContext);

  return (
    <header className="header">
      <Navbar />

      <div className="header__right">
        {searchVisible && <SearchField searchIn={category} />}

        <SquareLink
          nav
          iconName="hearth-empty-icon"
          to={PAGE.Favorites}
          amount={favoritesIds.length}
        />

        <SquareLink
          nav
          iconName="shopping-bag-icon"
          to={PAGE.Cart}
          amount={cartIds.length}
        />
      </div>
    </header>
  );
});
