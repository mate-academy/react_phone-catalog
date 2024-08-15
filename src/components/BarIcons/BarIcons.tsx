import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setIsMenuActive } from '../../redux/slices/isMenuActiveSlice';
import { selectCartItems } from '../../redux/slices/cartItemsSlice';
import { selectFavoritesItems } from '../../redux/slices/favoritesItemsSlice';
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
  const favoritesItems = useAppSelector(selectFavoritesItems);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const closeMenu = useCallback(
    () => dispatch(setIsMenuActive(false)),
    [dispatch],
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
