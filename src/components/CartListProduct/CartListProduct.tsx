import React, { useContext } from 'react';
import { CartItem } from '../../types/CartItem';
import styles from './CartListProduct.module.scss';
import { CartContext } from '../../context/CartContext';

type Props = {
  cartItem: CartItem;
};
export const CartListProduct: React.FC<Props> = ({ cartItem }) => {
  const { product } = cartItem;
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('Must be used within a CartProvider');
  }

  const { increaseQuantity, decreaseQuantity, removeFromCart } = cartContext;

  return (
    <div className={styles.item}>
      <div className={styles.cartItemRow}>
        <button
          className={styles.closeButton}
          onClick={() => removeFromCart(cartItem.id)}
        >
          <img
            src="/img/icons/icon-close.svg"
            alt="Close"
            className={styles.iconClose}
          />
        </button>

        <div className={styles.productImage}>
          <img src={product.image} alt={product.title} className={styles.img} />
        </div>

        <span className={styles.title}>{product.title}</span>
      </div>

      <div className={styles.cartItemRow}>
        <div className={styles.quantityCounter}>
          <button
            className={styles.quantityIcon}
            onClick={() => decreaseQuantity(cartItem.id)}
            disabled={cartItem.quantity === 1}
          >
            <img
              src="/img/icons/icon-minus.svg"
              alt="Decrease quantity"
              className={styles.icon}
            />
          </button>

          <span className={styles.counter}>{cartItem.quantity}</span>

          <button
            className={styles.quantityIcon}
            onClick={() => increaseQuantity(cartItem.id)}
          >
            <img
              src="/img/icons/icon-plus.svg"
              alt="Decrease quantity"
              className={styles.icon}
            />
          </button>
        </div>

        <span
          className={styles.price}
        >{`$${product.finalPrice * cartItem.quantity}`}</span>
      </div>
    </div>
  );
};
