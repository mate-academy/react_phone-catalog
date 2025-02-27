import { NavLink } from 'react-router-dom';
import logo from '../../../image/logo.svg';
import Favourites from '../../../image/heart.svg';
import cart from '../../../image/shopping.svg';
import close from '../../../image/close.svg';
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
      <div
        className="is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
        style={{ border: '1px solid #323542' }}
      >
        <div className="container">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="buttons">
            <NavLink className="logo close" to="/close" onClick={setMenuIsOpen}>
              <img src={close} alt="close" />
            </NavLink>

            {/* знизу */}
            <NavLink className="logo likes" to="/favourites">
              <img src={Favourites} alt="heart" />
            </NavLink>

            <NavLink className="logo shopping" to="/cart">
              <img src={cart} alt="shopping" />
            </NavLink>
          </div>
        </div>
      </div>
      <div className="sidebar__menu">
        <nav className="sidebar-brand">
          <NavLink className={getLinkActive} to="/">
            Home
          </NavLink>

          <NavLink className={getLinkActive} to="/phones">
            Phones
          </NavLink>

          <NavLink className={getLinkActive} to="/tablets">
            Tablets
          </NavLink>

          <NavLink className={getLinkActive} to="/accessories">
            Accessories
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
