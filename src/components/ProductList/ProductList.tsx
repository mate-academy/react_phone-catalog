import { ProductsType } from '../../types/Products';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  itemsList: ProductsType[];
};

export const ProductList: React.FC<Props> = ({ itemsList }) => {
  return (
    <div className={styles.itemsList}>
      {itemsList.map(item => (
        <div key={item.id} className={styles.item}>
          <ProductCard productItem={item} />
        </div>
      ))}
    </div>
  );
};
