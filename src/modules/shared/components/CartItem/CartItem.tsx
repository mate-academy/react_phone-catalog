import React, { useContext } from 'react';
import { Product } from '../../../../types';
import styles from './CartItem.module.scss';
import { CartContext } from '../../../../context/CartContext';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem = ({ product, quantity }: Props) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div className={styles.cartItem}>
      <div className={styles.first_part}>
        <button
          onClick={() => removeFromCart(product.id)}
          className={styles.close}
        >
          <img src="img/icons/Close.svg" alt="delete" />
        </button>
        <div className={styles.product_img}>
          <img src={`/${product.image}`} alt={product.name} />
        </div>
        <Link to={`/product/${product.id}`} className={styles.product_link}>
          {product.name}
        </Link>
      </div>
      <div className={styles.second_part}>
        <div className={styles.block_quantity}>
          <button
            disabled={quantity === 1}
            className={quantity === 1 ? styles.iconDisabled : styles.icon}
            onClick={() => {
              updateQuantity(product, quantity - 1);
            }}
          >
            <img src="img/icons/Minus.svg" alt="decrease quantity" />
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            className={styles.icon}
            onClick={() => {
              updateQuantity(product, quantity + 1);
            }}
          >
            <img src="img/icons/Plus.svg" alt="increase quantity" />
          </button>
        </div>
        <p className={styles.price}>${product.price}</p>
      </div>
    </div>
  );
};
