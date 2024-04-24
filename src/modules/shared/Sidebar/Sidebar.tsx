import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SidebarContext } from '../../../store/SidebarContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('sidebar__nav-item navigation-title', { active: isActive });

export const Sidebar = React.memo(() => {
  const { setIsOpenSidebar } = useContext(SidebarContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__nav">
        <NavLink
          to="/"
          className={getLinkClass}
          onClick={() => setIsOpenSidebar(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={getLinkClass}
          onClick={() => setIsOpenSidebar(false)}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={getLinkClass}
          onClick={() => setIsOpenSidebar(false)}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={getLinkClass}
          onClick={() => setIsOpenSidebar(false)}
        >
          Accessories
        </NavLink>
      </div>

      <div className="sidebar__fav-and-cart">
        <NavLink
          to="favourites"
          className="sidebar__fav icon-container icon-container--fav"
        >
          <img
            src="/img/icons/favourites.svg"
            alt="favourites"
            className="icon icon--fav"
          />
        </NavLink>

        <NavLink to="shoping-cart" className="sidebar__cart icon-container">
          <img
            src="/img/icons/shopping-cart.svg"
            alt="cart"
            className="icon icon--cart"
          />
        </NavLink>
      </div>
    </aside>
  );
});
