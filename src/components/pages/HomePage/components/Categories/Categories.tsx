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
      <Link to="/phones" className={styles.category__card}>
        <div className={`${styles.category__img}`}>
          <img src={'./img/category-phones.webp'} alt="phones" />
        </div>
        <div className={styles.category__title}>
          <p className={styles['category__title--category']}>Mobile phones</p>
          <p className={styles['category__title--models']}>
            {error ? '0' : `${countProductsByCategory('phones')} models`}
          </p>
        </div>
      </Link>

      <Link to="/tablets" className={styles.category__card}>
        <div className={`${styles.category__img}`}>
          <img src={'./img/category-tablets.webp'} alt="tablets" />
        </div>
        <div className={styles.category__title}>
          <p className={styles['category__title--category']}>Tablets</p>
          <p className={styles['category__title--models']}>
            {error ? '0' : `${countProductsByCategory('tablets')} models`}
          </p>
        </div>
      </Link>

      <Link to="/accessories" className={styles.category__card}>
        <div className={`${styles.category__img}`}>
          <img src={'./img/category-accessories.webp'} alt="accessories" />
        </div>
        <div className={styles.category__title}>
          <p className={styles['category__title--category']}>Accessories</p>
          <p className={styles['category__title--models']}>
            {error ? '0' : `${countProductsByCategory('accessories')} models`}
          </p>
        </div>
      </Link>
    </div>
  );
};
