import React, { useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import type { CartItem as CartItemType } from '../../features/cart/cartSlice';
import { changeQuantity, removeFromCart } from '../../features/cart/cartSlice';
import { CloseIcon, MinusIcon, PlusIcon } from '../iconsSVG';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;
  const hasDiscount =
    product.fullPrice !== undefined && product.fullPrice > product.price;

  const formattedPrice = useMemo(
    () =>
      `$${product.price.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
    [product.price],
  );

  const formattedOldPrice = useMemo(() => {
    if (!hasDiscount) {
      return null;
    }

    return `$${product.fullPrice?.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }, [hasDiscount, product.fullPrice]);

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(changeQuantity({ itemId: product.itemId, delta: -1 }));
    }
  };

  const handleIncrease = () => {
    dispatch(changeQuantity({ itemId: product.itemId, delta: 1 }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.itemId));
  };

  return (
    <li className={styles.cartItemWrap}>
      <article
        className={styles.cartItem}
        aria-labelledby={`ci-title-${product.itemId}`}
      >
        <div className={styles.cartItem__left}>
          <button
            type="button"
            className={styles.cartItem__remove}
            onClick={handleRemove}
            aria-label={`Remove ${product.name}`}
          >
            <CloseIcon />
          </button>

          <div className={styles.cartItem__media}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.cartItem__img}
              loading="lazy"
            />
          </div>

          <div className={styles.cartItem__info}>
            <h2
              id={`ci-title-${product.itemId}`}
              className={styles.cartItem__title}
            >
              {product.name}
            </h2>
          </div>
        </div>

        <div className={styles.cartItem__controls}>
          <div className={styles.cartItem__qty}>
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity === 1}
              aria-label="Decrease quantity"
              className={styles.cartItem__qtybtn}
            >
              <MinusIcon />
            </button>

            <span className={styles.cartItem__qtyval} aria-live="polite">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              aria-label="Increase quantity"
              className={styles.cartItem__qtybtn}
            >
              <PlusIcon />
            </button>
          </div>

          <div className={styles.cartItem__price}>
            {hasDiscount && (
              <div className={styles.cartItem__old}>{formattedOldPrice}</div>
            )}
            <div className={styles.cartItem__current}>{formattedPrice}</div>
          </div>
        </div>
      </article>
    </li>
  );
};
