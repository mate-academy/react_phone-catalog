import React, { useState } from 'react';
import classNames from 'classnames';
import './Navigation.scss';

import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = React.memo(() => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const clickEvent = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsShowMenu(false);
  };

  return (
    <nav className="nav header__nav">
      <button
        type="button"
        className="nav__burger-button"
        onClick={() => setIsShowMenu(!isShowMenu)}
      >
        Menu
      </button>
      <ul
        className={classNames(
          'nav__list',
          { 'nav__list--is-visible': isShowMenu },
        )}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (
            classNames('link', 'nav__link', { 'link--is-selected': isActive })
          )}
          onClick={clickEvent}
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          className={({ isActive }) => (
            classNames('link', 'nav__link', { 'link--is-selected': isActive })
          )}
          onClick={clickEvent}
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          className={({ isActive }) => (
            classNames('link', 'nav__link', { 'link--is-selected': isActive })
          )}
          onClick={clickEvent}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) => (
            classNames('link', 'nav__link', { 'link--is-selected': isActive })
          )}
          onClick={clickEvent}
        >
          Accessories
        </NavLink>
        <div className="nav__order-block">
          <NavLink
            to="/cart"
            className={({ isActive }) => (
              classNames('link', 'nav__link', { 'link--is-selected': isActive })
            )}
            onClick={clickEvent}
          >
            Cart
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (
              classNames('link', 'nav__link', { 'link--is-selected': isActive })
            )}
            onClick={clickEvent}
          >
            Favourites
          </NavLink>
        </div>
      </ul>

    </nav>
  );
});
