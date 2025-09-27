import React, { useContext } from 'react';
import { CartContext, CartProduct } from '../../context/CartProvider';
import styles from './CartItem.module.scss';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  product: CartProduct;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const { name, category, itemId, price, image, quantity } = product;
  const { removeCartProduct, changeQuantity } = useContext(CartContext);

  const currentPrice = price * quantity;

  const { pathname } = useLocation();
  const pathnameCategory = pathname.split('/')[1];
  const link =
    pathnameCategory !== category ? `/${category}/${itemId}` : itemId;

  return (
    <div className={styles['cart-item']}>
      <button
        className={classNames(
          'icon',
          'icon--close',
          styles['cart-item__close'],
        )}
        onClick={() => removeCartProduct(itemId)}
      ></button>

      <div className={styles['cart-item__image']}>
        <img src={image} alt={name} />
      </div>

      <Link className={styles['cart-item__item-name']} to={link}>
        <h3>{name}</h3>
      </Link>

      <div className={classNames(styles['cart-item__counter'], styles.counter)}>
        <button
          className={classNames(styles.counter__button, styles.counter__item, {
            [styles['counter__button--disabled']]: quantity === 1,
          })}
          onClick={() => changeQuantity(itemId, 'decrement')}
        >
          -
        </button>

        <span
          className={classNames(styles.counter__value, styles.counter__item)}
        >
          {quantity}
        </span>

        <button
          className={classNames(styles.counter__button, styles.counter__item)}
          onClick={() => changeQuantity(itemId, 'increment')}
        >
          +
        </button>
      </div>

      <p className={styles['cart-item__price']}>${currentPrice}</p>
    </div>
  );
};
