import React from 'react';
import { ProductsList } from '../../components/ProductsList';
import { ProductsCategory } from '../../types/ProductsCategory';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './PhonesPage.module.scss';

export const PhonesPage: React.FC = () => {
  return (
    <div className="page-container">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Phones' }]} />
      <div className={styles.phonesPage}>
        <div className={styles.phonesPage__list}>
          <ProductsList productsCategory={ProductsCategory.PHONES} />
        </div>
      </div>
    </div>
  );
};