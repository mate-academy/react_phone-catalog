import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';
import { useAppDispatch } from '../../../../app/hooks';
import { actions as cartActions } from '../../../../features/cart/cart';
import { Cart } from '../../../../features/cart/types/Cart';

type Props = {
  product: Cart;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const isDisabled = product.quantity === 1;

  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__inner']}>
        <button
          className={styles['cart-item__delete']}
          onClick={() => dispatch(cartActions.removeFromCart(product.itemId))}
        >
          <img src="./img/icons/delete.svg" alt="X"></img>
        </button>

        <Link to={`../${product.category}/${product.itemId}`}>
          <img
            src={product.image}
            className={styles['cart-item__image']}
            alt="Product"
          />
        </Link>

        <h4 className={styles['cart-item__subtitle']}>{product.name}</h4>
      </div>

      <div className={styles['cart-item__buttons']}>
        <div className={styles['cart-item__counter']}>
          <button
            className={styles['cart-item__decrease']}
            onClick={() => dispatch(cartActions.decrease(product.itemId))}
            disabled={isDisabled}
            style={{ opacity: isDisabled ? '0.5' : '' }}
          >
            <img
              src="./img/icons/dec.svg"
              className={styles['shopping-cart__image']}
              alt="Decrease"
            ></img>
          </button>

          <div className={styles['cart-item__count']}>{product.quantity}</div>

          <button
            className={styles['cart-item__increase']}
            onClick={() => dispatch(cartActions.increase(product.itemId))}
          >
            <img
              src="./img/icons/inc.svg"
              className={styles['cart-item__image']}
              alt="Increase"
            ></img>
          </button>
        </div>

        <div className={styles['cart-item__price']}>
          ${product.price * product.quantity}
        </div>
      </div>
    </div>
  );
};
