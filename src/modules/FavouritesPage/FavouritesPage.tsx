import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';

import type { Product } from '../../types/Product';
import { getProducts } from '../../services/productService';
import { useFavourites } from '../../hooks/useFavourites';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductList } from '../../components/ProductList';
import styles from './FavouritesPage.module.scss';

const cx = classNames.bind(styles);

export const FavouritesPage = () => {
  const { ids } = useFavourites();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    getProducts()
      .then(data => {
        if (!isCancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const wishlistProducts = useMemo(
    () => products.filter(product => ids.includes(product.itemId)),
    [products, ids],
  );

  const renderContent = () => {
    if (isLoading) {
      return <p className={cx('favourites-page__message')}>Loading...</p>;
    }

    if (hasError) {
      return (
        <p className={cx('favourites-page__message')}>
          Something went wrong. Please try again later.
        </p>
      );
    }

    if (wishlistProducts.length === 0) {
      return (
        <p className={cx('favourites-page__message')}>Your wishlist is empty</p>
      );
    }

    return <ProductList products={wishlistProducts} />;
  };

  return (
    <main className={cx('favourites-page')}>
      <Breadcrumbs items={[{ label: 'Favorites' }]} />

      <div className={cx('favourites-page__header')}>
        <h1 className={cx('favourites-page__title')}>Favorites</h1>

        {!isLoading && !hasError && (
          <p className={cx('favourites-page__products-count')}>
            {wishlistProducts.length}{' '}
            {wishlistProducts.length === 1 ? 'model' : 'models'}
          </p>
        )}
      </div>

      {renderContent()}
    </main>
  );
};
