import { Link, NavLink } from 'react-router-dom';
import React, { useCallback, useContext } from 'react';
import './Menu.scss';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../store/ProductsContext';

export const Menu: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { isShowMenu, favourites, cart } = useContext(StateContext);

  if (isShowMenu) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }

  const getLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames('Menu__nav-item', {
        'Menu__nav-item-active': isActive,
      }),
    [],
  );

  const getDesireLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      classNames('Menu__desire-item', {
        'Menu__desire-item--active': isActive,
      }),
    [],
  );

  const handleCloseMenu = () => {
    dispatch({ type: 'showMenu', payload: false });
  };

  return (
    <div
      className={classNames('Menu', {
        Menu__show: isShowMenu,
      })}
    >
      <div className="Menu__header">
        <div className="Menu__logo">
          <Link to="/" onClick={handleCloseMenu}>
            <img src="icons/Logo.svg" alt="logo" className="Menu__logo-img" />
          </Link>
        </div>
        <div className="Menu__close">
          <button
            type="button"
            className="Menu__close-icon"
            onClick={handleCloseMenu}
          >
            <img src="icons/Close.svg" alt="cart" />
          </button>
        </div>
      </div>

      <nav className="Menu__nav">
        <NavLink to="/" className={getLinkClass} onClick={handleCloseMenu}>
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={getLinkClass}
          onClick={handleCloseMenu}
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={getLinkClass}
          onClick={handleCloseMenu}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={getLinkClass}
          onClick={handleCloseMenu}
        >
          Accessories
        </NavLink>
      </nav>

      <div className="Menu__desire">
        <NavLink
          to="/favourites"
          className={getDesireLinkClass}
          onClick={handleCloseMenu}
        >
          <img src="icons/Favourites.svg" alt="favourites" />
          {!!favourites.length && (
            <div className="Menu__desire-amount">{favourites.length}</div>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={getDesireLinkClass}
          onClick={handleCloseMenu}
        >
          <img src="icons/Cart.svg" alt="cart" />
          {!!cart.length && (
            <div className="Menu__desire-amount">{cart.length}</div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
