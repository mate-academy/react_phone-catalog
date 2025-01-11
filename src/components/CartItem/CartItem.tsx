import React from 'react';
import styles from './CartItem.module.scss';
import { useDispatch } from 'react-redux';
import { deleteFromCart, setQuantity } from '../../features/cart';
import classNames from 'classnames';
import { Product } from '../../types/Product';

export const CartItem: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleDeleteFromCart = () => {
    dispatch(deleteFromCart(product.itemId));
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      dispatch(
        setQuantity({ itemId: product.itemId, quantity: product.quantity - 1 }),
      );
    }
  };

  const handleIncrease = () => {
    dispatch(
      setQuantity({ itemId: product.itemId, quantity: product.quantity + 1 }),
    );
  };

  return (
    <div className={styles['cart-item']}>
      <button className={styles['cross-button']} onClick={handleDeleteFromCart}>
        <img
          src="src/Images/Cross.svg"
          alt="Remove Item"
          className={styles['cross-icon']}
        />
      </button>

      <img
        src={product.image}
        alt="Product"
        className={styles['product-image']}
      />

      <p className={styles['product-name']}>{product.name}</p>

      <div className={classNames(styles['quantity-wrapper'])}>
        <button
          className={classNames(styles['decrease-button'], styles.button, {
            [styles.disabled]: product.quantity === 1,
          })}
          onClick={handleDecrease}
        >
          <img
            src="src/Images/Minus.svg"
            alt="Decrease"
            className={classNames(styles['decrease-icon'], styles.icon)}
          />
        </button>
        <p className={styles.quantity}>{product.quantity}</p>
        <button
          className={classNames(styles['increase-button'], styles.button)}
          onClick={handleIncrease}
        >
          <img
            src="src/Images/Plus.svg"
            alt="Increase"
            className={classNames(styles['increase-icon'], styles.icon)}
          />
        </button>
      </div>

      <h3 className={styles['product-price']}>${product.price}</h3>
    </div>
  );
};
