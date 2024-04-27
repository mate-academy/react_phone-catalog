import { ProductsList } from "../../../../PhonePage/components/ProductsList";
import { SortProduct } from "../../../../PhonePage/components/SortProduct/SortProduct";
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => {

  return (
    <div className={styles.container}>
      <SortProduct
      />
      <ProductsList
      />
    </div>
  );
};
