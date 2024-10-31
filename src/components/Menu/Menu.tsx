import React from 'react';
import './Menu.scss';

const pagesOfMenu = [
  { name: 'Home' },
  { name: 'Phones' },
  { name: 'Tablets' },
  { name: 'Accessories' },
];

export const Menu = () => {
  return (
    <div className="menu">
      <ul className="menu__list">
        {pagesOfMenu.map(page => (
          <li className="menu__item" key={page.name}>
            <a href={`#${page.name}`} className="menu__link">
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
