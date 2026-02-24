import styles from './ProductsList.module.scss';
import ProductCard from '../ProductCard/index';

interface ProductsListProps {
  products?: any[];
  handleAddToCart?: (product: any) => void;
  handleToggleFavorite?: (productId: any) => void;
  emptyMessage?: string;
}

export const ProductsList = ({
  products,
  handleAddToCart,
  handleToggleFavorite,
  emptyMessage = 'There are no products yet',
}: ProductsListProps) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.productsList}>
      <div className={styles.productsList__title}></div>
      <div className={styles.productsList__topBar}>
        <div className={`${styles.productsList__icons} ${styles.icons}`}></div>
      </div>

      <div className={styles.productsList__content}>
        <div className={styles.productsList__list}>
          {products.map((product, i) => (
            <ProductCard
              product={product}
              index={i}
              className={styles.productsList__product}
              handleAddToCart={handleAddToCart}
              handleToggleFavorite={handleToggleFavorite}
              key={product?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
