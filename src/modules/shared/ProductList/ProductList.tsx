/* eslint-disable react/display-name */
import { FC, memo } from 'react';

import { Product } from '../../../types/Product';
import styles from './ProductList.module.scss';
import { ProductCard } from '../ProductCard';
import { InView } from 'react-intersection-observer';
import cn from 'classnames';

type Props = {
  products: Product[];
};

export const ProductList: FC<Props> = memo(({ products }) => {
  return (
    <ul className={styles.list}>
      {products.map(product => (
        <InView key={product.id} triggerOnce rootMargin="-100px 0px">
          {({ inView, ref }) => (
            <li
              ref={ref}
              className={cn(styles.item, styles.fadeEffect, {
                [styles.fadeEffectActive]: inView,
              })}
            >
              <ProductCard product={product} priceType="discount" />
            </li>
          )}
        </InView>
      ))}
    </ul>
  );
});
