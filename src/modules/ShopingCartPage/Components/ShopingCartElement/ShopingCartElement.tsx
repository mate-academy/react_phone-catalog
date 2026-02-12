import React from 'react';
import {
  ProductInCart,
  useProductInCart,
} from '../../../shared/Utills/ShopingCartContext';
import styles from './ShopingCartElement.module.scss';

type Props = {
  product: ProductInCart;
};

export const ShopingCartElement: React.FC<Props> = ({ product }) => {
  const { dispatch } = useProductInCart();

  const toggleRemove = (productt: ProductInCart) => {
    dispatch({ type: 'REMOVE', payload: productt });
  };

  const toggleDecrement = (productId: string) => {
    dispatch({ type: 'DECREMENT', payload: productId });
  };

  const toggleIncrement = (productId: string) => {
    dispatch({ type: 'INCREMENT', payload: productId });
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__top}>
        <button
          className={styles.cartItem__remove}
          onClick={() => toggleRemove(product)}
        >
          <span />
        </button>

        <div className={styles.cartItem__imageContainer}>
          <img
            className={styles.cartItem__image}
            src={product.product.image}
            alt=""
          />
        </div>

        <p className={styles.cartItem__name}>{product.product.name}</p>
      </div>

      <div className={styles.cartItem__bottom}>
        <div className={styles.cartItem__quantity}>
          <button
            className={styles.cartItem__decrement}
            onClick={() => toggleDecrement(product.id)}
            disabled={product.quantity <= 1}
          ></button>

          <p className={styles.cartItem__value}>{product.quantity}</p>

          <button
            className={styles.cartItem__increment}
            onClick={() => toggleIncrement(product.id)}
          ></button>
        </div>
        <h3 className={styles.cartItem__price}>${product.product.price}</h3>
      </div>
    </div>
  );
};
