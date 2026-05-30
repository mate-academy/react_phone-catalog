import React from 'react';
import styles from './CartItems.module.scss';
import iconStyles from '../Icon/Icon.module.scss';
import { Product } from '../../../public/api/types/Product';
import { Link } from 'react-router-dom';

type CartItemsProps = {
  product: Product;
  quantity: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
  handleRemoveFromCart: () => void;
};

export const CartItems: React.FC<CartItemsProps> = ({
  product,
  quantity,
  handleDecrease,
  handleIncrease,
  handleRemoveFromCart,
}) => {
  const isDisabled = quantity === 1;

  return (
    <>
      <div className={styles.productCard__productInfo}>
        <div className={styles.productCard__productImageContainer}>
          <Link
            to={`/${product.category}/${product.id}`}
            className={styles.cartLink}
          >
            <img
              src={product?.image}
              alt={product?.name ?? 'Product Image'}
              className={styles.productCard__productImage}
            />
          </Link>
        </div>
        <div className={styles.productCard__productName}>
          <Link
            to={`/${product.category}/${product.id}`}
            className={styles.cartLink}
          >
            {product.name}
          </Link>
        </div>

        <div className={styles.productCard__buttons}>
          <button
            className={`${styles.button} ${isDisabled ? styles.disabled : ''}`}
            onClick={handleDecrease}
            disabled={isDisabled}
          >
            <span className={`${iconStyles['icon--round']}`}>-</span>
          </button>
          <span className={styles.productCard__quantity}>{quantity}</span>
          <button onClick={handleIncrease} className={styles.button}>
            <span className={`${iconStyles['icon--round']}`}>+</span>
          </button>
        </div>
        <p className={styles.productCard__productPrice}>
          ${(Number(product.price) * quantity).toFixed(2)}
        </p>

        <button
          type="button"
          onClick={handleRemoveFromCart}
          aria-label="Remove from cart"
          className={`${iconStyles.icon} ${iconStyles['icon--close']} ${styles.productCard__removeIcon}`}
        ></button>
      </div>
    </>
  );
};
