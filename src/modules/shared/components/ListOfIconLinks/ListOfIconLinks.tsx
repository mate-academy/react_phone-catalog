import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './ListOfIconLinks.module.scss';
import React from 'react';
import { Counter } from './Counter/Counter';
import { useAppSelector } from '../../../../app/hooks';
import { FavouritesSvg } from '../../svg/FavouritesSvg';
import { CartSvg } from '../../svg/CartSvg';

// type Icons = 'favourites' | 'cart' | 'burgerMenu';

function getLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('link', styles.iconLink, {
    [styles.iconLinkActive]: isActive,
  });
}

type Props = {
  parentComponent: 'header' | 'saidebar';
};

export const ListOfIconLinks: React.FC<Props> = ({ parentComponent }) => {
  const { pathname, search } = useLocation();
  const favouritesProduct = useAppSelector(s => s.favourites);
  const cartProduct = useAppSelector(s => s.cart);
  const countProductsInCart = cartProduct.reduce(
    (acc, p) => p.quantity + acc,
    0,
  );

  return (
    <ul
      className={classNames({
        [styles.headerList]: parentComponent === 'header',
        [styles.saidebarList]: parentComponent === 'saidebar',
      })}
    >
      <li className={styles.navItem}>
        <NavLink to={'/favourites'} className={getLinkClass}>
          <div className={styles.positionCounter}>
            <FavouritesSvg style={{ color: 'var(--nav-icons-color)' }} />
            {favouritesProduct.length > 0 && (
              <Counter count={favouritesProduct.length} />
            )}
          </div>
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          to={'/cart'}
          state={pathname + search}
          className={getLinkClass}
        >
          <div className={styles.positionCounter}>
            <CartSvg style={{ color: 'var(--nav-icons-color)' }} />
            {cartProduct.length > 0 && <Counter count={countProductsInCart} />}
          </div>
        </NavLink>
      </li>
    </ul>
  );
};
