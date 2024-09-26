import { FC } from 'react';
import styles from './PhonesPage.module.scss';
import { ProductList } from '../../components/ProductList';

export const PhonesPage: FC = () => {
  return (
    <div className={styles.listContainer}>
      <ProductList title="Phones page" />
    </div>
  );
};
