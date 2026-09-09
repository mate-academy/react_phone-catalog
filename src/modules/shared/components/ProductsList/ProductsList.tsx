import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  // Hot prices показывает старую цену зачёркнутой, Brand new — нет
  showFullPrice?: boolean;
};

export const ProductsList = ({ products, showFullPrice }: Props) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          showFullPrice={showFullPrice}
        />
      ))}
    </div>
  );
};
