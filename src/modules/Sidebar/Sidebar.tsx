import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { SidebarContext } from '../../store/SidebarContext';
import { IconFavourites, IconShoppingCart } from '../shared/IconsSVG';
import { ShoppingCartContext } from '../../store/ShoppingCartContext';
import { FavoutitesContext } from '../../store/FavouritesContext';

const getLinkClassCategory = ({ isActive }: { isActive: boolean }) =>
  classNames('sidebar__nav-item navigation-title', { active: isActive });

const getLinkClassCart = ({ isActive }: { isActive: boolean }) =>
  classNames('sidebar__added-to icon-container', {
    active: isActive,
  });

export const Sidebar = React.memo(() => {
  const { setIsOpenSidebar } = useContext(SidebarContext);
  const { shoppingList } = useContext(ShoppingCartContext);
  const { favouritesList } = useContext(FavoutitesContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__nav">
        <NavLink
          to="/"
          className={getLinkClassCategory}
          onClick={() => setIsOpenSidebar(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={getLinkClassCategory}
          onClick={() => setIsOpenSidebar(false)}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={getLinkClassCategory}
          onClick={() => setIsOpenSidebar(false)}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={getLinkClassCategory}
          onClick={() => setIsOpenSidebar(false)}
        >
          Accessories
        </NavLink>
      </div>

      <div className="sidebar__fav-and-cart">
        <NavLink
          to="favourites"
          className={getLinkClassCart}
          onClick={() => setIsOpenSidebar(false)}
        >
          <IconFavourites />
          {favouritesList.length > 0 && (
            <div className="sidebar__added">{favouritesList.length}</div>
          )}
        </NavLink>

        <NavLink
          to="shopping-cart"
          className={getLinkClassCart}
          onClick={() => setIsOpenSidebar(false)}
        >
          <IconShoppingCart />
          {shoppingList.length > 0 && (
            <div className="sidebar__added">{shoppingList.length}</div>
          )}
        </NavLink>
      </div>
    </aside>
  );
});
