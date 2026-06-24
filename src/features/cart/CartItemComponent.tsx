import React from 'react';
import styles from '@/pages/Cart/Cart.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CartProduct } from './hooks/useCartProducts';
import { useTheme } from '@/app/providers/ThemeContext';
import { useAppDispatch } from '@/store/hooks';
import {
  removeFromCart,
  increaseQuantity,
  reduceQuantity,
} from '@/store/slices/cartSlice';

import { IconClose } from '@/shared/ui/Icons/IconClose';
import { IconMinus } from '@/shared/ui/Icons/IconMinus';
import { IconPlus } from '@/shared/ui/Icons/IconPlus';

type CartItemProps = {
  item: CartProduct;
};

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <div className={styles.item}>
      <button
        onClick={() => dispatch(removeFromCart(item.itemId))}
        className={styles.removeButton}
        aria-label="Remove item"
      >
        <IconClose />
      </button>

      <Link
        to={`/${item.category}/${item.itemId}`}
        className={styles.imageWrapper}
      >
        <img src={item.image} alt={item.name} />
      </Link>

      <div className={styles.nameWrapper}>
        <span className={styles.name}>{item.name}</span>
      </div>

      <div className={styles.quantityBlock}>
        <button
          className={classNames(styles.quantityButton, {
            [styles['quantityButton--dark']]: theme === 'dark',
          })}
          disabled={item.quantity <= 1}
          onClick={() => dispatch(reduceQuantity(item.itemId))}
          aria-label="Decrease quantity"
        >
          <IconMinus />
        </button>

        <span className={styles.quantity}>{item.quantity}</span>

        <button
          className={classNames(styles.quantityButton, {
            [styles['quantityButton--dark']]: theme === 'dark',
          })}
          onClick={() => dispatch(increaseQuantity(item.itemId))}
          aria-label="Increase quantity"
        >
          <IconPlus />
        </button>
      </div>

      <div className={styles.priceWrapper}>
        <span className={styles.price}>
          ${(item.price * item.quantity).toFixed(0)}
        </span>
      </div>
    </div>
  );
};

export default CartItemComponent;
