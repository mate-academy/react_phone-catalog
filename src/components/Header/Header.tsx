import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MainNav } from '../MainNav';
import './Header.scss';
import { getCart } from '../../api/cart';
import { getFavourites } from '../../api/favourites';

type Props = {
  openMenu: () => void;
};

export const Header: React.FC<Props> = ({ openMenu }) => {
  const [cartCount, setCartCount] = useState(0);
  const [favouritesCount, setFavouritesCount] = useState(0);

  const buttonClass = (props: { isActive: boolean }) =>
    classNames('header__button', {
      'header__button--selected': props.isActive,
    });

  const updateCart = () => {
    setCartCount(getCart().length);
  };

  const updateFavourites = () => {
    setFavouritesCount(getFavourites().length);
  };

  useEffect(() => {
    updateCart();
    updateFavourites();

    const handler = (event: StorageEvent) => {
      if (event.storageArea === localStorage) {
        updateCart();
        updateFavourites();
      }
    };

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <img src="logo.svg" alt="Logo" className="header__logo" />

        <div className="header__nav">
          <MainNav />
        </div>
      </div>

      <div className="header__buttons">
        <NavLink className={buttonClass} to="/favourites">
          <div className="header__button-container">
            <img src="icons/favourite.svg" alt="Favourite icon" />
            {!!favouritesCount && (
              <div className="header__button-count">{favouritesCount}</div>
            )}
          </div>
        </NavLink>

        <NavLink className={buttonClass} to="/cart">
          <div className="header__button-container">
            <img src="icons/cart.svg" alt="Cart icon" />

            {!!cartCount && (
              <div className="header__button-count">{cartCount}</div>
            )}
          </div>
        </NavLink>
      </div>

      <div className="header__buttons header__buttons-mobile">
        <div className="header__button" onClick={openMenu}>
          <img src="icons/menu.svg" alt="Burger menu icon" />
        </div>
      </div>
    </header>
  );
};
