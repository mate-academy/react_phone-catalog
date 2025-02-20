import React from 'react';
import './Menu.scss';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const pagesOfMenu = [
  { name: 'Home', url: '/' },
  { name: 'Phones', url: 'phones' },
  { name: 'Tablets', url: 'tablets' },
  { name: 'Accessories', url: 'accessories' },
];

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('menu__link', {
    'menu__link--active': isActive,
  });

export const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu__list">
        {pagesOfMenu.map(page => (
          <li className="menu__item" key={page.name}>
            <NavLink to={page.url} className={getLinkClass}>
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
