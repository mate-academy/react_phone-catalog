/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';

import { useFavorites } from '../../hooks/useFavorites';

import { ProductCard } from '../../components/ProductCard';

import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const navigate = useNavigate();

  const { favorites } = useFavorites();

  return (
    <section className={styles.favorites}>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className={styles.title}>Favorites</h1>

      <p className={styles.count}>{favorites.length} items</p>

      {favorites.length === 0 ? (
        <p className={styles.empty}>Your favorites is empty</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
