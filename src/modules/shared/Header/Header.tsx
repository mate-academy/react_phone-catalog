import './Header.scss';
import { MenuList } from '../MenuList';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../Context/Context';

export const Header = () => {
  const { path, cart, favourite } = useContext(ProductContext);

  return (
    <header className="header">
      <nav className="header__nav">
        <a href="/" className="header__logo">
          <img src="./img/icons/logo.svg" alt="logo" />
        </a>
        {path !== '/menu' && <MenuList />}
        <div className="header__links">
          {path !== '/menu' && (
            <Link to="/menu" className="header__link header__link--burger-menu">
              <img
                className="header__image button__image"
                src="./img/icons/menu-burger.svg"
                alt="menu-burger"
              />
            </Link>
          )}

          {path === '/menu' && (
            <a href="/" className="header__link header__link--close">
              <img
                className="header__image button__image"
                src="./img/icons/close.svg"
                alt="close"
              />
            </a>
          )}

          <Link
            to="/favourites"
            className="header__link header__link--heart-like"
          >
            <span className="header__count button__count">
              {favourite.length}
            </span>
            <img
              className="header__image button__image"
              src="./img/icons/heart-like.svg"
              alt="heart-like"
            />
          </Link>

          <Link to="/cart" className="header__link header__link--cart">
            <span className="header__count button__count"> {cart.length}</span>
            <img
              className="header__image button__image"
              src="./img/icons/cart.svg"
              alt="cart"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};
