import React from 'react';
import { ProductsList } from '../../components/ProductsList';
import { ProductsCategory } from '../../types/ProductsCategory';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './Accessories.module.scss';

export const AccessoriesPage: React.FC = () => {
  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessories' }]} />
      <div className={styles.accessoriesPage}>
        <div className={styles.accessoriesPage__list}>
          <ProductsList productsCategory={ProductsCategory.ACCESSORIES} />
        </div>
      </div>
    </div>
  );
}; 