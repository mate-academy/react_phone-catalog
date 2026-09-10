import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import styles from './ShopByCategory.module.scss';

interface Props {
  products: Product[];
}

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>

      <div className={styles.category__grid}>
        <Link to="/phones" className={styles.category__card}>
          <div className={styles.category__imageWrapper}>
            <img
              src="img/category-phones.png"
              alt="Mobile phones"
              className={styles.category__image}
            />
          </div>
          <h3 className={styles.category__name}>Mobile phones</h3>
          <span className={styles.category__count}>{phonesCount} models</span>
        </Link>

        <Link to="/tablets" className={styles.category__card}>
          <div className={styles.category__imageWrapper}>
            <img
              src="img/category-tablets.png"
              alt="Tablets"
              className={styles.category__image}
            />
          </div>
          <h3 className={styles.category__name}>Tablets</h3>
          <span className={styles.category__count}>{tabletsCount} models</span>
        </Link>

        <Link to="/accessories" className={styles.category__card}>
          <div className={styles.category__imageWrapper}>
            <img
              src="img/category-accessories.png"
              alt="Accessories"
              className={styles.category__image}
            />
          </div>
          <h3 className={styles.category__name}>Accessories</h3>
          <span className={styles.category__count}>
            {accessoriesCount} models
          </span>
        </Link>
      </div>
    </section>
  );
};
