import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import {
  BURGER_NAV_ITEMS,
  BURGER_ITEMS,
} from '../../helpers/NavLinks';
import { NavItem } from '../NavItem/NavItem';

import './Burger.scss';

export const Burger: React.FC = React.memo(() => {
  const { burger } = useParams();

  useEffect(() => {
    if (burger === 'burger') {
      setTimeout(() => {}, 0);
    }
  }, [burger]);

  return (
    <nav
      className={classNames(
        'burger',
        {
          'burger--active': burger === 'burger',
        },
      )}
    >
      <ul
        className="burger__nav-list"
      >
        {BURGER_NAV_ITEMS.map(item => (
          <NavItem
            item={item}
            key={item}
            defaultLiClass="burger__nav-list-item"
            defaultLinkClass="burger__nav-list-link"
          />
        ))}
      </ul>

      <ul className="burger__items-list">
        {BURGER_ITEMS.map(item => (
          <NavItem
            item={item}
            key={item}
            defaultLiClass="burger__items-list-item"
            defaultLinkClass="burger__items-list-link"
          />
        ))}
      </ul>
    </nav>
  );
});
