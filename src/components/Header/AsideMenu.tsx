import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './AsideMenu.scss';
import { getAssetPath } from '../getAssetPath';

interface AsideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AsideMenu: React.FC<AsideMenuProps> = ({ isOpen, onClose }) => {
  const getFooterBtnClass = ({ isActive }: { isActive: boolean }) =>
    `aside-menu__footer-btn${isActive ? ' aside-menu__footer-btn--active' : ''}`;

  return (
    <aside className={`aside-menu ${isOpen ? 'aside-menu--open' : ''}`}>
      <div className="aside-menu__header">
        <Link to="/" className="aside-menu__logo" onClick={onClose}>
          NICE
          <img
            src={getAssetPath('img/Finger.png')}
            alt="Finger"
            className="aside-menu__logo-icon"
          />
          <br />
          GADGETS
        </Link>
        <button
          type="button"
          className="aside-menu__close-btn"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="aside-menu__nav">
        <Link to="/" className="aside-menu__link" onClick={onClose}>
          Home
        </Link>

        <Link to="/phones" className="aside-menu__link" onClick={onClose}>
          Phones
        </Link>

        <Link to="/tablets" className="aside-menu__link" onClick={onClose}>
          Tablets
        </Link>

        <Link to="/accessories" className="aside-menu__link" onClick={onClose}>
          Accessories
        </Link>
      </nav>

      <div className="aside-menu__footer">
        <NavLink
          to="/favorites"
          className={getFooterBtnClass}
          onClick={onClose}
        >
          <img
            src={getAssetPath('img/love.svg')}
            alt="Favorites"
            className="aside-menu__footer-icon"
          />
        </NavLink>

        <NavLink to="/cart" className={getFooterBtnClass} onClick={onClose}>
          <img
            src={getAssetPath('img/Shopping_bag.svg')}
            alt="Cart"
            className="aside-menu__footer-icon"
          />
        </NavLink>
      </div>
    </aside>
  );
};
