import classNames from 'classnames';
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../LocaleStorage';

type Props = {
  burgerMenu: boolean;
  setBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ burgerMenu, setBurgerMenu }) => {
  const location = useLocation();
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [cart, setCart] = useLocalStorage('cart', []);

  return (
    <header>
      <div className="nav">
        <Link to="/">
          <img className="nav__logo" src="./img/Logo.png" alt="Logo" />
        </Link>
        <img
          onClick={() => setBurgerMenu(!burgerMenu)}
          className="nav__menu"
          src="./img/Menu.png"
          alt="Menu"
        />

        <ul className="nav__button-n-t">
          <NavLink
            className={({ isActive }) =>
              classNames({
                'nav-item-is-active': isActive,
                'nav-item': !isActive,
              })
            }
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames({
                'nav-item-is-active': isActive,
                'nav-item': !isActive,
              })
            }
            to="/phones"
          >
            PHONES
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames({
                'nav-item-is-active': isActive,
                'nav-item': !isActive,
              })
            }
            to="/tablets"
          >
            TABLETS
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames({
                'nav-item-is-active': isActive,
                'nav-item': !isActive,
              })
            }
            to="/accessories"
          >
            ACCESSORIES
          </NavLink>
        </ul>

        <div className="ret"></div>
        <div className="ret"></div>
        <div className="ret"></div>
        <div className="ret"></div>

        <div style={{ display: 'flex' }} className="nav__button">
          <Link style={{ position: 'relative' }} to="/favourites">
            <img
              className="nav__button--first"
              src="./img/Favourites_nav.svg"
              alt="Favourites"
            />
            <div className="nav__count--first">{favorites.length}</div>
          </Link>

          <Link style={{ position: 'relative' }} state={{ from: location.pathname }} to="/cart">
            <img
              className="nav__button--second"
              src="./img/Cart_nav.svg"
              alt="Cart"
            />
            <div className="nav__count--second">{cart.length}</div>
          </Link>
        </div>
      </div>
    </header>
  );
};
