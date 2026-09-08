import React, { useContext } from 'react';
import styles from './CartProduct.module.scss';
import { CartItem } from '../../utils/types';
import { QuantityButton } from '../QuantityButton';
import { Title } from '../Title';
import { CartContext } from '../../context/CartContext';
import { BASE_URL } from '../../utils/constants';

type Props = {
  cartProduct: CartItem;
};
export const CartProduct: React.FC<Props> = ({ cartProduct }) => {
  const product = cartProduct.product;
  const { setCart } = useContext(CartContext);

  // #region functions

  function handleProductDelete(id: number) {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  function handleQantityDecrease(id: number) {
    setCart(prevCart =>
      prevCart.map((cartItem: CartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else {
          return cartItem;
        }
      }),
    );
  }

  function handleQantityIncrease(id: number) {
    setCart(prevCart =>
      prevCart.map((cartItem: CartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      }),
    );
  }

  // #endregion

  return (
    <div className={styles.cartProduct}>
      <div className={styles.cartProduct__top}>
        <button
          className={styles.cartProduct__buttonClose}
          onClick={() => {
            handleProductDelete(cartProduct.id);
          }}
        >
          <div className={styles.cartProduct__deleteIcon}></div>
        </button>

        <img
          src={`${BASE_URL}/${product.image}`}
          className={styles.cartProduct__image}
          alt="product image"
        />
        <p className={styles.cartProduct__name}>{product.name}</p>
      </div>
      <div className={styles.cartProduct__bottom}>
        <div className={styles.cartProduct__buttons}>
          <QuantityButton
            type={'minus'}
            disabled={cartProduct.quantity === 1}
            onClick={() => {
              handleQantityDecrease(cartProduct.id);
            }}
          />
          <p className={styles.cartProduct__quantity}>{cartProduct.quantity}</p>
          <QuantityButton
            type={'plus'}
            onClick={() => {
              handleQantityIncrease(cartProduct.id);
            }}
          />
        </div>
        <div className={styles.cartProduct__price}>
          <Title level={3}> {`$${product.price}`} </Title>
        </div>
      </div>
    </div>
  );
};
