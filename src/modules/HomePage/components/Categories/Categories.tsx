import React from 'react';
import './Categories.module.scss';
import { Product } from '../../../../shared/types/Product';
import styles from './Categories.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  products: Product[];
  className?: string;
};

export const Categories: React.FC<Props> = ({ products, className }) => {
  return (
    <div className={classNames(styles.Categories, className)}>
      <h2 className={styles.Categories__title}>Shop by category</h2>

      <div className={styles.Categories__category}>
        <div
          className={classNames(
            styles.Categories__imgWrapper,
            styles.Categories__imgWrapperPhones,
          )}
        >
          <Link to={'/phones'}>
            <img
              src="img/category-phones.webp"
              alt="phones category image"
              className={styles.Categories__image}
            />
          </Link>
        </div>
        <h4 className={styles.Categories__categoryTitle}>Mobile phones</h4>
        <p className={styles.Categories__counter}>
          {`${products.filter(product => product.category === 'phones').length} models`}
        </p>
      </div>

      <div className={styles.Categories__category}>
        <div
          className={classNames(
            styles.Categories__imgWrapper,
            styles.Categories__imgWrapperTablets,
          )}
        >
          <Link to={'/tablets'}>
            <img
              src="img/category-tablets.webp"
              alt="tablets category image"
              className={styles.Categories__image}
            />
          </Link>
        </div>
        <h4 className={styles.Categories__categoryTitle}>Tablets</h4>
        <p className={styles.Categories__counter}>
          {`${products.filter(product => product.category === 'tablets').length} models`}
        </p>
      </div>

      <div className={styles.Categories__category}>
        <div
          className={classNames(
            styles.Categories__imgWrapper,
            styles.Categories__imgWrapperAccessories,
          )}
        >
          <Link to={'/accessories'}>
            <img
              src="img/category-accessories.webp"
              alt="accessories category image"
              className={styles.Categories__image}
            />
          </Link>
        </div>
        <h4 className={styles.Categories__categoryTitle}>Accessories</h4>
        <p className={styles.Categories__counter}>
          {`${products.filter(product => product.category === 'accessories').length} models`}
        </p>
      </div>
    </div>
  );
};
