import { Product } from '../../../../types';
import { ProductCard } from '../../../shared/components/ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => (
  <div className={styles.grid}>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
