import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import classNames from 'classnames';
import { Nav } from '../Nav/Nav';
import { useAppSelector } from '../../app/hooks';
import { Search } from '../Search/Search';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('header__icon', { activeLink: isActive });
};

export const Header: React.FC = () => {
  const { cart, favorites } = useAppSelector(store => store);

  const isPhonesUrl = useMatch('phones');
  const isTablets = useMatch('tablets');
  const isAccessories = useMatch('accessories');
  const isFavoritesUrl = useMatch('favorites');
  const isCartsUrl = useMatch('cart');

  const showSearch = isPhonesUrl
    || isAccessories
    || isFavoritesUrl
    || isTablets;

  const totalItems = cart.reduce((accumulator, currentProduct) => {
    if (currentProduct.amount !== undefined) {
      return accumulator + currentProduct.amount;
    }

    return 0;
  }, 0);

  return (
    <header className="header">
      <div className="header__container">
        <div className="logo header__logo">
          <NavLink to="/" className="logo__link">
            <img
              src="./images/LOGO.svg"
              alt="logo"
              className="logo__img"
            />
          </NavLink>
        </div>
        {!isCartsUrl && (
          <div className="header__navigation">
            <Nav />
          </div>
        )}
      </div>

      <div className="header__action">
        {showSearch && (
          <Search />
        )}

        {!isCartsUrl && (
          <NavLink to="/favorites" className={getLinkClass}>
            <img
              src="./images/icons/Favourites.svg"
              alt="favorite"
              className="icon"
            />
            {!!favorites.length && (
              <div className="header__iconRed">{favorites.length}</div>
            )}
          </NavLink>
        )}

        <NavLink to="/cart" className={getLinkClass}>
          <img
            src="./images/icons/Shopping.svg"
            alt="cart"
            className="icon"
          />

          {!!cart.length && (
            <div className="header__iconRed">{totalItems}</div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
