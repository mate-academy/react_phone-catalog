import { NavLink } from 'react-router-dom';
// import logo from '../../../image/logo.svg';
// import Favourites from '../../../image/heart.svg';
// import cart from '../../../image/shopping.svg';
// import close from '../../../image/close.svg';
import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.scss';
import classNames from 'classnames';

import Favourites from '../../../image/heart.svg';
import cart from '../../../image/shopping.svg';
import BlackFavourites from '../../../image/blackHeart.svg';
import Blackcart from '../../../image/blackShoppinng.svg';
import { ThemeContext } from '../ColorThemes/ColorThemes';
// import { useFavourites } from '../Favourites/FacouritesContext';

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
  // const { favorites } = useFavourites();
  // const [cartCount, setCartCount] = useState(0);
  const isDarkMode = theme === 'dark';

  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

  //   setCartCount(savedCart.length);
  // }, []);

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
          {/* {favorites.length > 0 && (
            <span className="badge">{favorites.length}</span>
          )} */}
        </NavLink>

        <NavLink className="sidebar__buy" to="/cart">
          <img
            src={isDarkMode ? cart : Blackcart}
            alt="shopping"
            onClick={setMenuIsOpen}
          />
          {/* {cartCount > 0 && <span className="badge">{cartCount}</span>} */}
        </NavLink>
      </div>
    </aside>
  );
};
