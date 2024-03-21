import React, { useContext } from 'react';
import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Navigation } from './Navigation';
import { FavCart } from './FavCart';
import { Search } from './Search';

import '../styles/Header.scss';
import '../styles/logo.scss';
import { GlobalContext } from '../GlobalContext';

export const Header: React.FC = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();
  const { isBurgerMenu, setIsBurgerMenu } = useContext(GlobalContext);

  const isHomeOrIsCart = pathname === '/cart' || pathname === '/';
  const isSearch = !isHomeOrIsCart && !productId;

  const switchBurgerButton = (isBurger: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isBurger ? setIsBurgerMenu(false) : setIsBurgerMenu(true);
  };

  return (
    <header className="header" id="header">
      <div className="header__left-block">
        <Link to="/" className="logo" onClick={() => setIsBurgerMenu(false)} />

        <div className="header__nav">
          <Navigation />
        </div>
      </div>

      <div className="header__right-block">
        <div className="header__fav-cart-search">
          {isSearch && <Search />}

          <FavCart />
        </div>

        <div className="header__burger">
          {/* eslint-disable-next-line */}
          <button
            type="button"
            className={cn('header__burger-button', {
              'header__burger-button--active': isBurgerMenu,
            })}
            onClick={() => switchBurgerButton(isBurgerMenu)}
          />
        </div>
      </div>
    </header>
  );
};
