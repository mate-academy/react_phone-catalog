import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../../../../server/products';
import { Categories } from '../../../../../types/Categories';
import { Product } from '../../../../../types/Product';
import styles from './Categories.module.scss';

export const Category = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(() => setError('Try again later'));
  }, []);

  const countProductsByCategory = (category: Categories) =>
    products.filter(product => product.category === category).length;

  return (
    <div className={styles.category}>
      <div className={styles.category__phones}>
        <div className={styles.category__card}>
          <Link
            to="/phones"
            className={`${styles.category__link} ${styles['category__link--phones']}`}
          />
          <div className={styles.category__title}>
            <h3 className={styles['category__title--category']}>
              Mobile phones
            </h3>
            <p className={styles['category__title--models']}>
              {error ? '0' : `${countProductsByCategory('phones')} models`}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.category__tablets}>
        <div className={styles.category__card}>
          <Link
            to="/tablets"
            className={`${styles.category__link} ${styles['category__link--tablets']}`}
          />
          <div className={styles.category__title}>
            <h3 className={styles['category__title--category']}>Tablets</h3>
            <p className={styles['category__title--models']}>
              {error ? '0' : `${countProductsByCategory('tablets')} models`}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.category__accessories}>
        <div className={styles.category__card}>
          <Link
            to="/accessories"
            className={`${styles.category__link} ${styles['category__link--accessories']}`}
          />
          <div className={styles.category__title}>
            <h3 className={styles['category__title--category']}>Accessories</h3>
            <p className={styles['category__title--models']}>
              {error ? '0' : `${countProductsByCategory('accessories')} models`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
