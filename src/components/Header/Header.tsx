import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import {
  bagImg,
  closeImg,
  favouritesImg,
  logoImg,
  menuImg,
} from '../../utils/indes';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { StateProduct } from '../../context/ProductContext';

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const getStylelinkNav = ({ isActive }: { isActive: boolean }) => {
  return classNames('nav__link', {
    ['activeHeader']: isActive,
  });
};

const getStylelinkActions = ({ isActive }: { isActive: boolean }) => {
  return classNames('actions__link', {
    ['activeHeader']: isActive,
  });
};

const Header: React.FC<Props> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { products } = useContext(StateProduct);
  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const favourites = products.filter(item => item.addedToFavourites === true);
  const carts = products.filter(item => item.addedToCart === true);

  return (
    <header className="header">
      <Link
        to="/"
        className="header__logo"
        onClick={() => setIsMenuOpen(false)}
      >
        <img src={logoImg} alt="Logo" className="header__logo-img" />
      </Link>

      <div className="navContainer">
        <nav className="nav">
          <NavLink to="/" className={getStylelinkNav}>
            Home
          </NavLink>
          <NavLink to="phones" className={getStylelinkNav}>
            Phones
          </NavLink>
          <NavLink to="tablets" className={getStylelinkNav}>
            Tablets
          </NavLink>
          <NavLink to="accessories" className={getStylelinkNav}>
            Accessories
          </NavLink>
        </nav>

        <div className="actionsContainer">
          <div className="actions">
            <NavLink to="favourites" className={getStylelinkActions}>
              <img
                src={favouritesImg}
                alt="FavouritesImg"
                className="actions__link-img"
              />

              {!!favourites.length && (
                <span className="actions__link-counter">
                  <p className="actions__link-counter-text">
                    {favourites.length}
                  </p>
                </span>
              )}
            </NavLink>

            <NavLink to="cart" className={getStylelinkActions}>
              <img src={bagImg} alt="BagImg" className="actions__link-img" />

              {!!carts.length && (
                <span className="actions__link-counter">
                  <p className="actions__link-counter-text">{carts.length}</p>
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      <div className="menu">
        <button type="button" className="menu__button" onClick={toggleMenu}>
          <img src={isMenuOpen ? closeImg : menuImg} alt="menu" />
        </button>
      </div>
      <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
