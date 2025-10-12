import { NavLink } from 'react-router-dom';
import './Menu.scss';
import React from 'react';

interface Props {
  onClose: () => void;
}

export const Menu: React.FC<Props> = ({ onClose }) => {
  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'menu__nav__item__link menu__nav__item__link--active' : 'menu__nav__item__link';

  const getIconLinkClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'menu__btns__link menu__btns__link--active' : 'menu__btns__link';

  return (
    <aside className="page__menu__wrapper">
      <nav className="menu__nav">
        <ul className="menu__nav__list">
          <li className="menu__nav__item">
            <NavLink to="/" className={getLinkClassName} onClick={onClose}>
              home
            </NavLink>
          </li>
          <li className="menu__nav__item">
            <NavLink to="/phones" className={getLinkClassName} onClick={onClose}>
              phones
            </NavLink>
          </li>
          <li className="menu__nav__item">
            <NavLink to="/tablets" className={getLinkClassName} onClick={onClose}>
              tablets
            </NavLink>
          </li>
          <li className="menu__nav__item">
            <NavLink to="/accessories" className={getLinkClassName} onClick={onClose}>
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <ul className="menu__btns">
        <li className="menu__btns__item">
          {/* 👇 Використовуємо нову функцію тут */}
          <NavLink to="/favourites" className={getIconLinkClassName} onClick={onClose}>
            <img src="/img/favourites.png" alt="favouritesLogo" className="menu__btns__logo" />
          </NavLink>
        </li>
        <li className="menu__btns__item">
          {/* 👇 І тут */}
          <NavLink to="/cart" className={getIconLinkClassName} onClick={onClose}>
            <img src="/img/cart.png" alt="cartLogo" className="menu__btns__logo" />
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
