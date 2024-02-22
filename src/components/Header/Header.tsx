import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';
import { Navbar } from '../Navbar';
import { MyLogo } from '../UI/MyLogo';
import { MySearch } from '../UI/MySearch';
import { StateContext } from '../../store/State';
import { CategoryName } from '../../types/product';

export const Header = () => {
  const { favoriteProducts, cart } = useContext(StateContext);
  const numberOfFavorite = favoriteProducts.length;
  const productsInCart = cart.length;
  const { pathname } = useLocation();

  return (
    <header className="header" id="top">
      <div className="header__left">
        <MyLogo />
        <Navbar />
      </div>

      <div className="header__right">
        {pathname === '/phones' && (
          <MySearch
            placeholder={CategoryName.phone}
          />
        )}

        <NavLink
          to="/favorite"
          className={({ isActive }) => {
            return classNames(
              'header__link header__link--favorite', {
                'header__link--active': isActive,
              },
            );
          }}
        >
          <img src="img/icons/heart.svg" alt="favorite" />

          {!!numberOfFavorite && (
            <div className="header__counter">{numberOfFavorite}</div>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          state={{ previousPath: pathname }}
          className={({ isActive }) => {
            return classNames(
              'header__link header__link--cart', {
                'header__link--active': isActive,
              },
            );
          }}
        >
          <img src="img/icons/cart.svg" alt="cart" />
          {!!productsInCart && (
            <div className="header__counter">{productsInCart}</div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
