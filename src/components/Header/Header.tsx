import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import classNames from '../../utils/classNames';
import { Logo } from '../Logo';
import { NavMenu } from '../NavMenu';
import { IconButton } from '../IconButton';
import { BurgerMenu } from '../BurgerMenu';
import './Header.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favourites, cartQuantity } = useShop();

  return (
    <header className="header">
      <div className="header__side">
        <Link to="/" className="header__logo">
          <Logo />
        </Link>

        <div className="header__nav">
          <NavMenu variant="horizontal" />
        </div>
      </div>

      <div className="header__actions">
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames('header__action', { 'header__action--active': isActive })
          }
        >
          <IconButton
            icon="heart"
            variant="plain"
            ariaLabel="Favourites"
            badge={favourites.length}
          />
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames('header__action', 'header__action--last', {
              'header__action--active': isActive,
            })
          }
        >
          <IconButton
            icon="cart"
            variant="plain"
            ariaLabel="Cart"
            badge={cartQuantity}
          />
        </NavLink>

        <div className="header__burger">
          <IconButton
            icon="burger"
            variant="plain"
            ariaLabel="Open menu"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {isMenuOpen && <BurgerMenu onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
};
