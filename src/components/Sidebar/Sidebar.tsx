import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';

type Props = {
  isOpen: boolean;
};

export const Sidebar: React.FC<Props> = ({ isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen]);

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'sidebar__link is-active' : 'sidebar__link')}
          >
            Home
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink
            to="/phones"
            className={({ isActive }) => (isActive ? 'sidebar__link is-active' : 'sidebar__link')}
          >
            Phones
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink
            to="/tablets"
            className={({ isActive }) => (isActive ? 'sidebar__link is-active' : 'sidebar__link')}
          >
            Tablets
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink
            to="/accessories"
            className={({ isActive }) => (isActive ? 'sidebar__link is-active' : 'sidebar__link')}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
      <div className="sidebar__icons">
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? 'sidebar__icon is-active' : 'sidebar__icon')}
        >
          <img src="./img/icons/Favourites.svg" alt="favorite-icon" />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? 'sidebar__icon is-active' : 'sidebar__icon')}
        >
          <img src="./img/icons/Cart.svg" alt="cart-icon" />
        </NavLink>
      </div>
    </aside>
  );
};
