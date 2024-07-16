import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsTable.module.scss';

type Props = {
  products: Product[];
};

export const ProductsTable: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productsTable}>
      <div className={styles.container}>
        {products.map(item => (
          <ProductCard product={item} key={item.id} isDiscountVisible={true} />
        ))}
      </div>
    </div>
  );
};
