import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import './Sidebar.scss';
import classNames from 'classnames';

import Favourites from '../../../image/heart.svg';
import cartimg from '../../../image/shopping.svg';
import BlackFavourites from '../../../image/blackHeart.svg';
import Blackcart from '../../../image/blackShoppinng.svg';
import { ThemeContext } from '../ColorThemes/ColorThemes';
import { useFavourites } from '../Favourites/FacouritesContext';
import { useCart } from '../BuyCard/CartContext';

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

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const { favorites } = useFavourites();
  const { cart } = useCart();

  const totalItemCount = cart.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

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
      <div className="sidebar__icons">
        <NavLink
          className="sidebar__favorite"
          to="/favourites"
          onClick={setMenuIsOpen}
        >
          <img src={isDarkMode ? Favourites : BlackFavourites} alt="heart" />
          {favorites.length > 0 && (
            <span className="badge2">{favorites.length}</span>
          )}
        </NavLink>

        <NavLink className="sidebar__buy" to="/cart">
          <img
            src={isDarkMode ? cartimg : Blackcart}
            alt="shopping"
            onClick={setMenuIsOpen}
          />
          {cart.length > 0 && <span className="badge">{totalItemCount}</span>}
        </NavLink>
      </div>
    </aside>
  );
};
