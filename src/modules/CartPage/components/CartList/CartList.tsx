import styles from './CartList.module.scss';
import { CartItem } from '../CartItem';
import { FC } from 'react';
import { CartItem as CartItemType } from '@/types/CartItem';
import classNames from 'classnames';
import { Product } from '@/types/Product';
import { CartItemSkeleton } from '../CartItemSkeleton';

type ExtendedCartItem = CartItemType & {
  product: Product;
};

interface Props {
  items: ExtendedCartItem[];
  className?: string;
  isLoading?: boolean;
  itemsPerLoading?: number;
}

export const CartList: FC<Props> = ({
  items,
  className,
  isLoading = false,
  itemsPerLoading = 10,
}) => {
  return (
    <ul className={classNames(styles.list, className)}>
      {isLoading &&
        Array.from({ length: itemsPerLoading }).map((_, index) => (
          <li key={`item-loader-${index}`} className={styles.item}>
            <CartItemSkeleton />
          </li>
        ))}

      {!isLoading &&
        items.map(item => {
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
