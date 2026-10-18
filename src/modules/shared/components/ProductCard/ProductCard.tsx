import { Link } from 'react-router-dom';

import { useShop } from '../../../../context/ShopContext';
import type { Product } from '../../../../types';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { cartItems, favoriteItems, toggleCart, toggleFavorite } = useShop();

  const isInCart = cartItems.includes(product.itemId);
  const isFavorite = favoriteItems.includes(product.itemId);

  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`}>
        <img
          className={styles.image}
          src={`/${product.image}`}
          alt={product.name}
        />
      </Link>

      <h2 className={styles.name}>
        <Link to={`/product/${product.itemId}`}>{product.name}</Link>
      </h2>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>

        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <div className={styles.specs}>
        <p>Screen: {product.screen}</p>
        <p>Capacity: {product.capacity}</p>
        <p>RAM: {product.ram}</p>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cartButton}
          onClick={() => toggleCart(product.itemId)}
          aria-pressed={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={styles.favoriteButton}
          onClick={() => toggleFavorite(product.itemId)}
          aria-label={
            isFavorite
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
};
