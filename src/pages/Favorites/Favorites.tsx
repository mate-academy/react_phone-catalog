/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

import styles from './Favorites.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import type { ProductCatalogAPI } from '../../types/api.types';

import { ProductCard } from '../../components/ProductCard';
import { mapCatalogToCard } from '../../utils/mappers/product.mappers';
import { useLocation } from 'react-router-dom';

const Favorites = () => {
  const [products, setProducts] = useState<ProductCatalogAPI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const from = location.pathname;
  const favorites = useSelector((state: RootState) => state.favorites.items);

  useEffect(() => {
    if (!favorites.length) {
      setProducts([]);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setError(null);

    // Створюємо масив fetch-запитів для кожної категорії
    const categoryFetches = Array.from(
      new Set(favorites.map(f => f.category)),
    ).map(category =>
      fetch(`${import.meta.env.BASE_URL}api/${category}.json`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to load ${category}.json`);
          }

          return res.json() as Promise<ProductCatalogAPI[]>;
        })
        .then((data: ProductCatalogAPI[]) => {
          // Фільтруємо тільки ті товари, які є у favorites цієї категорії
          return data.filter(p =>
            favorites.some(
              favorite =>
                favorite.itemId === p.id && favorite.category === category,
            ),
          );
        }),
    );

    // Чекаємо, поки всі запити завершаться
    Promise.all(categoryFetches)
      .then(results => {
        setProducts(results.flat());
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [favorites]);

  if (isLoading) {
    return (
      <div className={styles.favorites}>
        <Breadcrumbs category={'Favorites'} from={from} />

        <h1 className={styles.favorites__title}>Favorites</h1>

        <div className={styles.favorites__grid}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.favorites__card}>
              <Skeleton variant="rectangular" width="100%" height={250} />
              <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="60%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  const mapProducts = () => products.map(p => mapCatalogToCard(p));

  return (
    <div className={styles.favorites}>
      <Breadcrumbs category={'Favorites'} from={from} />

      <h1 className={styles.favorites__title}>Favorites</h1>

      <div className={styles.favorites__grid}>
        {mapProducts().map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
