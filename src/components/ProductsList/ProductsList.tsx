import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.products}>
      {products.map((product: Product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
