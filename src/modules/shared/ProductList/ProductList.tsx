import { Product } from '../../../types/Product';
import { ProductCard } from '../../HomePage/componets/ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
