import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import { SearchBar } from '../SearchBar';

import './Navbar.scss';

const headerListItems = ['Home', 'Phones', 'Tablets', 'Accessories'];

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
                <NavLink to="/" className="nav__link">
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
