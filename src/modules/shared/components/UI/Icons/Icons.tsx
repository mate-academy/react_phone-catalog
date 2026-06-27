import styles from './Icons.module.scss';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../../../contexts/CartContext';
import { useFavorite } from '../../../../../contexts/FavoritesContext';

export const Icons = () => {
  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconLink} ${isActive ? styles.isActive : ''}`;

  const { totalFavoriteItems } = useFavorite();
  const { totalItems } = useCart();

  return (
    <div className={styles.iconsContainer}>
      <NavLink className={getIconClass} to="/favorites" aria-label="Favorites">
        <img src="./img/icons/favorites.svg" alt="Favorites" />
        {totalFavoriteItems > 0 && (
          <span className={styles.addedProducts}>{totalFavoriteItems}</span>
        )}
      </NavLink>

      <NavLink className={getIconClass} to="/cart" aria-label="Shopping bag">
        <img src="./img/icons/shopping-bag.svg" alt="Shopping bag" />
        {totalItems > 0 && (
          <span className={styles.addedProducts}>{totalItems}</span>
        )}
      </NavLink>
    </div>
  );
};
