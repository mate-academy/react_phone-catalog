import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => {
  return (
    <div className={styles['products-list']} data-cy="ProductsList">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
