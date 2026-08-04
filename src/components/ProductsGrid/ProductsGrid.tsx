import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import styles from './ProductsGrid.module.scss';

type Props = {
  products: Product[];
};

export const ProductsGrid = ({ products }: Props) => {
  return (
    <section className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.itemId} product={product} />
      ))}
    </section>
  );
};
