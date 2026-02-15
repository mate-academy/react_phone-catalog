import React from 'react';
import { Link } from 'react-router-dom';

import { Counter } from '../Counter';
import { Image } from '@components/Image';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';

import { useAppDispatch } from '@store/hooks';
import { add, take, toggle } from '@features/cartSlice';

import styles from './CartItem.module.scss';

type Props = {
  name: string;
  image: string;
  count: number;
  price: number;
  itemId: string;

  link: string;
  onRemoveFromCart?: () => void;
};

export const CartItem = React.forwardRef<HTMLElement, Props>(function CartItem(
  {
    name,
    image,
    count,
    price,
    itemId,

    link,
    onRemoveFromCart = () => {},
  },
  ref,
) {
  const dispatch = useAppDispatch();

  return (
    <article aria-label={name} ref={ref} className={styles['cart-item']}>
      <div className={styles['cart-item__top']}>
        <IconButton
          type={IconButtonType.iconClose}
          small
          secondary
          hideBorders
          hideBackground
          onClick={() => {
            onRemoveFromCart();
            dispatch(toggle(itemId));
          }}
          ariaLabel="Close"
        />

        <Link to={link}>
          <Image
            src={image}
            aria-label={name}
            className={styles['cart-item__image']}
          />
        </Link>

        <div className={styles['cart-item__title']}>{name}</div>
      </div>

      <div className={styles['cart-item__bottom']}>
        <Counter
          count={count}
          onAdd={() => {
            dispatch(add(itemId));
          }}
          onTake={() => {
            if (count === 1) {
              onRemoveFromCart();
            }

            dispatch(take(itemId));
          }}
        />

        <h3 className={styles['cart-item__price']}>${price}</h3>
      </div>
    </article>
  );
});
