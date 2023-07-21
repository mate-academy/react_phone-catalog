import { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { SearchBar } from '../SearchBar';

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
  const { pathname } = useLocation();

  const showSearchbar = pathname !== '/' && pathname !== '/cart';

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
        <Link to="/#favourites" className="header__link">
          <img
            className="icon icon--favourites"
            src="icons/favourites.svg"
            alt=""
          />
        </Link>
        <Link to="/#cart" className="header__link">
          <img
            className="icon icon--cart"
            src="icons/cart.svg"
            alt="shopping cart"
          />
        </Link>
      </div>
    </header>
  );
};
