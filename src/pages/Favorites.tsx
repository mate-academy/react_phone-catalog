import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCart } from '../components/ProductCart';
import { Product } from '../types/product';
import { Loader } from '../components/Loader';
import { ErrorPage } from '../components/ErrorPage';
import styles from '../styles/Favorites.module.scss';

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const getFavorites = () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const fav = localStorage.getItem('favorites');

      if (!fav) {
        setFavorites([]);

        return;
      }

      const parsed = JSON.parse(fav);

      setFavorites(parsed);
    } catch {
      setIsError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (product: Product) => {
    const exists = favorites.some(p => p.id === product.id);
    let updated: Product[];

    if (exists) {
      updated = favorites.filter(p => p.id !== product.id);
    } else {
      updated = [...favorites, product];
    }

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  if (isError) {
    return <ErrorPage reload={getFavorites} />;
  }

  return (
    <div className={styles.favorites}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.favorites__container}>
          <Breadcrumbs category="Favorites" />

          <h1 className={styles.favorites__title}>Favorites</h1>
          <span className={styles.favorites__count}>
            {favorites.length} items
          </span>

          <div className={styles.favorites__items}>
            {favorites.map(item => (
              <ProductCart
                key={item.id}
                product={item}
                isDiscounted={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
