import React from 'react';
import styles from './Navigation.module.scss';
import { NavItem } from './NavItem';
import { NavButton } from './NavButton';
import { useSaveProducts } from '../../../../../../context/SaveProductsContext';
import { useAppSelector } from '../../../../../../app/hooks';

export const Navigation = () => {
  const { allCartQuantity } = useSaveProducts();
  const { items: favorites } = useAppSelector(state => state.favorites);

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
          {favorites.length > 0 && (
            <span className={styles['nav__buttons--count']}>
              {favorites.length}
            </span>
          )}
        </NavButton>
        <NavButton to="/cart">
          <span className="icon icon--shopping" />
          {allCartQuantity > 0 && (
            <span className={styles['nav__buttons--count']}>
              {allCartQuantity}
            </span>
          )}
        </NavButton>
      </ul>
    </nav>
  );
};
