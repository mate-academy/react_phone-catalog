import React from 'react';
import styles from './ProductList.module.scss';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../../../components/ProductCard/ProductCardSkeleton';
import cn from 'classnames';
import classNames from 'classnames';

export const ListSkeleton: React.FC = () => {
  const skeletonItems = Array.from({ length: 9 }).map((_, index) => (
    <article key={index} className={styles.productList__productCard}>
      <ProductCardSkeleton />
    </article>
  ));

  return (
    <section className={classNames(styles.productList, styles.skeleton)}>
      <div className={styles.productList__list}>{skeletonItems}</div>

      <div
        className={classNames(
          styles.productList__block,
          styles.skeleton__block,
        )}
      >
        <div
          className={cn(styles.productList__pageItem, styles.skeleton__button)}
        />

        <div className={styles.productList__pages}>
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={cn(
                styles.productList__pageItem,
                styles.skeleton__button,
              )}
            />
          ))}
        </div>

        <div
          className={cn(styles.productList__pageItem, styles.skeleton__button)}
        />
      </div>
    </section>
  );
};
