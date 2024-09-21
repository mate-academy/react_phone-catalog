import { FC } from 'react';
import { Category } from '../../types/Category';
import styles from './PhonesPage.module.scss';
import { ProductList } from '../../components/ProductList';

export const PhonesPage: FC = () => {
  return (
    <div className={styles.listContainer}>
      <ProductList category={Category.PHONES} title="Phones page" />
    </div>
  );
};
