import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import './Header.scss';

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__left">
        <Logo />
        <Nav />
      </div>

      <div className="Header__right">
        <NavLink
          to="/favorites"
          className="Header__icon"
        >
          <img
            src="/img/icons/favorites_icon.svg"
            alt="Favorites Icon"
            className="Header__image"
          />
        </NavLink>
        <NavLink
          to="/cart"
          className="Header__icon"
        >
          <img
            src="/img/icons/cart_icon.svg"
            alt="Cart Icon"
            className="Header__image"
          />
        </NavLink>
      </div>
    </header>
  );
};
