import React, { useMemo } from 'react';
import { useCart } from '../../../shared/contexts/CartContext';
import { Cart } from '../../../shared/types/Cart';
import styles from './CartItem.module.scss';
import { Icon } from '../../../shared/components/Icon/Icon';
import { icons } from '../../../shared/constants/icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  cartProduct: Cart;
};

export const CartItem: React.FC<Props> = ({
  cartProduct: {
    id,
    product: { name, price, image, category, itemId },
    quantity,
  },
}) => {
  const { removeFromCart, updateQuantity } = useCart();

  const totalQuantity = useMemo(() => price * quantity, [price, quantity]);

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__top}>
        <button
          className={styles['cartItem__top-close']}
          onClick={() => removeFromCart(id)}
        />
        <Link to={`/${category}/${itemId}`} className={styles.cartItem__link}>
          <img src={image} alt="product" className={styles.cartItem__image} />
          <div className={styles.cartItem__title}>{name}</div>
        </Link>
      </div>
      <div className={styles.cartItem__bottom}>
        <div className={styles['cartItem__counter-container']}>
          <button
            className={classNames(styles.cartItem__button, {
              [styles['cartItem__button--disabled']]: quantity === 1,
            })}
            onClick={() => {
              if (quantity > 1) {
                updateQuantity(id, quantity - 1);
              }
            }}
          >
            {quantity === 1 ? (
              <Icon icon={icons.minus_disabled} />
            ) : (
              <Icon icon={icons.minus} />
            )}
          </button>
          <div className={styles.cartItem__counter}>{quantity}</div>
          <button
            className={styles.cartItem__button}
            onClick={() => {
              updateQuantity(id, quantity + 1);
            }}
          >
            <Icon icon={icons.plus} />
          </button>
        </div>
        <div className={styles.cartItem__price}>{`$${totalQuantity}`}</div>
      </div>
    </div>
  );
};
