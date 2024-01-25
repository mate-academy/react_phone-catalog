import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';

import { Nav } from '../Nav';

import './Header.scss';
import { handleToTopScroll } from '../../helpers/functions/handleToTopScroll';

export const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('Header__icon', {
    'Header__link--is-active': isActive,
  });
};

export const Header = () => {
  return (
    <header className="Header">
      <div className="Header__left">
        <Link
          to="/"
          className="Header__logo"
          onClick={handleToTopScroll}
        />
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
