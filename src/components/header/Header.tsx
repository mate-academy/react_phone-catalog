import { Dispatch, SetStateAction } from 'react';
import './Header.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useShop } from '../../context/shopContext';

type Props = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ setMenuOpen }) => {
  const { pathname } = useLocation();
  const { favourites, basket } = useShop();

  const handleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <img src="/img/logo.png" alt="logo" className="header__logo--img" />
        </Link>
        <div className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive
                ? 'header__nav--item is-active'
                : 'header__nav--item';
            }}
          >
            home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) => {
              return isActive
                ? 'header__nav--item is-active'
                : 'header__nav--item';
            }}
          >
            phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) => {
              return isActive
                ? 'header__nav--item is-active'
                : 'header__nav--item';
            }}
          >
            tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) => {
              return isActive
                ? 'header__nav--item is-active'
                : 'header__nav--item';
            }}
          >
            accessories
          </NavLink>
        </div>
      </div>
      <div className="header__trinkets">
        <Link
          to="/favourites"
          className={`header__trinkets--heart ${pathname === '/favourites' ? 'heart-active' : ''}`}
        >
          <div
            className={
              favourites.length === 0
                ? `header__trinkets--heart-quantity-disabled`
                : `header__trinkets--heart-quantity`
            }
          >
            {favourites.length}
          </div>
        </Link>
        <Link to="/basket" className="header__trinkets--basket">
          <img src="/img/basket.png" alt="shopping cart" />
          <div
            className={
              basket.length === 0
                ? `header__trinkets--basket-quantity-disabled`
                : `header__trinkets--basket-quantity`
            }
          >
            {basket.length}
          </div>
        </Link>
      </div>
      <div className="header__burger">
        <img
          src="/img/burger.png"
          alt="burger"
          className="header__burger--img"
          onClick={handleMenu}
        />
      </div>
    </div>
  );
};
