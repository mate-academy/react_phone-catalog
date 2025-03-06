import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CartContext } from '../../../../context/CartContext';
import { FavouritesContext } from '../../../../context/FavouritesContext';
import { NavLinks } from '../../../../enums/NavLinks';
import { HeartLikeSVG } from '../../../../svgs/HeartLikeSVG';
import { ShoppingBagSVG } from '../../../../svgs/ShoppingBagSVG';
import { Counter } from '../../../Counter';
import styles from './BottomNav.module.scss';

export const BottomNav: React.FC = () => {
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  const favouritesCondition = Object.values(favourites).length > 0;
  const cartCondition = Object.values(cart).length > 0;

  const { pathname } = useLocation();

  const navItems = {
    [NavLinks.favourites]: <HeartLikeSVG key={'HeartLikeSVG'} />,
    [NavLinks.cart]: <ShoppingBagSVG key={'ShoppingBagSVG'} />,
  };

  const conditions = [favouritesCondition, cartCondition];

  const keys = Object.keys(navItems);
  const values = Object.values(navItems);

  const isActiveConditions = [
    pathname === `/${NavLinks.favourites}`,
    pathname === `/${NavLinks.cart}`,
  ];

  // idk which variant is more readable. This or this \src\modules\Header\components\Control\Control.tsx

  return (
    <nav>
      <ul className={styles['bottom-list']}>
        {keys.map((item, index) => (
          <li className={styles['bottom-item']} key={`item-${index}`}>
            <Link
              to={`/${item}`}
              className={classNames(styles.link, {
                [styles['is-active']]: isActiveConditions[index],
              })}
            >
              {conditions[index] && <Counter query={keys[index] as NavLinks} />}
              {values[index]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
