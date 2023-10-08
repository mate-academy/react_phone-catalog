import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './NavBar.scss';
import { Search } from '../Search/Search';
import { CartContext } from '../../context/CartContext';
import { FavouriteContext } from '../../context/FavouriteContext';

const locationsForSearching = [
  '/phones',
  '/tablets',
  '/accessories',
  '/favourite',
];

export const NavBar: React.FC = () => {
  const location = useLocation();
  const { productsInCart } = useContext(CartContext);
  const { favouriteProducts } = useContext(FavouriteContext);

  const favouritesQuantity = useMemo(() => {
    return favouriteProducts.length;
  }, [favouriteProducts]);

  const cartQuantity = useMemo(() => {
    return productsInCart.length - 1;
  }, [productsInCart]);

  const showSearch = locationsForSearching.some(
    current => current === location.pathname,
  );

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <Logo />

        <NavLink
          to="/react_phone-catalog"
          className={`navbar__item navbar__item--home ${location.pathname === '/react_phone-catalog'
            ? 'navbar__item--active' : ''}`}
        >
          home
        </NavLink>

        <NavLink
          to="/react_phone-catalog/phones"
          className={`navbar__item ${location.pathname === '/react_phone-catalog/phones'
            ? 'navbar__item--active' : ''}`}
        >
          phones
        </NavLink>

        <NavLink
          to="/react_phone-catalog/tablets"
          className={`navbar__item ${location.pathname === '/react_phone-catalog/tablets'
            ? 'navbar__item--active' : ''}`}
        >
          tablets
        </NavLink>

        <NavLink
          to="/react_phone-catalog/accessories"
          className={`navbar__item ${location.pathname === '/react_phone-catalog/accessories'
            ? 'navbar__item--active' : ''}`}
        >
          accessories
        </NavLink>
      </ul>

      <div className="navbar__icons">
        {showSearch && <Search />}
        <Link
          to="/react_phone-catalog/favourite"
          className="navbar__icon"
        >
          <div className="navbar__icon--favourite">
            <span className={cn('navbar__quantity', {
              active: favouritesQuantity > 0,
            })}
            >
              {favouritesQuantity}
            </span>
          </div>
        </Link>

        <Link
          to="/react_phone-catalog/cart"
          className="navbar__icon"
        >
          <div className="navbar__icon--cart">
            <span className={cn('navbar__quantity', {
              active: cartQuantity > 0,
            })}
            >
              {cartQuantity}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
