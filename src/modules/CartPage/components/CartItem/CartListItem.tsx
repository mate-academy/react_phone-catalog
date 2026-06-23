import React from 'react';

import { CartItem } from '../../../../types/Cart';
import { CloseIcon } from '../../../../components/Icons/CloseIcon';
import { useCart } from '../../../../hooks/useCart';
import { MinusIcon } from '../../../../components/Icons/MinusIcon';
import { PlusIcon } from '../../../../components/Icons/PlusIcon';

import styles from './CartListItem.module.scss';

type Props = {
  cartItem: CartItem;
};

export const CartListItem: React.FC<Props> = ({ cartItem }) => {
  const { removeFromCart, changeQuantity } = useCart();
  const { product, quantity } = cartItem;

  return (
    <article className={styles.cartItem}>
      <div className={styles.topInfo}>
        <button
          className={styles.deleteButton}
          onClick={() => removeFromCart(product.id)}
        >
          <CloseIcon />
        </button>

        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={`image of ${product.name}`}
            className={styles.image}
          />
        </div>

        <p className={styles.title}>{product.name}</p>
      </div>

      <div className={styles.bottomControls}>
        <div className={styles.quantityBlock}>
          <button
            className={styles.qtyButton}
            onClick={() => changeQuantity(product.id, -1)}
            disabled={quantity === 1}
          >
            <span className={styles.quanIcon}>
              <MinusIcon />
            </span>
          </button>

          <span className={styles.quantity}>{quantity}</span>

          <button
            className={styles.qtyButton}
            onClick={() => changeQuantity(product.id, 1)}
          >
            <span className={styles.quanIcon}>
              <PlusIcon />
            </span>
          </button>
        </div>

        <h3 className={styles.price}>{`$${quantity * product.price}`}</h3>
      </div>
    </article>
  );
};
