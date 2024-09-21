import { FC } from 'react';
import { Category } from '../../types/Category';
import styles from './TabletsPage.module.scss';
import { ProductList } from '../../components/ProductList';

export const TabletsPage: FC = () => {
  return (
    <div className={styles.listContainer}>
      <ProductList category={Category.TABLETS} title="Tablets page" />
    </div>
  );
};
