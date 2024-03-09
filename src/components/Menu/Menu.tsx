import { Link, NavLink } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import './Menu.scss';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../../store/ProductsContext';

export const Menu = () => {
  const dispatch = useContext(DispatchContext);
  const { isShowMenu } = useContext(StateContext);

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
          <a href="#/" className="Menu__close-icon" onClick={handleCloseMenu}>
            <img src="icons/Close.svg" alt="cart" />
          </a>
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
        <div className="Menu__desire-itemBox">
          <a href="#/" className="Menu__desire-item">
            <img src="icons/Favourites.svg" alt="favourites" />
          </a>
        </div>
        <div className="Menu__desire-itemBox">
          <a href="#/" className="Menu__desire-item">
            <img src="icons/Cart.svg" alt="cart" />
          </a>
        </div>
      </div>
    </div>
  );
};
