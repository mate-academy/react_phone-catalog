import { useContext } from 'react';
import classNames from 'classnames';

import styles from './CartItem.module.scss';
import { CartContext, CartProduct } from '../../context/CartProvider';

type Props = {
  product: CartProduct;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { name, itemId, image, price, quantity } = product;
  const { removeCartProduct, changeQuantityOfProduct } =
    useContext(CartContext);

  const currentPrice = price * quantity;

  return (
    <div className={styles['cart-item']}>
      <button
        className={classNames(
          'icon',
          'icon--close',
          styles['cart-item__close'],
        )}
        onClick={() => removeCartProduct(itemId)}
      />

      <div className={styles['cart-item__image']}>
        <img src={image} alt={name} />
      </div>

      <p className={styles['cart-item__name']}>{name}</p>

      <div className={classNames(styles['cart-item__counter'], styles.counter)}>
        <button
          className={classNames(styles.counter__button, styles.counter__item, {
            [styles['counter__button--disabled']]: quantity === 1,
          })}
          onClick={() => changeQuantityOfProduct(itemId, 'decrement')}
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
          onClick={() => changeQuantityOfProduct(itemId, 'increment')}
        >
          +
        </button>
      </div>

      <p className={styles['cart-item__price']}>${currentPrice}</p>
    </div>
  );
};
