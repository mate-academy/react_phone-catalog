import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MainNav } from '../MainNav';
import './Header.scss';

type Props = {
  openMenu: () => void;
};

export const Header: React.FC<Props> = ({ openMenu }) => {
  const buttonClass = (props: { isActive: boolean }) =>
    classNames('header__button', {
      'header__button--selected': props.isActive,
    });

  return (
    <header className="header">
      <div className="header__left">
        <img src="/logo.svg" alt="Logo" className="header__logo" />

        <div className="header__nav">
          <MainNav />
        </div>
      </div>

      <div className="header__buttons">
        <NavLink className={buttonClass} to="/favourites">
          <img src="/icons/favourite.svg" alt="Favourite icon" />
        </NavLink>

        <NavLink className={buttonClass} to="/cart">
          <img src="/icons/cart.svg" alt="Cart icon" />
        </NavLink>
      </div>

      <div className="header__buttons header__buttons-mobile">
        <div className="header__button" onClick={openMenu}>
          <img src="/icons/menu.svg" alt="Burger menu icon" />
        </div>
      </div>
    </header>
  );
};
