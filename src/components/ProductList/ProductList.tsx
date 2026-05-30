import { Product } from '../../types/ProductTypes';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from '../ProductList/ProductListStyles.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className={styles.ProductMargin}>
        {products.map(product => (
          <ProductCard product={product} isExtended={true} />
        ))}
      </div>
    </>
  );
};
