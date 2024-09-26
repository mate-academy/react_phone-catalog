import { FC } from 'react';
import styles from './AccessoriesPage.module.scss';
import { ProductList } from '../../components/ProductList';

export const AccessoriesPage: FC = () => {
  return (
    <div className={styles.listContainer}>
      <ProductList title="Accessories page" />
    </div>
  );
};
