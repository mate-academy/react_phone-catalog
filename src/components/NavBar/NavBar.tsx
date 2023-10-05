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
          to="/"
          className={`navbar__item ${location.pathname === '/'
            ? 'navbar__item' : ''}`}
        >
          home
        </NavLink>

        <NavLink
          to="/phones"
          className={`navbar__item ${location.pathname === '/phones'
            ? 'navbar__item' : ''}`}
        >
          phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={`navbar__item ${location.pathname === '/tablets'
            ? 'navbar__item' : ''}`}
        >
          tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={`navbar__item ${location.pathname === '/accessories'
            ? 'navbar__item' : ''}`}
        >
          accessories
        </NavLink>
      </ul>

      <div className="navbar__icons">
        {showSearch && <Search />}
        <Link
          to="/favourite"
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
          to="/cart"
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
