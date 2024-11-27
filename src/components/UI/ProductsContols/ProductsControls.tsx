import styles from './ProductsControls.module.scss';
import { ItemsOnPage } from '../ItemsOnPage';
import { SortByChar } from '../SortByChar';
import { Product } from '../../../types/Product';

type Props = {
  filteredProducts: Product[];
  onSortChange: (sortedProducts: Product[]) => void;
};

export const ProductControls: React.FC<Props> = ({
  filteredProducts,
  onSortChange,
}) => {
  return (
    <div className={styles.selectContainer}>
      <SortByChar
        filteredProducts={filteredProducts}
        onSortChange={onSortChange}
      />
      <ItemsOnPage />
    </div>
  );
};
