import React from 'react';
import styles from './ProductList.module.scss';
import { Breadcrumbs } from '../Breadcrumbs';

export const ProductList: React.FC = () => {
  return (
    <div className={styles.ProductsPage}>
      <div className={styles.topContainer}>
        <Breadcrumbs />
        <h1 className={styles.title}>
          Title
        </h1>
        <p className={styles.count}>
          XX
        </p>
      </div>

      <p className={styles.noResult}>
        There are no category matching your query.
      </p>

      <div className={styles.sortBy}>
        PLACEHOLDER: DROPDOWN
      </div>

    </div>
  )
}
