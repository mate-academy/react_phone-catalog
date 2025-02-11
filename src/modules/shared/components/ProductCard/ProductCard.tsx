import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ProductCard.module.scss';

import { Product } from '@sTypes/Product';

import { AddToCard } from '@components/AddToCard';
import { Characteristics } from '@components/Characteristics';
import { Image } from '@components/Image';
import { Price } from '@components/Price';

type Props = {
  product: Product;
  hidePrevPrice?: boolean;

  onClick?: () => void;
};

export const ProductCard = React.forwardRef<HTMLElement, Props>(
  function ProductCard({ product, hidePrevPrice, onClick }, ref) {
    const navigation = useNavigate();
    const { price, fullPrice, screen, capacity, ram, image } = product;

    const characteristics: [string, string][] = [
      ['Screen', screen],
      ['Capacity', capacity],
      ['Ram', ram],
    ];

    return (
      <article
        ref={ref}
        className={styles['product-card']}
        onClick={() => {
          if (onClick) {
            onClick();
          }

          window.scrollTo(0, 0);
          navigation(`/${product.category}/${product.itemId}`);
        }}
      >
        <Image src={image} className={styles['product-card__image']} />

        <div className={styles['product-card__title']}>{product.name}</div>

        <Price
          fullPrice={fullPrice}
          discountPrice={price}
          hidePrevPrice={hidePrevPrice}
        />

        <div className={styles['product-card__divider']}></div>

        <Characteristics characteristics={characteristics} />

        <AddToCard itemId={product.itemId} />
      </article>
    );
  },
);
