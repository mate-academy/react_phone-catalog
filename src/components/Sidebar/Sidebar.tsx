import { NavLink } from 'react-router-dom';
// import logo from '../../../image/logo.svg';
// import Favourites from '../../../image/heart.svg';
// import cart from '../../../image/shopping.svg';
// import close from '../../../image/close.svg';
import React from 'react';
import './Sidebar.scss';
import classNames from 'classnames';

interface SidebarProps {
  menuIsOpen: boolean;
  setMenuIsOpen: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuIsOpen,
  setMenuIsOpen,
}) => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'active-link': isActive });

  return (
    <aside className={`sidebar ${menuIsOpen ? 'open' : ''}`}>
      <div className="sidebar__menu">
        <nav className="sidebar-brand">
          <NavLink className={getLinkActive} to="/" onClick={setMenuIsOpen}>
            Home
          </NavLink>

          <NavLink
            className={getLinkActive}
            to="/phones"
            onClick={setMenuIsOpen}
          >
            Phones
          </NavLink>

          <NavLink
            className={getLinkActive}
            to="/tablets"
            onClick={setMenuIsOpen}
          >
            Tablets
          </NavLink>

          <NavLink
            className={getLinkActive}
            to="/accessories"
            onClick={setMenuIsOpen}
          >
            Accessories
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
