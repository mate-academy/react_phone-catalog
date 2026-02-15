import React from 'react';
import classNames from 'classnames';

import { ProductDetails } from '@sTypes/ProductDetails';
import { ProductCategory } from '@sTypes/ProductCategory';

import { ProductId } from '../ProductId';
import { Price } from '@components/Price';
import { Capacities } from '../Capacities';
import { AddToCard } from '@components/AddToCard';
import { Characteristics } from '@components/Characteristics';

import styles from './MainInfo.module.scss';
import { Colors } from '../Colors';

type Props = {
  className: string;
  details: ProductDetails;
  category: ProductCategory;
};

export const MainInfo: React.FC<Props> = ({ className, details, category }) => {
  const { priceDiscount, priceRegular, screen, resolution, processor, ram } =
    details;

  const characteristics: [string, string][] = [
    ['Screen', screen],
    ['Resolution', resolution],
    ['Processor', processor],
    ['Ram', ram],
  ];

  return (
    <section
      aria-label="Main Info"
      className={classNames(className, styles['main-info'])}
    >
      <ProductId itemId={details.id} category={category} />

      <div className={styles['main-info__content']}>
        <div className={styles['main-info__other-models']}>
          <Colors
            current={details.color}
            colors={details.colorsAvailable}
            namespaceId={details.namespaceId}
            currentCapacity={details.capacity}
          />
          <div className={styles['main-info__hr']}></div>

          <Capacities
            current={details.capacity}
            capacities={details.capacityAvailable}
            namespaceId={details.namespaceId}
            currentColor={details.color}
          />
          <div className={styles['main-info__hr']}></div>
        </div>

        <article aria-label="Price" className={styles['main-info__price']}>
          <Price fullPrice={priceRegular} discountPrice={priceDiscount} />
          <AddToCard itemId={details.id} />
        </article>

        <Characteristics characteristics={characteristics} />
      </div>
    </section>
  );
};
