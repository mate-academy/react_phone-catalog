import { ProductsList } from '../../../PhonePage/components/ProductsList';
// eslint-disable-next-line max-len
import { SortProduct } from '../../../PhonePage/components/SortProduct/SortProduct';
import styles from './TabletsPage.module.scss';

export const TabletsPage = () => {
  return (
    <div className={styles.container}>
      <SortProduct />
      <ProductsList />
    </div>
  );
};
