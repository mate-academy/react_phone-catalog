import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
};

export const Categories: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.grid}>
        <Link to="/phones" className={styles.categoryCard}>
          <div className={styles.imageWrapper}>
            <img
              src="img/category-phones.png"
              alt="Phones"
              className={styles.image}
            />
          </div>
          <h3 className={styles.categoryName}>Mobile phones</h3>
          <p className={styles.categoryCount}>{phonesCount} models</p>
        </Link>

        <Link to="/tablets" className={styles.categoryCard}>
          <div className={styles.imageWrapper}>
            <img
              src="img/category-tablets.png"
              alt="Tablets"
              className={styles.image}
            />
          </div>
          <h3 className={styles.categoryName}>Tablets</h3>
          <p className={styles.categoryCount}>{tabletsCount} models</p>
        </Link>

        <Link to="/accessories" className={styles.categoryCard}>
          <div className={styles.imageWrapper}>
            <img
              src="img/category-accessories.png"
              alt="Accessories"
              className={styles.image}
            />
          </div>
          <h3 className={styles.categoryName}>Accessories</h3>
          <p className={styles.categoryCount}>{accessoriesCount} models</p>
        </Link>
      </div>
    </div>
  );
};
