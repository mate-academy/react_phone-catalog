import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { useAppSelector } from '../../store/hooks';

export const Header: React.FC = () => {
  const cartedProducts = useAppSelector(state => state.cartedProducts);
  const favouriteProducts = useAppSelector(state => state.favouriteProducts);
  const { pathname } = useLocation();
  const curPage = pathname.split('/')[1];
  const shouldSearch = curPage === 'phones'
    || curPage === 'tablets'
    || curPage === 'accessories'
    || curPage === 'favorites';

  const headerLinks = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <header className="header" id="top">
      <div className="header__content">
        <div className="header__left">
          <Link className="header__logo" to="/" />

          <NavBar links={headerLinks} />
        </div>

        <div className="header__icons">
          {shouldSearch && (<Search page={curPage} />)}

          <div className="header__link">
            <ButtonIcon
              type="link"
              shape="heart"
              path="favourites"
              dynamicClasses={['shadow', 'big']}
            />

            {favouriteProducts.length > 0 && (
              <div className="header__counter">{favouriteProducts.length}</div>
            )}
          </div>

          <div className="header__link">
            <ButtonIcon
              type="link"
              shape="cart"
              path="cart"
              dynamicClasses={['shadow', 'big']}
            />

            {cartedProducts.length > 0 && (
              <div className="header__counter">{cartedProducts.length}</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
