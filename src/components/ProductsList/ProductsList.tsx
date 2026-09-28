import { ProductCard } from '../ProductCard';
import { Product } from '../../modules/shared/types/Product';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList = ({ products }: Props) => (
  <div className={styles.list}>
    {products.map(product => (
      <ProductCard product={product} key={product.itemId} />
    ))}
  </div>
);
