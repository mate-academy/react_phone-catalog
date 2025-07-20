import type { FC } from 'react';
import clsx from 'clsx';

import plus from '/icons/plus.svg';
import minus from '/icons/minus.svg';
import close from '/icons/close.svg';
import type { Product } from '../../../types/product';
import { useCartActionsStore } from '../../../hooks/useCartAndFavorites';

import styles from './CartCard.module.scss';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: Product;
  onRemove: (itemId: string) => void;
}

export const CartCard: FC<CartItemProps> = ({ item, onRemove }) => {
  const { cartValues, increaseQuantity, decreaseQuantity } =
    useCartActionsStore();

  return (
    <article className={styles.cartCard}>
      <div className={styles.itemHeader}>
        <button
          onClick={() => onRemove(item.id)}
          className={styles.removeButton}
        >
          <img
            src={close}
            alt="CLOSE BUTTON IMG"
            className={clsx(styles.closeIcon, 'app-icon')}
          />
        </button>

        <div className={styles.containerItemImage}>
          <Link
            to={`/${item.category}/${item.itemId}`}
            className={styles.link}
          >
            <img
              src={item.image}
              alt={item.name}
              className={styles.itemImage}
            />
          </Link>
        </div>

        <div className={styles.itemName}>
          <h3>{item.name}</h3>
        </div>
      </div>

      <div className={styles.quantityControl}>
        <div className={styles.addAndSubtructButtons}>
          <button
            onClick={() => decreaseQuantity(item.id)}
            disabled={cartValues[item.id] === 1}
            className={styles.minusBotton}
          >
            <img
              src={minus}
              alt="MINUS BUTTON IMG"
              className={clsx(styles.minusImg, 'app-icon')}
            />
          </button>

          <div className={styles.quantity}>{cartValues[item.id]}</div>

          <button
            onClick={() => increaseQuantity(item.id)}
            className={styles.plusBotton}
          >
            <img
              src={plus}
              alt="PLUSE BUTTON IMG"
              className={clsx(styles.plusImg, 'app-icon')}
            />
          </button>
        </div>

        <div className={styles.fullPrice}>
          ${item.price * cartValues[item.id]}
        </div>
      </div>
    </article>
  );
};
