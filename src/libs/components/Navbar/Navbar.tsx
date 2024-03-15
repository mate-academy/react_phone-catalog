/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { HEADER_LIST_ITEMS } from '../../constants/headerListItems';

import './Navbar.scss';

type Props = {
  classNames?: string;
};

export const Navbar: React.FC<Props> = ({ classNames }) => (
  <nav className={cn('nav', classNames)}>
    <ul className="nav__list">
      {
        HEADER_LIST_ITEMS.map(el => (
          <li
            className="nav__item"
            key={el}
          >
            <NavLink
              to={
                el === HEADER_LIST_ITEMS[0]
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
