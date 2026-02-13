import React from 'react';
import './MenuMobile.scss';
import { Favourites } from '../Favourites';
import { ShoppingBag } from '../ShoppingBag';
import { NavLink } from 'react-router-dom';

const pagesOfMenu = [
  { name: 'home', path: '/home' },
  { name: 'phones', path: '/phones' },
  { name: 'tablets', path: '/tablets' },
  { name: 'accessories', path: './accessories' },
];

type Props = {
  onClose: () => void;
};
export const MenuMobile: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="menu-mobile">
      <ul className="menu-mobile__list">
        {pagesOfMenu.map(page => (
          <li className="menu-mobile__item" key={page.name}>
            <NavLink
              to={page.path}
              className="menu-mobile__link"
              onClick={onClose}
            >
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="menu-mobile__shopping">
        <Favourites isMobile={true} onClose={onClose} />

        <ShoppingBag isMobile={true} onClose={onClose} />
      </div>
    </div>
  );
};
