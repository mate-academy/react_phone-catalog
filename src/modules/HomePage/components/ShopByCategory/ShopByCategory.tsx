import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './ShopByCategory.module.scss';
import { Product } from '../../../../types';

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
    <div className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.categories}>
        <Link to="/phones" className={styles.category}>
          <div className={styles.imageWrapper}>
            <img
              src="/img/category-phones.webp"
              alt="Phones"
              className={styles.image}
            />
          </div>
          <h3 className={styles.name}>Mobile phones</h3>
          <p className={styles.count}>{phonesCount} models</p>
        </Link>

        <Link to="/tablets" className={styles.category}>
          <div className={cn(styles.imageWrapper, styles.imageWrapperTablets)}>
            <img
              src="/img/category-tablets.webp"
              alt="Tablets"
              className={styles.image}
            />
          </div>
          <h3 className={styles.name}>Tablets</h3>
          <p className={styles.count}>{tabletsCount} models</p>
        </Link>

        <Link to="/accessories" className={styles.category}>
          <div
            className={cn(styles.imageWrapper, styles.imageWrapperAccessories)}
          >
            <img
              src="/img/category-accessories.webp"
              alt="Accessories"
              className={styles.image}
            />
          </div>
          <h3 className={styles.name}>Accessories</h3>
          <p className={styles.count}>{accessoriesCount} models</p>
        </Link>
      </div>
    </div>
  );
};
