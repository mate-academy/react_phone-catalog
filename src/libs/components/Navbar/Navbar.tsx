import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navbar.scss';

const headerListItems = ['home', 'phones', 'tablets', 'accessories'];

export const Navbar = () => {
  return (
    <nav className="nav">
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
    </nav>
  );
};
