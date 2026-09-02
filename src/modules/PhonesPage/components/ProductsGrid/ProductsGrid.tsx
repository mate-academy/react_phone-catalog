/* eslint-disable prettier/prettier */
import { Product } from '../../../../types/Product';
import { ProductCard } from '../../../../components/ProductCard';
import styles from './ProductsGrid.module.scss';

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.itemId} product={product} />
      ))}
    </div>
  );
};
