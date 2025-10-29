import React from 'react';
import styles from './Navigation.module.scss';
import { NavItem } from './NavItem';
import { NavButton } from './NavButton';
import { useSaveProducts } from '../../../../../../context/SaveProductsContext';

export const Navigation = () => {
  const { favoriteIds, cartIds } = useSaveProducts();

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__links}>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/phones">Phones</NavItem>
        <NavItem to="/tablets">Tablets</NavItem>
        <NavItem to="/accessories">Accessoires</NavItem>
      </ul>
      <ul className={styles.nav__buttons}>
        <NavButton to="/favorites">
          <span className={`icon icon--favorites`} />
          {favoriteIds.length > 0 && (
            <span className={styles['nav__buttons--count']}>
              {favoriteIds.length}
            </span>
          )}
        </NavButton>
        <NavButton to="/cart">
          <span className="icon icon--shopping" />
          {cartIds.length > 0 && (
            <span className={styles['nav__buttons--count']}>
              {cartIds.length}
            </span>
          )}
        </NavButton>
      </ul>
    </nav>
  );
};
