import React, { useEffect } from 'react';
import {
  NavLink,
  Link,
  Routes,
  Route,
} from 'react-router-dom';
import { Nav } from './Nav';
import { Search } from '../Search/Search';

import {
  ReactComponent as FavouritesIcon,
} from '../../icons/favourites-icon.svg';
import { ReactComponent as CartIcon } from '../../icons/cart-icon.svg';
import { ReactComponent as Logo } from '../../icons/Logo.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getProductsAction } from '../../redux/reducers/actionCreators';
import { ProductItem } from '../../types/ProductItem';
import { CartList } from '../../types/CartList';
import { loadFavourites } from '../../redux/reducers/favouritesSlice';
import { loadCart } from '../../redux/reducers/cartSlice';
import './header.scss';

export const Header: React.FC = () => {
  const { favourites } = useAppSelector(state => state.favourites);
  const { cart } = useAppSelector(state => state.cart);
  const cartCount = cart.reduce((prev, current) => prev + +current.count, 0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
    const favouriteValue: string | null = localStorage.getItem('favourite');
    const parsedFavourite: ProductItem[] | [] = favouriteValue
      ? JSON.parse(favouriteValue)
      : [];

    const cartValue: string | null = localStorage.getItem('cart');
    const parsedCart: CartList[] | [] = cartValue
      ? JSON.parse(cartValue)
      : [];

    dispatch(loadFavourites(parsedFavourite));
    dispatch(loadCart(parsedCart));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <Logo />
      </Link>
      <Nav />

      <Routes>
        <Route
          path="/favourites"
          element={<Search placeholder="Search in favourites..." />}
        />
        <Route
          path="/phones"
          element={<Search placeholder="Search in phones..." />}
        />
        <Route
          path="/tablets"
          element={<Search placeholder="Search in tablets..." />}
        />
        <Route
          path="/accessories"
          element={<Search placeholder="Search in accessories..." />}
        />
      </Routes>

      <NavLink
        to="/favourites"
        className={({ isActive }) => (isActive
          ? 'header__favourites active-link'
          : 'header__favourites'
        )}
      >
        <FavouritesIcon />
        {favourites.length > 0 && (
          <span className="header__favouritesCount">
            {favourites.length}
          </span>
        )}
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive
          ? 'header__cart active-link'
          : 'header__cart'
        )}
      >
        <CartIcon />
        {cart.length > 0 && (
          <span className="header__cartCount">
            {cartCount}
          </span>
        )}
      </NavLink>
    </div>
  );
};
