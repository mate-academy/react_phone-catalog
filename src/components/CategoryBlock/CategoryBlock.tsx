import React, { useEffect, useState } from 'react';
import styles from './CategoryBlock.module.scss';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/products';

export const CategoryBlock: React.FC = () => {
  const [counts, setCounts] = useState({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [phones, tablets, accessories] = await Promise.all([
          getProducts('phones'),
          getProducts('tablets'),
          getProducts('accessories'),
        ]);

        setCounts({
          phones: phones.length,
          tablets: tablets.length,
          accessories: accessories.length,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch product counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className={styles.categoryBlock}>
      <h2 className={styles.categoryBlock__title}>Shop by category</h2>
      <div className={styles.categoryBlock__list}>
        <Link to="/phones" className={styles.categoryBlock__item}>
          <img
            className={styles.categoryBlock__img}
            src="/public/img/category-phones-1.png"
            alt="category phones"
          />
          <h4 className={styles.categoryBlock__name}>Mobile phones</h4>
          <p className={styles.categoryBlock__count}>
            {`${counts.phones} model${counts.phones !== 1 ? 's' : ''}`}
          </p>
        </Link>

        <Link to="/tablets" className={styles.categoryBlock__item}>
          <img
            className={styles.categoryBlock__img}
            src="/public/img/category-tablets-2.png"
            alt="category tablets"
          />
          <h4 className={styles.categoryBlock__name}>Tablets</h4>
          <p className={styles.categoryBlock__count}>
            {`${counts.tablets} model${counts.tablets !== 1 ? 's' : ''}`}
          </p>
        </Link>

        <Link to="/accessories" className={styles.categoryBlock__item}>
          <img
            className={styles.categoryBlock__img}
            src="/public/img/category-accessories-1.png"
            alt="category accessories"
          />
          <h4 className={styles.categoryBlock__name}>Accessories</h4>
          <p className={styles.categoryBlock__count}>
            {`${counts.accessories} model${counts.accessories !== 1 ? 's' : ''}`}
          </p>
        </Link>
      </div>
    </section>
  );
};
