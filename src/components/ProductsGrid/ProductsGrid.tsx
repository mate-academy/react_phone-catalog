import { Products } from '../../types/Products';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsGrid.module.scss';

type Props = {
  products: Products[];
};

export const ProductsGrid: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.gridContainer}>
      {products.map(product => {
        return (
          <div className={styles.item} key={product.itemId}>
            <ProductCard
              product={product}
              showDiscount={true}
              variant={'grid'}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
