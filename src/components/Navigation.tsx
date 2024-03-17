import React, { useContext } from 'react';
import cn from 'classnames';

import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import '../styles/Navigation.scss';

const NAVIGATES = ['home', 'phones', 'tablets', 'accessories'];

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn('nav__link', { 'nav__link--active': isActive })
);

export const Navigation: React.FC = () => {
  const { isBurgerMenu, setIsBurgerMenu } = useContext(GlobalContext);

  return (
    <nav className="nav">
      <ul className={cn('nav__list', {
        'nav__list--burger': isBurgerMenu,
      })}
      >
        {NAVIGATES.map(item => (
          <li key={item} className="nav__item">
            <NavLink
              to={item === 'home' ? '/' : item}
              className={getLinkClass}
              onClick={() => setIsBurgerMenu(false)}
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
