import { useState } from 'react';
import { BaseProduct } from '../../types/BaseProduct';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useCart } from '../../pages/CartPage/context/CartContext';

type Props = {
  product: BaseProduct;
  className?: string;
};

export const ProductCard = ({ product, className }: Props) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={`${styles.card} ${className || ''}`}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img src={product.image} alt="iphone" className={styles.image} />
      </Link>

      <Link to={`/${product.category}/${product.itemId}`}>
        <p className={styles.name}>{product.name}</p>
      </Link>

      <div className={styles.prices}>
        <p className={styles.price}>${product.price}</p>
        {product.price < product.fullPrice && (
          <p className={styles.fullPrice}>${product.fullPrice}</p>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue} title={product.screen}>
            {product.screen}
          </span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={classNames(styles.cartButton, {
            [styles.cartButtonActive]: isInCart(String(product.id)),
          })}
          onClick={() => {
            if (product) {
              if (isInCart(String(product.id))) {
                removeFromCart(String(product.id));
              } else {
                addToCart(product);
              }
            }
          }}
        >
          {isInCart(String(product?.id) ?? '')
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          className={classNames(styles.favoriteButton, {
            [styles.favoriteButtonActive]: isFavorite,
          })}
          onClick={() => {
            setIsFavorite(prev => !prev);
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
       2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
       C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isFavorite ? '#ac2424' : 'none'}
              stroke={isFavorite ? '#ac2424' : '#0F0F11'}
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
