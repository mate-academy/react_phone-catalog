import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Root';
import { countItems } from '../../utils/countItems';
import { ProductsList } from '../ProductsList';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const { favoritesItems } = useContext(AppContext);

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

      <ProductsList />
    </div>
  );
};
