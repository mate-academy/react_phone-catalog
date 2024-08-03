import { useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { AppContext } from '../../Root';
import { AddActiveClass } from '../../types/AddActiveClass';
import { StorageItem } from '../../types/StorageItem';
import { countItems } from '../../utils/countItems';
import styles from './BarIcons.module.scss';

const addHeartLinkClass: AddActiveClass = ({ isActive }) =>
  classNames(styles.link, styles.linkHeart, {
    [styles.linkActive]: isActive,
  });

const addCartLinkClass: AddActiveClass = ({ isActive }) =>
  classNames(styles.link, styles.linkCart, {
    [styles.linkActive]: isActive,
  });

const addCounterClass = (items: StorageItem[]): string =>
  classNames(styles.counter, {
    [styles.counterHidden]: !items.length,
  });

export const BarIcons = () => {
  const { favoritesItems, cartItems, setIsMenuActive } = useContext(AppContext);

  const closeMenu = useCallback(
    () => setIsMenuActive(false),
    [setIsMenuActive],
  );

  return (
    <div className={styles.barIcons}>
      <div className={styles.icon}>
        <NavLink
          to="/favorites"
          className={addHeartLinkClass}
          onClick={closeMenu}
        >
          <div className={addCounterClass(favoritesItems)}>
            {countItems(favoritesItems)}
          </div>
        </NavLink>
      </div>

      <div className={styles.verticalLine}></div>

      <div className={styles.icon}>
        <NavLink to="/cart" className={addCartLinkClass} onClick={closeMenu}>
          <div className={addCounterClass(cartItems)}>
            {countItems(cartItems)}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
