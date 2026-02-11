import React, { useEffect, useState } from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';
import { SliderComponent } from '../HomePage/components/SliderComponent';
import { recentlyViewedService } from '../shared/components/utils/RecentlyViewed/RecentlyViewed';
import { Product } from '@/types/Product';
import { getProducts } from '@/api/api';

const NotFoundPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const recentlyViewedItems = recentlyViewedService.get();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(fetchedProducts => {
        setProducts(
          fetchedProducts.filter(product =>
            recentlyViewedItems.includes(product.itemId),
          ),
        );
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className={styles.notFoundPage}>
      <div className={styles.notFoundPage__content}>
        <h1 className={styles.notFoundPage__title}>Error 404</h1>
        <p className={styles.notFoundPage__message}>Page not found</p>
        <p className={styles.notFoundPage__suggestion}>
          Please check the URL or return to the homepage.
        </p>
        <Link to="/" className={styles.notFoundPage__homeLink}>
          <button>To Home</button>
        </Link>

        <div className={styles.notFoundPage__sliderContainer}>
          {loading ? (
            <div className={styles.skeletonLoader}></div>
          ) : (
            products.length > 0 && (
              <SliderComponent products={products} title="Recently Viewed" />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
