import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products__list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} withFullPrice={false} />
      ))}
    </div>
  );
};
