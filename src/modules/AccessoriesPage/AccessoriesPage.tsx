import { FC } from 'react';
import { Category } from '../../types/Category';
import styles from './AccessoriesPage.module.scss';
import { ProductList } from '../../components/ProductList';

export const AccessoriesPage: FC = () => {
  return (
    <div className={styles.listContainer}>
      <ProductList category={Category.ACCESSORIES} title="Accessories page" />
    </div>
  );
};
