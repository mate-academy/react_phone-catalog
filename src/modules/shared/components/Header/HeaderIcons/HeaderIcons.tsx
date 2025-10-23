import { NavLink } from 'react-router-dom';
import styles from '../Header.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../../../../store/hooks';
import { selectCartTotals } from '../../../../../store/slices/cartSlice';
import { selectFavorites } from '../../../../../store/slices/favoritesSlice';

export const HeaderIcons = () => {
  const itemsInCart = useAppSelector(selectCartTotals);
  const itemsInFavorites = useAppSelector(selectFavorites);

  return (
    <div className={styles.header__icons}>
      <NavLink
        to={{ pathname: '/favorites' }}
        className={({ isActive }) =>
          // eslint-disable-next-line max-len
          classNames(styles.icon__link, { [styles.icon__link_isActive]: isActive })
        }
      >
        <div className={styles.icon__favourites}>
          {itemsInFavorites.length > 0 && (
            // eslint-disable-next-line max-len
            <span className={styles.icon__counter}>{itemsInFavorites.length}</span>
          )}
        </div>
      </NavLink>
      <NavLink
        to={{ pathname: '/cart' }}
        className={({ isActive }) =>
          // eslint-disable-next-line max-len
          classNames(styles.icon__link, { [styles.icon__link_isActive]: isActive })
        }
      >
        <div className={styles.icon__cart}>
          {itemsInCart.totalQty > 0 && (
            <span className={styles.icon__counter}>{itemsInCart.totalQty}</span>
          )}
        </div>
      </NavLink>
    </div>
  );
};
