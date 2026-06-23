import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../types/Product';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
