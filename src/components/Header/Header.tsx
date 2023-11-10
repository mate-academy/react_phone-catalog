import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Logo } from '../Logo';
import { Nav } from '../Nav';
import './Header.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('Header__link', {
    'Header__link--is-active': isActive,
  });
};

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
          className={getLinkClass}
        >
          <img
            src="/img/icons/favorites_icon.svg"
            alt="Favorites Icon"
            className="Header__image"
          />
        </NavLink>
        <NavLink
          to="/cart"
          className={getLinkClass}
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
