import React from 'react';
import classNames from 'classnames';

import { CloseIcon, MinusIcon, PlusIcon } from '../../../../components';

import styles from './CartItem.module.scss';

export const CartItemSkeleton: React.FC = () => {
  return (
    <article
      className={classNames(styles['cart-item'], styles['cart-item--loading'])}
    >
      <div
        className={classNames(
          styles['cart-item__top'],
          styles['cart-item__top--loading'],
        )}
      >
        <div
          className={classNames(
            styles['cart-item__remove-btn'],
            styles['cart-item__remove-btn--loading'],
          )}
        >
          <CloseIcon />
        </div>

        <div
          className={classNames(
            styles['cart-item__link'],
            styles['cart-item__link--loading'],
          )}
        >
          <div className={styles['cart-item__img']} />
        </div>

        <div
          className={classNames(
            styles['cart-item__name'],
            styles['cart-item__name--loading'],
          )}
        />
      </div>

      <div className={styles['cart-item__bottom']}>
        <div
          className={classNames(
            styles['quantity-selector'],
            styles['quantity-selector--loading'],
          )}
        >
          <div
            className={classNames(
              styles['quantity-selector__button'],
              styles['quantity-selector__button--loading'],
            )}
          >
            <MinusIcon />
          </div>

          <div
            className={classNames(
              styles['quantity-selector__input'],
              styles['quantity-selector__input--loading'],
            )}
          />

          <div
            className={classNames(
              styles['quantity-selector__button'],
              styles['quantity-selector__button--loading'],
            )}
          >
            <PlusIcon />
          </div>
        </div>

        <div
          className={classNames(
            styles['cart-item__price'],
            styles['cart-item__price--loading'],
          )}
        />
      </div>
    </article>
  );
};
