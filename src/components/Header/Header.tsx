import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import './Header.scss';
import { Search } from '../Search';
import { FavContext } from '../../context/FavContext';
import { Counter } from '../Counter/Counter';
import { CartContext } from '../../context/CartContext';
import favIcon from '../../images/icons/Favourites.svg';
import cartIcon from '../../images/icons/Shopping_cart.svg';

const getClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('Navbar__button', {
    'Navbar__button--active': isActive,
  });
};

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { fav } = useContext(FavContext);
  const { cart } = useContext(CartContext);

  return (
    <div className="Header">
      <div className="Header__content">
        <div className="Header__logo-and-nav">
          <Logo />
          <Navbar />
        </div>

        <div className="Header__fav-and-cart">
          {(pathname === '/phones'
            || pathname === '/tablets'
            || pathname === '/accessories'
            || pathname === '/favorites') && (
            <Search />
          )}
          <NavLink
            to="/favorites"
            className={getClassName}
          >
            <div className="Action">
              <img
                src={favIcon}
                alt="Favorites"
                className="Action__img"
              />
              {!!fav.length && (
                <Counter count={fav.length} />
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={getClassName}
          >
            <div className="Action">
              <img
                src={cartIcon}
                alt="Shopping cart"
                className="Action__img"
              />
              {!!cart.length && (
                <Counter count={cart.length} />
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
