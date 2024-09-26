import { FC } from 'react';
import styles from './TabletsPage.module.scss';
import { ProductList } from '../../components/ProductList';

export const TabletsPage: FC = () => {
  return (
    <div className={styles.listContainer}>
      <ProductList title="Tablets page" />
    </div>
  );
};
