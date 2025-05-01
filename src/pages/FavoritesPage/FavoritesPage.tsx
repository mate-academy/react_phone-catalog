import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { useFavorites } from '@context/FavoritesContext';
import { ProductCard } from '@components/ProductCard';
import { ProductType } from 'types/productTypes';
import { getProducts } from '@api/productsApi';
import { Loader } from '@components/Loader';

import cn from 'classnames';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const favoriteProducts = products.filter(item =>
    favorites.includes(String(item.id)),
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={styles.favourite_page}>
      <Breadcrumbs />

      <h1 className={cn(styles.favourite_page__title, 'main-title')}>
        Favourites
      </h1>
      <p className={styles.favourite_page__count}>
        {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
      </p>

      <ul className={styles.favourite_page__list}>
        {favoriteProducts.map(product => (
          <li key={product.id} className={styles.favourite_page__item}>
            <ProductCard card={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
