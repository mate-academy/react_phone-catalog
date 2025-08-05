import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import './Sidebar.scss';
import classNames from 'classnames';

import DarkFav from '../../img/heart.svg';
import LightFav from '../../img/heartLight.svg';
import DarkBag from '../../img/bagCart.svg';
import LightBag from '../../img/bagCartLigth.svg';
import { ThemeContext } from '../Themes/Themes';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCart } from '../BoughtCard/CartContext';

interface SidebarProps {
  openMenu: boolean;
  setOpenMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ openMenu, setOpenMenu }) => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) =>
    classNames('sidebar-item', { 'active-link': isActive }); // sidebar className...

  const { theme } = useContext(ThemeContext);
  const isBasicDark = theme === 'dark';
  const { favourites } = useFavourites();
  const { cart } = useCart();

  const totalCount = cart.reduce((acc, item) => {
    return acc + (item.quantity || 1);
  }, 0);

  return (
    <aside className={`sidebar ${openMenu ? 'open' : ''}`}>
      <div className="sidebar__menu">
        <nav className="sidebar-brand">
          {/*check later */}
          <NavLink className={getLinkActive} to="/" onClick={setOpenMenu}>
            Home
          </NavLink>

          <NavLink className={getLinkActive} to="/phones" onClick={setOpenMenu}>
            Phones
          </NavLink>

          <NavLink
            className={getLinkActive}
            to="/tablets"
            onClick={setOpenMenu}
          >
            Tablets
          </NavLink>

          <NavLink
            className={getLinkActive}
            to="/accessories"
            onClick={setOpenMenu}
          >
            Accessories
          </NavLink>
        </nav>
      </div>
      <div className="sidebar__icons">
        <NavLink
          className="sidebar__favourite"
          to="/favourites"
          onClick={setOpenMenu}
        >
          <img src={isBasicDark ? DarkFav : LightFav} alt="heart" />
          {favourites.length > 0 && (
            <span className="badge-2">{favourites.length}</span>
          )}
        </NavLink>

        <NavLink className="sidebar__bought" to="/cart">
          <img
            src={isBasicDark ? DarkBag : LightBag}
            alt="bought"
            onClick={setOpenMenu}
          />
          {cart.length > 0 && <span className="badge">{totalCount}</span>}
        </NavLink>
      </div>
    </aside>
  );
};
