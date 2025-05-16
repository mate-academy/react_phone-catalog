import { ProductCard } from '../../../Home page/components/ProductCard/ProductCard';
import styles from './ProductsList.module.scss';
type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.ProductsList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
