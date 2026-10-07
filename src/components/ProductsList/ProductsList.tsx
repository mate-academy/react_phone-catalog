import styles from './ProductsList.module.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../../modules/ProductPage';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <section className={styles.products_list}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} fullWidth />
      ))}
    </section>
  );
};
