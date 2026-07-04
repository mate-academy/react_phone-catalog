import { NavLink } from 'react-router-dom';

import styles from './HeaderActions.module.scss';
import { asset } from '../../../utils/paths';
import { useFavorites } from '../../../context/FavoritesContext';
import { useCart } from '../../../context/CartContext';

export const HeaderActions = () => {
  const { favoriteIds } = useFavorites();
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity ?? 0),
    0,
  );
  // console.log('cart', cart);

  return (
    <>
      <NavLink
        to="/favorites"
        className={`${styles.icon} ${styles.mobileAction}`}
      >
        <span className={styles.iconWrapper}>
          <img src={asset('/img/icons/favourites.svg')} alt="favorites" />
          {favoriteIds.length > 0 && (
            <span className={styles.badge}>{favoriteIds.length}</span>
          )}
        </span>
      </NavLink>
      <NavLink
        to="/cart"
        className={`${styles.icon} ${styles.iconShoppingBag}`}
      >
        <span className={styles.iconWrapper}>
          <img src={asset('/img/icons/shopping-bag.svg')} alt="shopping-bag" />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </span>
      </NavLink>
    </>
  );
};
