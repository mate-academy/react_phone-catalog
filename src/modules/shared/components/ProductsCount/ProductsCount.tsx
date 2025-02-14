import React from 'react';
import classNames from 'classnames';

import styles from './ProductsCount.module.scss';

type Props = {
  title: string;
  isLoading?: boolean;
  productsCount: number;

  children?: React.ReactNode;
};

export const ProductsCount: React.FC<Props> = ({
  title,
  productsCount,
  isLoading,

  children,
}) => {
  return (
    <div className={styles['products-count']}>
      <div className={styles['products-count__header']}>
        <h1>{title}</h1>

        <div
          className={classNames(styles['products-count__model-count'], {
            [styles['products-count__model-count--loading']]: isLoading,
          })}
        >
          {`${productsCount} model${productsCount === 1 ? '' : 's'}`}
        </div>
      </div>

      <main className={styles['products-count__main']}>{children}</main>
    </div>
  );
};
