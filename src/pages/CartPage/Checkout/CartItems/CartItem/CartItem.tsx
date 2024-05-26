import styles from './CartItem.module.scss';
import closeImg from './../../../../../images/icons/close.svg';
import minus_fulfilled from './../../../../../images/icons/minus_fulfilled.svg';
import plus from './../../../../../images/icons/plus.svg';
import React from 'react';
import { Product } from '../../../../../utils/types/Product';
import { useAppDispatch } from '../../../../../hooks/hooks';
import {
  handleAddQuantity,
  removeFromCart,
  handleMinusQuantity,
} from '../../../../../features/cart/cartSlise';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { image, name, price, quantity, id } = product;

  const dispatch = useAppDispatch();

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__wrapper}>
        <div className={styles.cartItem__btn}>
          <button
            className={styles.cartItem__button}
            onClick={() => dispatch(removeFromCart(product))}
          >
            <img src={closeImg} alt="closeIcon" />
          </button>
        </div>
        <div className={styles.cartItem__img}>
          <img
            src={image}
            alt="cart Image"
            className={styles.cartItem__picture}
          />
        </div>
        <p className={styles.cartItem__title}>{name}</p>
        <div className={styles.cartItem__counter}>
          <div className={styles.cartItem__count_wrapper}>
            <button
              className={styles.cartItem__decrease}
              onClick={() => dispatch(handleMinusQuantity(id))}
            >
              <img src={minus_fulfilled} alt="Minus icon" />
            </button>
            <p className={styles.cartItem__count}>{quantity}</p>
            <button
              className={styles.cartItem__increase}
              onClick={() => dispatch(handleAddQuantity(id))}
            >
              <img src={plus} alt="Plus icon" />
            </button>
          </div>
        </div>
        <h3 className={styles.cartItem__price}>$ {price}</h3>
      </div>
    </div>
  );
};
