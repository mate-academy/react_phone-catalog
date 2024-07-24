import classNames from 'classnames';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../../utils/GlobalStateProvider';

export const Menu = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuOpened, isDarkThemeOn } = useContext(StateContext);

  const closeMenu = () => {
    dispatch({ type: 'setIsMenuOpened', payload: false });
  };

  return (
    <nav
      className={classNames('menu', {
        'menu--active': isMenuOpened,
        'menu-light': !isDarkThemeOn,
      })}
    >
      <ul className={isDarkThemeOn ? '' : 'menu-ul-light'}>
        <li className="menu__item">
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'menu__item--active' : '')}
          >
            Home
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink
            to="/phones"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'menu__item--active' : '')}
          >
            Phones
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink
            to="/tablets"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'menu__item--active' : '')}
          >
            Tablets
          </NavLink>
        </li>
        <li className="menu__item">
          <NavLink
            to="/accessories"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? 'menu__item--active' : '')}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
      <div className="menu__bottom">
        <button
          className={classNames('menu__btn menu__btn--like', {
            'menu__btn--like-dark': !isDarkThemeOn,
          })}
        >
          <NavLink
            to="favourites"
            className={({ isActive }) =>
              isActive
                ? 'menu__btn-link menu__btn-link--is-active'
                : 'menu__btn-link'
            }
            onClick={closeMenu}
          />
        </button>
        <button
          className={classNames('menu__btn menu__btn--bag', {
            'menu__btn--bag-dark': !isDarkThemeOn,
          })}
        >
          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive
                ? 'menu__btn-link menu__btn-link--is-active'
                : 'menu__btn-link'
            }
            onClick={closeMenu}
          />
        </button>
      </div>
    </nav>
  );
};
