import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  hideDiscount?: boolean;
};

export const ProductsList = ({ products, hideDiscount = false }: Props) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          hideDiscount={hideDiscount}
        />
      ))}
    </div>
  );
};
