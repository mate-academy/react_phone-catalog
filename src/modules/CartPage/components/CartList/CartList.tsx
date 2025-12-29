import styles from './CartList.module.scss';
import { CartItem } from '../CartItem';
import { FC } from 'react';
import { CartItem as CartItemType } from '@/types/CartItem';
import classNames from 'classnames';

interface Props {
  items: CartItemType[];
  className?: string;
}

export const CartList: FC<Props> = ({ items, className }) => {
  return (
    <ul className={classNames(styles.list, className)}>
      {items.map(item => {
        const { product, count } = item;

        return (
          <li key={product.id} className={styles.item}>
            <CartItem product={product} count={count} />
          </li>
        );
      })}
    </ul>
  );
};
