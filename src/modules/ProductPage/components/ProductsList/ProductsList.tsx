import styles from './ProductsList.module.scss';
import { ProductCard } from '../../../../components/ProductCard';
import { Product } from '../../../../types/Product';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles['product-list']}>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
