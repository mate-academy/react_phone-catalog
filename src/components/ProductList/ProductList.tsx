import { Product } from 'src/types/Types';
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';

type Props = { products: Product[] };

export const ProductList = ({ products }: Props) => {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
