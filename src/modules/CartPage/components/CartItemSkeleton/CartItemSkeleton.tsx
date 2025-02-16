import { Counter } from '../Counter';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';

import styles from './CartItemSkeleton.module.scss';

export const CartItemSkeleton = () => {
  return (
    <article className={styles['cart-item-skeleton']}>
      <div className={styles['cart-item-skeleton__top']}>
        <IconButton
          type={IconButtonType.iconClose}
          small
          disabled
          secondary
          hideBorders
        />

        <div className={styles['cart-item-skeleton__image']}></div>

        <div className={styles['cart-item-skeleton__title']}>
          <br />
        </div>
      </div>

      <div className={styles['cart-item-skeleton__bottom']}>
        <Counter showSkeleton />
        <h3 className={styles['cart-item-skeleton__price']}>
          <br />
        </h3>
      </div>
    </article>
  );
};
