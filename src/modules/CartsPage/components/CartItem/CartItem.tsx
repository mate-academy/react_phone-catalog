import styles from './CartItem.module.scss';
import { useShop } from '../../../../store/shop/ShopContext';
import { CartItems } from '../../../../types/Product';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { closeIconMap } from '../../../shared/config/closeIconMap';
import { minusIconMap } from '../../../shared/config/minusIconMap';
import { plusIconMap } from '../../../shared/config/plusIconMap';
import { useSmoothNavigate } from '../../../../hooks/useSmoothNavigate';

type Props = {
  cart: CartItems;
};

export const CartItem: React.FC<Props> = ({ cart }) => {
  const { removeFromCart, decreaseQuantity, increaseQuantity } = useShop();
  const { theme } = useTheme();

  const smoothNavigate = useSmoothNavigate();

  return (
    <article className={styles.cartItem}>
      <div className={styles.top}>
        <button
          type="button"
          className={styles.removeButton}
          aria-label="Remove from cart"
          onClick={() => removeFromCart(cart.id)}
        >
          <img src={closeIconMap[theme].gray} alt="" />
        </button>
        <Link
          to={`/product/${cart.product.itemId}`}
          className={styles.imageLink}
          onClick={event => {
            smoothNavigate(event, `/product/${cart.product.itemId}`);
          }}
        >
          <img
            src={`${cart.product.image}`}
            alt={cart.product.name}
            className={styles.image}
          />
        </Link>
        <Link
          to={`/product/${cart.product.itemId}`}
          className={styles.title}
          onClick={event => {
            smoothNavigate(event, `/product/${cart.product.itemId}`);
          }}
        >
          {cart.product.name}
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.quantityControls}>
          <button
            type="button"
            className={styles.quantityButton}
            aria-label="Decrease quantity"
            onClick={() => decreaseQuantity(cart.id)}
            disabled={cart.quantity === 1}
          >
            <img
              src={
                cart.quantity === 1
                  ? minusIconMap[theme].disabled
                  : minusIconMap[theme].active
              }
              alt=""
            />
          </button>
          <span className={styles.quantity}>{cart.quantity}</span>
          <button
            type="button"
            className={styles.quantityButton}
            aria-label="Increase quantity"
            onClick={() => increaseQuantity(cart.id)}
            disabled={cart.quantity >= 99}
          >
            <img
              src={
                cart.quantity >= 99
                  ? plusIconMap[theme].disabled
                  : plusIconMap[theme].active
              }
              alt=""
            />
          </button>
        </div>
        <span className={styles.price}>{`$${cart.product.price}`}</span>
      </div>
    </article>
  );
};
