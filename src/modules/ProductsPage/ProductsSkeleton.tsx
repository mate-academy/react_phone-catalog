import React from 'react';
import styles from './ProductsPage.module.scss';
import classNames from 'classnames';
import { ListSkeleton } from './components/ProductList/ListSkeleton';

export const ProductsSkeleton: React.FC = () => (
  <div className={classNames(styles.container, styles.products)}>
    <h1 className={classNames(styles.pageHead, styles.skeleton__header)} />

    <div className={classNames(styles.products__sort, styles.sort)}>
      <div
        className={classNames(
          styles.sort__dropDown,
          styles['sort__dropDown-date'],
          styles.skeleton__dropdown,
        )}
      />

      <div
        className={classNames(
          styles.sort__dropDown,
          styles['sort__dropDown-amount'],
          styles.skeleton__dropdown,
        )}
      />
    </div>
    <ListSkeleton />
  </div>
);
