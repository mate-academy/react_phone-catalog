import React, { useContext } from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { icons } from '../../../constants/icons';
import { GlobalContext } from '../../context/GlobalContext';
import { navLinks } from '../../../constants/navLinks';

export const Menu: React.FC = () => {
  const { setIsMenuOpen } = useContext(GlobalContext);

  const handleLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('menu__link', {
      'menu__link--active': isActive,
    });
  };

  const handleIconClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('menu__icon', {
      'menu__icon--active': isActive,
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);
  };

  return (
    <nav className="menu">
      <ul className="menu__list">
        {navLinks.map(navLink => (
          <li className="menu__item" key={navLink.title}>
            <NavLink
              to={navLink.path}
              className={handleLinkClass}
              onClick={toggleMenu}
            >
              {navLink.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="menu__icons">
        <NavLink
          to="/favorites"
          className={handleIconClass}
          onClick={toggleMenu}
        >
          <Icon icon={icons.favorite} />
        </NavLink>
        <NavLink to="/cart" className={handleIconClass} onClick={toggleMenu}>
          <Icon icon={icons.cart} />
        </NavLink>
      </div>
    </nav>
  );
};
