import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isInCart = cart.some(item => item.product.id === product.id);
  const favorite = isFavorite(product.id);

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageWrapper}>
        <img
          src={`./${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        {product.fullPrice > product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span>Screen</span>
          <span>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <span>Capacity</span>
          <span>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span>RAM</span>
          <span>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className={`${styles.buttonAdd} ${isInCart ? styles.buttonAdded : ''}`}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          onClick={() => toggleFavorite(product)}
          className={`${styles.buttonFavorite} ${favorite ? styles.buttonFavoriteActive : ''}`}
          aria-label="Add to favorites"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={
                'M7.9996 2.72314' +
                'C6.18365 1.05318 3.32766 1.13524 1.60741 2.85549' +
                'C-0.150244 4.61315 -0.150244 7.46271 1.60741 9.22037' +
                'L7.9996 15.6126' +
                'L14.3918 9.22037' +
                'C16.1495 7.46271 16.1495 4.61315 14.3918 2.85549' +
                'C12.6715 1.13524 9.81555 1.05318 7.9996 2.72314Z' +
                'M2.55022 3.7983' +
                'C3.79978 2.54874 5.82914 2.54874 7.0787 3.7983' +
                'L7.9996 4.7192' +
                'L8.92051 3.7983' +
                'C10.1701 2.54874 12.1994 2.54874 13.449 3.7983' +
                'C14.6985 5.04786 14.6985 7.07722 13.449 8.32678' +
                'L7.9996 13.7762' +
                'L2.55022 8.32678' +
                'C1.30066 7.07722 1.30066 5.04786 2.55022 3.7983Z'
              }
              fill={favorite ? '#EB5757' : '#0F0F11'}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
