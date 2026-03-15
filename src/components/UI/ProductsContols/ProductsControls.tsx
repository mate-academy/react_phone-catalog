import styles from './ProductsControls.module.scss';
import { ItemsOnPage } from '../ItemsOnPage';
import { SortByChar } from '../SortByChar';

export const ProductControls: React.FC = () => {
  return (
    <div className={styles.selectContainer}>
      <SortByChar />
      <ItemsOnPage />
    </div>
  );
};
