import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { BurgerMenu } from '../BurgerMenu';

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <header className="header">
        <img
          className="header__logo"
          src="/img/logo-img.svg"
          alt="logo image"
        />
        <div className="header__container">
          <nav className="header__nav">
            <Link to="/" className="header__link header__link--home">
              HOME
            </Link>
            <Link to="/phones" className="header__link">
              PHONES
            </Link>
            <Link to="tablets" className="header__link">
              TABLETS
            </Link>
            <Link to="/accessories" className="header__link">
              ACCESSORIES
            </Link>
          </nav>

          <div className="header__button">
            <Link to="/favourites" className="header__button-link">
              <img src="/img/icons/icon-favourites.svg" alt="favourites" />
            </Link>
            <Link to="/cart" className="header__button-link">
              <img src="/img/icons/icon-cart.svg" alt="cart" />
            </Link>
          </div>
        </div>
        <button
          className="burger-button"
          aria-label="Toggle menu"
          onClick={handleOpenMenu}
        >
          {open ? (
            <img src="/img/icons/close-menu.svg" alt="close burger menu" />
          ) : (
            <img src="/img/icons/menu.svg" alt="burger menu" />
          )}
        </button>
      </header>
      {open && <BurgerMenu setOpen={setOpen} />}
    </>
  );
};
