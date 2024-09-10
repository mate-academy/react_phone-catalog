import React, { useEffect } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import { PreviousPage } from '../../components/PreviousPage';
import styles from './FavoritesPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { GoBack } from '../../components/GoBack';

export const FavoritesPage: React.FC = () => {
  const category = useLocation().pathname.slice(1);
  const { favoriteProducts, setFavoriteProducts } = useAppContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteProducts');
    if (storedFavorites !== null && storedFavorites.length !== 0) {
      setFavoriteProducts(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div>
      <PreviousPage category={category} />
      <div className={styles.favoritesPage}>
        <Breadcrumbs category={category} />

        <div className={styles.topContainer}>
          <div className={styles.topLeft}>
            <GoBack />
          </div>
          <h1 className={styles.title}>Favorites</h1>
          <p className={styles.count}>
            {`${favoriteProducts.length} item${favoriteProducts.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <div className={styles.emptyContainer}>
          <div className={styles.container}>
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((favProduct, index) => (
                <div className={styles.product} key={index}>
                  <ProductCard product={favProduct} />
                </div>
              ))
            ) : (
              <p className={styles.label}>No favorites yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
