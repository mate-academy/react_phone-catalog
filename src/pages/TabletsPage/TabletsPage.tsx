import React from 'react';
import { ProductsList } from '../../components/ProductsList';
import { ProductsCategory } from '../../types/ProductsCategory';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './TabletsPage.module.scss';

export const TabletsPage: React.FC = () => {
  return (
    <div className="page-container">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: 'Tablets' }]}
      />
      <div className={styles.tabletsPage}>
        <div className={styles.tabletsPage__list}>
          <ProductsList productsCategory={ProductsCategory.TABLETS} />
        </div>
      </div>
    </div>
  );
};
