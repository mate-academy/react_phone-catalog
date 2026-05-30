import React from 'react';
import styles from './CartItem.module.scss';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
type Props = {
  product: Product;
  quantity: number;
};
export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className={styles.cartItem}
    >
      <div className={styles.cartItem__top}>
        <button
          className={styles.cartItem__remove}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            removeFromCart(product.itemId);
          }}
        >
          <img src="img/icons/icone-close.svg" alt="remove" />
        </button>
        <img
          className={styles.cartItem__img}
          src={product.image}
          alt={product.name}
        />
        <p className={styles.cartItem__name}>{product.name}</p>
      </div>

      <div className={styles.cartItem__bottom}>
        <div className={styles.cartItem__counter}>
          <button
            className={styles.cartItem__counter__btn}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              updateQuantity(product.itemId, quantity - 1);
            }}
            disabled={quantity <= 1}
          >
            —
          </button>
          <span className={styles.cartItem__counter__value}>{quantity}</span>
          <button
            className={styles.cartItem__counter__btn}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              updateQuantity(product.itemId, quantity + 1);
            }}
          >
            +
          </button>
        </div>
        <p className={styles.cartItem__price}>${product.price * quantity}</p>
      </div>
    </Link>
  );
};
