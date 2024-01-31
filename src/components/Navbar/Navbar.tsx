import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Logo } from '../Logo';
import { SearchBar } from '../SearchBar';

import './Navbar.scss';

const headerListItems = ['home', 'phones', 'tablets', 'accessories'];

export const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__content nav__content--left">
        <Logo />

        <ul className="nav__list">
          {
            headerListItems.map(el => (
              <li
                className="nav__item"
                key={el}
              >
                <NavLink
                  to={
                    el === headerListItems[0]
                      ? '/'
                      : `/${el}`
                  }
                  className={({ isActive }) => (
                    cn(
                      'nav__link',
                      { 'nav__link--active': isActive },
                    )
                  )}

                >
                  {el.toUpperCase()}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="nav__content">
        <SearchBar className="nav__search-bar" />
        <NavLink to="/" className="nav__icon-link">
          <span className="icon icon--favourites" />
        </NavLink>
        <NavLink to="/" className="nav__icon-link nav__icon-link--last">
          <span className="icon icon--shoppingBag" />
        </NavLink>
      </div>
    </nav>
  );
};
