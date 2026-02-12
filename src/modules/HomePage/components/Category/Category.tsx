import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import { useAppSelector } from '../../../../app/hooks';
import { getFilteredProducts } from '../../../../services/getFilteredProducts';
import { ProductCagetories } from '../../../../types/ProductCategories';

export const Category: React.FC = () => {
  const { products } = useAppSelector(state => state.products);

  const phonesLength = getFilteredProducts(
    products,
    ProductCagetories.phones,
  ).length;

  const tablesLength = getFilteredProducts(
    products,
    ProductCagetories.tablets,
  ).length;

  const accessoriesLength = getFilteredProducts(
    products,
    ProductCagetories.accessories,
  ).length;

  return (
    <div className={`page__category ${styles.category}`}>
      <div className={styles.category__container}>
        <h2 className={`${styles.category__title} title`}>Shop by category</h2>

        <div className={styles.category__row}>
          <div className={styles.category__column}>
            <div className={styles.category__item}>
              <Link
                to="/phones"
                className={`${styles.category__image} ${styles['category__image--1']}`}
              >
                <img src="./img/category-phones.png" alt="Category Mobile" />
              </Link>

              <h4 className={styles.category__subtitle}>Mobile phones</h4>
              <p className={styles.category__models}>{phonesLength} models</p>
            </div>
          </div>

          <div className={styles.category__column}>
            <div className={styles.category__item}>
              <Link
                to="./tablets"
                className={`${styles.category__image} ${styles['category__image--2']}`}
              >
                <img src="./img/category-tablets.png" alt="Category Tablet" />
              </Link>

              <h4 className={styles.category__subtitle}>Tablets</h4>
              <p className={styles.category__models}>{tablesLength} models</p>
            </div>
          </div>

          <div className={styles.category__column}>
            <div className={styles.category__item}>
              <Link
                to="/accessories"
                className={`${styles.category__image} ${styles['category__image--3']}`}
              >
                <img
                  src="./img/category-accessories.png"
                  alt="Category Accessories"
                />
              </Link>

              <h4 className={styles.category__subtitle}>Accessories</h4>
              <p className={styles.category__models}>
                {accessoriesLength} models
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
