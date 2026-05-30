import React, { useRef } from 'react';
import classNames from 'classnames';

import { CartItem } from '../CartItem';
import { CartItemSkeleton } from '../CartItemSkeleton';

import { useListRestoration } from '@hooks/useListRestoration';
import { ProductCart } from 'modules/CartPage/types/ProductCart';

import styles from './CartList.module.scss';

type Props = {
  className?: string;
  products: ProductCart[];

  itemsCount: number;
};

export const CartList: React.FC<Props> = ({
  className,
  products,
  itemsCount,
}) => {
  const listRef = useRef<HTMLElement | null>(null);
  const lastItemRef = useRef<HTMLElement | null>(null);

  const { saveDiff, saveLastScroll } = useListRestoration(listRef, lastItemRef);

  const isLoading = products.length === 0;
  const lastItemIndex = products.length - 1;

  return (
    <section
      ref={listRef}
      className={classNames(className, styles['cart-list'])}
    >
      {isLoading &&
        Array.from({ length: itemsCount }, (_, i) => (
          <CartItemSkeleton key={i} />
        ))}

      {!isLoading &&
        products.map(({ count, product }, i) => (
          <CartItem
            key={product.id}
            name={product.name}
            image={product.image}
            count={count}
            price={product.price * count}
            itemId={product.itemId}
            link={`/${product.category}/${product.itemId}`}
            ref={lastItemIndex === i ? lastItemRef : undefined}
            onRemoveFromCart={lastItemIndex === i ? saveDiff : saveLastScroll}
          />
        ))}
    </section>
  );
};
