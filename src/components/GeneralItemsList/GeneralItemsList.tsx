import { Product } from '../../types/products';
import { ItemsProduct } from '../ItemsProduct';
import styles from './GeneralItemsList.module.scss';

export type GeneralItemsProps = {
  filteredProducts: Product[];
};

export const GeneralItemsList: React.FC<GeneralItemsProps> = ({
  filteredProducts,
}) => {
  return (
    <>
      <div className={styles.itemsListPhones}>
        {filteredProducts.map(phone => (
          <ItemsProduct product={phone} discount={true} key={phone.id} />
        ))}
      </div>
    </>
  );
};
