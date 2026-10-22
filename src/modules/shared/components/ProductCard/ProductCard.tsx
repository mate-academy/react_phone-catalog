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
          src={`${import.meta.env.BASE_URL}${product.image}`}
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
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              d={[
                'M20.8 4.6a5.5 5.5 0 0 0-7.8 0',
                'L12 5.7l-1.1-1.1',
                'a5.5 5.5 0 0 0-7.8 7.8',
                'L12 21l8.8-8.6',
                'a5.5 5.5 0 0 0 0-7.8Z',
              ].join('')}
            />
          </svg>
        </button>
      </div>
    </article>
  );
};
