import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { MenuItem } from '../../types/MenuItem';

type Props = {
  menuItems: MenuItem[];
  toggleMenu: () => void;
};

export const Header: React.FC<Props> = ({ menuItems, toggleMenu }) => {
  return (
    <header id="navbar" className="App__header header">
      <Link to="/" className="header__logo-link">
        <img
          className="header__logo-img"
          src="./img/icons/LOGO.svg"
          alt="Phones"
        />
      </Link>

      <nav className="header__navbar">
        <ul className="header__menu-list">
          {menuItems.map(item => (
            <li key={item.title} className="header__menu-item">
              <NavLink
                to={item.to}
                className={({ isActive }) => classNames(
                  'header__menu-link',
                  { 'is-active': isActive },
                )}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className="header__burger icon-button"
        aria-label="Mute volume"
        onClick={toggleMenu}
      />

      <NavLink
        to="/favorites"
        className={({ isActive }) => classNames(
          'header__favorites-link',
          'icon-button',
          { 'is-active': isActive },
        )}
      />

      <NavLink
        to="/cart"
        className={({ isActive }) => classNames(
          'header__cart-link',
          'icon-button',
          { 'is-active': isActive },
        )}
      />
    </header>
  );
};
