import React from 'react';
import './MenuMobile.scss';
import { Favourites } from '../Favourites';
import { ShoppingBag } from '../ShoppingBag';
import { NavLink } from 'react-router-dom';

const pagesOfMenu = [
  { name: 'home' },
  { name: 'phones' },
  { name: 'tablets' },
  { name: 'accessories' },
];

export const MenuMobile = () => {
  return (
    <div className="menu-mobile">
      <ul className="menu-mobile__list">
        {pagesOfMenu.map(page => (
          <li className="menu-mobile__item" key={page.name}>
            <NavLink to={page.name} className="menu-mobile__link">
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="menu-mobile__shopping">
        <Favourites isMobile={true} />

        <ShoppingBag isMobile={true} />
      </div>
    </div>
  );
};
