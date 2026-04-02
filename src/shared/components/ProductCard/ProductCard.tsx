import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import type { Product } from '../../../types';
import { ProductActions } from '../ProductActions';

type Props = {
  product: Product;
  productId: string;
  isInCart?: boolean;
  isFavorite?: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const ProductCard = ({
  product,
  isInCart = false,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,
}: Props) => {
  const { name, image, price, fullPrice, screen, capacity, ram } = product;
  const productId = product.itemId;

  return (
    <article className={styles.card}>
      <Link to={`/product/${productId}`} className={styles.mediaLink}>
        <img
          className={styles.image}
          src={`/${image}`}
          alt={name}
          loading="lazy"
        />
      </Link>

      <h2 className={styles.title}>
        <Link to={`/product/${productId}`} className={styles.titleLink}>
          {name}
        </Link>
      </h2>

      <div className={styles.prices}>
        <span className={styles.price}>${price}</span>
        <span className={styles.fullPrice}>${fullPrice}</span>
      </div>
      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.spec__label}>Screen</span>
          <span className={styles.spec__value}>{screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.spec__label}>Capacity</span>
          <span className={styles.spec__value}>{capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.spec__label}>RAM</span>
          <span className={styles.spec__value}>{ram}</span>
        </div>
      </div>
      <ProductActions
        product={product}
        isInCart={isInCart}
        isFavorite={isFavorite}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
      />
    </article>
  );
};
