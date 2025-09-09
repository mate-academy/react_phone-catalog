import React, { useContext } from 'react';
import './SideBar.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../Themes/Themes';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCart } from '../BoughtCart/CartContext';
import DarkBag from '../../../public/img/bagCart.svg';
import LightBag from '../../../public/img/bagCartLight.svg';
import DarkFav from '../../../public/img/heart.svg';
import LightFav from '../../../public/img/heartLight.svg';

interface SidebarProps {
  openMenu: boolean;
  setOpenMenu: () => void;
}

export const SideBar: React.FC<SidebarProps> = ({ openMenu, setOpenMenu }) => {
  const getLinkActive = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'active-link': isActive });

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
        <div className="sidebar-brand">
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
        </div>
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
