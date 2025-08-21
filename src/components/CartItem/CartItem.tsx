import React from 'react';
import { Product } from '../../utils/Product';
import { ButtonScroll } from '../ButtonScroll';
import styles from './CartItem.module.scss';
import { useCart } from '../../context/CartContext/CartContext';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const getImageSrc = (src: string) => (src.startsWith('/') ? src : '/' + src);
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className={styles.cart}>
      <button
        onClick={() => removeFromCart(product.id)}
        className={styles.cartClose}
      >
        <img src="/img/icons/close-dark.svg" alt="close button" />
      </button>

      <div className={styles.cartImageWrapper}>
        <img
          className={styles.cartImage}
          src={getImageSrc(product.images[0])}
          alt="product image"
        />
      </div>

      <p className={styles.cartName}>{product.name}</p>

      <div className={styles.cartArrow}>
        <ButtonScroll
          buttonText="/img/icons/minus.svg"
          clickFunc={() => changeQuantity(product.id, -1)}
        />

        <p>{quantity}</p>

        <ButtonScroll
          buttonText="/img/icons/plus.svg"
          clickFunc={() => changeQuantity(product.id, 1)}
        />
      </div>

      <p className={styles.cartPrice}>${product.priceDiscount}</p>
    </div>
  );
};
