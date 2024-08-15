import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectFavoritesItems } from '../../redux/slices/favoritesItemsSlice';
import { countItems } from '../../utils/countItems';
import { ProductsList } from '../ProductsList';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const favoritesItems = useAppSelector(selectFavoritesItems);
  const favoritesProducts = favoritesItems.map(item => item.product);

  const favoritesQty = useMemo(
    () => countItems(favoritesItems),
    [favoritesItems],
  );

  return (
    <div className={styles.favorites}>
      <div className={styles.topLinks}>
        <Link to="/" className={styles.homeLink} />
        <div className={styles.arrowRight} />
        <Link to="/favorites" className={styles.favoritesLink}>
          Favorites
        </Link>
      </div>

      <h2 className={styles.title}>Favorites</h2>

      <p className={styles.itemsTxt}>
        {favoritesQty !== 1 ? `${favoritesQty} items` : '1 item'}
      </p>

      <ProductsList name="favorites products" products={favoritesProducts} />
    </div>
  );
};
