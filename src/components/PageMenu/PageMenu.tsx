import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import classNames from 'classnames';

import './pageMenu.scss';
import cartIcon from '../../img/cart.svg';
import favoriteIcon from '../../img/favourites.svg';
import { ProductsContext } from '../ProductsContext/ProductsContext';

export const PageMenu = () => {
  const location = useLocation();
  const { favoriteProducts, cartProducts } = useContext(ProductsContext);

  return (
    <div className="page-menu">
      <nav className="page-menu__wrapper">
        <NavLink
          to="/"
          className={classNames('page-menu__link', {
            'page-menu__link--active': location.pathname === '/',
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={classNames('page-menu__link', {
            'page-menu__link--active': location.pathname === '/phones',
          })}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={classNames('page-menu__link', {
            'page-menu__link--active': location.pathname === '/tablets',
          })}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={classNames('page-menu__link', {
            'page-menu__link--active': location.pathname === '/accessories',
          })}
        >
          Accessories
        </NavLink>
      </nav>

      <div className="page-menu__actions">
        <NavLink
          to="/favorites"
          className={classNames('page-menu__nav-link  page-menu__favorites', {
            'header__favorites--active': location.pathname === '/favorites',
          })}
        >
          <img
            className="header__icon"
            src={favoriteIcon}
            alt="favorite-icon"
          />
          {favoriteProducts.length > 0 && (
            <span className="page-menu__checkedProduct">
              {favoriteProducts.length}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={classNames('page-menu__nav-link  page-menu__cart', {
            'header__cart--active': location.pathname === '/cart',
          })}
        >
          <img className="header__icon" src={cartIcon} alt="cart-icon" />
          {cartProducts.length > 0 && (
            <span className="page-menu__checkedProduct">
              {cartProducts.length}
            </span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
