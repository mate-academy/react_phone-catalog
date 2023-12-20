import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import { NavBar } from '../NavBar/NavBar';
import { Search } from '../Search/Search';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { ProductsContext } from '../../store/ProductsContext';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { favoriteProducts, cartedProducts } = useContext(ProductsContext);
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

            {favoriteProducts.length > 0 && (
              <div className="header__counter">{favoriteProducts.length}</div>
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
