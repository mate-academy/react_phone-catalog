import { ProductFull } from '../../../types/Product_full';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

type Props = {
  products: ProductFull[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <section className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
