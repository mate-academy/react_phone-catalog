import './Header.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar';
import React, { SetStateAction, useContext } from 'react';
import { AsideMenu } from '../AsideMenu';
import { StateContext } from '../../../contexts/AppContext/AppContext';
import { getLinkClass } from '../../../helpers/getLinkClass';
import {
  ThemeContext,
  ThemeType,
} from '../../../contexts/ThemeContext/ThemeContext';
import { getIconSrc } from '../../../helpers/getIconSrc';
import { SearchBar } from './components/SearchBar';
import { scrollToTop } from '../../../helpers/scrollToTop';

type Props = {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ isOpenMenu, setIsOpenMenu }) => {
  const { favorites, cart } = useContext(StateContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const handleMenu = () => {
    setIsOpenMenu((prev: boolean) => !prev);
  };

  const allowedPaths = ['/phones', '/tablets', '/accessories'];
  const isSearchVisible = allowedPaths.includes(location.pathname);

  const cartQuantity = cart.reduce((acc, item) => item.quantity + acc, 0);
  const oppositeTheme =
    theme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">
            <Link
              to="/"
              className="header__logoLink"
              onClick={() => scrollToTop()}
            >
              <img
                className="header__logoIcon"
                src={getIconSrc('logo', theme)}
                alt="logo"
              />
            </Link>
          </div>
          <div className="header__navbar">
            <Navbar />
          </div>
        </div>

        <div className="header__right">
          <button
            id="theme-toggle"
            className="header__right-item uppercase"
            onClick={toggleTheme}
          >
            {oppositeTheme}
          </button>

          {isSearchVisible && <SearchBar />}

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              getLinkClass(isActive, 'header__right-item')
            }
          >
            <img
              src={getIconSrc('heart', theme)}
              alt="favorites"
              className="icon"
            />
            {!!favorites.length && (
              <span className="itemCounter">{favorites.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              getLinkClass(isActive, 'header__right-item')
            }
          >
            <img src={getIconSrc('cart', theme)} alt="cart" className="icon" />
            {!!cart.length && (
              <span className="itemCounter">{cartQuantity}</span>
            )}
          </NavLink>
          <button
            type="button"
            className="header__burgerMenu"
            onClick={handleMenu}
          >
            <img src={getIconSrc('menu', theme)} alt="menu" className="icon" />
          </button>
        </div>
      </div>
      <AsideMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
    </div>
  );
};
