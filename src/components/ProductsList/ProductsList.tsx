import styles from './ProductsList.module.scss';
import ProductCard from '../ProductCard/index';

interface ProductsListProps {
  products?: any[];
  onAddToCart?: (product: any) => void;
  onToggleFavorite?: (productId: any)=> void;
  emptyMessage?: string;
}

export const ProductsList = ({
  products = [],
  onAddToCart,
  onToggleFavorite,
  emptyMessage = 'There are no products yet',
}: ProductsListProps) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <ul className={styles.list}>
      {products.map(product => (
        <li key={product.id} className={styles.item}>
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
};
