import React from 'react';
import { AllItemsList } from '../../components/AllItemsList';
import styles from './ProductsCatalogPage.module.scss';
import { Product } from '../../utils/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  title: string;
  allItems: Product[];
  setAllItems: (el: Product[]) => void;
  path: string;
};

export const ProductsCatalogPage: React.FC<Props> = ({
  title,
  allItems,
  setAllItems,
  path,
}) => {
  return (
    <div className={styles.catalog}>
      <Breadcrumbs />

      <div className={styles.title}>
        <h1 className={styles.title__name}>{title}</h1>
        <p className={styles.title__quantity}>{allItems.length} models</p>
      </div>

      <AllItemsList
        path={path}
        allItems={allItems}
        setAllItems={setAllItems}
        categoryName={title}
      />
    </div>
  );
};
