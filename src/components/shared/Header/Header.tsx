import React, { useContext, useMemo } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Header.scss';
import { navLinks } from '../../../constants/navLinks';
import { GlobalContext } from '../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons';

export const Header: React.FC = () => {
  const { cart, favorites, isMenuOpen, toggleMenu } = useContext(GlobalContext);
  const currentLink = useLocation().pathname.split('/')[1];

  const handleLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('header__nav-link', {
      'header__nav-link--active': isActive,
    });
  };

  const handleNavItemClass = (navLink: string) => {
    const isActive = currentLink
      ? navLink.toLowerCase() === currentLink
      : navLink.toLowerCase() === 'home';

    return classNames('header__nav-item', {
      'header__nav-item--active': isActive,
    });
  };

  const handleIconLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('header__icon', {
      'header__icon--active': isActive,
    });
  };

  const cartCount = useMemo(() => {
    let count = 0;

    for (const { quantity } of cart) {
      count += quantity;
    }

    return count;
  }, [cart]);

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src="./img/logo.png" />
      </Link>

      <nav className="header__nav">
        <ul className="header__nav-items">
          {navLinks.map(navLink => {
            return (
              <li
                className={handleNavItemClass(navLink.title)}
                key={navLink.title}
              >
                <NavLink to={navLink.path} className={handleLinkClass}>
                  {navLink.title.toUpperCase()}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="header__menu" onClick={toggleMenu}>
        <Icon icon={isMenuOpen ? icons.close : icons.menu} />
      </div>

      <div className="header__icons">
        <NavLink to="/favorites" className={handleIconLinkClass}>
          {favorites.length > 0 && (
            <span className="header__icon-number">{favorites.length}</span>
          )}
          <Icon icon={icons.favorite} />
        </NavLink>

        <NavLink to="/cart" className={handleIconLinkClass}>
          {cart.length > 0 && (
            <span className="header__icon-number">{cartCount}</span>
          )}
          <Icon icon={icons.cart} />
        </NavLink>
      </div>
    </header>
  );
};
