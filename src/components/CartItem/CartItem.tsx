import React from 'react';

import styles from './CartItem.module.scss';

import { CartItemType } from '../../types/cart-item.types';
import { useCart } from '../../hooks/useCart';
import { getProductPrice } from '../../utils/priceHelper';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const { currentPrice } = getProductPrice(product);
  const totalItemPrice = currentPrice * quantity;

  const productImage =
    (product.images && product.images[0]) ||
    product.image ||
    'img/product-not-found.png';

  return (
    <div className={styles.cartItem}>
      <div className={styles.leftBloc}>
        <button
          className={styles.button}
          onClick={() => removeFromCart(product.id)}
        >
          X
        </button>
        <img
          className={styles.icon}
          src={`${import.meta.env.BASE_URL}${productImage}`}
          alt={product.name}
          onError={event => {
            const target = event.currentTarget as HTMLImageElement;

            target.src = 'img/product-not-found.png';
          }}
        />
        <p className={styles.productName}>{product.name}</p>
      </div>

      <div className={styles.rightBloc}>
        <div className={styles.counter}>
          <button
            className={styles.buttonQuantity}
            onClick={() => decreaseQuantity(product.id)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={styles.buttonQuantity}
            onClick={() => increaseQuantity(product.id)}
          >
            +
          </button>
        </div>
        <div className={styles.price}>${totalItemPrice}</div>
      </div>
    </div>
  );
};
