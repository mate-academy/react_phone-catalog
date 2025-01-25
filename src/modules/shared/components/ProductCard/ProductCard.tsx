import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import styles from './ProductCard.module.scss';

import { Product } from '@sTypes/Product';

import { AddToCard } from '@components/AddToCard';
import { Characteristics } from '@components/Characteristics';

type Props = {
  product: Product;
  hidePrevPrice?: boolean;
};

export const ProductCard = React.forwardRef<HTMLElement, Props>(
  function ProductCard({ product, hidePrevPrice }, ref) {
    const timeoutId = useRef(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const { price, fullPrice, screen, capacity, ram, image } = product;

    useEffect(() => {
      if (!isLoaded) {
        timeoutId.current = window.setTimeout(() => setIsloading(true), 300);
      } else {
        window.clearTimeout(timeoutId.current);
      }
    }, [isLoaded]);

    const characteristics: [string, string][] = [
      ['Screen', screen],
      ['Capacity', capacity],
      ['Ram', ram],
    ];

    return (
      <article ref={ref} className={styles['product-card']}>
        <img
          src={image}
          onLoad={() => {
            setIsLoaded(true);
            setIsloading(false);
          }}
          className={classNames(styles['product-card__image'], {
            [styles['product-card__image--loading']]: isLoading,
          })}
        />

        <div className={styles['product-card__title']}>{product.name}</div>

        <div className={styles['product-card__price']}>
          <h3>${price}</h3>
          {!hidePrevPrice && fullPrice !== price && (
            <s className={styles['product-card__prev-price']}>
              ${product.fullPrice}
            </s>
          )}
        </div>

        <div className={styles['product-card__divider']}></div>

        <Characteristics characteristics={characteristics} />

        <AddToCard />
      </article>
    );
  },
);
