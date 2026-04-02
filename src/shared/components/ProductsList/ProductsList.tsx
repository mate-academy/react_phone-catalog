import styles from './ProductsList.module.scss';
import type { Product } from '../../../types';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  cartIds?: Set<string>;
  favoriteIds?: Set<string>;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const ProductsList = ({
  products,
  cartIds,
  favoriteIds,
  onAddToCart,
  onToggleFavorite,
}: Props) => {
  return (
    <section className={styles.grid}>
      {products.map(product => {
        const productId = product.itemId ?? product.id;

        return (
          <ProductCard
            key={productId}
            product={product}
            productId={productId}
            isInCart={cartIds?.has(productId) ?? false}
            isFavorite={favoriteIds?.has(productId) ?? false}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </section>
  );
};
