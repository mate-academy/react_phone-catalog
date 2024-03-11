/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import { HEADER_LIST_ITEMS } from '../../constants/headerListItems';

import { Icon } from '../Icon';

import './Navbar.scss';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <button
        type="button"
        className="nav__button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon
          iconName={isOpen ? 'burgerMenuHover' : 'burgerMenu'}
        />
      </button>

      <ul className={cn(
        'nav__list',
        { 'nav__list--on-small-screen': isOpen },
      )}
      >
        {
          HEADER_LIST_ITEMS.map(el => (
            <li
              className={cn(
                'nav__item',
                { 'nav__item--home': el === 'home' },
              )}
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
                onClick={() => setIsOpen(false)}

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
