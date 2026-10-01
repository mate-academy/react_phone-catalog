import type { Product } from '../../shared/types';

import ProductCard from '../ProductCard';

import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
  navigate: (to: string) => void;
};

export default function ProductsList({ products, navigate }: Props) {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} navigate={navigate} />
      ))}
    </div>
  );
}
