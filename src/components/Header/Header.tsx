import { FC, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { SearchBar } from '../SearchBar';
import { FavContext } from '../../context/FavContext';
import { CartContext } from '../../context/CartContext';

type Props = {
  to: string,
  text: string,
};

export const PageNavLink: FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames('header__navlink', {
      'header__navlink--active': isActive,
    })}
  >
    {text}
  </NavLink>
);

export const Header: FC = () => {
  const { favourites } = useContext(FavContext);
  const { cartItems } = useContext(CartContext);
  const { pathname } = useLocation();
  const pageName = pathname.split('/').pop();

  const showSearchbar = ['phones', 'tablets', 'accessories', 'favourites']
    .includes(pageName || '');

  const productsQuantity = cartItems
    .reduce((total, cartItem) => total + cartItem.quantity, 0);

  return (
    <header className="header">
      <div className="header__content header__content--left">
        <Link to="/#" className="logo">
          <img
            src="icons/logo.svg"
            alt="logo"
          />
        </Link>
        <nav className="header__nav">
          <PageNavLink to="/#" text="Home" />
          <PageNavLink to="phones" text="Phones" />
          <PageNavLink to="tablets" text="Tablets" />
          <PageNavLink to="accessories" text="Accessories" />
        </nav>
      </div>
      <div className="header__content header__content--right">
        {showSearchbar && <SearchBar />}
        <NavLink
          to="/favourites"
          className={({ isActive }) => classNames('header__link', {
            'header__link--active': isActive,
          })}
        >
          <img
            className="icon icon--favourites"
            src="icons/favourites.svg"
            alt=""
          />
          {favourites.length > 0 && (
            <div className="header__icon-count">{favourites.length}</div>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => classNames('header__link', {
            'header__link--active': isActive,
          })}
        >
          <img
            className="icon icon--cart"
            src="icons/cart.svg"
            alt="shopping cart"
          />
          {cartItems.length > 0 && (
            <div className="header__icon-count">{productsQuantity}</div>
          )}
        </NavLink>
      </div>
    </header>
  );
};
