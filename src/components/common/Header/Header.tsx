import React, { memo } from 'react';

import './Header.scss';
import { Navbar } from '../Navbar/Navbar';
import SquareLink from '../../UI/SquareLink';
import { PAGE } from '../../../definitions/enums/Router';
import SearchField from '../../UI/SearchField';
import { useAppSelector } from '../../../store/redux/hooks';
import { cartSelector } from '../../../store/redux/slices/cartSlice';
import { favoritesSelector } from '../../../store/redux/slices/favoritesSlice';
import { useDirection } from '../../../enhancers/hooks/direction';
import { useDynamicHeader } from '../../../enhancers/hooks/dynamicHeader';

export const Header: React.FC = memo(() => {
  const direction = useDirection();
  const cartIds = useAppSelector(cartSelector.selectStorageProducts);
  const favoritesIds = useAppSelector(favoritesSelector.selectStorageProducts);
  const [headerRef, hideHeader] = useDynamicHeader<HTMLElement>(20, 920);

  return (
    <header className={`header ${hideHeader ? 'header--hidden' : ''}`} ref={headerRef}>
      <Navbar />

      <div className="header__right">
        <SearchField className="header__search" />

        <SquareLink
          nav
          iconName="hearth-empty-icon"
          to={direction(PAGE.Favorites)}
          amount={favoritesIds.length}
          className="header__square-link"
        />

        <SquareLink
          nav
          iconName="shopping-bag-icon"
          to={direction(PAGE.Cart)}
          amount={cartIds.length}
          className="header__square-link"
        />
      </div>
    </header>
  );
});
