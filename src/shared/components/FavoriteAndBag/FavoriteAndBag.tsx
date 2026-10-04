import { Link } from 'react-router-dom';
import styles from './FavoriteAndBag.module.scss';
import { useCart } from '@/shared/context/CartContext/useCart';
import { useFavorites } from '@/shared/context/FavoriteContext/useFavorites';
import { useTheme } from '@/shared/context/FavoriteContext/useTheme';

type Props = {
  onClose?: () => void;
};

export const FavoriteAndBag: React.FC<Props> = ({ onClose }) => {
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { theme } = useTheme();

  return (
    <div className={styles.favAndbag}>
      <div className={styles.favoritesBlock}>
        <Link className={styles.favorites} to="/favorites" onClick={onClose}>
          <div className={styles.imgWrapper}>
            <img
              src={
                theme === 'light'
                  ? 'icons/favourites.svg'
                  : 'icons/favourites-white.svg'
              }
              alt="favorites"
            />

            {totalFavorites > 0 && (
              <span className={styles.itemsInBag}>{totalFavorites}</span>
            )}
          </div>
        </Link>
      </div>

      <div className={styles.bagBlock}>
        <Link className={styles.bag} to="/cart" onClick={onClose}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.bag}
              src={theme === 'light' ? 'icons/bag.svg' : 'icons/bag-white.svg'}
              alt="bag"
            />

            {totalItems > 0 && (
              <span className={styles.itemsInBag}>{totalItems}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};
