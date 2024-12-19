import React from 'react';
import './MenuMobile.scss';
import { Favourites } from '../Favourites';
import { ShoppingBag } from '../ShoppingBag';

const pagesOfMenu = [
  { name: 'Home' },
  { name: 'Phones' },
  { name: 'Tablets' },
  { name: 'Accessories' },
];

export const MenuMobile = () => {
  return (
    <div className="menu-mobile">
      <ul className="menu-mobile__list">
        {pagesOfMenu.map(page => (
          <li className="menu-mobile__item" key={page.name}>
            <a href={`#${page.name}`} className="menu-mobile__link">
              {page.name}
            </a>
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
